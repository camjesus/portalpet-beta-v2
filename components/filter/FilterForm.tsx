import { View, StyleSheet } from "react-native";
import { scale } from "react-native-size-matters";
import { InputAge, Button } from "@/components/ui";
import {
  FilterRadius,
  FilterSex,
  FilterSize,
  FilterType,
} from "@/components/filter";
import { initialFilter } from "@/hooks/reducers/useFilter";

interface Props {
  filter: (typeof initialFilter)["filter"];
  changeValue: (value: any, field: string) => void;
  changeFrom: (value: any, field: string) => void;
  changeUntil: (value: any, field: string) => void;
  onSave: () => void;
}

export function FilterForm({
  filter,
  changeValue,
  changeFrom,
  changeUntil,
  onSave,
}: Props) {
  return (
    <View style={styles.container}>
      <View style={[styles.row, { gap: scale(50) }]}>
        <FilterType type={filter.type} changeValue={changeValue} />
        <FilterSex sex={filter.sex} changeValue={changeValue} />
      </View>
      <View style={[styles.row, { gap: scale(5) }]}>
        <FilterSize size={filter.size} changeValue={changeValue} />
      </View>
      <View style={[styles.row, { gap: scale(5) }]}>
        <InputAge
          title="Desde"
          age={filter.from.age ? filter.from.age.toString() : ""}
          type={filter.from.ageType}
          changeAge={changeFrom}
          changeAgeType={changeFrom}
        />
        <InputAge
          title="Hasta"
          age={filter.until.age ? filter.until.age.toString() : ""}
          type={filter.until.ageType}
          changeAge={changeUntil}
          changeAgeType={changeUntil}
        />
      </View>
      <View style={styles.row}>
        <FilterRadius
          radius={filter.radiusKm ?? 10}
          changeValue={changeValue}
        />
      </View>
      <View style={styles.submit}>
        <Button label="Guardar" onPress={onSave} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  submit: { marginBottom: scale(16) },
  row: { flexDirection: "row", marginHorizontal: "auto", marginTop: scale(16) },
  container: {
    flex: 1,
    marginTop: scale(16),
    gap: scale(20),
    alignItems: "center",
  },
});
