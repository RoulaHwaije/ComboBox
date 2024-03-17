import React, { useEffect, useRef, useState } from "react";
import style from "./Input.module.css";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface InputProps {
  name: string;
  label: string;
  isFormLibrary?: boolean;
  isComboInput: boolean;
  handleChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register?: UseFormRegister<any>;
  errors?: FieldErrors<any>;
  isSubmitting?: boolean;
  valueEntered?: string;
  setvalueEntered?: (item: string) => void;
  setitemsArray: (item: string[]) => void;
  setAnchorEl?: (item: HTMLElement | null) => void;
  setOpenCombo?: (item: boolean) => void;
  selectedUniversity: string;
  setselectedUniversity: (item: string) => void;
  loading?: boolean;
  setloading?: (item: boolean) => void;
  searchingValue?: string;
  setsearchingValue?: (item: string) => void;
  InputTyping?: boolean;
  setInputTyping?: (item: boolean) => void;
}

type University = {
  alpha_two_code: string;
  web_pages: string[];
  "state-province": string;
  name: string;
  domains: string[];
  country: string;
};
const Input: React.FC<InputProps> = ({
  isFormLibrary,
  isComboInput,
  name,
  label,
  handleChange,
  register,
  errors,
  isSubmitting,
  setitemsArray,
  setAnchorEl,
  valueEntered,
  setvalueEntered,
  setOpenCombo,
  selectedUniversity,
  setselectedUniversity,
  setloading,
  searchingValue,
  setsearchingValue,
  InputTyping,
  setInputTyping,
}) => {
  const anchorElRef = useRef(null);
  const fetchUniversities = async (name: string) => {
    var nameToSend = name.trim();
    if (name !== " " && name !== "" && name.split(" ").length > 1) {
      nameToSend = name.split(" ").join("+");
    }
    const response = await axios.get(
      `http://universities.hipolabs.com/search?country=Czech+Republic&name=${nameToSend}`
    );
    const data = await response.data;
    var dataArray = data.map((uni: University) => uni.name);
    setitemsArray(dataArray);
    return dataArray;
  };

  const { isLoading } = useQuery({
    queryKey: ["name", searchingValue],
    queryFn: () => fetchUniversities(searchingValue ? searchingValue : " "),
    enabled: true,
  });
  useEffect(() => {
    if (isComboInput) {
      setloading && setloading(isLoading);
    }
  }, [isLoading, setloading, isComboInput]);

  const handleInputFocus = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (
      isComboInput &&
      (!selectedUniversity ||
        selectedUniversity === " " ||
        selectedUniversity === "")
    ) {
      setAnchorEl && setAnchorEl(anchorElRef.current);
      setsearchingValue && setsearchingValue(" ");
      setOpenCombo && setOpenCombo(true);
    }
  };

  const [InputError, setInputError] = useState(false);

  const handleChangeCombo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setInputTyping && setInputTyping(true);
    setsearchingValue && setsearchingValue(newValue);
    setOpenCombo && setOpenCombo(true);
    setAnchorEl && setAnchorEl(anchorElRef.current);
    if (!isFormLibrary && newValue === "$$") {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setvalueEntered && setvalueEntered(newValue);
    if (!isFormLibrary && newValue === "$$") {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };
  const handler = () => {
    if (isComboInput) {
      return handleChangeCombo;
    } else if (isFormLibrary) {
      return handleChange;
    } else {
      return handleChangeValue;
    }
  };

  const requiredError = () => {
    if (isFormLibrary && errors?.firstname?.type === "required") {
      return <p className={style.error}>Toto pole je povinné</p>;
    } else if (
      InputError &&
      (!selectedUniversity ||
        selectedUniversity === " " ||
        selectedUniversity === "")
    ) {
      return <p className={style.error}>Toto pole je povinné</p>;
    }
  };
  var errorClass = "";
  if (
    InputError &&
    (!selectedUniversity ||
      selectedUniversity === " " ||
      selectedUniversity === "")
  ) {
    errorClass = style.errorClass;
  }

  const registorVar = isFormLibrary &&
    register && {
      ...register(name, {
        required: true,
      }),
    };

  const clearInput = () => {
    setselectedUniversity("");
  };
  const getInputValue = () => {
    if (isComboInput) {
      if (InputTyping) {
        return searchingValue;
      } else {
        return selectedUniversity;
      }
    } else {
      return valueEntered;
    }
  };
  return (
    <div className={style.InputContainer}>
      <label className={style.label} htmlFor={name}>
        {label}
      </label>
      <div className={style.inputFieldContainer}>
        <input
          {...registorVar}
          type="text"
          id={name}
          name={name}
          placeholder="Uživatelský vstup"
          value={getInputValue()}
          onChange={handler()}
          disabled={isSubmitting}
          className={`${style.Input} ${errorClass}`}
          onFocus={handleInputFocus}
        />
        {selectedUniversity && isComboInput && (
          <button
            aria-label="Clear"
            onClick={clearInput}
            className={style.clearButton}
          >
            <span className={style.clearIcon}>&times;</span>
          </button>
        )}
        {isComboInput && (
          <div ref={anchorElRef} className={style.hiddenComboSection}></div>
        )}
      </div>
      {requiredError()}
    </div>
  );
};

export default Input;
