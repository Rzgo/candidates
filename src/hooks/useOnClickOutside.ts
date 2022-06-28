import React, { useEffect, useRef, useState } from 'react';

type TUseClickOutside<T> = [
  ref: React.RefObject<T>,
  isVisible: boolean,
  setIsVisible: (value: boolean) => void
];

const useClickOutside = <T extends HTMLElement>(initialState: boolean): TUseClickOutside<T> => {
  const [isVisible, setIsVisible] = useState<boolean>(initialState);
  const ref = useRef<T>(null);

  const handleClickOutside = (event: MouseEvent) => {
    const { current } = ref;

    if (current && !current.contains(event.target as Node)) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  });

  return [ref, isVisible, setIsVisible];
};

export default useClickOutside;
