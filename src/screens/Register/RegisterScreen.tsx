import { ActionList, ActionListItemConfig } from '@/components/shared/';
import React from 'react';
import {
  SvgActionLeave,
  SvgActionOT,
  SvgActionExplanation,
  SvgActionHistory,
} from '@assets/svgs';
import { navigate } from '@/navigation';
import ROUTERS from '@/routers';
import { useTranslation } from '@/hooks/useTranslation';
export const REGISTER_ACTIONS: ActionListItemConfig[] = [
  {
    id: 'leave',
    title: 'registerLeave',
    icon: <SvgActionLeave />,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.RegisterLeave }),
  },
  {
    id: 'overtime',
    title: 'registerOvertime',
    icon: <SvgActionOT />,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.RegisterOvertime }),
  },
  {
    id: 'explain',
    title: 'registerExplanation',
    icon: <SvgActionExplanation />,
    onPress: () =>
      navigate(ROUTERS.Main, { screen: ROUTERS.RegisterExplanation }),
  },
  {
    id: 'history',
    title: 'registerHistory',
    icon: <SvgActionHistory />,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.RegisterHistory }),
  },
];
export const RegisterScreen = () => {
  const { t } = useTranslation();
  return <ActionList titleHeader={t('register')} data={REGISTER_ACTIONS} />;
};
