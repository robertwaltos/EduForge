"use client";

import { useState } from "react";

type AlertRow = {
  id: string;
  severity: "info" | "warning" | "critical";
  category: string;
  message: string;
  metadata: Record<string, unknown>;
  acknowledged: boolean;
  acknowledged_at: string | null;
  created_at: string;
};

type AlertSettings = {
  staleHours: number;
  backlogLimit: number;
  failure24hLimit: number;
  dedupeWindowHours: number;
  autoResolveHours: number;
};

type RunSummary = {
  triggeredCount: number;
  triggeredCategories: string[];
  autoResolvedCount: number;
  autoResolvedCategories: Record<string, number>;
};

type NotificationSummary = {
  queuedCount: number;
  failedCount: number;
  sentCount: number;
};

export default function AlertsClient({
  initialAlerts,
  initialSettings,
  initialReportSettings,
  initialNotificationSummary,
}: {
  initialAlerts: AlertRow[];
  initialSettings: AlertSettings;
  initialReportSettings: AlertSettings;
  initialNotificationSummary: NotificationSummary;
}) {
  const [alerts, setAlerts] = useState(initialAlerts);
  const [mediaSettings, setMediaSettings] = useState(initialSettings);
  const [reportSettings, setReportSettings] = useState(initialReportSettings);
  const [status, setStatus] = useState("");
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [isProcessingNotifications, setIsProcessingNotifications] = useState(false);
  const [lastRunSummary, setLastRunSummary] = useState<RunSummary | null>(null);
  const [notificationSummary, setNotificationSummary] = useState<NotificationSummary | null>(
    initialNotificationSummary,
  );

  const refreshAlerts = async () => {
    const response = await fetch("/api/admin/alerts");
    const data = (await response.json().catch(() => ({}))) as {
      alerts?: AlertRow[];
      settings?: AlertSettings;
      reportSettings?: AlertSettings;
      notificationSummary?: NotificationSummary;
      error?: string;
    };
    if (!response.ok) {
      throw new Error(data.error ?? "Unable to refresh alerts.");
    }
    setAlerts(data.alerts ?? []);
    if (data.settings) {
      setMediaSettings(data.settings);
    }
    if (data.reportSettings) {
      setReportSettings(data.reportSettings);
    }
    if (data.notificationSummary) {
      setNotificationSummary(data.notificationSummary);
    }
  };

  const runChecks = async () => {
    setStatus("");
    try {
      const response = await fetch("/api/admin/alerts/run", { method: "POST" });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        triggeredCount?: number;
        triggeredCategories?: string[];
        autoResolvedCount?: number;
        autoResolvedCategories?: Record<string, number>;
      };
      if (!response.ok) {
        setStatus(data.error ?? "Unable to run alert checks.");
        return;
      }
      const triggeredCategories = data.triggeredCategories ?? [];
      const autoResolvedCategories = data.autoResolvedCategories ?? {};
      setLastRunSummary({
        triggeredCount: data.triggeredCount ?? 0,
        triggeredCategories,
        autoResolvedCount: data.autoResolvedCount ?? 0,
        autoResolvedCategories,
      });
      setStatus(
        `Alert checks completed. New alerts: ${data.triggeredCount ?? 0}. Auto-resolved: ${data.autoResolvedCount ?? 0}.`,
      );
      await refreshAlerts();
    } catch {
      setStatus("Unable to run alert checks.");
    }
  };

  const acknowledgeAlert = async (alertId: string) => {
    setStatus("");
    try {
      const response = await fetch("/api/admin/alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setStatus(data.error ?? "Unable to acknowledge alert.");
        return;
      }
      setAlerts((previous) =>
        previous.map((entry) =>
          entry.id === alertId
            ? { ...entry, acknowledged: true, acknowledged_at: new Date().toISOString() }
            : entry
        )
      );
      setStatus(`Alert ${alertId} acknowledged.`);
    } catch {
      setStatus("Unable to acknowledge alert.");
    }
  };

  const saveSettings = async () => {
    setStatus("");
    setIsSavingSettings(true);
    try {
      const response = await fetch("/api/admin/alerts", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          media: {
            staleHours: mediaSettings.staleHours,
            backlogLimit: mediaSettings.backlogLimit,
            failure24hLimit: mediaSettings.failure24hLimit,
            dedupeWindowHours: mediaSettings.dedupeWindowHours,
            autoResolveHours: mediaSettings.autoResolveHours,
          },
          report: {
            staleHours: reportSettings.staleHours,
            backlogLimit: reportSettings.backlogLimit,
            failure24hLimit: reportSettings.failure24hLimit,
            dedupeWindowHours: reportSettings.dedupeWindowHours,
            autoResolveHours: reportSettings.autoResolveHours,
          },
        }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        settings?: AlertSettings;
        reportSettings?: AlertSettings | null;
      };
      if (!response.ok) {
        setStatus(data.error ?? "Unable to save alert settings.");
        return;
      }
      if (data.settings) {
        setMediaSettings(data.settings);
      }
      if (data.reportSettings) {
        setReportSettings(data.reportSettings);
      }
      setStatus("Alert settings saved.");
    } catch {
      setStatus("Unable to save alert settings.");
    } finally {
      setIsSavingSettings(false);
    }
  };

  const processNotifications = async () => {
    setStatus("");
    setIsProcessingNotifications(true);
    try {
      const response = await fetch("/api/admin/alerts/notifications/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          limit: 200,
          retryFailed: true,
        }),
      });

      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        reason?: string;
        scanned?: number;
        sent?: number;
        failed?: number;
        skipped?: number;
        missingAlerts?: number;
      };

      if (!response.ok) {
        setStatus(data.error ?? "Unable to process alert notifications.");
        return;
      }

      const reasonSuffix = data.reason ? ` (${data.reason})` : "";
      setStatus(
        `Notification queue processed. scanned=${data.scanned ?? 0}, sent=${data.sent ?? 0}, failed=${data.failed ?? 0}, skipped=${data.skipped ?? 0}, missing-alerts=${data.missingAlerts ?? 0}${reasonSuffix}`,
      );
      await refreshAlerts();
    } catch {
      setStatus("Unable to process alert notifications.");
    } finally {
      setIsProcessingNotifications(false);
    }
  };

  return (
    <div className="space-y-3">
      <section className="rounded-md border border-black/10 p-3 dark:border-white/10">
        <h2 className="text-sm font-semibold">Media Queue SLA Settings</h2>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
          These thresholds control stale/backlog/failure alerts for media job automation.
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-5">
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Stale Hours
            <input
              type="number"
              min={1}
              max={168}
              value={mediaSettings.staleHours}
              onChange={(event) =>
                setMediaSettings((previous) => ({
                  ...previous,
                  staleHours: Math.max(1, Math.min(168, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Backlog Limit
            <input
              type="number"
              min={1}
              max={10000}
              value={mediaSettings.backlogLimit}
              onChange={(event) =>
                setMediaSettings((previous) => ({
                  ...previous,
                  backlogLimit: Math.max(1, Math.min(10000, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Failure 24h Limit
            <input
              type="number"
              min={1}
              max={10000}
              value={mediaSettings.failure24hLimit}
              onChange={(event) =>
                setMediaSettings((previous) => ({
                  ...previous,
                  failure24hLimit: Math.max(1, Math.min(10000, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Dedupe Window (h)
            <input
              type="number"
              min={1}
              max={168}
              value={mediaSettings.dedupeWindowHours}
              onChange={(event) =>
                setMediaSettings((previous) => ({
                  ...previous,
                  dedupeWindowHours: Math.max(1, Math.min(168, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Auto-Resolve Age (h)
            <input
              type="number"
              min={1}
              max={720}
              value={mediaSettings.autoResolveHours}
              onChange={(event) =>
                setMediaSettings((previous) => ({
                  ...previous,
                  autoResolveHours: Math.max(1, Math.min(720, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
        </div>
      </section>

      <section className="rounded-md border border-black/10 p-3 dark:border-white/10">
        <h2 className="text-sm font-semibold">Report Queue SLA Settings</h2>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-300">
          These thresholds control stale/backlog/failure alerts for admin report job processing.
        </p>
        <div className="mt-3 grid gap-2 md:grid-cols-5">
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Stale Hours
            <input
              type="number"
              min={1}
              max={168}
              value={reportSettings.staleHours}
              onChange={(event) =>
                setReportSettings((previous) => ({
                  ...previous,
                  staleHours: Math.max(1, Math.min(168, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Backlog Limit
            <input
              type="number"
              min={1}
              max={10000}
              value={reportSettings.backlogLimit}
              onChange={(event) =>
                setReportSettings((previous) => ({
                  ...previous,
                  backlogLimit: Math.max(1, Math.min(10000, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Failure 24h Limit
            <input
              type="number"
              min={1}
              max={10000}
              value={reportSettings.failure24hLimit}
              onChange={(event) =>
                setReportSettings((previous) => ({
                  ...previous,
                  failure24hLimit: Math.max(1, Math.min(10000, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Dedupe Window (h)
            <input
              type="number"
              min={1}
              max={168}
              value={reportSettings.dedupeWindowHours}
              onChange={(event) =>
                setReportSettings((previous) => ({
                  ...previous,
                  dedupeWindowHours: Math.max(1, Math.min(168, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
          <label className="text-xs text-zinc-600 dark:text-zinc-300">
            Auto-Resolve Age (h)
            <input
              type="number"
              min={1}
              max={720}
              value={reportSettings.autoResolveHours}
              onChange={(event) =>
                setReportSettings((previous) => ({
                  ...previous,
                  autoResolveHours: Math.max(1, Math.min(720, Number(event.target.value) || 1)),
                }))
              }
              className="mt-1 w-full rounded border border-black/15 px-2 py-1 text-xs"
            />
          </label>
        </div>
        <button
          type="button"
          onClick={() => void saveSettings()}
          disabled={isSavingSettings}
          className="mt-3 rounded border border-black/15 px-2 py-1 text-xs disabled:opacity-70"
        >
          {isSavingSettings ? "Saving..." : "Save SLA Settings"}
        </button>
      </section>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => void runChecks()}
          className="rounded border border-black/15 px-2 py-1 text-xs"
        >
          Run Checks
        </button>
        <button
          type="button"
          onClick={() => void refreshAlerts()}
          className="rounded border border-black/15 px-2 py-1 text-xs"
        >
          Refresh
        </button>
        <button
          type="button"
          onClick={() => void processNotifications()}
          disabled={isProcessingNotifications}
          className="rounded border border-black/15 px-2 py-1 text-xs disabled:opacity-70"
        >
          {isProcessingNotifications ? "Processing Notifications..." : "Process Notifications"}
        </button>
      </div>
      {status ? <p className="text-sm text-zinc-600 dark:text-zinc-300">{status}</p> : null}
      {notificationSummary ? (
        <section className="rounded-md border border-black/10 bg-zinc-50 p-3 text-xs dark:border-white/10 dark:bg-zinc-900/20">
          <p className="font-semibold">Notification Queue</p>
          <p className="mt-1 text-zinc-600 dark:text-zinc-300">
            queued={notificationSummary.queuedCount} | failed={notificationSummary.failedCount} | sent=
            {notificationSummary.sentCount}
          </p>
        </section>
      ) : null}
      {lastRunSummary ? (
        <section className="rounded-md border border-black/10 bg-zinc-50 p-3 text-xs dark:border-white/10 dark:bg-zinc-900/20">
          <p className="font-semibold">Last Check Summary</p>
          <p className="mt-1 text-zinc-600 dark:text-zinc-300">
            Triggered categories: {lastRunSummary.triggeredCategories.join(", ") || "none"}
          </p>
          <p className="mt-1 text-zinc-600 dark:text-zinc-300">
            Auto-resolved categories:{" "}
            {Object.keys(lastRunSummary.autoResolvedCategories).length > 0
              ? Object.entries(lastRunSummary.autoResolvedCategories)
                  .map(([category, count]) => `${category} (${count})`)
                  .join(", ")
              : "none"}
          </p>
        </section>
      ) : null}
      {alerts.map((entry) => (
        <article key={entry.id} className="rounded-md border border-black/10 p-3 dark:border-white/10">
          <p className="font-medium">
            [{entry.severity}] {entry.message}
          </p>
          <p className="text-xs text-zinc-500">
            category: {entry.category} | created: {new Date(entry.created_at).toLocaleString()}
          </p>
          <pre className="mt-2 overflow-x-auto rounded bg-zinc-100 p-2 text-xs dark:bg-zinc-800">
            {JSON.stringify(entry.metadata ?? {}, null, 2)}
          </pre>
          {entry.acknowledged ? (
            <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-300">
              Acknowledged {entry.acknowledged_at ? new Date(entry.acknowledged_at).toLocaleString() : ""}
            </p>
          ) : (
            <button
              type="button"
              onClick={() => acknowledgeAlert(entry.id)}
              className="mt-2 rounded border border-black/15 px-2 py-1 text-xs"
            >
              Acknowledge
            </button>
          )}
        </article>
      ))}
      {alerts.length === 0 ? <p className="text-sm text-zinc-500">No alerts.</p> : null}
    </div>
  );
}
