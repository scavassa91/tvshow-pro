import Header from "../components/Header/Header";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />

      <style jsx>{`
        :global(html, body) {
          margin: 0;
          padding: 0;
        }
        :global(ul) {
          margin: 0;
          padding: 0;
          list-style-type: none;
        }
      `}</style>
    </>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const { query } = ctx;
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};

  return { pageProps, query };
};

export default MyApp;
