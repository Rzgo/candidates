import React, { useEffect, useState } from 'react';
import './BasicDatePicker.scss';

import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers';

interface IProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  required?: boolean;
}

export const BasicDatePicker: React.FC<IProps> = ({
  label,
  onChange,
  value,
  required,
}): JSX.Element => {
  const [error, setError] = useState<boolean>(false);

  const handleChange = (val: any) => {
    const newFormat = val.toLocaleDateString();
    onChange(newFormat);
  };

  const getFormatedDate = () => {
    const formatedDate = value.split('.').reverse().join('-');
    return new Date(formatedDate);
  };

  const blurHandler = () => {
    if (!value) {
      required && setError(true);
    } else {
      setError(false);
    }
  };

  useEffect(() => {
    if (value) setError(false);
  }, [value]);

  return (
    <DatePicker
      disableFuture
      label={label}
      views={['day', 'month', 'year']}
      inputFormat="dd.MM.yyyy"
      value={getFormatedDate()}
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          className="datePicker"
          error={error}
          onBlur={blurHandler}
          helperText={error && 'Некорректные данные'}
        />
      )}
    />
  );
};
