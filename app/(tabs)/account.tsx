import { StyleSheet, Text, View } from "react-native";
import {
  ViewCustom,
  Button,
  TextInputCustom,
  HeaderCustom,
} from "@/components/ui";
import { useEffect, useState } from "react";
import { User } from "@/models";
import { getUserAsync, saveUserAsync } from "@/services/storage/userStorage";
import { scale } from "react-native-size-matters";
import { cleanAllAsync } from "@/services/storage/userStorage";
import { router } from "expo-router";

export default function Account() {
  const [user, setUser] = useState<User | null>(null);
  const [edit, setEdit] = useState(false);

  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const storedUser = await getUserAsync();

    if (!storedUser) return;

    setUser(storedUser);
    setName(storedUser.name ?? "");
    setLastname(storedUser.lastname ?? "");
    setEmail(storedUser.email ?? "");
  };

  const updateUser = async () => {
    if (!user) return;

    const newUser: User = {
      ...user,
      name,
      lastname,
    };

    await saveUserAsync(newUser);

    setUser(newUser);
    setEdit(false);
  };

  const submit = async () => {
    if (edit) {
      await updateUser();
    } else {
      setEdit(true);
    }
  };

  const clearAll = async () => {
    await cleanAllAsync();
    router.replace("/signin");
  };

  return (
    <ViewCustom>
      <HeaderCustom title="Mis datos" />

      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.field}>Nombre</Text>
          <TextInputCustom
            options={{
              value: name,
              onChangeText: setName,
            }}
            editable={edit}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.field}>Apellido</Text>
          <TextInputCustom
            options={{
              value: lastname,
              onChangeText: setLastname,
            }}
            editable={edit}
          />
        </View>

        <View style={styles.row}>
          <Text style={styles.field}>Email</Text>
          <TextInputCustom
            options={{
              value: email,
            }}
            editable={false}
          />
        </View>

        <View style={styles.submit}>
          <Button
            label={edit ? "Guardar datos" : "Editar datos"}
            onPress={submit}
          />

          <Button label="Cerrar sesión" onPress={clearAll} />
        </View>
      </View>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: scale(30),
    gap: scale(30),
  },
  row: {
    marginTop: scale(20),
    marginHorizontal: scale(20),
    gap: scale(10),
  },
  field: {
    color: "white",
    fontSize: scale(18),
    fontWeight: "bold",
    marginHorizontal: scale(10),
  },
  submit: {
    marginTop: scale(20),
    marginBottom: scale(16),
    gap: scale(10),
  },
});
