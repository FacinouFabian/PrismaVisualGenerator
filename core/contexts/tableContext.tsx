import * as React from "react";

type Field = { name: string; type: string };

type Table = {
  name: string;
  fields: Field[];
};

type State = {
  tables: Partial<Table>[] | undefined;
};

// All user action
type Action = {
  type: "UPDATE_TABLES";
  payload?: Partial<State>;
};

type ContextProps = [State, React.Dispatch<Action>];

type ProviderProps = {
  reducer: any;
  initialState: any;
};

type Reducer = (prevState: State, action: Action) => State;

// React expects the context to be created with default values
// This object contain Provider and Consumer
export const TableContext = React.createContext<ContextProps | null>(null);

/**
 * @objectives
 * Storing the user's language preference in localStorage
 * Checking value of the locale URL parameter on every client-side route change
 * Synchronizing the context state with the locale embedded in the URL
 */
export const TableProvider: React.FunctionComponent<ProviderProps> = ({
  reducer,
  initialState,
  children,
}) => {
  // full control over reduce and initial state data inside our app
  const [state, dispatch] = React.useReducer<Reducer>(reducer, initialState);

  return (
    // nice trick to let reducer available in any component
    <TableContext.Provider value={[state, dispatch]}>
      {children}
    </TableContext.Provider>
  );
};

// A custom hook to access our minimalistic state management in any component with less amount of code
export const useTable = (): any => React.useContext(TableContext);

export default {
  initialState: {
    tables: [],
  },
  /**
   * @description designing the user state shape
   * @param state current data
   * @param action action to handle
   */
  reducer(state: State, action: Action): State {
    switch (action.type) {
      case "UPDATE_TABLES":
        return {
          ...state,
          tables: action?.payload?.tables,
        };
      default:
        return state;
    }
  },
};
