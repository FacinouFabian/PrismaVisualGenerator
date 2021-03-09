import * as React from "react";

import Attributes from "./Attributes";

type Props = {
  callback: Function;
};

const Field: React.FunctionComponent<Props> = ({ callback }): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");

  React.useEffect(() => {
    if (name != "" && type != "") {
      callback({ name, type });
    }
  }, [name, type]);

  return (
    <tr className="hover:bg-grey-lighter">
      <td className="py-4 px-6 border-b border-grey-light">
        <input
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="bg-white relative w-1/2 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </td>
      <td className="py-4 px-6 border-b border-grey-light">
        <Attributes callback={(type: string) => setType(type)} />
      </td>
    </tr>
  );
};

export default Field;
