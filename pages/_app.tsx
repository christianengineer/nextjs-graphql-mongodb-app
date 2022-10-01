import { AppProps } from "next/app";
import { ApolloProvider, NormalizedCacheObject } from "@apollo/client";
import { useApollo } from "../apollo/client";

export default function App({
  Component,
  pageProps,
}: AppProps<NormalizedCacheObject>) {
  const { initialApolloState } = pageProps;
  const apolloClient = useApollo(initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
