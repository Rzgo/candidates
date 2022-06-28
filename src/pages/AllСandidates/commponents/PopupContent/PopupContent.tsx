import React, { useEffect, useState } from 'react';
import './PopupContent.scss';

import { v4 as uuidv4 } from 'uuid';

import { useRootStore } from '../../../../store/RootStateContext';
import { useSearchParams } from 'react-router-dom';

import { Input, BasicDatePicker } from '../../../../common';
import { Button } from '@material-ui/core';

import { IEditedСandidate } from '../../types';
import { initState } from '../../constants';
import { candidateValidation } from './validation';

interface IProps {
  changeСontent?: boolean;
  hidePopup: () => void;
}

export const PopupContent: React.FC<IProps> = ({ changeСontent, hidePopup }): JSX.Element => {
  const [candidateData, setCandidateData] = useState<IEditedСandidate>(initState);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [isEdited, setIsEdited] = useState<boolean>(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const currentId = searchParams.get('id');

  const { candidatesStore } = useRootStore();

  const onUpdateField = (first_name: string, field: string) => {
    const payload = { [first_name]: field };
    setCandidateData((state) => ({ ...state, ...payload }));
    setIsEdited(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const addNewCandidate = () => {
    candidatesStore.addCandidate({ ...candidateData, id: uuidv4() });
    hidePopup();
  };

  const editCandidate = () => {
    currentId && candidatesStore.editCandidate(currentId, { ...candidateData, id: currentId });
    hidePopup();
    searchParams.delete('id');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (currentId) {
      let currentCandidate;
      candidatesStore.candidatesArray.forEach(({ surname, name, patronymic, birthday, id }) => {
        if (id === currentId) {
          currentCandidate = {
            surname: surname,
            name: name,
            patronymic: patronymic,
            birthday: birthday,
          };
        }
      });
      currentCandidate && setCandidateData(currentCandidate);
    }
  }, [candidatesStore.candidatesArray, currentId]);

  useEffect(() => {
    const result = candidateValidation(candidateData);
    setIsValid(result);
  }, [candidateData]);

  const disableButtonSave = () => {
    if (isValid && !isEdited) {
      return true;
    } else if (isEdited && isValid) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <div className="popupContent">
      <form onSubmit={handleSubmit} className="popupContent__inputs-wrapper">
        <Input
          required
          label="Фамилия"
          pattern={/^[а-яА-ЯёЁa-zA-Z]+$/}
          value={candidateData.surname}
          onChange={(value: string) => onUpdateField('surname', value)}
        />
        <Input
          required
          label="Имя"
          pattern={/^[а-яА-ЯёЁa-zA-Z]+$/}
          value={candidateData.name}
          onChange={(value: string) => onUpdateField('name', value)}
        />
        <Input
          required
          label="Отчество"
          pattern={/^[а-яА-ЯёЁa-zA-Z]+$/}
          value={candidateData.patronymic}
          onChange={(value: string) => onUpdateField('patronymic', value)}
        />
        <BasicDatePicker
          required
          label="Дата рождения"
          value={candidateData.birthday}
          onChange={(value: string) => onUpdateField('birthday', value)}
        />
      </form>
      <div className="popupContent__buttons-wrapper">
        {changeСontent ? (
          <Button
            variant="outlined"
            color="primary"
            onClick={editCandidate}
            disabled={disableButtonSave()}
          >
            Сохранить
          </Button>
        ) : (
          <Button variant="outlined" color="primary" onClick={addNewCandidate} disabled={!isValid}>
            Добавить
          </Button>
        )}
        <Button variant="outlined" onClick={hidePopup}>
          Отменить
        </Button>
      </div>
    </div>
  );
};
