import { ComponentMeta, ComponentStory } from "@storybook/react";
import FitImage from "./fitImage";

export default {
  title: "atoms/fitImage",
  component: FitImage,
} as ComponentMeta<typeof FitImage>;

const Template: ComponentStory<typeof FitImage> = (args) => (
  <FitImage {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  src: 'https://picsum.photos/seed/picsum/200/300',
  alt: 'テスト画像',
  height: 300,
};
