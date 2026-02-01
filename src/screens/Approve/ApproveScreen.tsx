import { ActionListItemConfig } from '@/components/shared/';
import React from 'react';
import { ActionListScreen } from '../ActionListScreen/ActionListScreen';
import { SvgActionLeave,SvgActionOT,SvgActionExplanation,SvgActionHistory } from '@assets/svgs';

export const APPROVE_ACTIONS: ActionListItemConfig[] = [
  { id: 'leave', title: 'Phê duyệt nghỉ',icon: <SvgActionLeave /> },
  { id: 'overtime', title: 'Phê duyệt làm thêm',icon: <SvgActionOT /> },
  { id: 'explain', title: 'Phê duyệt giải trình công',icon: <SvgActionExplanation /> },
  { id: 'history', title: 'Lịch sử phê duyệt',icon: <SvgActionHistory /> },
];
export const ApproveScreen = () => {
    return <ActionListScreen titleHeader='Phe  duyet' data={APPROVE_ACTIONS} />;
};
