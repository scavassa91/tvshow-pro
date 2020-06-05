import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import cookies from "nookies";

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
];

const Header = () => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState(router.query.country);

  const handleSelectChange = (e) => {
    setSelectedCountry(e.target.value);
    router.push("/[country]", `/${e.target.value}`);
  };

  useEffect(() => {
    cookies.set(null, "defaultCountry", selectedCountry, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });
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

      <style jsx>{`
        .header {
          padding: 20px;
          background-color: #333;
          color: #fff;
          text-align: center;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Header;
