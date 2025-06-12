import type { Meta, StoryObj } from '@storybook/react-vite';
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
    width: 1200,
    height: 800,
    alt: '',
  },
} satisfies Meta<typeof Image>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};
