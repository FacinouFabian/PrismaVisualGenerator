import * as React from "react";
import Xarrow from "react-xarrows";

import { usePair } from "@/core/contexts/pairContext";
import Table from "@/components/Table";

type Link = {
  start: string | null;
  startAnchor: "left" | "right" | "top" | "bottom" | null;
  end: string | null;
  endAnchor: "left" | "right" | "top" | "bottom" | null;
};

type Table = {
  name: string;
  fields: unknown[];
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
  const myRef = React.useRef<HTMLDivElement>(null);

  const [tables, setTables] = React.useState<Partial<Table>[]>([]);

  const [linkType, setLinkType] = React.useState<string>("");

  const [pairsArray, setPairsArray] = React.useState<Link[]>([]);

  const [relations, setRelations] = React.useState<Relation[]>([]);

  const [anchor, dispatch] = usePair();

  const [pair, setPair] = React.useState<Partial<Link>>({
    start: null,
    startAnchor: null,
  });

  const addTable = (name: string, fields: FieldType[]) => {
    setTables([...tables, { name, fields }]);
  };

  const updatePair = (elementRef: string | null, position: Position | null) => {
    if (pair.start == null) {
      setPair({
        start: elementRef,
        startAnchor: position,
      });
    } else {
      setPairsArray([
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
      });
    }
  };

  React.useEffect(() => {
    console.log(anchor.elementRef, anchor.position);
    /* updatePair(anchor.id, anchor.position); */
  }, [anchor]);

  React.useEffect(() => {
    console.log("pair:", pair);
  }, [pair]);

  /* React.useEffect(() => {
    console.log("pairsArray:", pairsArray);
  }, [pairsArray]);

  React.useEffect(() => {
    console.log("tables:", tables);
  }, [tables]); */

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
        <Table
          id="elem1"
          ref={myRef}
          tablename="users"
          className="p-2 w-auto text-black bg-blue-200 relative"
          callback={(name: string, fields: FieldType[]) =>
            addTable(name, fields)
          }
        />

        <Table
          id="elem2"
          ref={myRef}
          tablename="cars"
          className="p-2 w-auto text-black bg-blue-200 relative"
          callback={(name: string, fields: FieldType[]) =>
            addTable(name, fields)
          }
        />

        {pairsArray.map((item, key) => (
          <Xarrow
            key={key}
            start={item.start as string}
            label={<div className="bg-black">{linkType}</div>}
            startAnchor={item.startAnchor as Position}
            endAnchor={item.endAnchor as Position}
            end={item.end as string}
          />
        ))}
      </div>
    </>
  );
};
export default IndexPage;
