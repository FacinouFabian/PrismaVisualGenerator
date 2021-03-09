import * as React from "react";
import { FiPlus } from "react-icons/fi";

import Field from "@/components/Field";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tablename: string;
  callback: Function;
}

const Table: React.FunctionComponent<Props> = (props): JSX.Element => {
  const [name, setName] = React.useState<string>("");
  const [fields, setFields] = React.useState<any[]>([]);

  const addTable = () => props.callback(name);

  const addField = () => {
    setFields([...fields, { id: fields.length, name: "", fields: [] }]);
  };

  const updateField = (index: number, data: any) => {
    const ar = fields;
    ar[index] = data;
    setFields(ar);
  };

  React.useEffect(() => {
    setName(props.tablename);
  }, []);

  React.useEffect(() => {
    if (name != "") addTable();
  }, [name, fields]);

  return (
    <div {...props}>
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
            {fields.map((item, key) => (
              <Field
                key={key}
                callback={(data: any) => updateField(item.id, data)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
