import {
  Box,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { getApi } from "../../api/api";
import CommonLayout from "../../components/templates/commonLayout";
import process from "node:process";
import React from "react";
import { GetStaticProps } from "next";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  categories: Category[];
}

const Index: React.VFC<Props> = ({ categories }) => {
  return (
    <CommonLayout>
      <Box mb={8}>
        <Heading color="#445273" borderBottom="2px" borderBottomColor="#445273">
          Categories
        </Heading>
      </Box>
      <Table variant="striped" colorScheme="gray">
        <Thead>
          <Tr>
            <Th w="20%">ID</Th>
            <Th>Name</Th>
            <Th>Slug</Th>
          </Tr>
        </Thead>
        <Tbody>
          {categories.map((category) => {
            const editUrl = "/category/edit/" + category.id;
            return (
              <Tr key={category.id}>
                <Td w="20%">
                  <NextLink href={editUrl} passHref>
                    <Link>{category.id}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <NextLink href={editUrl} passHref>
                    <Link>{category.name}</Link>
                  </NextLink>
                </Td>
                <Td>
                  <NextLink href={editUrl} passHref>
                    <Link>{category.slug}</Link>
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
    process.env.NEXT_PUBLIC_API_CATEGORY_INDEX!,
    true
  );

  return {
    props: { categories: state.data.items },
  };
};

export default Index;
