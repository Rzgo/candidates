import React, { useState } from 'react';
import classNames from 'classnames';
import moment from 'moment';

import { IСandidate } from '../../store/types';

import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

interface IProps {
  titles: string[];
  setCurrentArray?: (value: IСandidate[]) => void;
  currentArray: IСandidate[];
  forEditing?: boolean;
}
export const Titles: React.FC<IProps> = ({
  titles,
  setCurrentArray,
  currentArray,
  forEditing,
}): JSX.Element => {
  const [activeArrow, setActiveArrow] = useState<string>('');
  const [reverseSorting, setReverseSorting] = useState<boolean>(false);

  const sortArray = (data: string | number | null) => {
    const newArr = [...currentArray];

    newArr.sort((a: IСandidate, b: IСandidate) => {
      setReverseSorting(!reverseSorting);
      switch (data) {
        case 'Имя':
          setActiveArrow('Имя');
          return reverseSorting ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name);
        case 'Фамилия':
          setActiveArrow('Фамилия');
          return reverseSorting
            ? b.surname.localeCompare(a.surname)
            : a.surname.localeCompare(b.surname);
        case 'Отчество':
          setActiveArrow('Отчество');
          return reverseSorting
            ? b.patronymic.localeCompare(a.patronymic)
            : a.patronymic.localeCompare(b.patronymic);
        case 'Дата рождения':
          setActiveArrow('Дата рождения');
          return reverseSorting
            ? +moment(a.birthday, 'DD.MM.YYYY') - +moment(b.birthday, 'DD.MM.YYYY')
            : +moment(b.birthday, 'DD.MM.YYYY') - +moment(a.birthday, 'DD.MM.YYYY');
        default:
          return 0;
      }
    });
    setCurrentArray && setCurrentArray(newArr);
  };

  return (
    <li className="list__row list__row_isTitle">
      {titles.map((title, index) => (
        <div
          key={Math.random()}
          className={classNames('list__item', 'list__title', {
            'list__item-title_active': forEditing && activeArrow === title,
          })}
          onClick={() => !!index && sortArray(title)}
        >
          {title}
          {forEditing && !!index && (
            <ArrowDropDown
              className={classNames(
                'list__arrow-icon',
                {
                  'list__arrow-icon_active': activeArrow === title,
                },
                { 'list__arrow-icon_reverse': activeArrow === title && reverseSorting }
              )}
            />
          )}
        </div>
      ))}
    </li>
  );
};
