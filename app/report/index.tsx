import Button from "@/components/ui/Button";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TextInputCustom from "@/components/ui/TextInputCustom";
import ViewCustom from "@/components/ViewCustom";
import { reportPetAsync } from "@/service/useReportDataBase";
import { Link, router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View, Text, TextInput } from "react-native";
import { scale } from "react-native-size-matters";
import Toast from "@/components/ui/Toast";
import { ScrollView } from "react-native-gesture-handler";

export default function ReportIndex() {
  const [other, setOther] = useState("");
  const [option, setOption] = useState(0);
  const [toast, setToast] = useState(false);
  const { petId } = useLocalSearchParams<{
    petId: string;
  }>();

  console.log(petId);
  const sendReport = async () => {
    await reportPetAsync({
      idPet: petId,
      idReporter: "",
      option: option,
      description: other,
      createDate: new Date(),
    }).then(() => {
      router.push({ pathname: "/(tabs)", params: { search: "yes" } });
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

  return (
    <ViewCustom>
      <HeaderCustom
        title="Reportar"
        childrenLeft={
          <Link href={"../"}>
            <IconSymbol size={30} name="arrow-back" color="white" />
          </Link>
        }
      />
      <ScrollView>
        <View style={styles.viewOptions}>
          <Pressable onPress={() => changeOption(2)}>
            <View
              style={
                option !== 2
                  ? styles.boxDefault
                  : [styles.boxDefault, styles.boxActive]
              }
            >
              <IconSymbol size={35} name="money-off" color="#151718" />

              <Text style={styles.text}>
                Estan pidiendo dinero por esta mascota
              </Text>
            </View>
          </Pressable>

          <Pressable onPress={() => changeOption(1)}>
            <View
              style={
                option !== 1
                  ? styles.boxDefault
                  : [styles.boxDefault, styles.boxActive]
              }
            >
              <IconSymbol size={35} name="alert" color="#151718" />

              <Text style={styles.text}>
                La información tiene contenido inapropiado
              </Text>
            </View>
          </Pressable>
          <TextInputCustom
            label={"Otro (" + (200 - other.length) + ")"}
            options={{
              value: other,
              onChangeText: (texto) => {
                setOther(texto);
              },
              placeholder: "Ingrese otro motivo",
              maxLength: 200,
              numberOfLines: 4,
            }}
            multiline={true}
          />
        </View>
      </ScrollView>
      <View style={styles.submit}>
        <Button label="Enviar" onPress={handlePress} />
      </View>
      <View style={styles.containerCenter}>
        {toast && (
          <Toast
            title="Eureka!"
            message="Se ha enviado el reporte, estamos solucionando el problema."
            setToast={setToast}
          />
        )}
      </View>
    </ViewCustom>
  );
}
const styles = StyleSheet.create({
  viewOptions: {
    flex: 1,
    marginHorizontal: scale(15),
    gap: scale(20),
    marginTop: scale(40),
  },
  containerCenter: {
    alignItems: "center",
    marginTop: scale(16),
    marginHorizontal: scale(20),
  },
  textInput: {
    marginHorizontal: scale(10),
  },
  submit: {
    marginBottom: scale(16),
  },
  title: {
    color: "#4B4B4B",
    fontSize: scale(25),
    fontWeight: "bold",
  },
  viewR: {
    flexDirection: "row",
  },
  boxDefault: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: scale(15),
    marginHorizontal: scale(30),
    marginBottom: scale(20),
    paddingBottom: scale(30),
    borderRadius: 10,
    backgroundColor: "white",
    borderWidth: 3,
    borderColor: "white",
  },
  boxActive: {
    backgroundColor: "#ffb13d",
    borderWidth: 3,
    borderColor: "white",
  },
  text: {
    fontSize: scale(20),
    textAlign: "center",
    paddingHorizontal: scale(15),
    color: "#151718",
  },
  other: {
    marginBottom: 3,
    backgroundColor: "white",
    fontSize: scale(15),
  },
});
