import { StyleSheet } from 'react-native';
import { BorderRadius, FontSize, Spacing, Width } from '@/constants/dimens';
import { Colors } from '@/constants/colors';
import { scale } from 'react-native-size-matters';

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
  gap4: {
    gap: Spacing.xxs,
  },
  gap8: {
    gap: Spacing.xs,
  },
  gap10: {
    gap: Spacing.sm,
  },
  gap12: {
    gap: Spacing.md,
  },
  gap16: {
    gap: Spacing.lg,
  },
  gap20: {
    gap: Spacing.xl,
  },
  gap24: {
    gap: Spacing.xxl,
  },
  gap28: {
    gap: Spacing.xxxl,
  },
  gap32: {
    gap: Spacing.xxxxl,
  },
  gap36: {
    gap: Spacing.xxxxxl,
  },
  gap40: {
    gap: Spacing.xxxxxxl,
  },
  borderRadius4: {
    borderRadius: BorderRadius.sm,
  },
  borderRadius8: {
    borderRadius: BorderRadius.md,
  },
  borderRadius12: {
    borderRadius: BorderRadius.xl,
  },
  borderRadius16: {
    borderRadius: BorderRadius.xxl,
  },
  borderRadius20: {
    borderRadius: BorderRadius.xxxl,
  },
  borderRadius24: {
    borderRadius: BorderRadius.xxxxl,
  },
  borderRadius28: {
    borderRadius: BorderRadius.xxxxxl,
  },
  borderRadius32: {
    borderRadius: BorderRadius.xxxxxxl,
  },
  borderRound: {
    borderRadius: BorderRadius.rounded,
  },
  padding0: {
    padding: 0,
  },
  padding4: {
    padding: Spacing.xxs,
  },
  padding8: {
    padding: Spacing.xs,
  },
  padding10: {
    padding: Spacing.sm,
  },
  padding12: {
    padding: Spacing.md,
  },
  padding16: {
    padding: Spacing.lg,
  },
  padding20: {
    padding: Spacing.xl,
  },
  padding24: {
    padding: Spacing.xxl,
  },
  padding28: {
    padding: Spacing.xxxl,
  },
  paddingTop0: {
    paddingTop: 0,
  },
  paddingTop4: {
    paddingTop: Spacing.xxs,
  },
  paddingTop8: {
    paddingTop: Spacing.xs,
  },
  paddingTop10: {
    paddingTop: Spacing.sm,
  },
  paddingTop12: {
    paddingTop: Spacing.md,
  },
  paddingTop16: {
    paddingTop: Spacing.lg,
  },
  paddingTop20: {
    paddingTop: Spacing.xl,
  },
  paddingTop24: {
    paddingTop: Spacing.xxl,
  },
  paddingTop28: {
    paddingTop: Spacing.xxxl,
  },

  paddingVertical4: {
    paddingVertical: Spacing.xxs,
  },
  paddingVertical8: {
    paddingVertical: Spacing.xs,
  },
  paddingVertical10: {
    paddingVertical: Spacing.sm,
  },
  paddingVertical12: {
    paddingVertical: Spacing.md,
  },
  paddingVertical16: {
    paddingVertical: Spacing.lg,
  },
  paddingVertical20: {
    paddingVertical: Spacing.xl,
  },
  paddingVertical24: {
    paddingVertical: Spacing.xxl,
  },
  paddingVertical28: {
    paddingVertical: Spacing.xxxl,
  },
  paddingVertical32: {
    paddingVertical: Spacing.xxxxl,
  },
  paddingHorizontal4: {
    paddingHorizontal: Spacing.xxs,
  },
  paddingHorizontal8: {
    paddingHorizontal: Spacing.xs,
  },
  paddingHorizontal10: {
    paddingHorizontal: Spacing.sm,
  },
  paddingHorizontal12: {
    paddingHorizontal: Spacing.md,
  },
  paddingHorizontal16: {
    paddingHorizontal: Spacing.lg,
  },
  paddingHorizontal20: {
    paddingHorizontal: Spacing.xl,
  },
  paddingHorizontal24: {
    paddingHorizontal: Spacing.xxl,
  },
  paddingHorizontal28: {
    paddingHorizontal: Spacing.xxxl,
  },
  paddingHorizontal32: {
    paddingHorizontal: Spacing.xxxxl,
  },

  marginRight4: {
    marginRight: Spacing.xxs,
  },
  marginRight8: {
    marginRight: Spacing.xs,
  },
  marginRight10: {
    marginRight: Spacing.sm,
  },
  marginRight12: {
    marginRight: Spacing.md,
  },
  marginRight16: {
    marginRight: Spacing.lg,
  },
  marginRight20: {
    marginRight: Spacing.xl,
  },
  marginRight24: {
    marginRight: Spacing.xxl,
  },
  marginRight28: {
    marginRight: Spacing.xxxl,
  },
  marginRight32: {
    marginRight: Spacing.xxxxl,
  },
  marginBottom0: {
    marginBottom: 0,
  },
  marginBottom4: {
    marginBottom: Spacing.xxs,
  },
  marginBottom8: {
    marginBottom: Spacing.xs,
  },
  marginBottom10: {
    marginBottom: Spacing.sm,
  },
  marginBottom12: {
    marginBottom: Spacing.md,
  },
  marginBottom16: {
    marginBottom: Spacing.lg,
  },
  marginTop0: {
    marginTop: 0,
  },
  marginTop4: {
    marginTop: Spacing.xxs,
  },
  marginTop8: {
    marginTop: Spacing.xs,
  },

  marginTop10: {
    marginTop: Spacing.sm,
  },
  marginTop12: {
    marginTop: Spacing.md,
  },
  marginTop16: {
    marginTop: Spacing.lg,
  },
  marginTop20: {
    marginTop: Spacing.xl,
  },

  marginTop24: {
    marginTop: Spacing.xxl,
  },
  marginTop28: {
    marginTop: Spacing.xxxl,
  },
  marginTop32: {
    marginTop: Spacing.xxxxl,
  },

  marginLeft4: {
    marginLeft: Spacing.xxs,
  },
  marginLeft8: {
    marginLeft: Spacing.xs,
  },
  marginLeft10: {
    marginLeft: Spacing.sm,
  },
  marginLeft12: {
    marginLeft: Spacing.md,
  },
  marginLeft16: {
    marginLeft: Spacing.lg,
  },
  marginLeft20: {
    marginLeft: Spacing.xl,
  },
  marginLeft24: {
    marginLeft: Spacing.xxl,
  },
  marginLeft28: {
    marginLeft: Spacing.xxxl,
  },
  marginLeft32: {
    marginLeft: Spacing.xxxxl,
  },

  marginHorizontal4: {
    marginHorizontal: Spacing.xxs,
  },
  marginHorizontal8: {
    marginHorizontal: Spacing.xs,
  },
  marginHorizontal10: {
    marginHorizontal: Spacing.sm,
  },
  marginHorizontal16: {
    marginHorizontal: Spacing.lg,
  },
  marginHorizontal20: {
    marginHorizontal: Spacing.xl,
  },
  marginHorizontal24: {
    marginHorizontal: Spacing.xxl,
  },
  marginHorizontal28: {
    marginHorizontal: Spacing.xxxl,
  },
  backGroundTransparent: {
    backgroundColor: Colors.transparent,
  },
  backGroundWhite: {
    backgroundColor: Colors.white,
  },
  backGroundInput: {
    backgroundColor: Colors.inputBackground,
  },
  backGroundModal: {
    backgroundColor: Colors.modalBackground,
  },
  backGroundPrimary: {
    backgroundColor: Colors.primary,
  },
  backGroundError: {
    backgroundColor: Colors.error,
  },
  backGroundSuccess: {
    backgroundColor: Colors.success,
  },
  backGroundDisabled: {
    backgroundColor: Colors.disabled,
  },
  borderDefault: {
    borderColor: Colors.border,
  },
  borderError: {
    borderColor: Colors.error,
  },
  borderSuccess: {
    borderColor: Colors.success,
  },
  borderDisabled: {
    borderColor: Colors.disabled,
  },
  border0: {
    borderWidth: 0,
  },
  border1: {
    borderWidth: 1,
  },
  border2: {
    borderWidth: 2,
  },

  modalContainer: {
    width: Width.fullScreenDimensionWidth * 0.85,
    overflow: 'hidden',
    backgroundColor: Colors.white,
    height: 'auto',
  },
  width100Percent: {
    width: '100%',
  },
  height100Percent: {
    height: '100%',
  },
  flexGrow1: {
    flexGrow: 1,
  },
  opacity06: {
    opacity: 0.6,
  },
  defaultInputStyle: {
    fontSize: FontSize.body,
    color: Colors.black,
  },
  inputHeight36: {
    height: scale(36),
  },
  inputHeight44: {
    height: scale(44),
  },
  inputHeight52: {
    height: scale(52),
  },
});

export default AppStyles;
