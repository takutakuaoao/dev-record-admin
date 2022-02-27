import { ComponentMeta, ComponentStory } from "@storybook/react";
import Table from "./table";

export default {
  title: "molecules/table",
  component: Table,
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const ArticleTable = Template.bind({});
ArticleTable.args = {
  headList: ['ID', 'TITLE', 'SLUG', 'CATEGORY', 'STATUS'],
  dataList: [
    {
      id: "620e4e3b7a6a2",
      url: "/edit-page/1",
      showData: ["620e4e3b7a6a2", "article title 2", "article-slug-2", "category-2", "非公開"],
    },
    {
      id: "620e4db16649a",
      url: "/edit-page/2",
      showData: ["620e4db16649a", "article title 1", "article-slug-1", "category-1", "公開"],
    },
  ],
}

export const CategoryTable = Template.bind({});
CategoryTable.args = {
  headList: ['ID', 'NAME', 'SLUG'],
  dataList: [
    {
      id: "620e4e3b7a6a2",
      url: "/edit-page/1",
      showData: ["620e4e3b7a6a2", "category name 1", "category-slug-1"],
    },
    {
      id: "620e4db16649a",
      url: "/edit-page/2",
      showData: ["620e4db16649a", "category name 2", "category-slug-2"],
    },
  ],
}
