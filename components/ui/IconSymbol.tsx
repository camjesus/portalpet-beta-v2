// This file is a fallback for using MaterialIcons on Android and web.

import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, ViewStyle } from 'react-native';

// Add your SFSymbol to Ionicons mappings here.
const MAPPING = {
  // See Ionicons here: https://icons.expo.fyi
  // See SF Symbols in the SF Symbols app on Mac.
  'chat': 'chat',
  'paw': 'paw',
  'search': 'magnify',
  'add': 'plus',
  'arrow-back': 'arrow-left',
  'male': 'gender-male',
  'female': 'gender-female',
  'cat': 'cat',
  'dog': 'dog',
  'add-image':'camera-plus',
  'add-location': 'map-marker-plus',
  'clipboard': 'clipboard-text',
  'filter': 'filter',
  'bullhorn': 'bullhorn',
  'money-off': 'currency-usd-off',
  'alert': 'alert-outline'
};

export type IconSymbolName = keyof typeof MAPPING;

/**
 * An icon component that uses native SFSymbols on iOS, and MaterialIcons on Android and web. This ensures a consistent look across platforms, and optimal resource usage.
 *
 * Icon `name`s are based on SFSymbols and require manual mapping to MaterialIcons.
 */
export function IconSymbol({
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
  return <MaterialCommunityIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
