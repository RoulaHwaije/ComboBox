import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
  children: React.ReactElement;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isSubmitting: boolean;
}

const InputWrapper: React.FC<InputProps> = ({
  handleChange,
  isSubmitting,
  errors,
  children,
  register,
}) => {
  var isFormLibrary = true;

  return (
    <div>
      {React.cloneElement(children as React.ReactElement<any>, {
        handleChange,
        isFormLibrary,
        register,
        errors,
        isSubmitting,
      })}
    </div>
  );
};
export default InputWrapper;
