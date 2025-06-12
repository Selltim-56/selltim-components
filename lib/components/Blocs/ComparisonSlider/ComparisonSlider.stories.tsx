import type { Meta, StoryObj } from '@storybook/react-vite';
import ComparisonSlider from "./ComparisonSlider.tsx";

const meta = {
  title: 'Blocs/ComparisonSlider',
  component: ComparisonSlider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    className: 'h-96 w-96',
    beforeImageUrl: 'https://img-comparison-slider.sneas.io/demo/images/before.webp',
    afterImageUrl: 'https://img-comparison-slider.sneas.io/demo/images/after.webp'
  },
} satisfies Meta<typeof ComparisonSlider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
