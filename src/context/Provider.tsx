import React, {
  ReactElement, createContext, useMemo, useState,
} from 'react';
import { ICard } from '../utils/data';

interface IContext {
  name: string;
  setName: (name: string) => void;
  cardsSelected: ICard[];
  setCardsSelected: (cards: ICard[]) => void;
}

export const Context = createContext<IContext>({
  name: '',
  setName: () => {},
  cardsSelected: [],
  setCardsSelected: () => {},
});

export function Provider({ children }: React.PropsWithChildren): ReactElement {
  const [name, setName] = useState('');
  const [cardsSelected, setCardsSelected] = useState<ICard[]>([]);

  const contextValue = useMemo(() => ({
    name,
    setName,
    cardsSelected,
    setCardsSelected,
  }), [cardsSelected, name]);

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}
