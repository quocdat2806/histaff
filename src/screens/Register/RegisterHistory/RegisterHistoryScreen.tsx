import { ActionListItemConfig } from '@/components/shared/';
import React from 'react';
import { ActionListScreen } from '@/screens/ActionListScreen/ActionListScreen';
import { SvgSuccess, SvgReject, SvgWaiting } from '@assets/svgs';
import { Texts } from '@/constants/texts';
import { useTranslation } from '@/hooks/useTranslation';
export const HISTORY_ACTIONS: ActionListItemConfig[] = [
  { id: 'success', title: Texts.approveLeave, icon: <SvgSuccess /> },
  { id: 'reject', title: Texts.approveLeave, icon: <SvgReject /> },
  { id: 'waiting', title: Texts.approveLeave, icon: <SvgWaiting /> },
];

export const RegisterHistoryScreen = () => {
  const { t } = useTranslation();
  return (
    <ActionListScreen
      titleHeader={t('registerHistory')}
      data={HISTORY_ACTIONS}
    />
  );
};
