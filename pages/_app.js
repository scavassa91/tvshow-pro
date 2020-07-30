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
        :global(*) {
          box-sizing: border-box;
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
        :global(form) {
          display: flex;
          width: 100%;
          padding: 0 10px;
          flex-direction: column;
          text-align: center;
        }
        :global(input) {
          margin-bottom: 10px;
          padding: 10px;
          width: 100%;
          box-sizing: border-box;
        }
        :global(button) {
          padding: 10px;
          margin-bottom: 10px;
          cursor: pointer;
          background-color: blue;
          color: #fff;
        }
        :global(.error) {
          color: red;
          padding-bottom: 10px;
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
