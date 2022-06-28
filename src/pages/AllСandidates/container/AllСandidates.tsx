import React, { useEffect, useState } from 'react';
import './AllСandidates.scss';

import { observer } from 'mobx-react-lite';

import { useRootStore } from '../../../store/RootStateContext';
import useClickOutside from '../../../hooks/useOnClickOutside';
import { useSearchParams } from 'react-router-dom';

import { List, Input, Popup } from '../../../common';
import { PopupContent } from '../commponents/PopupContent';
import { Button } from '@material-ui/core';

import { IСandidate } from '../../../store/types';

export const AllСandidates: React.FC = observer((): JSX.Element => {
  const { candidatesStore } = useRootStore();

  const [currentValue, setCurrentValue] = useState<string>('');
  const [currentArray, setCurrentArray] = useState<IСandidate[]>(candidatesStore.candidatesArray);

  const [addRef, addPopupIsVisible, setAddPopupIsVisible] = useClickOutside<HTMLDivElement>(false);
  const [editRef, editPopupIsVisible, setEditPopupIsVisible] =
    useClickOutside<HTMLDivElement>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('id');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (currentValue) {
      const arr = candidatesStore.candidatesArray.filter(
        ({ surname, name, patronymic, birthday }) => {
          const withoutId = {
            surname: surname,
            name: name,
            patronymic: patronymic,
            birthday: birthday,
          };
          const combinationOfValues = Object.values(withoutId).join('').toLowerCase();
          const searchResult = combinationOfValues.indexOf(currentValue.toLowerCase()) !== -1;
          return searchResult;
        }
      );
      setCurrentArray(arr);
    } else {
      setCurrentArray(candidatesStore.candidatesArray);
    }
  }, [candidatesStore.candidatesArray, currentValue]);

  useEffect(() => {
    id && setEditPopupIsVisible(true);
  }, [id, setEditPopupIsVisible]);

  const hidePopup = () => {
    setEditPopupIsVisible(false);
    searchParams.delete('id');
    setSearchParams(searchParams);
  };

  return (
    <section className="allСandidates container">
      <div className="allСandidates__box">
        <form onSubmit={handleSubmit}>
          <Input label="Поиск" onChange={setCurrentValue} value={currentValue} />
        </form>
        <Button variant="outlined" onClick={() => setAddPopupIsVisible(true)}>
          Добавить кандидата
        </Button>
      </div>
      <List currentArray={currentArray} forEditing setCurrentArray={setCurrentArray} />
      {addPopupIsVisible && (
        <Popup
          ref={addRef}
          setPopupIsVisible={setAddPopupIsVisible}
          popupIsVisible={addPopupIsVisible}
        >
          <PopupContent hidePopup={() => setAddPopupIsVisible(false)} />
        </Popup>
      )}

      {editPopupIsVisible && (
        <Popup
          ref={editRef}
          setPopupIsVisible={setEditPopupIsVisible}
          popupIsVisible={editPopupIsVisible}
        >
          <PopupContent changeСontent hidePopup={hidePopup} />
        </Popup>
      )}
    </section>
  );
});
