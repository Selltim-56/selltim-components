import type { Meta, StoryObj } from "@storybook/react-vite";
import Carousel from "./Carousel";
import Image from "next/image";

const meta = {
  title: "Blocs/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    emblaOptions: { loop: true, align: "center" },
    slidesToShow: 1,
    prevButton: (
      <div className="sc:bg-white sc:p-1 sc:rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="sc:size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    ),
    nextButton: (
      <div className="sc:bg-white sc:p-1 sc:rounded-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="sc:size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </div>
    ),
  }
} satisfies Meta<typeof Carousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    controls: false,
  },
  render: (args) => (
    <Carousel {...args}>
      <Image
        src="https://picsum.photos/600/400?random=1"
        alt="Sample image 1"
        width={600}
        height={400}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      <Image
        src="https://picsum.photos/600/400?random=2"
        alt="Sample image 2"
        width={600}
        height={400}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      <Image
        src="https://picsum.photos/600/400?random=3"
        alt="Sample image 3"
        width={600}
        height={400}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
    </Carousel>
  ),
};

export const WithControls: Story = {
  args: {
    controls: true,
  },
  render: (args) => (
    <Carousel {...args}>
      <Image
        src="https://picsum.photos/600/400?random=2"
        alt="Sample image 2"
        width={600}
        height={400}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      <Image
        src="https://picsum.photos/600/400?random=3"
        alt="Sample image 3"
        width={600}
        height={400}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
      <Image
        src="https://picsum.photos/600/400?random=4"
        alt="Sample image 4"
        width={600}
        height={400}
        style={{ width: "100%", height: "auto", objectFit: "cover" }}
      />
    </Carousel>
  ),
};

export const WithCustomChildren: Story = {
  args: {
    controls: true,
  },
  render: (args) => (
    <Carousel {...args}>
      <div className="sc:bg-blue-500 sc:text-center sc:mx-10 sc:text-white sc:p-4 sc:rounded-lg">
        Custom Slide 1
      </div>
      <div className="sc:bg-green-500 sc:text-center sc:mx-10 sc:text-white sc:p-4 sc:rounded-lg">
        Custom Slide 2
      </div>
      <div className="sc:bg-red-500 sc:text-center sc:mx-10 sc:text-white sc:p-4 sc:rounded-lg">
        Custom Slide 3
      </div>
    </Carousel>
  ),
};
