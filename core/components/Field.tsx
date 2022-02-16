import * as React from "react";
import { ArcherElement } from "react-archer";

import { usePair } from "@/core/contexts/pairContext";
import Attributes from "./Attributes";

type Props = {
  callback: Function;
};

type Position = "left" | "right" | "top" | "bottom";

const Field: React.FunctionComponent<Props> = ({ callback }): JSX.Element => {
  const [name, setName] = React.useState<string>("toto");
  const [type, setType] = React.useState<string>("");

  const [context, dispatch] = usePair();

  const rootStyle = { display: "flex", justifyContent: "center" };

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
            type: "ANCHOR_SELECTED",
            payload: { elementRef: anchor.id, position },
          });
        }
      });
    });
  };

  const addRelations = async () => {
    await dispatch({
      type: "UPDATE_RELATIONS",
      payload: {
        relations: [
          ...context.relations,
          {
            [name]: {
              /* LEFT ANCHOR */
              left: [],
              /* RIGHT ANCHOR */
              right: [],
            },
          },
        ],
      },
    });
  };

  React.useEffect(() => {
    if (name != "" && type != "") {
      addRelations();
      addAnchorsListener();
      callback({ name, type });
    }
  }, [name, type]);

  return (
    <>
      <tr className="hover:bg-grey-lighter field">
        {/* field */}
        <td className="py-4 px-6 border-b border-grey-light relative">
          {/* anchors button left */}
          <div style={rootStyle}>
            <ArcherElement
              id={`${name}-anchor-left`}
              relations={[
                {
                  targetId: null,
                  targetAnchor: null,
                  sourceAnchor: "left",
                  style: { strokeDasharray: "5,5" },
                },
              ]}
            >
              <button
                type="button"
                className="flex absolute h-auto w-auto top-1/2 left-0 -mt-1 -ml-1 anchors"
                data-position="left"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-yellow-500"></span>
              </button>
            </ArcherElement>
          </div>

          <input
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            className="bg-white relative w-1/2 border border-gray-300 rounded-md shadow-sm pl-3 pr-1 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </td>
        <td className="py-4 px-6 border-b border-grey-light relative">
          <Attributes callback={(type: string) => setType(type)} />
          {/* anchors button right */}
          <div style={rootStyle}>
            <ArcherElement
              id={`${name}-anchor-right`}
              relations={[
                {
                  targetId: null,
                  targetAnchor: null,
                  sourceAnchor: "right",
                  style: { strokeDasharray: "5,5" },
                },
              ]}
            >
              <button
                type="button"
                className="flex absolute h-auto w-auto top-1/2 right-0 -mt-1 -mr-1 anchors"
                data-position="right"
              >
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-yellow-500"></span>
              </button>
            </ArcherElement>
          </div>
        </td>
      </tr>
    </>
  );
};

export default Field;
