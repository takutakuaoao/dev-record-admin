import { Box, List, ListItem } from "@chakra-ui/react";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Sidebar: React.VFC = () => {
  const { logout } = useAuth0();

  return (
    <Box bg="#445273" w="100%" p="4" color="white">
      <List p="4" cursor="pointer">
        <ListItem>Article</ListItem>
        <List px="3" mb="4">
          <ListItem>Index</ListItem>
          <ListItem>New</ListItem>
        </List>
        <ListItem>Category</ListItem>
        <List px="3" mb="4">
          <ListItem>Index</ListItem>
          <ListItem>New</ListItem>
        </List>
        <ListItem onClick={() => logout({returnTo: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL_AFTER_LOGOUT!})}>Logout</ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
