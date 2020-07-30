import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import cookies from "nookies";

import Input from "../components/Input";

import { validateEmail, validateRequired } from "../utils/validators";

const initialState = {
  name: "",
  email: "",
  password: "",
};

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState(initialState);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSigninSubmit = async (e) => {
    e.preventDefault();

    const { email, password, name } = signupInfo;

    if (!email || !password || !name) {
      return;
    }

    try {
      const response = await axios.post(
        "https://iwallet-api.herokuapp.com/api/auth/signup",
        signupInfo
      );

      cookies.set(null, "token", response.data.token, { path: "/" });
      router.replace("/[country]", "/us");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value,
    });
  };

  return (
    <div className="signin">
      <form onSubmit={handleSigninSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={signupInfo.name}
          onChange={handleInputChange}
          onBlur={validateRequired}
        />
        <Input
          type="email"
          name="email"
          placeholder="Enter your e-mail"
          value={signupInfo.email}
          onChange={handleInputChange}
          onBlur={validateEmail}
        />
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={signupInfo.password}
          onChange={handleInputChange}
          onBlur={validateRequired}
        />

        {error && <div className="error">{error}</div>}
        <Link href="/signin">
          <a>Already have an account?</a>
        </Link>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Signup;
