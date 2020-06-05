import Router from "next/router";

const Index = () => null;

Index.getInitialProps = (context) => {
  const country = context.query.country || "us";

  // 'process.browser' shows if getInitialProps is running on the server os in the browser
  process.browser
    ? Router.replace("/[country]", `${country}`)
    : context.res.writeHead(302, { Location: `/${country}` });

  context.res.end();
};

export default Index;
