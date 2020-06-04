import ErrorPage from "next/error";

const Error = ({ statusCode }) => <ErrorPage statusCode={statusCode} />;

Error.getInitialProps = async (context) => {
  return { statusCode: context.res.statusCode };
};

export default Error;
