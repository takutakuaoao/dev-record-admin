import { Box, Link, Text } from "@chakra-ui/react";
import NextLink from "next/link";

interface Props {
  url: string;
}

const AccessURL: React.VFC<Props> = ({ url }) => {
  return (
    <Box>
      <Text fontWeight="bold" fontSize="xl">
        Access URL
      </Text>
      <NextLink href={url} passHref>
        <Link isExternal target="_blank" color="blue.700">
          {url}
        </Link>
      </NextLink>
    </Box>
  );
};

export default AccessURL;
