import React from 'react';
import { CandidatesStore } from './CandidatesStore';

type RootStateContextValue = {
  candidatesStore: CandidatesStore;
};

const RootStateContext = React.createContext<RootStateContextValue>({} as RootStateContextValue);

const candidatesStore = new CandidatesStore();

export const RootStateProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <RootStateContext.Provider value={{ candidatesStore }}>{children}</RootStateContext.Provider>
  );
};

export const useRootStore = () => React.useContext(RootStateContext);
