import { ActionListItemConfig } from '@/components/shared/';
import React from 'react';
import { ActionListScreen } from '../ActionListScreen/ActionListScreen';
import { SvgActionLeave,SvgActionOT,SvgActionExplanation,SvgActionHistory } from '@assets/svgs';
import { navigate } from '@/navigation';
import ROUTERS from '@/routers';
import { Texts } from '@/constants/texts';
import { useTranslation } from '@/hooks/useTranslation';
export const REGISTER_ACTIONS: ActionListItemConfig[] = [
  { id: 'leave', title:Texts.registerLeave,icon: <SvgActionLeave />,onPress: () => navigate(
    ROUTERS.Main,
    { screen: ROUTERS.RegisterLeave }
  ) },
  { id: 'overtime', title:Texts.registerOvertime,icon: <SvgActionOT /> },
  { id: 'explain', title:Texts.registerExplanation,icon: <SvgActionExplanation /> },
  { id: 'history', title:Texts.registerHistory,icon: <SvgActionHistory /> },
];
export const RegisterScreen = () => {
  const { t } = useTranslation();
    return <ActionListScreen titleHeader={t('register')}   data={REGISTER_ACTIONS} />;
};
