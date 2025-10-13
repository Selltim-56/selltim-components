import type { Meta, StoryObj } from '@storybook/react-vite';
import PDFBook from "./PDFBook.tsx";

const meta = {
  title: 'Common/PDFBook',
  component: PDFBook,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    width: 500,
    height: 700,
    src: 'https://raw.githubusercontent.com/wojtekmaj/react-pdf/df216284eaa701bb7308e6733987471023042fd7/sample/next-app/public/sample.pdf'
  },
} satisfies Meta<typeof PDFBook>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {};

export const Styled: Story = {
  args: {
    className: "shadow"
  }
}
