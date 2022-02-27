import { Box, Flex } from "@chakra-ui/react";
import { Images } from "../../../../types/image.type";
import H1 from "../../../molecules/heading/heading";
import ImageCard from "../../../molecules/imageCard/imageCard";
import CommonLayout from "../../commonLayout";

const IndexTemplate: React.VFC<Images> = ({ images }) => {
  return (
    <CommonLayout>
      <Box mb={8}>
        <H1 title="Images" />
      </Box>
      <Flex flexWrap="wrap" justify="space-between">
        {images.map((image) => {
          return (
            <Box w="32%" boxShadow="md" mb={8} key={image.id}>
              <ImageCard
                url={image.src}
                imageName={image.name}
                imageSize={{ w: image.width, h: image.height }}
              />
            </Box>
          );
        })}
      </Flex>
    </CommonLayout>
  );
};

export default IndexTemplate;
