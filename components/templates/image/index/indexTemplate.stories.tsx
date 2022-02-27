import { ComponentMeta, ComponentStory } from "@storybook/react";
import IndexTemplate from "./indexTemplate";

export default {
  title: "templates/image/index",
  component: IndexTemplate,
} as ComponentMeta<typeof IndexTemplate>;

const Template: ComponentStory<typeof IndexTemplate> = (args) => (
  <IndexTemplate {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  images: [
    {
      id: "test-1",
      name: "test.pdf",
      width: 90,
      height: 100,
      src: "https://picsum.photos/seed/picsum/200/300",
    },
    {
      id: "test-2",
      name: "test.pdf",
      width: 100,
      height: 110,
      src: "https://picsum.photos/seed/picsum/200/300",
    },
    {
        id: "test-3",
        name: "test.pdf",
        width: 100,
        height: 110,
        src: "https://picsum.photos/seed/picsum/200/300",
      },
  ],
};
