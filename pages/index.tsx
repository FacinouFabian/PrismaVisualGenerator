import * as React from "react";
import Xarrow from "react-xarrows";

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

type Position = "left" | "right" | "top" | "bottom";

const IndexPage = () => {
  const myRef = React.useRef<HTMLDivElement>(null);

  const [pair, setPair] = React.useState<Partial<Link>>({
    start: null,
    startAnchor: null,
  });

  const [tables, setTables] = React.useState<Partial<Table>[]>([]);

  const [linkType, setLinkType] = React.useState<string>("");

  const [pairsArray, setPairsArray] = React.useState<Link[]>([]);

  const addTable = (name: string) => {
    setTables([...tables, { name }]);
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

  const linkTables = () => {
    const anchorsNodes = document.getElementsByClassName("anchors");
    const anchorsElements = Array.from(anchorsNodes);

    anchorsElements.map((anchor) => {
      anchor.addEventListener("click", () => {
        const parent = anchor.parentElement;
        const position = anchor.attributes.getNamedItem("data-position")
          ?.value as Position;

        // if we have the data
        if (parent && position) {
          updatePair(parent.id, position);
        }
      });
    });
  };

  React.useEffect(() => {
    linkTables();
  });

  React.useEffect(() => {
    console.log("pair:", pair);
  }, [pair]);

  React.useEffect(() => {
    console.log("pairsArray:", pairsArray);
  }, [pairsArray]);

  React.useEffect(() => {
    console.log("tables:", tables);
  }, [tables]);

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
        <div
          id="elem1"
          ref={myRef}
          className="p-2 w-auto text-black bg-blue-200 relative"
        >
          {/* top */}
          <button
            type="button"
            className="flex absolute h-auto w-auto top-0 right-1/2 -mt-1 -mr-1 anchors"
            data-position="top"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          {/* bottom */}
          <button
            type="button"
            className="flex absolute h-auto w-auto bottom-0 right-1/2 -mb-1 -mr-1 anchors"
            data-position="bottom"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          {/* left */}
          <button
            type="button"
            className="flex absolute h-auto w-auto top-1/2 left-0 -mt-1 -ml-1 anchors"
            data-position="left"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          {/* right */}
          <button
            type="button"
            className="flex absolute h-auto w-auto top-1/2 right-0 -mt-1 -mr-1 anchors"
            data-position="right"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          <Table
            id="test"
            tablename="users"
            callback={(name: string) => addTable(name)}
          />
        </div>

        <div id="elem2" className="p-2 w-auto text-black bg-blue-200 relative">
          {/* top */}
          <button
            type="button"
            className="flex absolute h-auto w-auto top-0 right-1/2 -mt-1 -mr-1 anchors"
            data-position="top"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          {/* bottom */}
          <button
            type="button"
            className="flex absolute h-auto w-auto bottom-0 right-1/2 -mb-1 -mr-1 anchors"
            data-position="bottom"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          {/* left */}
          <button
            type="button"
            className="flex absolute h-auto w-auto top-1/2 left-0 -mt-1 -ml-1 anchors"
            data-position="left"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          {/* right */}
          <button
            type="button"
            className="flex absolute h-auto w-auto top-1/2 right-0 -mt-1 -mr-1 anchors"
            data-position="right"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>

          <Table
            id="test"
            tablename="cars"
            callback={(name: string) => addTable(name)}
          />
        </div>

        <div id="elem3" className="p-2 w-auto text-black bg-blue-200 relative">
          {/* top */}
          <button
            type="button"
            className="flex absolute h-auto w-auto top-0 right-1/2 -mt-1 -mr-1 anchors"
            data-position="top"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          {/* bottom */}
          <button
            type="button"
            className="flex absolute h-auto w-auto bottom-0 right-1/2 -mb-1 -mr-1 anchors"
            data-position="bottom"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          {/* left */}
          <button
            type="button"
            className="flex absolute h-auto w-auto top-1/2 left-0 -mt-1 -ml-1 anchors"
            data-position="left"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>
          {/* right */}
          <button
            type="button"
            className="flex absolute h-auto w-auto top-1/2 right-0 -mt-1 -mr-1 anchors"
            data-position="right"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
          </button>

          <Table
            id="test"
            tablename="cars"
            callback={(name: string) => addTable(name)}
          />
        </div>

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

        <Xarrow
          start={myRef} //can be an id
          label={<div>One-to-Many</div>}
          startAnchor="right"
          endAnchor="left"
          /* endAnchor={{
          position: "left",
          offset: {
            bottomness: 0,
            rightness: 0,
          },
        }} */
          end="elem2" //can be react ref
          dashness={{
            strokeLen: 10,
            nonStrokeLen: 2,
            animation: 1,
          }}
        />
      </div>
    </>
  );
};
export default IndexPage;