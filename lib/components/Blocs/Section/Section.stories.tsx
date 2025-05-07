import type { Meta, StoryObj } from '@storybook/react';
import Section from "./Section";
import Button from "../../Common/Button/Button";

const meta = {
  title: 'Blocs/Section',
  component: Section,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    content: { type: 'string' }
  },
  args: {
    content: '<h2>Section</h2>\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    mediaUrl: 'https://picsum.photos/1200/800',
    mediaType: 'image',
    reverse: false
  },
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Styled: Story = {
  args: {
    mediaClassName: 'rounded-3xl shadow-lg',
  },
};

export const WithAction: Story = {
  args: {
    action: (
      <div className="flex gap-4 justify-start">
        <Button title="Action button" />
        <Button title="Action button" />
      </div>
    )
  },
};
