import React, { Dispatch, FC, SetStateAction } from "react";

interface InputProps {
  input: string;
  inputType?: string;
  label?: string;
  setInput: Dispatch<SetStateAction<string>>;
  multiline?: boolean;
}

const Input: FC<InputProps> = ({
  input,
  setInput,
  inputType,
  label,
  multiline,
}) => {
  const calculateRows = () => {
    const lineCount = input.split("\n").length;
    return Math.max(4, lineCount); // Set a minimum of 4 rows
  };

  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      {!multiline ? (
        <input
          className="shadow border rounded w-full py-3 px-2 text-gray-800 leading-tight focus:outline-none"
          type={inputType || "text"}
          id={label}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
        />
      ) : (
        <textarea
          className="shadow border rounded w-full py-3 px-2 text-gray-800 leading-tight focus:outline-none"
          id={label}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          required
          rows={calculateRows()}
        />
      )}
    </div>
  );
};

export default Input;
