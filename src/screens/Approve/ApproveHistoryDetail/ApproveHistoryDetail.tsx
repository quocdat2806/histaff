import { DefaultLayout } from '@/components/shared';
import { CardInfoSection } from '@/components/shared/CardInfoSection';
import { useTranslation } from '@/hooks/useTranslation';
import AppStyles from '@/style';
import { View } from 'react-native';
export const ApproveHistoryDetail = () => {
  const { t } = useTranslation();
  return (
    <DefaultLayout title={t('approveHistoryDetail')}>
      <View style={AppStyles.gap16}>
        <CardInfoSection
          data={[{ name: t('nameStaff'), value: 'Te' }]}
          title="Da duyet"
          icon={null}
        />
        <CardInfoSection
          data={[{ name: t('nameStaff'), value: 'Te' }]}
          title="Da duyet"
          icon={null}
        />
      </View>
    </DefaultLayout>
  );
};
