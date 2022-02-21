import { Box, Input, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { useState } from "react";
import { postApi } from "../../api/api";
import H1 from "../../components/molecules/heading";
import CommonLayout from "../../components/templates/commonLayout";

const Store: React.VFC = () => {
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async (e: any) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    const response = await postApi("/api/image", form, false);

    setImageUrl(response.state.data.url);
  };

  return (
    <>
      <CommonLayout>
        <Box mb="8">
          <H1 title="New Image" />
        </Box>
        <Box mb="8">
          <Input type="file" onChange={uploadImage} />
        </Box>
        <UploadedLinkRender url={imageUrl} />
      </CommonLayout>
    </>
  );
};

interface Props {
  url: string;
}

const UploadedLinkRender: React.VFC<Props> = ({ url }) => {
  if (url === "") {
    return <></>;
  }
  return (
    <NextLink href={url} passHref>
      <Link isExternal target="_blank">
        {url}
      </Link>
    </NextLink>
  );
};

export default Store;