import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cookies from "nookies";
import { isAuthenticated } from "../../utils/withAuthorization";

const countries = [
  {
    label: "us",
    name: "United States",
  },
  {
    label: "br",
    name: "Brazil",
  },
  {
    label: "ca",
    name: "Canada",
  },
  {
    label: "de",
    name: "Germany",
  },
];

const Header = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(router.query.country);

  const handleSelectChange = (e) => {
    setSelectedCountry(e.target.value);
    router.push("/[country]", `/${e.target.value}`);
  };

  const handleSignout = () => {
    cookies.destroy(null, "token");
  };

  useEffect(() => {
    if (selectedCountry) {
      cookies.set(null, "defaultCountry", selectedCountry, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
      });
    }
  }, [selectedCountry]);

  const renderCountries = () => {
    return countries.map((country) => {
      return (
        <option key={country.label} value={country.label}>
          {country.name}
        </option>
      );
    });
  };

  return (
    <div className="header">
      <select value={selectedCountry} onChange={handleSelectChange}>
        {renderCountries()}
      </select>

      {isAuthenticated() && (
        <Link href="/[country]" as={`/${selectedCountry}`}>
          <a onClick={handleSignout}>sign out</a>
        </Link>
      )}

      <style jsx>{`
        .header {
          padding: 20px;
          background-color: #333;
          color: #fff;
          text-align: center;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        }

        .header > :global(a) {
          color: #fff;
        }
      `}</style>
    </div>
  );
};

export default Header;
