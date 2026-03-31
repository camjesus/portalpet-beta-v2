import { StyleSheet, View } from "react-native";
import { ViewCustom, HeaderCustom } from "@/components/ui";
import { scale } from "react-native-size-matters";
import { useAccount } from "@/features/account/hooks/useAccount";
import {
  AdoptionProfileCard,
  LogoutCard,
  InfoCard,
  AccountAvatar,
} from "@/components/account";

export default function Account() {
  const { name, lastname, email, image, bio, saveBio, clearAll } = useAccount();

  return (
    <ViewCustom>
      <HeaderCustom title="Mis datos" />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <AccountAvatar image={image} name={name} lastname={lastname} />
          <InfoCard email={email} bio={bio} onSaveBio={saveBio} />
          <AdoptionProfileCard />
        </View>
        <LogoutCard onPress={clearAll} />
      </View>
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: scale(30),
  },
  container: {
    marginTop: scale(30),
    gap: scale(20),
  },
});
