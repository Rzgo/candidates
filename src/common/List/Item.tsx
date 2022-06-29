import React from 'react';
import classNames from 'classnames';

import { useRootStore } from '../../store/RootStateContext';
import { useNavigate } from 'react-router-dom';
import { IСandidate } from '../../store/types';

import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

interface IProps {
  number: number;
  candidate: IСandidate;
  forEditing?: boolean;
}

export const Item: React.FC<IProps> = ({ number, candidate, forEditing }): JSX.Element => {
  const navigate = useNavigate();
  const { candidatesStore } = useRootStore();

  const personalDatas = [
    number,
    candidate.surname,
    candidate.name,
    candidate.patronymic,
    candidate.birthday,
  ];

  return (
    <li className={classNames('list__row', { list__row_forEditing: forEditing })}>
      {personalDatas.map((item) => (
        <div className="list__item" key={Math.random()}>
          {item}
        </div>
      ))}

      {forEditing && (
        <div className="list__buttons-box">
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => navigate(`/all_candidates?id=${candidate.id}`)}
          >
            <EditIcon fontSize="small" />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="secondary"
            onClick={() => candidatesStore.deleteCandidate(candidate.id)}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </div>
      )}
    </li>
  );
};
