import type { Meta, StoryObj } from '@storybook/react';
import Image from "./Image";

const meta = {
  title: 'Common/Image',
  component: Image,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    src: 'https://picsum.photos/1200/800',
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    src: 'https://picsum.photos/1200/800',
  },
};
