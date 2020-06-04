import ErrorPage from "next/error";

const Error = ({ statusCode }) => <ErrorPage statusCode={statusCode} />;

Error.getInitialProps = async (context) => {
  const resp = await fetch("http://localhost:3000/api/hello", {
    method: "GET",
  });
  console.log(context.res.statusCode);
  return { statusCode: context.res.statusCode };
};

export default Error;
