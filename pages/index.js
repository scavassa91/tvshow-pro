import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/[country]", "/us");
  }, []);

  return null;
};

export default Index;
