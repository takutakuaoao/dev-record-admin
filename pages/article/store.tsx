import {
  Button,
  Center,
  Flex,
  Heading,
  Input,
  Box,
  Select,
  Spacer,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import Link from "next/link";
import "@fontsource/roboto";
import React, { ReactElement, useEffect, useState, VFC } from "react";
import { useDropzone } from "react-dropzone";

import { getApi } from "../../api/api";
import SelectItem from "../../components/atoms/selectItem";
import TextArea from "../../components/atoms/textArea";
import H1 from "../../components/molecules/heading";
import SelectBox from "../../components/molecules/selectBox";
import CommonLayout from "../../components/templates/commonLayout";
import { useFormValue } from "../../hooks/useFormValue";
import { usePostSubmit } from "../../hooks/useSubmit";

interface Category {
  id: string;
  name: string;
  slug: string;
}

const Index: React.VFC = () => {
  const [files, setFiles] = useState<{ preview: string }[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

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
    useFormValue({ mainImgUrl: "" });
  const publicSubmit = usePostSubmit(
    process.env.NEXT_PUBLIC_API_URL!,
    process.env.NEXT_PUBLIC_API_ARTICLE_STORE!,
    { ...state, type: 1 }
  );
  const draftSubmit = usePostSubmit(
    process.env.NEXT_PUBLIC_API_URL!,
    process.env.NEXT_PUBLIC_API_ARTICLE_STORE!,
    { ...state, type: 2 }
  );

  console.log(publicSubmit.errorMessages);
  console.log(draftSubmit.errorMessages);

  return (
    <CommonLayout>
      {canRender ? (
        <>
          <HeadingArea />
          {draftSubmit.isComplete || publicSubmit.isComplete ? (
            <Box mb="6">
              <Alert status="success">
                <AlertIcon />
                登録しました。
              </Alert>
            </Box>
          ) : (
            <></>
          )}
          <TitleArea handleChange={handleChange} />
          <SlugArea handleChange={handleChange} />
          <ActionArea
            selectList={categories}
            handleChange={handleSelectChange}
          />
          <Box mb={8}>
            <TextArea name="content" handleChange={handleTextAreaChange} />
          </Box>
          <Box mb="6">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <Center
                rounded="md"
                border="2px"
                borderStyle="dashed"
                borderColor="gray.300"
                bg="gray.50"
                h="200px"
              >
                <Text color="gray.600">Upload Mark down text.</Text>
              </Center>
            </div>
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
  );
};

const HeadingArea: React.VFC = () => {
  return (
    <Box mb="8">
      <H1 title="New Article" />
    </Box>
  );
};

type ChangeHandleProps = {
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const TitleArea: React.VFC<ChangeHandleProps> = ({ handleChange }) => {
  return (
    <Box mb="6">
      <Input
        placeholder="Title"
        focusBorderColor="#445273"
        name="title"
        onChange={handleChange}
      />
    </Box>
  );
};

const SlugArea: React.VFC<ChangeHandleProps> = ({ handleChange }) => {
  return (
    <Box mb="6">
      <Input
        placeholder="Slug"
        focusBorderColor="#445273"
        name="slug"
        onChange={handleChange}
      />
    </Box>
  );
};

interface ActionAreaProps {
  selectList: ReactElement<typeof SelectItem>[];
  handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ActionArea: React.VFC<ActionAreaProps> = ({
  selectList,
  handleChange,
}) => {
  return (
    <Flex mb="6">
      <Box w="30%">
        <SelectBox name="categoryId" handleChange={handleChange}>
          {selectList}
        </SelectBox>
      </Box>
      {/* <Spacer />
      <Link href="/article/preview">
        <a target="_blank">
          <Button bg="#445273" color="white">
            Preview
          </Button>
        </a>
      </Link> */}
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

export default Index;
