import MascotHost from "@/components/experience/MascotHost";

export default function ExploreLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MascotHost friendId="pixel" initialMood="happy">
      <div className="explore-shell flex min-h-screen flex-col">
        <main className="explore-page-enter flex-1">{children}</main>
      </div>
    </MascotHost>
  );
}
