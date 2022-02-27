import { Image } from "@chakra-ui/react";

interface Props {
  src: string;
  alt: string;
  height: number | string;
}

const FitImage: React.VFC<Props> = ({ src, alt, height }) => {
  return (
    <Image
      src={src}
      alt={alt}
      objectFit="cover"
      h={height}
      w="100%"
    />
  );
};

export default FitImage;
