import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { AppText } from '@/components/ui';
import AppStyles from '@/style';
import { SvgNext } from '@assets/svgs';
import { useTranslation } from '@/hooks/useTranslation';
import { TranslationKey } from '@/constants/texts';

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
  const { t } = useTranslation();
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
          <AppText fontType="medium">{t(title as TranslationKey)}</AppText>
          {subTitle && (
            <AppText color="secondary" variant="subtitle">
              {subTitle}
            </AppText>
          )}
        </View>
        <SvgNext />
      </View>
    </TouchableOpacity>
  );
};
