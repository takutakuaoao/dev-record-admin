import { ComponentMeta, ComponentStory } from "@storybook/react";
import ImageCard from "./imageCard";

export default {
  title: "molecules/imageCard",
  component: ImageCard,
} as ComponentMeta<typeof ImageCard>;

const Template: ComponentStory<typeof ImageCard> = (args) => (
  <ImageCard {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  url: 'https://picsum.photos/seed/picsum/200/300',
  imageName: 'テスト画像',
  imageSize: {
      w: 80,
      h: 90,
  },
};
