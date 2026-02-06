import { ActionList, ActionListItemConfig } from '@/components/shared/';
import React from 'react';
import {
  SvgActionLeave,
  SvgActionOT,
  SvgActionExplanation,
  SvgActionHistory,
} from '@assets/svgs';
import { Texts } from '@/constants/texts';
import { useTranslation } from '@/hooks/useTranslation';
import { navigate } from '@/navigation';
import ROUTERS from '@/routers';
export const APPROVE_ACTIONS: ActionListItemConfig[] = [
  {
    id: 'leave',
    title: Texts.approveLeave,
    icon: <SvgActionLeave />,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.ApproveLeave }),
  },
  {
    id: 'overtime',
    title: Texts.approveOvertime,
    icon: <SvgActionOT />,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.ApproveOverTime }),
  },
  {
    id: 'explain',
    title: Texts.approveExplanation,
    icon: <SvgActionExplanation />,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.ApproveExplain }),
  },
  {
    id: 'history',
    title: Texts.approveHistory,
    icon: <SvgActionHistory />,
    onPress: () => navigate(ROUTERS.Main, { screen: ROUTERS.ApproveHistory }),
  },
];
export const ApproveScreen = () => {
  const { t } = useTranslation();
  return <ActionList titleHeader={t('approve')} data={APPROVE_ACTIONS} />;
};
