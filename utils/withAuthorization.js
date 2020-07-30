import { Component } from "react";
import Router from "next/router";
import cookies from "nookies";

const authenticate = (context) => {
  const { token } = cookies.get(context);

  cookies.set(
    context,
    "plannedRoute",
    JSON.stringify({ as: context.asPath, href: context.pathname }),
    { path: "/" }
  );

  if (context.req && !token) {
    context.res.writeHead("302", { Location: "/signin" });
    context.res.end();
    return;
  }

  if (!token) {
    Router.push("/signin");
  }

  return token;
};

const isAuthenticated = (context) => {
  const { token } = cookies.get(context);

  return token;
};

const withAuthorization = (WrappedComponent) => {
  return class extends Component {
    static async getInitialProps(context) {
      const token = authenticate(context);

      const componentProps =
        WrappedComponent.getInitialProps &&
        (await WrappedComponent.getInitialProps(context));

      return { ...componentProps, token };
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

export { withAuthorization, isAuthenticated };
