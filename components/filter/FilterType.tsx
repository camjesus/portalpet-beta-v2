import React from "react";
import { InputOption, IconSymbol } from "@/components/ui";
import { Type } from "@/models";

type Props = {
  type: string[];
  changeValue: (text: any, field: string) => void;
};

export default function FilterType({ type, changeValue }: Props) {
  const isDog = type.indexOf(Type.DOG) > -1;
  const isCat = type.indexOf(Type.CAT) > -1;

  function validateValue(opt: string) {
    let newType = [...type];
    const petType = opt === "optOne" ? Type.DOG : Type.CAT;
    const isSelected = newType.indexOf(petType) > -1;

    if (isSelected && newType.length > 1) {
      newType = newType.filter((p) => p !== petType);
    } else if (!isSelected) {
      newType.push(petType);
    }

    changeValue(newType, "type");
  }

  return (
    <>
      <InputOption
        title="Mascota"
        optOne={isDog}
        optTwo={isCat}
        changeOption={(opt) => {
          validateValue(opt);
        }}
        icon={[
          <IconSymbol
            size={30}
            name={"dog"}
            color={isDog ? "#4B4B4B" : "#A5A5A5"}
          />,
          <IconSymbol
            size={30}
            name={"cat"}
            color={isCat ? "#4B4B4B" : "#A5A5A5"}
          />,
        ]}
      />
    </>
  );
}
