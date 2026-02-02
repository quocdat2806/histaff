import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import AppStyles from '@/style';
import { AppText } from '@/components/ui';
import { IconSize } from '@/constants/dimens';
import { BackIcon } from '@assets/svgs';
import { goBack } from '@/navigation';

export interface AppHeaderProps {
  title: string;
  isShowBackIcon?: boolean;
  actions?: React.ReactNode;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  isShowBackIcon = true,
  actions,
}) => {
  return (
    <View style={[AppStyles.f_Row, AppStyles.a_center, 
    AppStyles.backGroundPrimary,
    AppStyles.paddingHorizontal12,
    AppStyles.paddingVertical8,
    ]}>
      {isShowBackIcon ? (
        <TouchableOpacity onPress={goBack} hitSlop={8}>
          <BackIcon width={IconSize.md} height={IconSize.md} />
        </TouchableOpacity>
      ) : null}
      <AppText variant="h3" fontType="bold" style={AppStyles.f_1} numberOfLines={1}>
        {title}
      </AppText>
      {actions ? actions : null}
    </View>
  );
};

