import React, { useMemo } from 'react';
import {
  FlatList,
  FlatListProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import AppStyles from '@/style';
import { AppEmptyList, AppEmptyListProps } from './EmptyList';

export interface AppListProps<ItemT>
  extends Omit<
    FlatListProps<ItemT>,
    'ListEmptyComponent' | 'contentContainerStyle'
  > {
  contentContainerStyle?: StyleProp<ViewStyle>;
  emptyListProps?: AppEmptyListProps;
  ListEmptyComponent?: FlatListProps<ItemT>['ListEmptyComponent'];
  keyExtractor?: (item: ItemT, index: number) => string;
}

const defaultKeyExtractor = (_item: unknown, index: number) => `${index}`;

export function AppList<ItemT>({
  data,
  emptyListProps,
  ListEmptyComponent,
  contentContainerStyle,
  keyExtractor,
  showsVerticalScrollIndicator,
  ...rest
}: AppListProps<ItemT>) {
  const resolvedEmptyComponent = useMemo(() => {
    if (ListEmptyComponent) {
      return ListEmptyComponent;
    }

    if (emptyListProps) {
      return () => <AppEmptyList {...emptyListProps} />;
    }

    return null;
  }, [ListEmptyComponent, emptyListProps]);

  const resolvedKeyExtractor = keyExtractor ?? defaultKeyExtractor;
  const hasData = Boolean(data && data.length > 0);
  const resolvedContentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      AppStyles.paddingVertical12,
      AppStyles.flexGrow1,
      hasData
        ? null
        : [
            AppStyles.paddingVertical20,
            AppStyles.j_center,
            AppStyles.a_center,
            AppStyles.flexGrow1,
          ],
      contentContainerStyle,
    ],
    [contentContainerStyle, hasData],
  );

  return (
    <FlatList<ItemT>
      data={data}
      keyExtractor={resolvedKeyExtractor}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator ?? false}
      contentContainerStyle={resolvedContentContainerStyle}
      ListEmptyComponent={resolvedEmptyComponent}
      {...rest}
    />
  );
}


