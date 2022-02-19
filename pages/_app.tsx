import { ChakraProvider } from "@chakra-ui/react";
import theme from "../theme";
import { Auth0Provider } from "@auth0/auth0-react";
import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

function MyApp({
  Component,
  pageProps,
  router,
}: {
  Component: any;
  pageProps: any;
  router: any;
}) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN!}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID!}
      redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL}
    >
      <LoginHandle router={router} />
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Auth0Provider>
  );
}

const LoginHandle: React.VFC<{ router: any }> = ({ router }) => {
  const { isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    // ログイン判定処理
    if (router.pathname !== "/login") {
      if (!isLoading && !isAuthenticated) {
        router.replace('/login')
      }
    } else {
      if (!isLoading && isAuthenticated) {
        router.replace('/article')
      }
    }
  }, [router.pathname, isAuthenticated, isLoading]);
  return <></>;
};

export default MyApp;
