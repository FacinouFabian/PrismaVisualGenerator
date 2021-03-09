import * as React from "react";

const Input: React.FunctionComponent = (): JSX.Element => {
  const [value, setValue] = React.useState<string>();
  return (
    <input
      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value)
      }
      className="bg-white relative w-1/2 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
    />
  );
};

export default Input;
