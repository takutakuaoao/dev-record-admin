import {
  Box,
  Flex,
  Heading,
  Image,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import NextLink from "next/link";
import { getApi } from "../../api/api";
import CommonLayout from "../../components/templates/commonLayout";

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

const Index: React.VFC<Props> = ({ images }) => {
  return (
    <CommonLayout>
      <Box mb={8}>
        <Heading color="#445273" borderBottom="2px" borderBottomColor="#445273">
          Images
        </Heading>
      </Box>
      <Flex flexWrap="wrap" justify="space-between">
        {images.map((image) => {
          if (image.url === null || image.url === undefined) {
            return <></>;
          }

          return (
            <Box w="32%" boxShadow="md" mb={8} key={image.id}>
              <NextLink href={image.url} passHref>
                <Link target="_blank">
                  <Image
                    src={image.url}
                    alt={image.name}
                    objectFit="cover"
                    h={300}
                    w="100%"
                  />
                  <Box p={4}>
                    <Box mb={4} fontSize="xl">
                      {image.name}
                    </Box>
                    <Box>
                      {"(w) " + image.width + " × " + "(h) " + image.height}
                    </Box>
                  </Box>
                </Link>
              </NextLink>
            </Box>
          );
        })}
      </Flex>
    </CommonLayout>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const { state } = await getApi(
    process.env.NEXT_PUBLIC_API_IMAGE_INDEX!,
    true
  );

  return {
    props: { images: state.data.list },
  };
};

export default Index;
