import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

import AppStyles from '@/style';
import { AppText } from '@/components/ui';
import { Colors } from '@/constants/colors';
import { IconSize, Spacing } from '@/constants/dimens';
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
    <View style={[AppStyles.f_Row, AppStyles.a_center, styles.container]}>
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
});
