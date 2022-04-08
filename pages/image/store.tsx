import React, { useState } from "react";
import { postApi } from "../../api/api";
import AccessURL from "../../components/molecules/accessURL/accessURL";
import StoreTemplate from "../../components/templates/image/store/storeTemplate";

const Store: React.VFC = () => {
  const [imageUrl, setImageUrl] = useState("");

  const uploadImage = async (e: any) => {
    const form = new FormData();
    form.append("image", e.target.files[0]);
    const response = await postApi(
      process.env.NEXT_PUBLIC_API_IMAGE_STORE!,
      form,
      false
    );

    setImageUrl(response.state.data.url);
  };

  return (
    <>
      <StoreTemplate
        uploadImageHandle={uploadImage}
        uploadedImageUrl={imageUrl}
      >

      </StoreTemplate>
    </>
  );
};

const Uploaded: React.VFC<{url: string}> = ({url}) => {
  return <AccessURL url={url} />
}

const NotYetUpload: React.VFC = () => {
  return <></>;
}

// interface Props {
//   url: string;
// }

// const UploadedLinkRender: React.VFC<Props> = ({ url }) => {
//   if (url === "") {
//     return <></>;
//   }
//   return (
//     <Box>
//       <Text fontWeight="bold" fontSize="xl">
//         Access URL
//       </Text>
//       <NextLink href={url} passHref>
//         <Link isExternal target="_blank" color="blue.700">
//           {url}
//         </Link>
//       </NextLink>
//     </Box>
//   );
// };

export default Store;
