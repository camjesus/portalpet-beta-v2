import { FlatList, StyleSheet, View, Pressable, Image, Text } from "react-native";
import {
  ViewCustom,
  PanelButtons,
  IconSymbol,
  Loading,
} from "@/components/ui";
import { scale } from "react-native-size-matters";
import { PetCard } from "@/components/search/PetCard";
import { LABELS_ACCTION } from "@/constants/StaticData";
import { useHome } from "@/features/pet/hooks/useHome";
import { EmptyState } from "@/components/home/EmptyState";
import { logo } from "@/assets/images";
import { SortModal } from "@/components/home/SortModal";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

export default function Home() {
  const { myPets, load, optAction, goToFilter, changeValue, sort, setSort, showSortModal, setShowSortModal } = useHome();

  return (
    <ViewCustom>
      <View style={styles.header}>
        <Pressable onPress={goToFilter}>
          <IconSymbol size={26} name="filter" color="white" />
        </Pressable>
        <View style={styles.headerCenter}>
          <Image source={logo} style={styles.logo} />
          <Text style={styles.headerTitle}>Portal Pet</Text>
        </View>
        <View style={styles.headerActions}>
        <Pressable onPress={() => setShowSortModal(true)}>
          <IconSymbol size={26} name="sort" color="white" />
        </Pressable>
        </View>
      </View>

      {load && <Loading />}

      {!load && myPets.length > 0 && (
        <FlatList
          data={myPets}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => <PetCard item={item} />}
        />
      )}

      {!load && myPets.length === 0 && <EmptyState onPress={goToFilter} />}

      {!load && (
        <View style={styles.containerCenter} pointerEvents="box-none">
          <PanelButtons
            option={optAction}
            labels={LABELS_ACCTION}
            changeOption={changeValue}
          />
        </View>
      )}

      <SortModal
        visible={showSortModal}
        selected={sort}
        onSelect={setSort}
        onClose={() => setShowSortModal(false)}
      />
    </ViewCustom>
  );
}

const styles = StyleSheet.create({
  headerActions: {
  flexDirection: "row",
  alignItems: "center",
  gap: scale(12),
},
  header: {                                                                              
    flexDirection: "row",                                                                
    alignItems: "center",                                                                
    backgroundColor: "#ffb13d",                                                          
    paddingHorizontal: scale(20),                                                        
    paddingTop: scale(60),                                                               
    paddingBottom: scale(12),                                                            
    borderBottomLeftRadius: 25,                                                          
    borderBottomRightRadius: 25,                                                         
  },                                                                                     
  headerSide: {                                                                          
    flex: 1,                                                                             
    alignItems: "flex-end",                                                              
  },                                                                                     
  headerCenter: {                                                                        
    flex: 3,                                                                             
    flexDirection: "row",                                                                
    alignItems: "center",                                                                
    justifyContent: "center",                                                            
    gap: scale(8),                                                                       
  },                                                                                     
  headerTitle: {         
    textAlign: "center",                                                                
    color: "white",                                                                      
    fontSize: scale(25),                                                                 
    fontWeight: "bold",                                                                  
  },                                                                                     
  logo: {                                                                                
    width: scale(26),                                                                    
    height: scale(26),                                                                   
    resizeMode: "contain",                                                               
  }, 
  containerCenter: {
    position: "absolute",
    paddingTop: scale(110),
    left: 0,
    right: 0,
    alignItems: "center",
  },
  list: {
    paddingHorizontal: scale(16),
    paddingTop: scale(60),
    paddingBottom: scale(40),
  },
});
