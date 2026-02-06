import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { Colors } from '@/constants/colors';
import { Width } from '@/constants/dimens';
import AppStyles from '@/style';
import ROUTERS from '@/routers';
import {
  SvgApproval,
  SvgChat,
  SvgGps,
  SvgNew,
  SvgRegister,
  SvgSalary,
  SvgSurvey,
  SvgTimeSheet,
} from '@assets/svgs';
import { navigate } from '@/navigation';
import { useTranslation } from '@/hooks/useTranslation';
import type { TranslationKey } from '@/constants/texts';

export interface HomeGridItem {
  id: string;
  title: TranslationKey;
  icon: React.ReactNode;
  badge?: number;
  onPress?: () => void;
}

export const HOME_GRID_DATA: HomeGridItem[] = [
  {
    id: 'register',
    title: 'register',
    icon: <SvgRegister />,
    badge: 3,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.Register }),
  },
  {
    id: 'approve',
    title: 'approve',
    icon: <SvgApproval />,
    badge: 5,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.Approve }),
  },
  {
    id: 'attendanceSheet',
    title: 'attendanceSheet',
    icon: <SvgTimeSheet />,
  },
  {
    id: 'salarySheet',
    title: 'salarySheet',
    icon: <SvgSalary />,
  },
  {
    id: 'news',
    title: 'news',
    icon: <SvgNew />,
  },
  {
    id: 'gps',
    title: 'gps',
    icon: <SvgGps />,
  },
  {
    id: 'survey',
    title: 'survey',
    icon: <SvgSurvey />,
  },
  {
    id: 'chat',
    title: 'chat',
    icon: <SvgChat />,
  },
];

interface Props {
  item: HomeGridItem;
}

const HomeItem = ({ item }: Props) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        AppStyles.a_center,
        AppStyles.marginBottom16,
        AppStyles.gap8,
      ]}
      onPress={item.onPress}
    >
      <View
        style={[
          styles.iconWrapper,
          AppStyles.backGroundWhite,
          AppStyles.a_center,
          AppStyles.j_center,
          AppStyles.borderRadius12,
        ]}
      >
        {item.icon}
        {!!item.badge && (
          <View
            style={[
              styles.badge,
              AppStyles.backGroundError,
              AppStyles.a_center,
              AppStyles.j_center,
              AppStyles.borderRadius12,
            ]}
          >
            <AppText fontType="bold" variant="caption" color={Colors.white}>
              {item.badge}
            </AppText>
          </View>
        )}
      </View>

      <AppText variant="subtitle" color={Colors.black} numberOfLines={1}>
        {t(item.title)}
      </AppText>
    </TouchableOpacity>
  );
};

export default HomeItem;
const styles = StyleSheet.create({
  container: {
    width: Width.fullScreenDimensionWidth / 4,
  },

  iconWrapper: {
    width: (Width.fullScreenDimensionWidth / 4) * 0.7,
    height: (Width.fullScreenDimensionWidth / 4) * 0.7,
  },

  badge: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    width: (Width.fullScreenDimensionWidth / 4) * 0.25,
    height: (Width.fullScreenDimensionWidth / 4) * 0.25,
  },
});
