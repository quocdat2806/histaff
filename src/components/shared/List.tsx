import React, { useMemo } from 'react';
import {
  FlatList,
  FlatListProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import AppStyles from '@/style';
import { Spacing } from '@/constants/dimens';
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
      styles.contentContainer,
      hasData
        ? null
        : [
            styles.emptyContentContainer,
            AppStyles.j_center,
            AppStyles.a_center,
            styles.containerStyle,
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

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    paddingVertical: Spacing.md,
  },
  emptyContentContainer: {
    paddingVertical: Spacing.xl,
  },
  containerStyle: {
    flexGrow: 1,
  },
});
