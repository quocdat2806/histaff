import React from 'react';
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';

import AppStyles from '@/style';
import { AppText, AppTextProps } from '@/components/ui';
import { Colors } from '@/constants/colors';
import { Spacing } from '@/constants/dimens';

type TextOverrides = Omit<Partial<AppTextProps>, 'children'>;

export interface AppEmptyListProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  titleTextProps?: TextOverrides;
  descriptionTextProps?: TextOverrides;
}

export const AppEmptyList: React.FC<AppEmptyListProps> = ({
  title,
  description,
  icon,
  action,
  containerStyle,
  contentStyle,
  titleTextProps,
  descriptionTextProps,
}) => {
  const {
    style: titleStyle,
    variant: titleVariantOverride,
    fontType: titleBoldOverride,
    ...titleRestProps
  } = titleTextProps ?? {};
  const {
    style: descriptionStyle,
    variant: descriptionVariantOverride,
    color: descriptionColorOverride,
    ...descriptionRestProps
  } = descriptionTextProps ?? {};

  return (
    <View
      style={[
        AppStyles.a_center,
        AppStyles.j_center,
        styles.container,
        containerStyle,
      ]}
    >
      <View style={[AppStyles.a_center, styles.content, contentStyle]}>
        {icon ? <View style={styles.iconContainer}>{icon}</View> : null}
        {title ? (
          <AppText
            variant={titleVariantOverride ?? 'h5'}
            fontType={titleBoldOverride ?? 'bold'}
            {...titleRestProps}
            center
            style={titleStyle}
          >
            {title}
          </AppText>
        ) : null}
        {description ? (
          <AppText
            center
            variant={descriptionVariantOverride ?? 'body'}
            color={descriptionColorOverride ?? 'secondary'}
            {...descriptionRestProps}
            style={[styles.description, descriptionStyle]}
          >
            {description}
          </AppText>
        ) : null}
        {action ? <View style={styles.actionContainer}>{action}</View> : null}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.xl,
  },
  content: {
    maxWidth: 320,
  },
  iconContainer: {
    marginBottom: Spacing.md,
  },

  description: {
    marginTop: Spacing.xs,
    color: Colors.secondaryGray,
  },
  actionContainer: {
    marginTop: Spacing.lg,
  },
});
