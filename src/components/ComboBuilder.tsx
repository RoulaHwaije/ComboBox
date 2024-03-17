import React, { useState } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Input from "./Input";

interface InputProps {
  name: string;
  label: string;
  children: React.ReactElement;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
  isSubmitting: boolean;
  searchingValue: string;
  itemsArray: string[];
  setsearchingValue: (item: string) => void;
  setitemsArray: (item: string[]) => void;
  setAnchorEl: (item: HTMLElement | null) => void;
  setOpenCombo: (item: boolean) => void;
  selectedUniversity: string;
  setselectedUniversity: (item: string) => void;
  InputTyping: boolean;
  setInputTyping: (item: boolean) => void;
  isFormLibrary: boolean;
}

const InputWrapper: React.FC<InputProps> = ({
  name,
  label,
  isSubmitting,
  errors,
  children,
  register,
  searchingValue,
  setsearchingValue,
  setitemsArray,
  itemsArray,
  setAnchorEl,
  setOpenCombo,
  selectedUniversity,
  setselectedUniversity,
  InputTyping,
  setInputTyping,
  isFormLibrary,
}) => {
  const [loading, setloading] = useState(false);

  return (
    <div>
      <Input
        name={name}
        label={label}
        searchingValue={searchingValue}
        setsearchingValue={setsearchingValue}
        setitemsArray={setitemsArray}
        setAnchorEl={setAnchorEl}
        setOpenCombo={setOpenCombo}
        isFormLibrary={isFormLibrary}
        selectedUniversity={selectedUniversity}
        setselectedUniversity={setselectedUniversity}
        loading={loading}
        setloading={setloading}
        InputTyping={InputTyping}
        setInputTyping={setInputTyping}
        isComboInput={true}
        register={register}
        errors={errors}
        isSubmitting={isSubmitting}
      />
      {itemsArray.length > 0 &&
        React.cloneElement(children as React.ReactElement<any>, {
          loading,
        })}
    </div>
  );
};
export default InputWrapper;
