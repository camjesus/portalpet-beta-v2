import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { SymbolWeight } from "expo-symbols";
import React, { JSX } from "react";
import { OpaqueColorValue, StyleProp, ViewStyle } from "react-native";
import { CatIcon, DogIcon, MaleIcon, FemaleIcon } from "@/assets/icons";

const MAPPING: Record<string, keyof typeof MaterialCommunityIcons.glyphMap> = {
  chat: "chat",
  paw: "paw",
  search: "magnify",
  add: "plus",
  "arrow-back": "arrow-left",
  "arrow-next": "arrow-right",
  male: "gender-male",
  female: "gender-female",
  "add-image": "camera-plus",
  "add-location": "map-marker-plus",
  clipboard: "clipboard-text",
  filter: "filter",
  bullhorn: "bullhorn",
  "money-off": "currency-usd-off",
  alert: "alert-outline",
  account: "account",
  edit: "pencil",
  "folder-search": "folder-search",
  send: "send",
  gallery: "image-multiple",
  close: "close",
  check: "check",
  help: "help",
  heart: "heart",
  "heart-outline": "heart-outline",
  "clipboard-arrow-up-outline": "clipboard-arrow-up-outline",
  "clipboard-clock-outline": "clipboard-clock-outline",
  "chevron-down": "chevron-down",
  clock: "clock",
  calendar: "calendar",
  "dots-vertical": "dots-vertical",
  pin: "pin",
  "pin-off": "pin-off",
  email: "email-outline",
  "text-account": "text-account",
  location: "map-marker",
  delete: "delete",
  sort: "sort",
};

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */

// en el componente, manejás los custom aparte:
const CUSTOM_ICONS: Partial<Record<string, (props: any) => JSX.Element>> = {
  cat: CatIcon,
  dog: DogIcon,
  male: MaleIcon,
  female: FemaleIcon,
};

export default function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
    const CustomIcon = CUSTOM_ICONS[name];
  
  if (CustomIcon) {
    return <CustomIcon size={size} color={color} />;
  }
  return (
    <MaterialCommunityIcons
      color={color}
      size={size}
      name={MAPPING[name]}
      style={style}
    />
  );
}
