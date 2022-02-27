import { ComponentMeta, ComponentStory } from "@storybook/react";
import PrimaryButton from "./primaryButton";

export default {
  title: "atoms/primaryButton",
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton>;

const Template: ComponentStory<typeof PrimaryButton> = (args) => (
  <PrimaryButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  text: "Publish",
  onClick: (e: any) => {},
};
