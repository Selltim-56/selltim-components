import type { Meta, StoryObj } from "@storybook/react-vite";
import Reassurances from "./Reassurance";

const meta = {
  title: "Blocs/Reassurances",
  component: Reassurances,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    globalPlacement: "top",
    reassurances: [
      {
        content: "C'est un super produit",
        icon: {
          sourceUrl: "https://placehold.co/200x200/png?text=Reassurance+1",
          alt: "icone 1",
        },
      },
      {
        content: "Je vous jure que c'est bien",
        icon: {
          sourceUrl: "https://placehold.co/200x200/png?text=Reassurance+2",
          alt: "icone 1",
        },
      },
      {
        content: "Promis c'est super",
        icon: {
          sourceUrl: "https://placehold.co/200x200/png?text=Reassurance+3",
          alt: "icone 1",
        },
      },
    ],
  },
} satisfies Meta<typeof Reassurances>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithCustomClasses: Story = {
  args: {
    contentClassName: "text-sm p-2 rounded-xl bg-gray-200",
    textContainerClassName: "w-full",
    iconContainerClassName: "w-14 h-14 rounded-full overflow-hidden",
    className: "bg-gray-100 p-4 rounded-lg",

  },
};

export const WithValues: Story = {
  args: {
    reassurances: [
      {
        value: "+ de 4500",
        content: "pizzas vendu"
      },
      {
        value: "12",
        content: "collaborateurs",
        icon: {
          sourceUrl: "https://placehold.co/200x200/png?text=Reassurance+1",
          alt: "icone 1",
        },
        placement: "left",
      },
      {
        value: "24/7",
        content: "Support client",
        icon: {
          sourceUrl: "https://placehold.co/200x200/png?text=Reassurance+1",
          alt: "icone 1",
        },
      },
    ],
  },
};