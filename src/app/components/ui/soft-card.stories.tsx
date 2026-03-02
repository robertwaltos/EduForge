import type { Meta, StoryObj } from "@storybook/react";
import SoftCard from "./soft-card";

const meta = {
  title: "UI/SoftCard",
  component: SoftCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
  argTypes: {
    as: {
      control: "select",
      options: ["div", "article", "section", "aside", "header", "li"],
    },
    interactive: { control: "boolean" },
    organicCorners: { control: "boolean" },
  },
} satisfies Meta<typeof SoftCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-6">
        <h2 className="text-lg font-bold text-zinc-900">Module Card</h2>
        <p className="mt-1 text-sm text-zinc-600">
          A default SoftCard with standard styling.
        </p>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    interactive: true,
    children: (
      <div className="p-6">
        <h2 className="text-lg font-bold text-zinc-900">Interactive Card</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Hover me — I have interactive styling.
        </p>
      </div>
    ),
  },
};

export const OrganicCorners: Story = {
  args: {
    organicCorners: true,
    children: (
      <div className="p-6">
        <h2 className="text-lg font-bold text-zinc-900">Organic Corners</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Uses organic border radius variant.
        </p>
      </div>
    ),
  },
};

export const CardGrid: Story = {
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {["Math", "Science", "Language Arts"].map((subject) => (
        <SoftCard key={subject} as="article" interactive>
          <div className="p-5">
            <span className="rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-bold text-sky-800">
              {subject}
            </span>
            <h3 className="mt-3 text-base font-bold text-zinc-900">
              Introduction to {subject}
            </h3>
            <p className="mt-1 text-sm text-zinc-600">12 lessons · Ages 6-10</p>
          </div>
        </SoftCard>
      ))}
    </div>
  ),
};
