import React from "react";
import InputOption from "@/components/ui/InputOption";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Sex } from "@/models/Enums";

type Props = {
  sex: string;
  changeValue: (text: string, field: string) => void;
};

export default function InputSex({ sex, changeValue }: Props) {
  return (
    <>
      <InputOption
        title="Sexo"
        optOne={sex === Sex.FEMALE}
        optTwo={sex === Sex.MALE}
        changeOption={(opt) => {
          changeValue(opt === "optOne" ? "FEMALE" : "MALE", "sex");
        }}
        icon={[
          <IconSymbol
            size={25}
            name={"female"}
            color={sex === Sex.FEMALE ? "#4B4B4B" : "#A5A5A5"}
          />,
          <IconSymbol
            size={25}
            name={"male"}
            color={sex === Sex.MALE ? "#4B4B4B" : "#A5A5A5"}
          />,
        ]}
      />
    </>
  );
}
