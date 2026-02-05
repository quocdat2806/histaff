import React from 'react';
import { ApproveFormValues, useApprove } from '../useApprove';
import { ApproveTemplate } from '../ApproveTemplate/ApproveTemplate';
import { RowSection } from '@/components/shared';
import { useTranslation } from '@/hooks/useTranslation';
export const ApproveExplainScreen = () => {
  const { initialValues, handleSubmit, schema } = useApprove();
  const { t } = useTranslation();
  return (
    <ApproveTemplate<ApproveFormValues>
      title={t('approveExplanation')}
      schema={schema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      middleSlot={
        <RowSection
          data={[
            { name: t('nameStaff'), value: 'Te' },
            { name: t('registerDate'), value: '2026-01-01' },
            { name: t('registerType'), value: 'Nghỉ' },
            { name: t('startDate'), value: '2026-01-01' },
            { name: t('endDate'), value: '2026-01-01' },
            { name: t('reason'), value: 'Lý do nghỉ' },
          ]}
        />
      }
    />
  );
};
