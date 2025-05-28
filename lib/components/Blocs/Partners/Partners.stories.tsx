import type { Meta, StoryObj } from '@storybook/react';
import Partners from "./Partners";

const meta = {
  title: 'Blocs/Partners',
  component: Partners,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  
} satisfies Meta<typeof Partners>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    partnersToShow: 4,
    autoScrollOptions: {direction:"forward"},
    partnerLogos: [
      {
        src: "https://placehold.co/200x100/png?text=Partner+1",
        href: "https://example.com/partner1"
      },
      {
        src: "https://placehold.co/200x100/png?text=Partner+2",
        href: "https://example.com/partner2"
      },
      {
        src: "https://placehold.co/200x100/png?text=Partner+3",
        href: "https://example.com/partner3"
      },
      {
        src: "https://placehold.co/200x100/png?text=Partner+4",
        href: "https://example.com/partner4"
      },
      {
        src: "https://placehold.co/200x100/png?text=Partner+5",
        href: "https://example.com/partner5"
      },
    ]
  },
};
