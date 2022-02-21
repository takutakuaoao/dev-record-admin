import { useAuth0 } from "@auth0/auth0-react";
import { Box, Link, List, ListItem } from "@chakra-ui/react";
import NextLink from "next/link";
import React from "react";

const Sidebar: React.VFC = () => {
  const { logout } = useAuth0();

  return (
    <Box bg="#445273" w="100%" p="4" color="white">
      <List p="4" cursor="pointer">
        <ListItem>Article</ListItem>
        <List px="3" mb="4">
          <NextLink href="/article" passHref>
            <Link>
              <ListItem>Index</ListItem>
            </Link>
          </NextLink>
          <NextLink href="/article/store" passHref>
            <Link>
              <ListItem>New</ListItem>
            </Link>
          </NextLink>
        </List>
        <ListItem>Category</ListItem>
        <List px="3" mb="4">
          <NextLink href="/category" passHref>
            <Link>
              <ListItem>Index</ListItem>
            </Link>
          </NextLink>
          <NextLink href="/category/store" passHref>
            <Link>
              <ListItem>New</ListItem>
            </Link>
          </NextLink>
        </List>
        <ListItem>Image</ListItem>
        <List px="3" mb="4">
          <NextLink href="/image/store" passHref>
            <Link>
              <ListItem>New</ListItem>
            </Link>
          </NextLink>
        </List>
        <ListItem
          onClick={() =>
            logout({
              returnTo:
                process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL_AFTER_LOGOUT!,
            })
          }
        >
          Logout
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
