import { GetStaticProps } from "next";
import { getApi } from "../../api/api";
import IndexTemplate from "../../components/templates/image/index/indexTemplate";
import { Image as ImageType, Images } from "../../types/image.type";

const Index: React.VFC<Images> = ({ images }) => {
  return <IndexTemplate images={images} />;
};

interface RawImage {
  id: string;
  name: string;
  width: number;
  height: number;
  url?: string;
  created_at: string;
  updated_at: string | null;
}

export const getStaticProps: GetStaticProps<Images> = async () => {
  const { state } = await getApi(
    process.env.NEXT_PUBLIC_API_IMAGE_INDEX!,
    true
  );

  const filteredOnlyHasUrlImages = state.data.list.filter(HasImageUrl);
  const images = filteredOnlyHasUrlImages.map(formatToImageFromRaw);

  return {
    props: { images: images },
  };
};

function HasImageUrl(image: RawImage): boolean {
  return image.url != null;
}

function formatToImageFromRaw(image: RawImage): ImageType {
  return {
    id: image.id,
    name: image.name,
    width: image.width,
    height: image.height,
    src: image.url!,
  };
}

export default Index;
