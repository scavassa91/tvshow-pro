const Index = () => <div>HOME!!!!!!!!!</div>;

Index.getInitialProps = async (context) => {
  const resp = await fetch("http://localhost:3000/api/hello", {
    method: "GET",
  });
  console.log(resp.status);
  return { statusCode: resp.status };
};

export default Index;
