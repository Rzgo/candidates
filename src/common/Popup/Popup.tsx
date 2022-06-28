import React from 'react';
import './Popup.scss';

import { useSearchParams } from 'react-router-dom';

interface IProps {
  setPopupIsVisible: (value: boolean) => void;
  popupIsVisible: boolean;
  children: React.ReactNode;
  ref: React.RefObject<HTMLDivElement>;
}

export const Popup: React.FC<IProps> = ({
  children,
  setPopupIsVisible,
  ref,
  popupIsVisible,
}): JSX.Element => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleClick = (e: React.MouseEvent<HTMLElement>) => e.stopPropagation();

  const closePopup = () => {
    setPopupIsVisible(!popupIsVisible);
    searchParams.delete('id');
    setSearchParams(searchParams);
  };

  return (
    <div className="popup" ref={ref} onClick={closePopup}>
      <div className="popup__body">
        <div className="popup__content" onClick={handleClick}>
          {children}
        </div>
      </div>
    </div>
  );
};
