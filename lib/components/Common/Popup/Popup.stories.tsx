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
    className: { control: "text" },
    endOpeningDate: { control: "date" },
  },
} satisfies Meta<typeof Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    endOpeningDate: new Date(Date.now() + 1000 * 60 * 60 * 24),
    className: "overflow-hidden rounded-lg shadow-lg",
    children: (<div className="h-full w-full flex items-center justify-center text-white bg-black">
      Content of popup
    </div>),
  },
};

export const EndedYesterday: Story = {
  args: {
    endOpeningDate: new Date(Date.now() - 1000 * 60 * 60 * 24),
    className: "overflow-hidden rounded-lg shadow-lg",
    children: (<div className="h-full w-full flex items-center justify-center text-white bg-black">
      Content of popup
    </div>),
  },
};