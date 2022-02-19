import { Auth0Provider, useAuth0 } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import { useEffect } from "react";
import theme from "../theme";

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
  }, [router, isAuthenticated, isLoading]);
  return <></>;
};

export default MyApp;
