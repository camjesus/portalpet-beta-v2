import React from "react";
import { InputOption, IconSymbol } from "@/components/ui";
import { Sex } from "@/models";

type Props = {
  sex: string[];
  changeValue: (text: any, field: string) => void;
};

export default function FilterSex({ sex, changeValue }: Props) {
  const isFemale = sex.indexOf(Sex.FEMALE) > -1;
  const isMale = sex.indexOf(Sex.MALE) > -1;

  function validateValue(opt: string) {
    let newSex = [...sex];
    const sexType = opt === "optOne" ? Sex.FEMALE : Sex.MALE;
    const isSelected = newSex.indexOf(sexType) > -1;

    if (isSelected && newSex.length > 1) {
      newSex = newSex.filter((s) => s !== sexType);
    } else if (!isSelected) {
      newSex.push(sexType);
    }

    changeValue(newSex, "sex");
  }

  return (
    <>
      <InputOption
        title="Sexo"
        optOne={isFemale}
        optTwo={isMale}
        changeOption={(opt) => {
          validateValue(opt);
        }}
        icon={[
          <IconSymbol
            size={25}
            name={"female"}
            color={isFemale ? "#4B4B4B" : "#A5A5A5"}
          />,
          <IconSymbol
            size={25}
            name={"male"}
            color={isMale ? "#4B4B4B" : "#A5A5A5"}
          />,
        ]}
      />
    </>
  );
}
