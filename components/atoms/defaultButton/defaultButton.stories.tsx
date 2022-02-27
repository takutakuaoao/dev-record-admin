import { ComponentMeta, ComponentStory } from "@storybook/react";
import DefaultButton from "./defaultButton";

export default {
  title: "atoms/defaultButton",
  component: DefaultButton,
} as ComponentMeta<typeof DefaultButton>;

const Template: ComponentStory<typeof DefaultButton> = (args) => (
  <DefaultButton {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  text: "Draft",
  onClick: (e: any) => {},
};
