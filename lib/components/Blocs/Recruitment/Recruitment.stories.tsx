import type { Meta, StoryObj } from "@storybook/react-vite";
import Recruitment from "./Recruitment";

const meta = {
  title: "Blocs/Recruitment",
  component: Recruitment,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: { type: "string" },
  },
  args: {
    title: "Recrutement super intéressant",
    city: "Paris",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    mediaUrl: "https://picsum.photos/1200/800",
    date: new Date(),
    reverse: false,
  },
} satisfies Meta<typeof Recruitment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const WithCustomTexts: Story = {
  args: {
    customCTATexts: {
      ended: "Recrutement en pause",
      ongoing: "N'hésitez pas à postuler !",
      viewOffer: "Découvrez l'offre",
    },
    ongoingRecruitment: true,
    recruitmentInfoClassName: (ongoing) => ongoing ? "text-green-500" : "text-red-500",
  },
};

export const Styled: Story = {
  args: {
    cityClassName: "text-neutral-500",
    dateClassName: "text-sm text-neutral-500",
    viewOfferClassName: "bg-neutral-200 p-2 text-center rounded-lg",
    recruitmentInfoClassName: ()=> "text-sm text-neutral-500 bg-neutral-100 p-2 rounded-lg",
    mediaClassName: "rounded-3xl shadow-lg",
  },
};
