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
  IconButton,
  Image,
  Icon,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import "@fontsource/roboto";
import React, { ReactElement, useEffect, useState, VFC } from "react";
import { useDropzone } from "react-dropzone";
import { ImCancelCircle } from "react-icons/im";
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

const Store: React.VFC<Props> = ({ images }) => {
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

  const {
    state,
    handleChange,
    handleSelectChange,
    handleTextAreaChange,
    handleRawValueChange,
  } = useFormValue({ mainImgUrl: "" });
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

  const [isOpenMainImages, setMainImageOpenStatus] = useState(false);
  return (
    <CommonLayout>
      {canRender ? (
        <>
          <MainImageSelectingArea
            isOpen={isOpenMainImages}
            images={images}
            setMainImageStatus={setMainImageOpenStatus}
            handleChangeEvent={handleRawValueChange}
          />
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
            <Button
              bg="#445273"
              color="white"
              onClick={() => {
                setMainImageOpenStatus(true);
              }}
            >
              Main Image
            </Button>
          </Box>
          <Box mb={8}>
            <SelectedMainImage
              url={state.mainImgUrl}
              handleChangeEvent={handleRawValueChange}
            />
          </Box>
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

interface SelectedMainImageProps {
  url: string;
  handleChangeEvent: (
    fieldName: string,
    setValue: string | number | boolean
  ) => void;
}

const SelectedMainImage: React.VFC<SelectedMainImageProps> = ({
  url,
  handleChangeEvent,
}) => {
  if (url === "") {
    return <></>;
  }

  return (
    <Box pos="relative">
      <Icon
        as={ImCancelCircle}
        fontSize="3xl"
        color="red.700"
        onClick={() => handleChangeEvent("mainImgUrl", "")}
        pos="absolute"
        left={280}
        top={-2}
        zIndex={100}
      />
      <Image
        src={url}
        alt={url}
        w="300px"
        h="300px"
        objectFit="cover"
        pos="relative"
      />
    </Box>
  );
};

interface MainImageSelectingAreaProps {
  setMainImageStatus: any;
  isOpen: boolean;
  images: Image[];
  handleChangeEvent: (
    fieldName: string,
    setValue: string | number | boolean
  ) => void;
}

const MainImageSelectingArea: React.VFC<MainImageSelectingAreaProps> = ({
  setMainImageStatus,
  isOpen,
  images,
  handleChangeEvent,
}) => {
  if (!isOpen) {
    return <></>;
  }

  return (
    <Center
      bgColor="rgba(0,0,0,0.9)"
      pos="fixed"
      left={0}
      top={0}
      w="100vw"
      minH="100vh"
      zIndex={100}
    >
      <Center pos="relative">
        <Icon
          as={ImCancelCircle}
          fontSize="3xl"
          color="red.700"
          onClick={() => setMainImageStatus(false)}
          pos="absolute"
          right="24%"
          top={-2}
          zIndex={100}
        />
        <Flex
          flexWrap="wrap"
          justify="space-between"
          maxW="50%"
          overflowY="scroll"
          height="700px"
          pos="relative"
        >
          {images.map((image) => {
            if (image.url === null || image.url === undefined) {
              return <></>;
            }

            return (
              <Box
                w="32%"
                boxShadow="md"
                mb={4}
                key={image.id}
                onClick={() => {
                  handleChangeEvent("mainImgUrl", image.url!);
                  setMainImageStatus(false);
                }}
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  objectFit="cover"
                  h={300}
                  w="100%"
                />
              </Box>
            );
          })}
        </Flex>
      </Center>
    </Center>
  );
};

interface Image {
  id: string;
  name: string;
  width: number;
  height: number;
  url?: string;
  created_at: string;
}

interface Props {
  images: Image[];
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { state } = await getApi(
    process.env.NEXT_PUBLIC_API_IMAGE_INDEX!,
    true
  );

  return {
    props: { images: state.data.list },
  };
};

export default Store;
