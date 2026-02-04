import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

import { AppText } from '@/components/ui/Text';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, Width } from '@/constants/dimens';
import AppStyles from '@/style';
import type { MainStackParamList } from '@/navigation/types';
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
export type HomeGridRoute = Exclude<keyof MainStackParamList, 'MainTabs'>;

export interface HomeGridItem {
  id: string;
  title: string;
  icon: React.ReactNode;
  badge?: number;
  route?: HomeGridRoute;
  onPress?: () => void;
}

export const HOME_GRID_DATA: HomeGridItem[] = [
  {
    id: 'register',
    title: 'Đăng ký',
    icon: <SvgRegister />,
    badge: 3,
    route: 'Register',
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.Register }),
  },
  {
    id: 'approve',
    title: 'Phê duyệt',
    icon: <SvgApproval />,
    badge: 5,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.Approve }),
  },
  {
    id: 'timesheet',
    title: 'Bảng công',
    icon: <SvgTimeSheet />,
  },
  {
    id: 'salary',
    title: 'Phiếu lương',
    icon: <SvgSalary />,
  },
  {
    id: 'news',
    title: 'Tin tức',
    icon: <SvgNew />,
  },
  {
    id: 'gps',
    title: 'GPS',
    icon: <SvgGps />,
  },
  {
    id: 'survey',
    title: 'Khảo sát',
    icon: <SvgSurvey />,
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: <SvgChat />,
  },
];

interface Props {
  item: HomeGridItem;
}

const HomeItem = ({ item }: Props) => {
  return (
    <TouchableOpacity style={[styles.container]} onPress={item.onPress}>
      <View style={[styles.iconWrapper]}>
        {item.icon}
        {!!item.badge && (
          <View style={[styles.badge]}>
            <AppText variant="caption" color={Colors.white}>
              {item.badge}
            </AppText>
          </View>
        )}
      </View>

      <AppText variant="subtitle" color={Colors.black} numberOfLines={1}>
        {item.title}
      </AppText>
    </TouchableOpacity>
  );
};

export default HomeItem;
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: Spacing.lg,
    width: Width.fullScreenDimensionWidth / 4,
    gap: Spacing.xs,
  },

  iconWrapper: {
    backgroundColor: Colors.white,
    ...AppStyles.j_center,
    ...AppStyles.a_center,
    width: (Width.fullScreenDimensionWidth / 4) * 0.7,
    height: (Width.fullScreenDimensionWidth / 4) * 0.7,
    borderRadius: BorderRadius.xl,
  },

  badge: {
    position: 'absolute',
    top: '-10%',
    right: '-10%',
    backgroundColor: Colors.error,
    ...AppStyles.j_center,
    ...AppStyles.a_center,
    paddingHorizontal: Spacing.xxs,
    width: (Width.fullScreenDimensionWidth / 4) * 0.25,
    height: (Width.fullScreenDimensionWidth / 4) * 0.25,
    borderRadius: BorderRadius.xl,
  },
});
