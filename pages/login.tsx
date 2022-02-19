import { useAuth0 } from "@auth0/auth0-react";
import { Button, Center } from "@chakra-ui/react";

const Login: React.VFC = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <>
      <Center w="100vw" h="100vh">
          {isAuthenticated ? null : <Button onClick={() => loginWithRedirect()}>Login</Button>}
      </Center>
    </>
  );
};

export default Login;
