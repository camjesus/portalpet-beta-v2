import { useState } from "react";
import { useLocalSearchParams, router } from "expo-router";
import { reportPetAsync } from "@/services/dataBase/useReport";

export function useReport() {
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const [other, setOther] = useState("");
  const [option, setOption] = useState(0);
  const [toast, setToast] = useState(false);

  const sendReport = async () => {
    await reportPetAsync({
      idPet: petId,
      idReporter: "",
      option: option,
      description: other,
      createDate: new Date(),
    }).then(() => {
      router.push({ pathname: "/(tabs)/home", params: { search: "yes" } });
    });
  };

  function handlePress() {
    setToast(true);
    sendReport();
  }

  function changeOption(opt: number) {
    if (option === opt) {
      setOption(0);
    } else {
      setOption(opt);
    }
  }

  return { other, setOther, option, toast, setToast, handlePress, changeOption };
}
