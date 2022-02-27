import { ComponentMeta, ComponentStory } from "@storybook/react";
import Input from "./input";

export default {
  title: "atoms/input",
  component: Input,
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  placeholder: "Slug",
  name: "slug",
  onChange: (e) => {},
};
