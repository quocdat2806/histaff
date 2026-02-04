import React from 'react';
import { SectionList, SectionListProps } from 'react-native';

import AppStyles from '@/style';
import { AppEmptyList } from './EmptyList';

export interface AppSectionListProps<ItemT, SectionT>
  extends SectionListProps<ItemT, SectionT> {}

export function AppSectionList<ItemT, SectionT>({
  sections,
  ...rest
}: AppSectionListProps<ItemT, SectionT>) {
  return (
    <SectionList<ItemT, SectionT>
      sections={sections}
      contentContainerStyle={[AppStyles.f_1, AppStyles.paddingVertical8]}
      ListEmptyComponent={<AppEmptyList />}
      showsVerticalScrollIndicator={false}
      {...rest}
    />
  );
}
