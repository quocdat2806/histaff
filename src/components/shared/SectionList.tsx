import React, { useMemo } from 'react';
import {
  SectionList,
  SectionListProps,
  StyleProp,
  ViewStyle,
} from 'react-native';

import AppStyles from '@/style';
import { AppEmptyList, AppEmptyListProps } from './EmptyList';

export interface AppSectionListProps<ItemT, SectionT>
  extends Omit<
    SectionListProps<ItemT, SectionT>,
    'ListEmptyComponent' | 'contentContainerStyle'
  > {
  contentContainerStyle?: StyleProp<ViewStyle>;
  emptyListProps?: AppEmptyListProps;
  ListEmptyComponent?: SectionListProps<ItemT, SectionT>['ListEmptyComponent'];
}

export function AppSectionList<ItemT, SectionT>({
  sections,
  emptyListProps,
  ListEmptyComponent,
  contentContainerStyle,
  showsVerticalScrollIndicator,
  ...rest
}: AppSectionListProps<ItemT, SectionT>) {
  const hasData = Boolean(sections && sections.length > 0);
  const resolvedEmptyComponent = useMemo(() => {
    if (ListEmptyComponent) {
      return ListEmptyComponent;
    }

    if (emptyListProps) {
      return () => <AppEmptyList {...emptyListProps} />;
    }

    return null;
  }, [ListEmptyComponent, emptyListProps]);

  const resolvedContentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      AppStyles.flexGrow1,
      AppStyles.paddingVertical12,
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
    <SectionList<ItemT, SectionT>
      sections={sections}
      contentContainerStyle={resolvedContentContainerStyle}
      ListEmptyComponent={resolvedEmptyComponent}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator ?? false}
      {...rest}
    />
  );
}

