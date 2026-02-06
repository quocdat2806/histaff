import { ActionListItemConfig } from '@/components/shared/';
import React from 'react';
import { ActionList } from '@/components/shared/';
import { SvgSuccess, SvgReject, SvgWaiting } from '@assets/svgs';
import { Texts } from '@/constants/texts';
import { useTranslation } from '@/hooks/useTranslation';
import { navigate } from '@/navigation';
import ROUTERS from '@/routers';
export const HISTORY_APPROVE_ACTIONS: ActionListItemConfig[] = [
  {
    id: 'success',
    title: Texts.approveLeave,
    icon: <SvgSuccess />,
    subTitle: 'Nguyen Van A',
    onPress: () =>
      navigate(ROUTERS.Main, { screen: ROUTERS.ApproveHistoryDetail }),
  },
  {
    id: 'reject',
    title: Texts.approveLeave,
    icon: <SvgReject />,
    subTitle: 'Nguyen Van B',
  },
  {
    id: 'waiting',
    title: Texts.approveLeave,
    icon: <SvgWaiting />,
    subTitle: 'Nguyen Van C',
  },
];

export const ApproveHistoryScreen = () => {
  const { t } = useTranslation();
  return (
    <ActionList
      titleHeader={t('registerHistory')}
      data={HISTORY_APPROVE_ACTIONS}
    />
  );
};
