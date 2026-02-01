import React from 'react';
import { ActionListItem, ActionListItemConfig } from '@/components/shared/';
import { AppList } from '@/components/shared';
import { Spacing } from '@/constants/dimens';
import { DefaultLayout } from '@/components/shared/DefaultLayout';
interface ActionListScreenProps {
  data: ActionListItemConfig[];
  titleHeader: string;
}

export const ActionListScreen: React.FC<ActionListScreenProps> = ({
  data,
  titleHeader,
}) => {
  return (
    <DefaultLayout title={titleHeader}>
      <AppList
        data={data}
        keyExtractor={item => item.id}
        contentContainerStyle={{
          gap: Spacing.md,
        }}
        renderItem={({ item }) => <ActionListItem {...item} />}
      />
    </DefaultLayout>
  );
};
