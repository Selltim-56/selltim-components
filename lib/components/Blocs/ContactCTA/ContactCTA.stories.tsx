import type { Meta, StoryObj } from '@storybook/react-vite';
import ContactCTA from "./ContactCTA";

const meta = {
  title: 'Blocs/ContactCTA',
  component: ContactCTA,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
  },
  args: {
    phone: '123-456-7890',
    mail: "pouet@mail.com",
    address: "123 Main St, Anytown, USA",
    direction: 'left'
  },
} satisfies Meta<typeof ContactCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Styled: Story = {
  args: {
    className: "bg-blue-500 text-white rounded-r-lg shadow-lg",
    iconClassName: "text-yellow-300",
    textClassName: "text-sm font-semibold",
  },
};