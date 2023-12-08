import React, { Dispatch, FC, SetStateAction } from "react";

interface InputProps {
  input: string;
  inputType?: string;
  label?: string;
  setInput: Dispatch<SetStateAction<string>>;
}

const Input: FC<InputProps> = ({ input, setInput, inputType, label }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        className="shadow border rounded w-full py-3 px-2 text-gray-800 leading-tight focus:outline-none"
        type={inputType || "text"}
        id={label}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        required
      />
    </div>
  );
};

export default Input;
