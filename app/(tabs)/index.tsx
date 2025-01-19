import 'react-native-gesture-handler';
import { Text, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import HeaderCustom from '@/components/ui/HeaderCustom';

export default function Search() {
	return (
		<ParallaxScrollView>
			<HeaderCustom title="Portal Pet" />
			<Text style={styles.daleeeeAMEEEAAa}>DALE WACHAAAA!!!</Text>
		</ParallaxScrollView>
	);
}

const styles = StyleSheet.create({
	daleeeeAMEEEAAa: {
		flex: 1,
		marginTop: 400,
		textAlign: 'center',
		color: '#FFFFFF',
		fontSize: 26,
		textTransform: 'capitalize'
	}
});
