import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Input,
} from "@chakra-ui/react";
import { NextParsedUrlQuery } from "next/dist/server/request-meta";
import React from "react";
import { getApi } from "../../../api/api";
import CommonLayout from "../../../components/templates/commonLayout";
import { useFormValue } from "../../../hooks/useFormValue";
import { usePutSubmit } from "../../../hooks/useSubmit";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Props {
  category: Category;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const Edit: React.VFC<Props> = ({ category }) => {
  const { state, handleChange } = useFormValue({
    id: category.id,
    name: category.name,
    slug: category.slug,
  });
  const { submit, isComplete, isError } = usePutSubmit(
    process.env.NEXT_PUBLIC_API_URL!,
    process.env.NEXT_PUBLIC_API_CATEGORY_EDIT!,
    state
  );

  return (
    <CommonLayout>
      <Box mb="8">
        <Heading color="#445273" borderBottom="2px" borderBottomColor="#445273">
          Edit Category
        </Heading>
      </Box>
      {isComplete ? (
        <Box mb="6">
          <Alert status="success">
            <AlertIcon />
            更新しました。
          </Alert>
        </Box>
      ) : (
        <></>
      )}
      <Box mb="6">
        <Input
          placeholder="Category Name ..."
          focusBorderColor="#445273"
          onChange={handleChange}
          name="name"
          value={state.name}
        />
      </Box>
      <Box mb="6">
        <Input
          placeholder="Category Slug ..."
          focusBorderColor="#445273"
          onChange={handleChange}
          name="slug"
          value={state.slug}
        />
      </Box>
      <Flex mb="6" justify="flex-end">
        <Button bg="#445273" color="white" onClick={submit}>
          Update
        </Button>
      </Flex>
    </CommonLayout>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const apiUri = process.env.NEXT_PUBLIC_API_CATEGORY_INDEX + "/" + params!.id;
  const { state } = await getApi(apiUri, true);

  return {
    props: { category: state.data.item },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { state } = await getApi(
    process.env.NEXT_PUBLIC_API_CATEGORY_INDEX!,
    true
  );

  const allParams: { params: Params }[] = state.data.items.map(
    (category: Category): { params: Params } => {
      return {
        params: {
          id: category.id,
        },
      };
    }
  );

  return {
    paths: allParams,
    fallback: false,
  };
};

export default Edit;
