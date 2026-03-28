import {
  Pressable,
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { scale } from "react-native-size-matters";
import { Button, Toast, TextInputCustom } from "@/components/ui";
import { IconSymbol } from "@/components/ui";
import { OK_REPORT } from "@/constants/Validations";

type Props = {
  other: string;
  option: number;
  toast: boolean;
  setOther: (v: string) => void;
  setToast: (v: boolean) => void;
  changeOption: (opt: number) => void;
  handlePress: () => void;
};

export function ReportForm({ other, option, toast, setOther, setToast, changeOption, handlePress }: Props) {
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
        <ScrollView>
          <View style={styles.viewOptions}>
            <Pressable onPress={() => changeOption(2)}>
              <View style={option !== 2 ? styles.boxDefault : [styles.boxDefault, styles.boxActive]}>
                <IconSymbol size={35} name="money-off" color="#151718" />
                <Text style={styles.text}>Estan pidiendo dinero por esta mascota</Text>
              </View>
            </Pressable>
            <Pressable onPress={() => changeOption(1)}>
              <View style={option !== 1 ? styles.boxDefault : [styles.boxDefault, styles.boxActive]}>
                <IconSymbol size={35} name="alert" color="#151718" />
                <Text style={styles.text}>La información tiene contenido inapropiado</Text>
              </View>
            </Pressable>
            <TextInputCustom
              label={"Otro (" + (200 - other.length) + ")"}
              options={{
                value: other,
                onChangeText: (texto) => setOther(texto),
                placeholder: "Ingrese otro motivo",
                maxLength: 200,
                numberOfLines: 4,
              }}
              multiline={true}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <View style={styles.submit}>
        <Button label="Enviar" onPress={handlePress} />
      </View>
      <View style={styles.containerCenter}>
        {toast && <Toast validation={OK_REPORT} setToast={setToast} />}
      </View>
    </>
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
  submit: {
    marginBottom: scale(16),
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
});
