import { ComponentMeta, ComponentStory } from "@storybook/react";
import CancelIcon from "./cancelIcon";

export default {
  title: "atoms/cancelIcon",
  component: CancelIcon,
} as ComponentMeta<typeof CancelIcon>;

const Template: ComponentStory<typeof CancelIcon> = (args) => (
  <CancelIcon {...args} />
);

export const Normal = Template.bind({});
Normal.args = {};
