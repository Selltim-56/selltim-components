import type { Meta, StoryObj } from '@storybook/react-vite';
import Timeline from "./Timeline.tsx";

const meta = {
  title: 'Blocs/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    backgroundColor: '#22a89c',
    textColor: '#FFF',
    items: [
      {
        year: '1995',
        content: <div>Création de la première version du site en HTML statique.</div>
      },
      {
        year: '2001',
        content: <div>Refonte complète avec l’introduction de PHP et de bases de données.</div>
      },
      {
        year: '2007',
        content: <div>Mise en ligne de la première version mobile du site.</div>
      },
      {
        year: '2009',
        content: <div>Lancement du blog pour partager des actualités et des tutoriels.</div>
      },
      {
        year: '2013',
        content: <div>Passage au responsive design avec une refonte graphique complète.</div>
      },
      {
        year: '2018',
        content: <div>Migration vers un CMS headless pour plus de flexibilité.</div>
      },
      {
        year: '2023',
        content: <div>Intégration d’une Progressive Web App (PWA) pour une expérience offline.</div>
      }
    ]
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const AutoScroll: Story = {
  args: {
    autoScroll: 5000
  },
};
