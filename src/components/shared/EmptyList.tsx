import React from 'react';
import { StyleProp, View, ViewStyle, StyleSheet } from 'react-native';

import AppStyles from '@/style';
import { AppText, AppTextProps } from '@/components/ui';
import { Colors } from '@/constants/colors';

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
        AppStyles.flexGrow1,
        AppStyles.width100Percent,
        AppStyles.padding20,
        containerStyle,
      ]}
    >
      <View style={[AppStyles.a_center,AppStyles.gap12, styles.content, contentStyle]}>
        {icon ? <View>{icon}</View> : null}
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
            color={Colors.secondaryGray}
            {...descriptionRestProps}
            style={[ descriptionStyle]}
          >
            {description}
          </AppText>
        ) : null}
        {action ? <View>{action}</View> : null}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  content: {
    maxWidth: 320,
  },
});
