import { View } from "react-native";
import TextInputCustom from "@/components/ui/TextInputCustom";
import CheckBox from "@/components/ui/CheckBox";
import React from "react";

type Props = {
  name: string;
  changeName: (text: string, field: string ) => void;
  changeNoName: () => void;
  noName: boolean;
};

export default function InputName({
  name,
  noName,
  changeName,
  changeNoName,
}: Props) {
  return (
    <>
      <View style={{ width: "50%" }}>
        <TextInputCustom
          options={{
            value: name,
            onChangeText: (t) => changeName(t, "name"),
            placeholder: noName ? "No tiene" : "Nombre",
          }}
          editable={!noName}
        />
      </View>

      <CheckBox label="No tiene" active={noName} onPress={changeNoName} />
    </>
  );
}
