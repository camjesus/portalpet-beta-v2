import { SymbolView, SymbolViewProps, SymbolWeight } from "expo-symbols";
import { StyleProp, ViewStyle } from "react-native";
  import { CatIcon , DogIcon, MaleIcon, FemaleIcon} from "@/assets/icons";
import { JSX } from "react";


const MAPPING: Record<string, SymbolViewProps["name"]> = {
  chat: "message.fill",
  paw: "pawprint.fill",
  search: "magnifyingglass",
  add: "plus",
  "arrow-back": "chevron.left",
  "arrow-next": "chevron.right",
  cat: "cat.fill",
  dog: "dog.fill",
  "add-image": "camera",
  "add-location": "mappin.and.ellipse",
  clipboard: "doc.text",
  filter: "line.3.horizontal.decrease",
  bullhorn: "megaphone",
  "money-off": "dollarsign.slash",
  alert: "exclamationmark.triangle",
  account: "person.fill",
  edit: "pencil",
  "folder-search": "folder.badge.magnifyingglass",
  send: "paperplane",
  gallery: "photo.on.rectangle",
  close: "xmark",
  check: "checkmark",
  help: "questionmark.circle",
  heart: "heart.fill",
  "heart-outline": "heart",
  "clipboard-arrow-up-outline": "list.clipboard",
  "clipboard-clock-outline": "list.clipboard",
  "chevron-down": "chevron.down",
  "chevron-right": "chevron.right",
  clock: "clock",
  calendar: "calendar",
  "dots-vertical": "ellipsis",
  pin: "pin",
  "pin-off": "pin.slash",
  email: "envelope",
  "text-account": "person.text.rectangle",
  location: "mappin.and.ellipse",
  delete: "trash",
  sort: "arrow.up.arrow.down",
};

export default function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight = "regular",
}: {
  name: keyof typeof MAPPING;
  size?: number;
  color: string;
  style?: StyleProp<ViewStyle>;
  weight?: SymbolWeight;
}) {
  
  // en el componente, manejás los custom aparte:
  const CUSTOM_ICONS: Partial<Record<string, (props: any) => JSX.Element>> = {
    cat: CatIcon,
    dog: DogIcon,
    male: MaleIcon,
    female: FemaleIcon,
  };
  const CustomIcon = CUSTOM_ICONS[name];
  
  if (CustomIcon) {
    return <CustomIcon size={size} color={color} />;
  }

  return (
    <SymbolView
      weight={weight}
      tintColor={color}
      resizeMode="scaleAspectFit"
      name={MAPPING[name]}
      style={[{ width: size, height: size }, style]}
    />
  );
}