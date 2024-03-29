import * as React from "react";
import { AiOutlinePlus, AiOutlineSave } from "react-icons/ai";
import { Rnd } from "react-rnd";

import { usePair } from "@/core/contexts/pairContext";
import Field from "@/components/Field";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  tablename: string;
}

type FieldType = {
  name: string;
  type: string;
};

type Table = {
  name: string;
  fields: FieldType[];
};

const Table: React.FunctionComponent<Props> = (props): JSX.Element => {
  const [fields, setFields] = React.useState<FieldType[]>([]);

  const [context, dispatch] = usePair();

  const saveTable = () => {
    console.log("ok");
    const tables = context.tables;
    const result = tables.find((table: Table) => table.name == props.tablename);

    if (result) {
      result.name = name;
      result.fields = fields;

      dispatch({
        type: "UPDATE_TABLES",
        payload: { tables: [...context.tables, { name: "", fields: [] }] },
      });
    } else {
      dispatch({
        type: "UPDATE_TABLES",
        payload: { tables },
      });
    }
  };

  const addField = () => {
    setFields([...fields, { name: "", type: "" }]);
  };

  const updateField = (index: number, data: FieldType) => {
    const fieldSave = fields;

    fieldSave[index].name = data.name as string;
    fieldSave[index].type = data.type as string;

    setFields(fieldSave);
  };

  React.useEffect(() => {
    console.log(context.relations);
  }, [context.relations]);

  return (
    <Rnd>
      <div {...props} className={`${props.className} field`}>
        <div>
          {/* save button */}
          <div className="w-20 relative flex">
            <span className="w-40 h-10 p-2 font-semibold text-md bg-transparent italic rounded-t-sm">
              {props.tablename}
            </span>
            <button
              type="button"
              title="save table"
              className="h-auto w-auto flex items-center justify-start focus:outline-none"
              onClick={saveTable}
            >
              <span className="relative flex justify-center items-center rounded-full h-6 w-6 ml-2 bg-green-500">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <AiOutlineSave color="#000" />
              </span>
            </button>
          </div>
          <div className="bg-white shadow-md rounded relative">
            {/* add field button */}
            <button
              type="button"
              title="add field"
              className="flex absolute h-auto w-auto bottom-0 right-0 -mr-1 focus:outline-none z-100"
              onClick={addField}
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative flex justify-center items-center rounded-full h-4 w-4 bg-purple-500">
                <AiOutlinePlus color="#fff" />
              </span>
            </button>
            {/* table */}
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
    </Rnd>
  );
};

export default Table;
