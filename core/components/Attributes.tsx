import * as React from "react";

type Props = {
  callback: Function;
};

const Attributes: React.FunctionComponent<Props> = ({
  callback,
}): JSX.Element => {
  const [menuHidden, setMenuHidden] = React.useState(true);
  const [type, setType] = React.useState("");

  const selectType = (type: string) => {
    setType(type);
    setMenuHidden(true);

    if (type != "") {
      callback(type);
    }
  };

  return (
    <div>
      <div className="mt-1 relative">
        <button
          type="button"
          onClick={() => setMenuHidden(!menuHidden)}
          aria-haspopup="listbox"
          aria-expanded="true"
          aria-labelledby="listbox-label"
          className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <span className="block truncate">
            {type === "" ? "Select..." : type}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            {/* <!-- Heroicon name: solid/selector --> */}
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
        {/* select */}
        <div
          hidden={menuHidden}
          className="absolute mt-1 w-full rounded-md bg-white shadow-lg"
        >
          <ul
            tabIndex={-1}
            role="listbox"
            aria-labelledby="listbox-label"
            aria-activedescendant="listbox-item-3"
            className="max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            <li
              id="listbox-option-0"
              role="option"
              className="text-gray-900 hover:bg-gray-700 cursor-pointer select-none relative py-2 pl-3 pr-9"
              onClick={() => selectType("string")}
            >
              <span className="font-normal block truncate">String</span>

              <span
                className={`${
                  type != "string" && "hidden"
                } text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4`}
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
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </li>
            <li
              id="listbox-option-1"
              role="option"
              className="text-gray-900 hover:bg-gray-700 cursor-pointer select-none relative py-2 pl-3 pr-9"
              onClick={() => selectType("int")}
            >
              <span className="font-normal block truncate">Int</span>

              <span
                hidden={type != "int"}
                className={`${
                  type != "int" && "hidden"
                } text-indigo-600 absolute inset-y-0 right-0 flex items-center pr-4`}
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
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Attributes;
