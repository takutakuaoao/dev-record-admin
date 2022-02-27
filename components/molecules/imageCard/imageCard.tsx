import { Box, Image, Link } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  url: string;
  imageName: string;
  imageSize: {
    w: number;
    h: number;
  };
}

const ImageCard: React.VFC<Props> = ({ url, imageName, imageSize }) => {
  return (
    <NextLink href={url} passHref>
      <Link target="_blank">
        <Image src={url} alt={imageName} objectFit="cover" h={300} w="100%" />
        <Box p={4}>
          <Box mb={4} fontSize="xl">
            {imageName}
          </Box>
          <Box>{"(W) " + imageSize.w + " × " + "(H) " + imageSize.h}</Box>
        </Box>
      </Link>
    </NextLink>
  );
};

export default ImageCard;
