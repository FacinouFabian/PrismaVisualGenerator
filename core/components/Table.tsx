import * as React from "react";
import { FiPlus } from "react-icons/fi";

import Field from "@/components/Field";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  ref?: React.RefObject<HTMLDivElement>;
  tablename: string;
  callback: Function;
}

type FieldType = {
  name: string;
  type: string;
};

const Table: React.FunctionComponent<Props> = (props): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [fields, setFields] = React.useState<FieldType[]>([]);

  const addTable = () => props.callback(name);

  const addField = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const updateField = (index: number, data: Partial<FieldType>) => {
    const fieldSave = fields;

    fieldSave[index].name = data.name as string;
    fieldSave[index].type = data.type as string;

    setFields(fieldSave);
  };

  React.useEffect(() => {
    setName(props.tablename);
  }, []);

  React.useEffect(() => {
    console.log("fields:", fields);
  }, [fields]);

  return (
    <div {...props}>
      {/* anchors button top */}
      <button
        type="button"
        className="flex absolute h-auto w-auto top-0 right-1/2 -mt-1 -mr-1 anchors"
        data-position="top"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
      </button>
      {/* anchors button bottom */}
      <button
        type="button"
        className="flex absolute h-auto w-auto bottom-0 right-1/2 -mb-1 -mr-1 anchors"
        data-position="bottom"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
      </button>
      {/* anchors button left */}
      <button
        type="button"
        className="flex absolute h-auto w-auto top-1/2 left-0 -mt-1 -ml-1 anchors"
        data-position="left"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
      </button>
      {/* anchors button right */}
      <button
        type="button"
        className="flex absolute h-auto w-auto top-1/2 right-0 -mt-1 -mr-1 anchors"
        data-position="right"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex items-center rounded-full h-2 w-2 bg-green-500"></span>
      </button>

      <div>
        <div className="w-20 relative">
          <span className="font-semibold text-2xl">{name}</span>
          <button
            type="button"
            className="flex absolute h-auto w-auto top-1/2 right-2 -mt-1 -mr-1"
            onClick={addField}
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative flex justify-center items-center rounded-full h-4 w-4 bg-purple-500">
              <FiPlus color="#fff" />
            </span>
          </button>
        </div>
        <div className="bg-white shadow-md rounded">
          <table className="text-left w-full border-collapse">
            <thead className="relative">
              <tr className="relative">
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Attribute
                </th>
                <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                  Type
                </th>
              </tr>
            </thead>
            <tbody>
              {fields.map((_, key) => (
                <Field
                  key={key}
                  callback={(data: any) => updateField(key, data)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
