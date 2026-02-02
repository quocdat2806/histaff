import { ActionListItemConfig } from '@/components/shared/';
import React from 'react';
import { ActionListScreen } from '../ActionListScreen/ActionListScreen';
import {
  SvgActionLeave,
  SvgActionOT,
  SvgActionExplanation,
  SvgActionHistory,
} from '@assets/svgs';
import { Texts } from '@/constants/texts';
import { useTranslation } from '@/hooks/useTranslation';
export const APPROVE_ACTIONS: ActionListItemConfig[] = [
  { id: 'leave', title: Texts.approveLeave, icon: <SvgActionLeave /> },
  { id: 'overtime', title: Texts.approveOvertime, icon: <SvgActionOT /> },
  {
    id: 'explain',
    title: Texts.approveExplanation,
    icon: <SvgActionExplanation />,
  },
  { id: 'history', title: Texts.approveHistory, icon: <SvgActionHistory /> },
];
export const ApproveScreen = () => {
  const { t } = useTranslation();
  return (
    <ActionListScreen titleHeader={t('approve')} data={APPROVE_ACTIONS} />
  );
};
