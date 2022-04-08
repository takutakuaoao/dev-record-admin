import { ComponentMeta, ComponentStory } from "@storybook/react";
import AccessURL from "./accessURL";

export default {
  title: "molecules/accessURL",
  component: AccessURL,
} as ComponentMeta<typeof AccessURL>;

const Template: ComponentStory<typeof AccessURL> = (args) => (
  <AccessURL {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  url: "https://picsum.photos/seed/picsum/200/300",
};
