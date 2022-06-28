import { IEditedСandidate } from '../../types';

type RequiredField = 'name' | 'surname' | 'patronymic' | 'birthday';

const regExp = /^[а-яА-ЯёЁa-zA-Z]+$/;

const requiredFields: RequiredField[] = ['name', 'surname', 'patronymic', 'birthday'];

export const candidateValidation = (candidate: IEditedСandidate) => {
  let isValid = true;

  requiredFields.forEach((field) => {
    if (!candidate[field]) {
      isValid = false;
      return;
    }

    if (field !== 'birthday' && !regExp.test(candidate[field])) {
      isValid = false;
      return;
    }
  });

  return isValid;
};
