import type { Meta, StoryObj } from "@storybook/react";
import Carrousel from "./Carrousel";

const meta = {
  title: "Blocs/Carrousel",
  component: Carrousel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {},
} satisfies Meta<typeof Carrousel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithImages: Story = {
  args: {
    loop: true,
    align: "center",
  },
  render: (args) => (
    <div style={{ maxWidth: "600px" }}>
      <Carrousel {...args}>
        <img
          src="https://picsum.photos/600/400?random=2"
          alt="Sample image 2"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <img
          src="https://picsum.photos/600/400?random=3"
          alt="Sample image 3"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
        <img
          src="https://picsum.photos/600/400?random=4"
          alt="Sample image 4"
          style={{ width: "100%", height: "auto", objectFit: "cover" }}
        />
      </Carrousel>
    </div>
  ),
};
