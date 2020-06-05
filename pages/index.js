import Router from "next/router";
import cookies from "nookies";

const Index = () => null;

Index.getInitialProps = (context) => {
  const { defaultCountry } = cookies.get(context);
  const country = context.query.country || defaultCountry || "us";

  // 'process.browser' shows if getInitialProps is running on the server os in the browser
  process.browser
    ? Router.replace("/[country]", `${country}`)
    : context.res.writeHead(302, { Location: `/${country}` });

  context.res.end();
};

export default Index;
