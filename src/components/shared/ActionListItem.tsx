import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { BorderRadius, Spacing } from '@/constants/dimens';
import { Colors } from '@/constants/colors';
import { AppText } from '@/components/ui';
import AppStyles from '@/style';
export interface ActionListItemConfig {
    id: string;
    title: string;
    onPress?: () => void;
    icon?: React.ReactNode;
  }
export const ActionListItem: React.FC<ActionListItemConfig> = ({
    title,
    onPress,
    icon,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <View style={[AppStyles.f_Row, AppStyles.j_spaceBetween, AppStyles.a_center, styles.content]}>
          {icon}
          <AppText variant="body" fontType="medium" style={AppStyles.f_1}>
              {title}
            </AppText>
  

        </View>
      </TouchableOpacity>
    );
  };


const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl, 
    padding: Spacing.lg,
  },

  content: {
    gap: Spacing.md,
  },

  left: {
  },
  right:{

  }
});

  