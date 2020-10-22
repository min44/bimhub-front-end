import React from "react";

interface Props {
  value?: string;
  placeholder?: string;
  onChangeValueHandler?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyPress?: (event: React.KeyboardEvent) => void;
  type?: string;
  error?: boolean;
  helpertext?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const inputStyle = {
  width: "100%",
  padding: "12px 20px",
  margin: "8px 0",
  fontSize: "15px",
};

const inputStyleError = {
  border: "solid red 1px",
  outline: "none"
};

export const TextField: React.FC<Props> = ({
  error,
  helpertext,
  value,
  placeholder,
  onChangeValueHandler,
  type = "text",
  onKeyPress,
  onFocus,
}) => {
  return (
    <React.Fragment>
      <input
        className={error ? "textfield error" : "textfield"}
        style={error ? { ...inputStyle, ...inputStyleError } : inputStyle}
        onChange={onChangeValueHandler}
        value={value}
        type={type}
        placeholder={error ? helpertext : placeholder}
        onKeyPress={onKeyPress}
        onFocus={onFocus}
      ></input>
    </React.Fragment>
  );
};
