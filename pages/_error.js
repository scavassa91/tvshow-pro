import Error from "next/error";

const CustomError = ({ statusCode }) => <ErrorPage statusCode={statusCode} />;

CustomError.getInitialProps = async ({ err, res }) => {
  return {
    statusCode: res ? res.statusCode : err ? err.statusCode : 404,
  };
};

export default Error;
