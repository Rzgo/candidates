import React, { useEffect, useState } from 'react';

import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'grey',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'grey',
    },
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: 'grey',
      },
    },
  },
})(TextField);

interface IProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  setValidated?: (value: boolean) => void;
  pattern?: RegExp;
}

export const Input: React.FC<IProps> = ({
  label,
  value,
  onChange,
  required,
  pattern,
}): JSX.Element => {
  const [error, setError] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  const blurHandler = () => {
    if (!value) {
      required && setError(true);
      return;
    } else if (pattern) {
      !pattern.test(value) && setError(true);
    }
  };

  useEffect(() => {
    if (value) setError(false);
  }, [value]);

  return (
    <CssTextField
      id="custom-css-standard-input"
      label={label}
      variant="outlined"
      value={value}
      onChange={handleChange}
      error={error}
      onBlur={blurHandler}
      helperText={error && 'Некорректные данные'}
    />
  );
};
