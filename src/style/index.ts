import { StyleSheet } from "react-native";

const AppStyles = StyleSheet.create({
  f_1: {
    flex: 1,
  },
  f_Row: {
    flexDirection: 'row',
  },
  f_Column: {
    flexDirection: 'column',
  },
  j_spaceBetween: {
    justifyContent: 'space-between',
  },
  j_spaceAround: {
    justifyContent: 'space-around',
  },
  j_spaceEvenly: {
    justifyContent: 'space-evenly',
  },
  j_center: {
    justifyContent: 'center',
  },
  j_start: {
    justifyContent: 'flex-start',
  },
  j_end: {
    justifyContent: 'flex-end',
  },

  a_center: {
    alignItems: 'center',
  },
  a_start: {
    alignItems: 'flex-start',
  },
  a_end: {
    alignItems: 'flex-end',
  },
  a_stretch: {
    alignItems: 'stretch',
  },
  a_baseline: {
    alignItems: 'baseline',
  },

});

export default AppStyles;