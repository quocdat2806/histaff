import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';

import { AppText } from '@/components/ui';
import { AppButton } from '@/components/ui';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, FontSize, Width } from '@/constants/dimens';
import AppStyles from '@/style';

export interface ModalAction {
  label: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export interface AppModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
  primaryAction?: ModalAction;
  secondaryAction?: ModalAction;
  actions?: ModalAction[];
  dismissAble?: boolean;
}

export const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  title,
  message,
  primaryAction,
  secondaryAction,
  actions,
  dismissAble = true,
}) => {
  const handleBackdropPress = () => {
    if (dismissAble) onClose();
  };

  const renderActions = () => {
    if (actions && actions.length > 0) {
      return (
        <View style={styles.actionsContainer}>
          {actions.map((action, index) => (
            <AppButton
              key={index}
              label={action.label}
              onPress={action.onPress}
              variant="primary"
              loading={action.loading}
              disabled={action.disabled}
              fullWidth
              style={index > 0 ? styles.actionButton : undefined}
            />
          ))}
        </View>
      );
    }
    if (primaryAction && !secondaryAction) {
      return (
        <View style={styles.actionsContainer}>
          <AppButton
            label={primaryAction.label}
            onPress={primaryAction.onPress}
            variant="primary"
            loading={primaryAction.loading}
            disabled={primaryAction.disabled}
            fullWidth
          />
        </View>
      );
    }
    if (primaryAction && secondaryAction) {
      return (
        <View style={[AppStyles.f_Row, styles.twoActionsContainer]}>
          <AppButton
            label={secondaryAction.label}
            onPress={secondaryAction.onPress}
            variant="primary"
            loading={secondaryAction.loading}
            disabled={secondaryAction.disabled}
            style={styles.twoActionButton}
          />
          <AppButton
            label={primaryAction.label}
            onPress={primaryAction.onPress}
            variant="primary"
            loading={primaryAction.loading}
            disabled={primaryAction.disabled}
            style={styles.twoActionButton}
          />
        </View>
      );
    }
    return null;
  };

  return (
    <Modal
      visible={visible}
      onRequestClose={onClose}
      animationType="none"
      statusBarTranslucent
      transparent
    >
      <View
        style={[
          styles.overlay,
          AppStyles.f_1,
          AppStyles.a_center,
          AppStyles.j_center,
        ]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
        <View style={styles.modalContainer}>
          <View style={styles.content}>
            {title ? (
              <AppText variant="h4" fontType="bold" center style={styles.title}>
                {title}
              </AppText>
            ) : null}
            {message ? (
              <AppText
                variant="body"
                color="secondary"
                center
                style={styles.message}
              >
                {message}
              </AppText>
            ) : null}
          </View>
          {renderActions()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: Colors.modalBackground,
    padding: Spacing.lg,
  },
  modalContainer: {
    width: Width.fullScreenDimensionWidth * 0.85,
    maxWidth: 400,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
  },
  content: {
    padding: Spacing.xl,
    alignItems: 'center',
  },
  title: {
    marginBottom: Spacing.sm,
  },
  message: {
    lineHeight: FontSize.body * 1.6,
  },
  actionsContainer: {
    padding: Spacing.lg,
    paddingTop: 0,
  },
  actionButton: {
    marginTop: Spacing.sm,
  },
  twoActionsContainer: {
    padding: Spacing.lg,
    paddingTop: 0,
    gap: Spacing.sm,
  },
  twoActionButton: {
    flex: 1,
  },
});
