import React from "react";
import InputOption from "@/components/ui/InputOption";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Sex } from "@/models/Enums";

type Props = {
  sex: string[];
  changeValue: (text: any, field: string) => void;
};

export default function FilterSex({ sex, changeValue }: Props) {
  const isFemale = sex.indexOf(Sex.FEMALE) > -1;
  const isMale = sex.indexOf(Sex.MALE) > -1;

  console.log("sex", sex);
  function validateValue(opt: string) {
    if (isFemale && opt === "optOne" && isMale) {
      sex = sex.filter((pe) => pe !== Sex.FEMALE);
    } else if (opt === "optOne" && isMale) {
      sex.push(Sex.FEMALE);
    }

    if (isMale && opt === "optTwo" && isFemale) {
      sex = sex.filter((pe) => pe !== Sex.MALE);
    } else if (opt === "optTwo" && isFemale) {
      sex.push(Sex.MALE);
    }
    changeValue(sex, "sex");
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
