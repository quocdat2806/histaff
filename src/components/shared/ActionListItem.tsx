import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from '@/components/ui';
import AppStyles from '@/style';
import { SvgNext } from '@assets/svgs';
export interface ActionListItemConfig {
  id: string;
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
  subTitle?: string;
}
export const ActionListItem: React.FC<ActionListItemConfig> = ({
  title,
  onPress,
  icon,
  subTitle,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        AppStyles.backGroundWhite,
        AppStyles.borderRadius8,
        AppStyles.marginBottom12,
      ]}
    >
      <View
        style={[
          AppStyles.f_Row,
          AppStyles.j_spaceBetween,
          AppStyles.a_center,
          AppStyles.gap12,
          AppStyles.padding16,
        ]}
      >
        {icon}
        <View style={[AppStyles.f_1]}>
          <AppText fontType="medium">{title}</AppText>
          {subTitle && <AppText variant="caption">{subTitle}</AppText>}
        </View>
        <SvgNext />
      </View>
    </TouchableOpacity>
  );
};
