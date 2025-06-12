import type { Meta, StoryObj } from "@storybook/react";
import Popup from "./Popup";

const meta = {
  title: "Common/Popup",
  component: Popup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    endDate: { control: "date" },
  },
  args: {
    children: (
      <div className="p-12 flex items-center justify-center text-black bg-white text-center">
        Content of popup
      </div>
    ),
  }
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
  },
};

export const OneTime: Story = {
  args: {
    maxViewsPerSession: 1,
  },
};

export const EndedYesterday: Story = {
  args: {
    endDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
};
