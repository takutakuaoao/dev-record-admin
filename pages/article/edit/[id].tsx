import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ParsedUrlQuery } from "querystring";
import { ReactElement, useEffect, useState } from "react";
import { getApi } from "../../../api/api";
import SelectItem from "../../../components/atoms/selectItem";
import TextArea from "../../../components/atoms/textArea";
import H1 from "../../../components/molecules/heading";
import SelectBox from "../../../components/molecules/selectBox";
import CommonLayout from "../../../components/templates/commonLayout";
import { useFormValue } from "../../../hooks/useFormValue";
import { usePostSubmit, usePutSubmit } from "../../../hooks/useSubmit";

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
  article: Article;
}

interface Params extends ParsedUrlQuery {
  id: string;
}

const Edit: React.VFC<Props> = ({ article }) => {
  const [posts, setPosts] = useState<Category[]>([]);
  useEffect(() => {
    getApi(process.env.NEXT_PUBLIC_API_CATEGORY_INDEX!, false).then(
      ({ state }) => {
        setPosts(state.data.items);
      }
    );
  }, []);

  const canRender = Object.keys(posts).length != 0;

  const readyContent = (
    <>
      <Center w="100%" h="100vh">
        ready ...
      </Center>
    </>
  );

  const categories: ReactElement<typeof SelectItem>[] = posts.map(
    (post: Category, i): ReactElement<typeof SelectItem> => {
      return <SelectItem name={post.name} value={post.id} key={i} />;
    }
  );

  const { state, handleChange, handleSelectChange, handleTextAreaChange } =
    useFormValue({
        id: article.id,
        title: article.title,
        content: article.content,
        slug: article.slug,
        categoryId: article.category?.id,
        mainImgUrl: article.main_img_url,
    });
  const publicSubmit = usePutSubmit(
    process.env.NEXT_PUBLIC_API_URL!,
    process.env.NEXT_PUBLIC_API_ARTICLE_UPDATE!,
    { ...state, type: 1 }
  );
  const draftSubmit = usePutSubmit(
    process.env.NEXT_PUBLIC_API_URL!,
    process.env.NEXT_PUBLIC_API_ARTICLE_UPDATE!,
    { ...state, type: 2 }
  );

  return (
    <>
      <CommonLayout>
        {canRender ? (
          <>
            <HeadingArea />
            {draftSubmit.isComplete || publicSubmit.isComplete ? (
              <Box mb="6">
                <Alert status="success">
                  <AlertIcon />
                  更新しました。
                </Alert>
              </Box>
            ) : (
              <></>
            )}
            <TitleArea handleChange={handleChange} currentValue={state.title} />
            <SlugArea handleChange={handleChange} currentValue={state.slug} />
            <ActionArea
              selectList={categories}
              handleChange={handleSelectChange}
              currentValue={state.categoryId}
            />
            <Box mb={8}>
              <TextArea name="content" handleChange={handleTextAreaChange} currentValue={state.content} />
            </Box>
            <HandleArea
              draftSubmit={draftSubmit.submit}
              publicSubmit={publicSubmit.submit}
            />
          </>
        ) : (
          readyContent
        )}
      </CommonLayout>
    </>
  );
};

const HeadingArea: React.VFC = () => {
  return (
    <Box mb="8">
      <H1 title="Edit Article" />
    </Box>
  );
};

type ChangeHandleProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  currentValue?: string|number,
};

const TitleArea: React.VFC<ChangeHandleProps> = ({ handleChange, currentValue }) => {
  return (
    <Box mb="6">
      <Input
        placeholder="Title"
        focusBorderColor="#445273"
        name="title"
        onChange={handleChange}
        value={currentValue}
      />
    </Box>
  );
};

const SlugArea: React.VFC<ChangeHandleProps> = ({ handleChange, currentValue }) => {
  return (
    <Box mb="6">
      <Input
        placeholder="Slug"
        focusBorderColor="#445273"
        name="slug"
        onChange={handleChange}
        value={currentValue}
      />
    </Box>
  );
};

interface ActionAreaProps {
  selectList: ReactElement<typeof SelectItem>[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  currentValue?: string|number;
}

const ActionArea: React.VFC<ActionAreaProps> = ({
  selectList,
  handleChange,
  currentValue,
}) => {
  return (
    <Flex mb="6">
      <Box w="30%">
        <SelectBox name="categoryId" handleChange={handleChange} currentValue={currentValue}>
          {selectList}
        </SelectBox>
      </Box>
      <Spacer />
      <Link href="/article/preview">
        <a target="_blank">
          <Button bg="#445273" color="white">
            Preview
          </Button>
        </a>
      </Link>
    </Flex>
  );
};

interface SubmitProps {
  draftSubmit: any;
  publicSubmit: any;
}

const HandleArea: React.VFC<SubmitProps> = ({ draftSubmit, publicSubmit }) => {
  return (
    <Flex mb="6" justify="flex-end">
      <Button colorScheme="gray" mr="4" onClick={draftSubmit}>
        Draft
      </Button>
      <Button bg="#445273" color="white" onClick={publicSubmit}>
        Publish
      </Button>
    </Flex>
  );
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const apiUri = process.env.NEXT_PUBLIC_API_ARTICLE_INDEX + "/" + params!.id;
  const { state } = await getApi(apiUri, true);

  return {
    props: { article: state.data.item },
  };
};

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const { state } = await getApi(
    process.env.NEXT_PUBLIC_API_ARTICLE_INDEX!,
    true
  );

  const allParams: { params: Params }[] = state.data.list.map(
    (article: Article): { params: Params } => {
      return {
        params: {
          id: article.id,
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
