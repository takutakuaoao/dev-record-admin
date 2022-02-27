import { ComponentMeta, ComponentStory } from "@storybook/react";
import SelectItem from "../../atoms/selectItem";
import SelectBox from "./selectBox";

export default {
  title: "molecules/selectBox",
  component: SelectBox,
} as ComponentMeta<typeof SelectBox>;

const Template: ComponentStory<typeof SelectBox> = (args) => (
  <SelectBox {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  name: "Select Box",
  handleChange: (e) => {},
  children: [
    <SelectItem name="item-1" value="value-1" key="1" />,
    <SelectItem name="item-2" value="value-2" key="2" />,
  ],
};
