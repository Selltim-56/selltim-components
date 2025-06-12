import type { Meta, StoryObj } from '@storybook/react-vite';
import CookieConsent from "./CookieConsent.tsx";

const meta = {
  title: 'Blocs/CookieConsent',
  component: CookieConsent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    sendGAEvent: () => {},
    endpoint: 'https://api.intranet.selltim.com/v1/projects/{projectId}/cookieConsent',
    color: '#20d697'
  },
} satisfies Meta<typeof CookieConsent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};
