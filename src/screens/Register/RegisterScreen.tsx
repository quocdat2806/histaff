import { ActionListItemConfig } from '@/components/shared/';
import React from 'react';
import { ActionListScreen } from '../ActionListScreen/ActionListScreen';
import { SvgActionLeave,SvgActionOT,SvgActionExplanation,SvgActionHistory } from '@assets/svgs';
import { navigate } from '@/navigation';
import ROUTERS from '@/routers';

export const REGISTER_ACTIONS: ActionListItemConfig[] = [
  { id: 'leave', title: 'Đăng ký nghỉ',icon: <SvgActionLeave />,onPress: () => navigate(
    ROUTERS.Main,
    { screen: ROUTERS.RegisterLeave }
  ) },
  { id: 'overtime', title: 'Đăng ký làm thêm',icon: <SvgActionOT /> },
  { id: 'explain', title: 'Đăng ký giải trình công',icon: <SvgActionExplanation /> },
  { id: 'history', title: 'Lịch sử đăng ký',icon: <SvgActionHistory /> },
];
export const RegisterScreen = () => {
    return <ActionListScreen titleHeader='Đăng ký'   data={REGISTER_ACTIONS} />;
};
