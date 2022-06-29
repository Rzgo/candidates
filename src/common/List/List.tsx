import React from 'react';
import './List.scss';

import { Item } from './Item';
import { Titles } from './Titles';
import { IСandidate } from '../../store/types';

import { titles } from './constants';

interface IProps {
  forEditing?: boolean;
  setCurrentArray?: (value: IСandidate[]) => void;
  currentArray: IСandidate[];
}

export const List: React.FC<IProps> = ({
  forEditing,
  setCurrentArray,
  currentArray,
}): JSX.Element => {
  return (
    <ul className="list">
      <Titles
        titles={titles}
        setCurrentArray={setCurrentArray}
        currentArray={currentArray}
        forEditing={forEditing}
      />

      {currentArray.map((item, index) => (
        <Item key={item.id} number={++index} candidate={item} forEditing={forEditing} />
      ))}
    </ul>
  );
};
