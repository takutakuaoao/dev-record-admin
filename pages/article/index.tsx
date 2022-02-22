import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Link,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import { getApi } from "../../api/api";
import CommonLayout from "../../components/templates/commonLayout";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Article {
  id: string;
  type: number;
  category?: Category;
  title?: string;
  content?: string;
  slug?: string;
  main_img_url?: string;
  created_at?: string;
  updated_at?: string;
}

interface Props {
  articles: Article[];
}

const Index: React.VFC<Props> = ({ articles }) => {
  return (
    <CommonLayout>
      <Box mb={8}>
        <Heading color="#445273" borderBottom="2px" borderBottomColor="#445273">
          Articles
        </Heading>
      </Box>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th w="20%">ID</Th>
            <Th>Title</Th>
            <Th>Slug</Th>
            <Th>Category</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {articles.map((article) => {
            const editUrl = "/article/edit/" + article.id;
            return (
              <Tr key={article.id}>
                <Td w="20%">
                  <NextLink href={editUrl} passHref>
                    <Link>{article.id}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <NextLink href={editUrl} passHref>
                    <Link>{article.title}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <NextLink href={editUrl} passHref>
                    <Link>{article.slug}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <NextLink href={editUrl} passHref>
                    <Link>{article.category?.name}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <NextLink href={editUrl} passHref>
                    <Link>{article.type == 1 ? "公開" : "非公開"}</Link>
                  </NextLink>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </CommonLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { state } = await getApi(
    process.env.NEXT_PUBLIC_API_ARTICLE_INDEX!,
    true
  );

  return {
    props: { articles: state.data.list },
  };
};

export default Index;
