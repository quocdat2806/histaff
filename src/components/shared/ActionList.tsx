import React from 'react';
import {
  ActionListItem,
  ActionListItemConfig,
  AppList,
  DefaultLayout,
} from '@/components/shared/';
interface ActionListProps {
  data: ActionListItemConfig[];
  titleHeader: string;
}

export const ActionList: React.FC<ActionListProps> = ({
  data,
  titleHeader,
}) => {
  return (
    <DefaultLayout title={titleHeader}>
      <AppList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ActionListItem {...item} />}
      />
    </DefaultLayout>
  );
};
