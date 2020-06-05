import Header from "../components/Header/Header";

const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <Header />
      <Component {...pageProps} />

      <style jsx>{`
        @font-face {
          font-family: "raleway";
          src: url("/fonts/raleway/Raleway-Regular.ttf") format("truetype");
        }
        :global(html, body) {
          font-family: "raleway";
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
