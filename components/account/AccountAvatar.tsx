import { View, Text, Image, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { IconSymbol } from "@/components/ui";

type Props = {
  image: string;
  name: string;
  lastname: string;
};

export function AccountAvatar({ image, name, lastname }: Props) {
  const initials = `${name.charAt(0)}${lastname.charAt(0)}`.toUpperCase();
  const fullName = [name, lastname].filter(Boolean).join(" ");

  return (
    <View style={styles.container}>
      <View style={styles.avatarRing}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarFallback}>
            {initials ? (
              <Text style={styles.initials}>{initials}</Text>
            ) : (
              <IconSymbol name="account" size={40} color="#ffb13d" />
            )}
          </View>
        )}
      </View>
      {fullName ? <Text style={styles.name}>{fullName}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: scale(10),
  },
  avatarRing: {
    width: scale(80),
    height: scale(80),
    borderRadius: scale(40),
    borderWidth: 2,
    borderColor: "#ffb13d",
    overflow: "hidden",
  },
  avatar: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  avatarFallback: {
    flex: 1,
    backgroundColor: "rgba(255,177,61,0.15)",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    color: "#ffb13d",
    fontSize: scale(26),
    fontWeight: "bold",
  },
  name: {
    color: "white",
    fontSize: scale(16),
    fontWeight: "bold",
  },
});
