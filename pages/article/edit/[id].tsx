import { ParsedUrlQuery } from "querystring";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Center,
  Flex,
  Input,
  Spacer,
} from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { getApi } from "../../../api/api";
import SelectItem from "../../../components/atoms/selectItem";
import TextArea from "../../../components/atoms/textArea/textArea";
import H1 from "../../../components/molecules/heading/heading";
import SelectBox from "../../../components/molecules/selectBox/selectBox";
import CommonLayout from "../../../components/templates/commonLayout";
import {
  ArticleState,
  useArticleFormValue,
} from "../../../hooks/useArticleFormValue";
import { useFetchCategories } from "../../../hooks/useFetchCategories";
import { usePutSubmit } from "../../../hooks/useSubmit";

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
  const categories = useFetchCategories();
  const { state, handleChange, handleSelectChange, handleTextAreaChange } =
    useArticleFormValue(article);
  const publicSubmit = useEditPublicSubmit(state);
  const draftSubmit = useEditDraftSubmit(state);

  return (
    <>
      <CommonLayout>
        <ContentReady isActive={isReadyCategories(categories)}>
          <>
            <HeadingArea />
            <ToggleArea
              isRender={isCompleteUpdate(
                draftSubmit.isComplete,
                publicSubmit.isComplete
              )}
            >
              <Box mb="6">
                <SuccessMessage />
              </Box>
            </ToggleArea>
            <EditForm
              title={state.title}
              slug={state.slug}
              categories={categories}
              categoryId={state.categoryId}
              content={state.content}
              draftSubmit={draftSubmit.submit}
              publicSubmit={publicSubmit.submit}
              handleInputChange={handleChange}
              handleSelectChange={handleSelectChange}
              handleTextAreaChange={handleTextAreaChange}
            />
          </>
        </ContentReady>
      </CommonLayout>
    </>
  );
};

/**
 * レンダー可能の場合に子要素を表示するエリア
 */
const ToggleArea: React.VFC<{ isRender: boolean; children: ReactNode }> = (
  props
) => {
  if (!props.isRender) {
    return <></>;
  }

  return <>{props.children}</>;
};

/**
 * コンテンツ表示の準備が整うまでロード中の表記
 * isActiveがtrueの場合：子要素を表示
 * isActiveがfalseの場合：コンテンツ準備中の表記
 */
const ContentReady: React.VFC<{
  isActive: boolean;
  children: ReactNode;
}> = (props) => {
  if (!props.isActive) {
    return <Loader />;
  }

  return <>{props.children}</>;
};

/**
 * ロード表記
 */
const Loader: React.VFC = () => {
  return (
    <Center w="100%" h="100vh">
      ready ...
    </Center>
  );
};

/**
 * 編集入力フォームの型
 */
type EditFormProps = {
  title?: string;
  slug?: string;
  categories: Category[];
  categoryId?: string;
  content?: string;
  draftSubmit: any;
  publicSubmit: any;
  handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

/**
 * 編集入力フォーム
 */
const EditForm: React.VFC<EditFormProps> = (props) => {
  return (
    <>
      <TitleArea
        handleChange={props.handleInputChange}
        currentValue={props.title}
      />
      <SlugArea
        handleChange={props.handleInputChange}
        currentValue={props.slug}
      />
      <ActionArea
        categories={props.categories}
        handleChange={props.handleSelectChange}
        currentValue={props.categoryId}
      />
      <Box mb={8}>
        <TextArea
          name="content"
          handleChange={props.handleTextAreaChange}
          currentValue={props.content}
        />
      </Box>
      <HandleArea
        draftSubmit={props.draftSubmit}
        publicSubmit={props.publicSubmit}
      />
    </>
  );
};

/**
 * 更新成功時のメッセージ
 */
const SuccessMessage: React.VFC = () => {
  return (
    <Alert status="success">
      <AlertIcon />
      更新しました。
    </Alert>
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
  currentValue?: string | number;
};

const TitleArea: React.VFC<ChangeHandleProps> = ({
  handleChange,
  currentValue,
}) => {
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

const SlugArea: React.VFC<ChangeHandleProps> = ({
  handleChange,
  currentValue,
}) => {
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
  categories: Category[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  currentValue?: string | number;
}

const ActionArea: React.VFC<ActionAreaProps> = ({
  categories,
  handleChange,
  currentValue,
}) => {
  return (
    <Flex mb="6">
      <Box w="30%">
        <CategorySelectBox
          categories={categories}
          handleChange={handleChange}
          currentValue={currentValue}
        />
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

/**
 * CategorySelectBoxのPropsの型
 */
interface CategorySelectBoxProps {
  categories: Category[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  currentValue?: string | number;
}

/**
 * カテゴリ選択のセレクトボックス
 */
const CategorySelectBox: React.VFC<CategorySelectBoxProps> = (props) => {
  return (
    <SelectBox
      name="categoryId"
      handleChange={props.handleChange}
      currentValue={props.currentValue}
    >
      {props.categories.map((category, i) => {
        return <SelectItem name={category.name} value={category.id} key={i} />;
      })}
    </SelectBox>
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

/**
 * 更新完了を判定
 */
function isCompleteUpdate(
  isDraftComplete: boolean,
  isPublicComplete: boolean
): boolean {
  return isDraftComplete || isPublicComplete;
}

/**
 * カテゴリの取得が完了したかを判定
 */
function isReadyCategories(categories: Category[]): boolean {
  return Object.keys(categories).length != 0;
}

/**
 * 公開状態で更新用のSubmitのハンドラー
 */
const useEditPublicSubmit = (state: ArticleState) => {
  return usePutSubmit(
    process.env.NEXT_PUBLIC_API_URL!,
    process.env.NEXT_PUBLIC_API_ARTICLE_UPDATE!,
    { ...state, type: 1 }
  );
};

/**
 * 下書き状態で更新用のSubmitのハンドラー
 */
const useEditDraftSubmit = (state: ArticleState) => {
  return usePutSubmit(
    process.env.NEXT_PUBLIC_API_URL!,
    process.env.NEXT_PUBLIC_API_ARTICLE_UPDATE!,
    { ...state, type: 2 }
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
