import { StyleSheet, Text, View } from "react-native";
import ViewCustom from "@/components/ViewCustom";
import HeaderCustom from "@/components/ui/HeaderCustom";
import { useEffect, useState } from "react";
import { User } from "@/models/User";
import { getUserAsync, updateUserAsync } from "@/service/storeData/useUser";
import { scale } from "react-native-size-matters";
import TextInputCustom from "@/components/ui/TextInputCustom";
import Button from "@/components/ui/Button";

export default function Account() {
  const [user, setUser] = useState<User>();
  const [labelButton, setLabelButton] = useState("Editar datos");
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.name);
  const [lastname, setLastname] = useState(user?.lastname);
  const [email, setEmail] = useState(user?.email);

  const getUser = async () => {
    await getUserAsync().then((user) => {
      console.log("user", user);
      setUser(user);
      setName(user.name);
      setLastname(user.lastname);
      setEmail(user.email);
    });
  };
  const updateUser = async () => {
    const newUser: User = {
      id: user ? user.id : null,
      name: name ? name : null,
      lastname: lastname ? lastname : null,
      email: user ? user?.email : null,
    };
    await updateUserAsync(newUser);
    setEdit(false);
    setLabelButton("Editar");
  };

  function submit() {
    if (edit) {
      updateUser();
    }
    setEdit(!edit);
    setLabelButton("Guardar");
  }

  useEffect(() => {
    if (user === undefined) {
      getUser();
    }
  }, [user]);

  return (
    <ViewCustom>
      <HeaderCustom title="Mis datos" />
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.field}>Nombre </Text>
          <TextInputCustom
            options={{
              value: name ? name : "",
              onChangeText: (t) => setName(t),
              placeholder: name ? name : "",
            }}
            editable={edit}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.field}>Apellido </Text>
          <TextInputCustom
            options={{
              value: lastname ? lastname : "",
              onChangeText: (t) => setLastname(t),
              placeholder: lastname ? lastname : "",
            }}
            editable={edit}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.field}>Email </Text>
          <TextInputCustom
            options={{
              value: email ? email : "",
              onChangeText: (t) => setEmail(t),
              placeholder: email ? email : "",
            }}
            editable={false}
          />
        </View>
        <View style={styles.submit}>
          <Button label={labelButton} onPress={submit} />
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
  },
});
