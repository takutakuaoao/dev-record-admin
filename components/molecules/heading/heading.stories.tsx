import { ComponentMeta, ComponentStory } from "@storybook/react";
import H1 from "./heading";

export default {
  title: "molecules/h1",
  component: H1,
} as ComponentMeta<typeof H1>;

const Template: ComponentStory<typeof H1> = (args) => <H1 {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  title: "Heading",
};
