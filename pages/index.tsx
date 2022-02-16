import * as React from "react";
import { ArcherContainer } from "react-archer";
import { usePair } from "@/core/contexts/pairContext";
import { useTable } from "@/core/contexts/tableContext";
import Table from "@/components/Table";
import Dialog from "@/components/Dialog";

type Link = {
  start: string | null;
  startAnchor: "left" | "right" | "top" | "bottom" | null;
  end: string | null;
  endAnchor: "left" | "right" | "top" | "bottom" | null;
};

type TableType = {
  name: string;
  fields: FieldType[];
};

type FieldType = {
  name: string;
  type: string;
};

type Position = "left" | "right" | "top" | "bottom";

type FieldsRelations = {
  firstKeys: string[];
  secondKeys: string[];
};

type Relation = {
  tables: string[];
  fields: FieldsRelations;
  type: string;
};

const IndexPage = () => {
  const [linkType, setLinkType] = React.useState<string>("");

  const [pairIsWaiting, setPairIsWaiting] = React.useState<boolean>(false);

  const [hiddeSaveMenu, setHiddeSaveMenu] = React.useState<boolean>(true);

  // const [relations, setRelations] = React.useState<Relation[]>([]);
  const [pairsArray] = React.useState<Link[]>([]);

  const [tableContext, dispatchTables] = useTable();

  const [pair, setPair] = React.useState<Partial<Link>>({
    start: null,
    startAnchor: null,
  });

  const updatePair = (elementRef: string | null, position: Position | null) => {
    if (!pairIsWaiting) {
      setPair({
        start: elementRef,
        startAnchor: position,
      });
      setPairIsWaiting(!pairIsWaiting);
    } else {
      console.log("yo");
      /* setPairsArray([
        ...pairsArray,
        {
          start: pair.start,
          startAnchor: pair.startAnchor as Position,
          end: elementRef,
          endAnchor: position,
        },
      ]);

      setPair({
        start: null,
        startAnchor: null,
      }); */
    }
  };

  const addTable = (name: string) => {
    dispatchTables({
      type: "UPDATE_TABLES",
      payload: { tables: [...tableContext.tables, { name, fields: [] }] },
    });
  };

  const createFile = () => {
    const file = new Blob(
      [JSON.stringify({ name, tables: tableContext.tables }, null, 2)],
      {
        type: "application/json",
      }
    );

    const link = document.getElementById("download_link") as HTMLLinkElement;

    window.URL.revokeObjectURL(link.href);

    const objectURL = URL.createObjectURL(file);

    link.href = objectURL;
  };

  return (
    <>
      {/* menu */}
      <div className="w-12 h-auto p-2 absolute left-0 bottom-1/2 flex flex-col space-y-1 rounded-md bg-white">
        <button
          title="One-to-Many"
          onClick={() => setLinkType("One-to-Many")}
          className="w-auto p-1 bg-gray-300 text-xs focus:text-white focus:bg-gray-700 focus:outline-none"
        >
          1-N
        </button>
        <button
          title="Many-to-One"
          onClick={() => setLinkType("Many-to-One")}
          className="w-auto p-1 bg-gray-300 text-xs focus:text-white focus:bg-gray-700 focus:outline-none"
        >
          N-1
        </button>
        <button
          title="Many-to-Many"
          onClick={() => setLinkType("Many-to-Many")}
          className="w-auto p-1 bg-gray-300 text-xs focus:text-white focus:bg-gray-700 focus:outline-none"
        >
          N-N
        </button>
        <button
          title="One-to-One"
          onClick={() => setLinkType("One-to-One")}
          className="w-auto p-1 bg-gray-300 text-xs focus:text-white focus:bg-gray-700 focus:outline-none"
        >
          1-1
        </button>
      </div>
      {/*  */}
      <div
        style={{
          display: "flex",
          marginTop: 20,
          justifyContent: "space-evenly",
          width: "100%",
          color: "#fff",
        }}
      >
        <ArcherContainer strokeColor="red">
          {tableContext.tables.map((table: TableType, index: number) => (
            <Table
              key={index}
              id={table.name}
              tablename={table.name}
              className="p-2 w-full text-gray-800 relative"
            />
          ))}
        </ArcherContainer>
      </div>

      <div className="w-72 absolute bottom-5 right-5 flex flex-col items-start bg-white shadow rounded-md py-5 pl-6 pr-8 sm:pr-6">
        {/* index */}
        <div className="flex items-center justify-start space-x-5">
          {/* save button */}
          <span className="relative z-0 inline-flex shadow-sm rounded-md">
            <button
              type="button"
              onClick={() => createFile()}
              className="relative inline-flex items-center px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
            >
              Save changes
            </button>
            {/* menu */}
            <span className="-ml-px relative block">
              <div
                hidden={hiddeSaveMenu}
                className="origin-top-right absolute bottom-10 right-0 mt-2 -mr-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="option-menu"
              >
                <div className="py-1" role="none">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 bg-"
                    role="menuitem"
                  >
                    Save and deploy
                  </a>

                  <a
                    id="download_link"
                    download="schema.json"
                    href=""
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    role="menuitem"
                  >
                    Export schema
                  </a>
                </div>
              </div>
              {/* open/close menu button */}
              <button
                type="button"
                onClick={() => setHiddeSaveMenu(!hiddeSaveMenu)}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                id="option-menu"
                aria-expanded="true"
                aria-haspopup="true"
              >
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </span>
          </span>
          {/* add table button */}
          <Dialog onValidate={addTable} />
        </div>
      </div>
    </>
  );
};
export default IndexPage;
