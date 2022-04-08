import { Box, Input, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";
import { ReactNode } from "react";
import AccessURL from "../../../molecules/accessURL/accessURL";
import H1 from "../../../molecules/heading/heading";
import CommonLayout from "../../commonLayout";

interface Props {
  children: ReactNode;
  uploadImageHandle: (e: any) => void;
  uploadedImageUrl: string;
}

const StoreTemplate: React.VFC<Props> = ({
  children,
  uploadImageHandle,
  uploadedImageUrl,
}) => {
  return (
    <CommonLayout>
      <Box mb="8">
        <H1 title="New Image" />
      </Box>
      <Box mb="8">
        <Input type="file" onChange={uploadImageHandle} />
      </Box>
      {/* <UploadedLinkRender url={uploadedImageUrl} /> */}
      {children}
      {}
    </CommonLayout>
  );
};

interface UploadedLinkRenderProps {
  url: string;
}

const UploadedLinkRender: React.VFC<UploadedLinkRenderProps> = ({ url }) => {
  if (url === "") {
    return <></>;
  }
  return (
    <AccessURL url={url} />
  );
};

export default StoreTemplate;
