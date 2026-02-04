import React from 'react';
import { FlatList, FlatListProps } from 'react-native';

import AppStyles from '@/style';
import { AppEmptyList } from './EmptyList';

export interface AppGridProps<ItemT> extends FlatListProps<ItemT> {
  keyExtractor?: (item: ItemT, index: number) => string;
}

export function AppGrid<ItemT>({
  data,
  numColumns = 2,
  keyExtractor,
  ...rest
}: AppGridProps<ItemT>) {
  return (
    <FlatList<ItemT>
      data={data}
      numColumns={numColumns}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[AppStyles.f_1, AppStyles.paddingVertical8]}
      ListEmptyComponent={<AppEmptyList />}
      {...rest}
    />
  );
}
