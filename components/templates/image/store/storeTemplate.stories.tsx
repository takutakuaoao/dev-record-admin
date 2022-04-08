import { ComponentMeta, ComponentStory } from "@storybook/react";
import StoreTemplate from "./storeTemplate";

export default {
  title: "templates/image/store",
  component: StoreTemplate,
} as ComponentMeta<typeof StoreTemplate>;

const Template: ComponentStory<typeof StoreTemplate> = (args) => (
  <StoreTemplate {...args} />
);

export const CompleteUpload = Template.bind({});
CompleteUpload.args = {
    uploadImageHandle: (e) => {},
    uploadedImageUrl: "https://picsum.photos/seed/picsum/200/300",
};

export const NotYetUpload = Template.bind({});
NotYetUpload.args = {
    uploadImageHandle: (e) => {},
    uploadedImageUrl: "",
}
