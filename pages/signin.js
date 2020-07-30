import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import cookies from "nookies";

import Input from "../components/Input";

import { validateEmail, validateRequired } from "../utils/validators";

const initialState = {
  email: "",
  password: "",
};

const Signin = () => {
  const [signinInfo, setSigninInfo] = useState(initialState);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSigninSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = signinInfo;

    if (!email || !password) {
      return;
    }

    try {
      const response = await axios.post(
        "https://iwallet-api.herokuapp.com/api/auth/signin",
        signinInfo
      );

      cookies.set(null, "token", response.data.token, { path: "/" });

      const { plannedRoute } = cookies.get();

      const parsedPlannedRoute = plannedRoute && JSON.parse(plannedRoute);

      const plannedHrefRoute = parsedPlannedRoute
        ? parsedPlannedRoute.href
        : "/[country]";
      const plannedAsRoute = parsedPlannedRoute ? parsedPlannedRoute.as : "/us";

      router.replace(plannedHrefRoute, plannedAsRoute);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSigninInfo({
      ...signinInfo,
      [name]: value,
    });
  };

  return (
    <div className="signin">
      <form onSubmit={handleSigninSubmit}>
        <Input
          type="email"
          name="email"
          placeholder="Enter your e-mail"
          value={signinInfo.email}
          onChange={handleInputChange}
          onBlur={validateEmail}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={signinInfo.password}
          onChange={handleInputChange}
          onBlur={validateRequired}
        />

        {error && <div className="error">{error}</div>}
        <Link href="/signup">
          <a>Create an account</a>
        </Link>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signin;
