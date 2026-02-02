import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from '@/components/ui';
import AppStyles from '@/style';
export interface ActionListItemConfig {
  id: string;
  title: string;
  onPress?: () => void;
  icon?: React.ReactNode;
}
export const ActionListItem: React.FC<ActionListItemConfig> = ({
  title,
  onPress,
  icon,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={AppStyles.backGroundWhite}>
      <View
        style={[
          AppStyles.f_Row,
          AppStyles.j_spaceBetween,
          AppStyles.a_center,
          AppStyles.gap12,
          AppStyles.padding16,
          AppStyles.borderRadius12,
        ]}
      >
        {icon}
        <AppText fontType="medium" style={AppStyles.f_1}>
          {title}
        </AppText>
      </View>
    </TouchableOpacity>
  );
};
