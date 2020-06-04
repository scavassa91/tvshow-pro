import App from "next/app";

const MyApp = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { query } = ctx;
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps, query };
};

export default MyApp;
