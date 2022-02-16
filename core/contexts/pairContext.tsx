import * as React from "react";

type Relation = {
  targetId: string;
  targetAnchor: string;
  sourceAnchor: string;
  style: any;
};
type Anchor = {
  elementRef: string;
  position: string;
};

type Pair = {
  anchor1: Anchor;
  anchor2: Anchor;
};

type State = {
  anchorSelected: Anchor | undefined;
  relations: Relation[] | undefined;
  pairs: Pair[] | undefined;
};

// All user action
type Action = {
  type: "UPDATE_PAIR" | "ANCHOR_SELECTED" | "UPDATE_RELATIONS";
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
export const PairContext = React.createContext<ContextProps | null>(null);

/**
 * @objectives
 * Storing the user's language preference in localStorage
 * Checking value of the locale URL parameter on every client-side route change
 * Synchronizing the context state with the locale embedded in the URL
 */
export const PairProvider: React.FunctionComponent<ProviderProps> = ({
  reducer,
  initialState,
  children,
}) => {
  // full control over reduce and initial state data inside our app
  const [state, dispatch] = React.useReducer<Reducer>(reducer, initialState);

  return (
    // nice trick to let reducer available in any component
    <PairContext.Provider value={[state, dispatch]}>
      {children}
    </PairContext.Provider>
  );
};

// A custom hook to access our minimalistic state management in any component with less amount of code
export const usePair = (): any => React.useContext(PairContext);

export default {
  initialState: {
    pairs: [],
    anchorSelected: undefined,
    relations: [],
  },
  /**
   * @description designing the user state shape
   * @param state current data
   * @param action action to handle
   */
  reducer(state: State, action: Action): State {
    switch (action.type) {
      case "UPDATE_PAIR":
        return {
          ...state,
          pairs: action?.payload?.pairs,
        };
      case "ANCHOR_SELECTED":
        return {
          ...state,
          anchorSelected: action?.payload?.anchorSelected,
        };
      case "UPDATE_RELATIONS":
        return {
          ...state,
          relations: action?.payload?.relations,
        };
      default:
        return state;
    }
  },
};
