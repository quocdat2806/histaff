import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';
const Divider = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.border,
  },
});
