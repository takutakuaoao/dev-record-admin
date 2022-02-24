import React, { ChangeEvent, useState } from "react";

export const useFormValue = <T>(
  initial: T
): {
  state: T;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTextAreaChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleRawValueChange: (
    fieldName: string,
    setValue: string | number | boolean
  ) => void;
} => {
  const [state, setState] = useState<T>(initial);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const name = event.target.name;
    setState({ ...state, [name]: event.target.value });
  };

  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const name = event.target.name;
    setState({ ...state, [name]: event.target.value });
  };

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    const name = event.target.name;
    setState({ ...state, [name]: event.target.value });
  };

  const handleRawValueChange = (
    fieldName: string,
    setValue: string | number | boolean
  ): void => {
    console.log(fieldName, setValue);
    setState({ ...state, [fieldName]: setValue });
  };

  return { state, handleChange, handleSelectChange, handleTextAreaChange, handleRawValueChange };
};
