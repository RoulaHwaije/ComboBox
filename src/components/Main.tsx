import React, { useState } from "react";
import Input from "./Input";
import InputWrapper from "./InputWrapper";
import ComboBoxComponent from "./Combobox";
import style from "./Input.module.css";
import { SubmitHandler, useForm } from "react-hook-form";
import ComboBuilder from "./ComboBuilder";

const Main: React.FC = () => {
  const [OpenCombo, setOpenCombo] = useState(false);
  const [valueEntered, setvalueEntered] = useState("");
  const [searchingValue, setsearchingValue] = useState("");
  const [selectedUniversity, setselectedUniversity] = useState("");
  const [itemsArray, setitemsArray] = useState<string[]>([]);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [InputTyping, setInputTyping] = useState(false);

  interface MainProps {
    firstname: string;
    university: string;
  }
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<MainProps>();

  const onSubmit: SubmitHandler<MainProps> = (data) => {
    alert(
      `Jméno: ${data.firstname} , Univerzita: ${
        selectedUniversity ? selectedUniversity : "Toto pole je povinné."
      }`
    );
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setvalueEntered(newValue);
  };
  return (
    <div className={style.main}>
      <form className={style.formContainer} onSubmit={handleSubmit(onSubmit)}>
        <InputWrapper
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          handleChange={handleChange}
        >
          <Input
            name="firstname"
            label="Vaše křestní jméno"
            valueEntered={valueEntered}
            setvalueEntered={setvalueEntered}
            setitemsArray={setitemsArray}
            selectedUniversity={selectedUniversity}
            setselectedUniversity={setselectedUniversity}
            isComboInput={false}
          />
        </InputWrapper>

        <ComboBuilder
          register={register}
          errors={errors}
          isSubmitting={isSubmitting}
          name="university"
          label="Univerzita na kterou chodíte"
          searchingValue={searchingValue}
          setsearchingValue={setsearchingValue}
          itemsArray={itemsArray}
          setitemsArray={setitemsArray}
          setAnchorEl={setAnchorEl}
          setOpenCombo={setOpenCombo}
          selectedUniversity={selectedUniversity}
          setselectedUniversity={setselectedUniversity}
          InputTyping={InputTyping}
          setInputTyping={setInputTyping}
          isFormLibrary={false}
        >
          <ComboBoxComponent
            open={OpenCombo}
            setOpenCombo={setOpenCombo}
            itemsArray={itemsArray}
            anchorElement={anchorEl}
            selectedUniversity={selectedUniversity}
            setselectedUniversity={setselectedUniversity}
            InputTyping={InputTyping}
            setInputTyping={setInputTyping}
          />
        </ComboBuilder>

        <input
          className={style.button}
          type="submit"
          value="Odeslat"
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};
export default Main;
