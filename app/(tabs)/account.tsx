import { StyleSheet, View } from "react-native";
import { ViewCustom, HeaderCustom } from "@/components/ui";
import { scale } from "react-native-size-matters";
import { useAccount } from "@/features/account/hooks/useAccount";
import {
  AdoptionProfileCard,
  LogoutCard,
  InfoCard,
} from "@/components/account";

export default function Account() {
  const { name, lastname, email, clearAll } = useAccount();

  return (
    <ViewCustom>
      <HeaderCustom title="Mis datos" />
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <InfoCard name={name} lastname={lastname} email={email} />
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
