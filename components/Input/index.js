import { useState } from "react";

const Input = ({
  type = "text",
  name,
  placeholder = "",
  value,
  onChange,
  onBlur,
}) => {
  const [error, setError] = useState("");

  const handleBlur = () => {
    const isValid = onBlur && onBlur(value);
    isValid ? setError("") : setError(`Invalid ${name}`);
  };

  return (
    <div>
      <input
        className="mui-input"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
      />
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default Input;
