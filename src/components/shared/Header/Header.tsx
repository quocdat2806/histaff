import React from 'react';
import { TouchableOpacity, View, StyleSheet, TextStyle, Insets, ViewStyle } from 'react-native';

import AppStyles from '@/style';
import { AppText } from '@/components/ui';
import { Colors } from '@/constants/colors';
import { IconSize, Spacing } from '@/constants/dimens';
import { SvgAssets } from '../../../../assets';

export interface AppHeaderProps {
  title: string;
  centerTitle?: boolean;
  isShowBackIcon?: boolean;
  onBackPress?: () => void;
  actions?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  centerTitle = false,
  isShowBackIcon = false,
  onBackPress,
  actions,
}) => {
  const {
    leftSectionStyle,
    rightSectionStyle,
    titleContainerStyle,
    titleTextStyle,
  } = getHeaderStyles({ centerTitle });
  return (
    <View style={[AppStyles.f_Row, AppStyles.a_center, styles.container]}>
      <View style={[AppStyles.f_Row, AppStyles.a_center, AppStyles.j_start, styles.leftSection, leftSectionStyle]}>
        {isShowBackIcon ? (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.backButton}
            hitSlop={styles.hitSlopIcon as Insets}
          >
            <SvgAssets.back
              fill={Colors.black}
              width={IconSize.sm}
              height={IconSize.sm}
            />
          </TouchableOpacity>
        ) : null}
      </View>
      <View style={[AppStyles.f_Row, AppStyles.a_center, styles.titleContainer, titleContainerStyle]}>
        <AppText variant="h3" style={titleTextStyle} numberOfLines={1}>
          {title}
        </AppText>
      </View>
      {actions ? (
        <View style={[AppStyles.f_Row, AppStyles.a_center, AppStyles.j_end, styles.rightSection, rightSectionStyle]}>
          <View style={[AppStyles.f_Row, AppStyles.a_center]}>{actions}</View>
        </View>
      ) : null}
    </View>
  );
};

interface GetHeaderStylesParams {
  centerTitle: boolean;
}

const getHeaderStyles = ({
  centerTitle,
}: GetHeaderStylesParams): {
  leftSectionStyle: ViewStyle;
  rightSectionStyle: ViewStyle;
  titleContainerStyle: ViewStyle;
  titleTextStyle: TextStyle;
} => {
  const leftSectionStyle: ViewStyle = {};
  const rightSectionStyle: ViewStyle = {};
  const titleContainerStyle: ViewStyle = {};
  const titleTextStyle: TextStyle = {};

  if (centerTitle) {
    leftSectionStyle.flex = 1;
    rightSectionStyle.flex = 1;
    titleContainerStyle.flex = 2;
    titleContainerStyle.justifyContent = 'center';
    titleTextStyle.textAlign = 'center';
  } else {
    titleContainerStyle.flex = 1;
    titleContainerStyle.justifyContent = 'flex-start';
    titleTextStyle.textAlign = 'left';
  }

  return {
    leftSectionStyle,
    rightSectionStyle,
    titleContainerStyle,
    titleTextStyle,
  };
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
  },
  leftSection: {
    minWidth: IconSize.md + Spacing.sm,
  },
  titleContainer: {
    flexShrink: 1,
  },
  rightSection: {
    minWidth: IconSize.md + Spacing.sm,
  },
  hitSlopIcon: {
    top: 8,
    bottom: 8,
    left: 8,
    right: 8,
  },
  backButton: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: Spacing.xs,
  },
});
