import { ComponentMeta, ComponentStory } from "@storybook/react";
import TextArea from "./textArea";

export default {
  title: "atoms/textArea",
  component: TextArea,
} as ComponentMeta<typeof TextArea>;

const Template: ComponentStory<typeof TextArea> = (args) => (
  <TextArea {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  placeholder: "placeholder",
  name: "test",
  handleChange: (e) => {},
};
