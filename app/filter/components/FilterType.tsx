import React from "react";
import InputOption from "@/components/ui/InputOption";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { Type } from "@/models/Enums";

type Props = {
  type: string[];
  changeValue: (text: any, field: string) => void;
};

export default function FilterType({ type, changeValue }: Props) {
  const isDog = type.indexOf(Type.DOG) > -1;
  const isCat = type.indexOf(Type.CAT) > -1;

  function validateValue(opt: string) {
    if (isDog && opt === "optOne" && isCat) {
      type = type.filter((pe) => pe !== Type.DOG);
    } else if (opt === "optOne" && isCat) {
      type.push(Type.DOG);
    }

    if (isCat && opt === "optTwo" && isDog) {
      type = type.filter((pe) => pe !== Type.CAT);
    } else if (opt === "optTwo" && isDog) {
      type.push(Type.CAT);
    }
    changeValue(type, "type");
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
            size={25}
            name={"dog"}
            color={isDog ? "#4B4B4B" : "#A5A5A5"}
          />,
          <IconSymbol
            size={25}
            name={"cat"}
            color={isCat ? "#4B4B4B" : "#A5A5A5"}
          />,
        ]}
      />
    </>
  );
}
