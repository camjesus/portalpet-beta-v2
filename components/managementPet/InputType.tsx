import React from "react";
import { InputOption, IconSymbol } from "@/components/ui";
import { Type } from "@/models";

type Props = {
  type: string;
  changeValue: (text: string, field: string) => void;
};

export default function InputType({ type, changeValue }: Props) {
  return (
    <>
      <InputOption
        title="Mascota"
        optOne={type === Type.DOG}
        optTwo={type === Type.CAT}
        changeOption={(opt) => {
          changeValue(opt === "optOne" ? Type.DOG : Type.CAT, "type");
        }}
        icon={[
          <IconSymbol
            size={25}
            name={"dog"}
            color={type === Type.DOG ? "#4B4B4B" : "#A5A5A5"}
          />,
          <IconSymbol
            size={25}
            name={"cat"}
            color={type === Type.CAT ? "#4B4B4B" : "#A5A5A5"}
          />,
        ]}
      />
    </>
  );
}
