import React from 'react';
import './Main.scss';

import { useNavigate } from 'react-router-dom';
import { useRootStore } from '../../store/RootStateContext';

import { List } from '../../common';
import Button from '@material-ui/core/Button';

import youtube from '../../assets/images/youtube.png';

export const Main: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const { candidatesStore } = useRootStore();

  const incompleteArray = candidatesStore.candidatesArray.filter((item, index) => index < 10);

  return (
    <section className="main container">
      <div className="main__wrapper">
        <p className="main__text">
          Партнерская программа YouTube позволяет авторам пользоваться дополнительными функциями и
          возможностями монетизации YouTube. Кроме того, партнеры получают часть дохода от показа
          рекламы в их видео. Здесь приведен неполный список кандидатов на участие в Партнерской
          программе:
        </p>
        <img src={youtube} alt="youtube" className="main__logo" />
      </div>
      <List currentArray={incompleteArray} />
      <div className="main__button-wrapper">
        <Button variant="outlined" onClick={() => navigate('/all_candidates')}>
          Просмотреть полный список
        </Button>
      </div>
    </section>
  );
};
