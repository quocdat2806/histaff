import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

import { AppEmptyList } from './EmptyList';
import AppStyles from '@/style';

export interface AppListProps<ItemT> extends FlatListProps<ItemT> {
  keyExtractor?: (item: ItemT, index: number) => string;
}

export function AppList<ItemT>({
  data,
  keyExtractor,
  ...rest
}: AppListProps<ItemT>) {
  return (
    <FlatList<ItemT>
      data={data}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={AppStyles.f_1}
      ListEmptyComponent={<AppEmptyList />}
      {...rest}
    />
  );
}
