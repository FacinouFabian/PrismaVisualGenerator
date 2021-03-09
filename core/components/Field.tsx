import * as React from "react";

import { usePair } from "@/core/contexts/pairContext";
import Attributes from "./Attributes";

type Props = {
  callback: Function;
};

type Position = "left" | "right" | "top" | "bottom";

const Field: React.FunctionComponent<Props> = ({ callback }): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [type, setType] = React.useState<string>("");

  const [, dispatch] = usePair();

  const addAnchorsListener = () => {
    const anchorsNodes = document.getElementsByClassName("anchors");
    const anchorsElements = Array.from(anchorsNodes);

    anchorsElements.map((anchor) => {
      anchor.addEventListener("click", () => {
        const position = anchor.attributes.getNamedItem("data-position")
          ?.value as Position;

        // if we have the data
        if (position) {
          dispatch({
            type: "UPDATE_PAIR",
            payload: { elementRef: anchor.id, position },
          });
        }
      });
    });
  };

  React.useEffect(() => {
    if (name != "" && type != "") {
      callback({ name, type });
    }
  }, [name, type]);

  React.useEffect(() => {
    addAnchorsListener();
  }, [name]);

  return (
    <>
      <tr className="hover:bg-grey-lighter">
        {/* field */}
        <td className="py-4 px-6 border-b border-grey-light relative">
          {/* anchors button left */}
          <button
            id={`${name}-anchor-left`}
            type="button"
            className="flex absolute h-auto w-auto top-1/2 left-0 -mt-1 -ml-1 anchors"
            data-position="left"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="bg-white relative w-1/2 border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </td>
        <td className="py-4 px-6 border-b border-grey-light relative">
          <Attributes callback={(type: string) => setType(type)} />
          {/* anchors button right */}
          <button
            id={`${name}-anchor-right`}
            type="button"
            className="flex absolute h-auto w-auto top-1/2 right-0 -mt-1 -mr-1 anchors"
            data-position="right"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
        </td>
      </tr>
    </>
  );
};

export default Field;
