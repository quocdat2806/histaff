import React from 'react';
import { Modal, View, TouchableOpacity, StyleSheet } from 'react-native';

import { AppText, AppButton } from '@/components/ui';
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
        <View style={[AppStyles.paddingTop0, AppStyles.padding16]}>
          {actions.map((action, index) => (
            <AppButton
              key={index}
              label={action.label}
              onPress={action.onPress}
              variant="primary"
              loading={action.loading}
              disabled={action.disabled}
              fullWidth
              style={index > 0 ? AppStyles.marginTop10 : undefined}
            />
          ))}
        </View>
      );
    }
    if (primaryAction && !secondaryAction) {
      return (
        <View style={[AppStyles.paddingTop0, AppStyles.padding16]}>
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
        <View
          style={[
            AppStyles.f_Row,
            AppStyles.paddingTop0,
            AppStyles.padding16,
            AppStyles.gap10,
          ]}
        >
          <AppButton
            label={secondaryAction.label}
            onPress={secondaryAction.onPress}
            variant="primary"
            loading={secondaryAction.loading}
            disabled={secondaryAction.disabled}
            style={AppStyles.f_1}
          />
          <AppButton
            label={primaryAction.label}
            onPress={primaryAction.onPress}
            variant="primary"
            loading={primaryAction.loading}
            disabled={primaryAction.disabled}
            style={AppStyles.f_1}
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
          AppStyles.backGroundModal,
          AppStyles.f_1,
          AppStyles.a_center,
          AppStyles.j_center,
          AppStyles.padding16,
        ]}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleBackdropPress}
        />
        <View
          style={[
            AppStyles.modalContainer,
            AppStyles.backGroundWhite,
            AppStyles.borderRadius12,
          ]}
        >
          <View
            style={[AppStyles.padding20, AppStyles.a_center, AppStyles.gap8]}
          >
            {title ? (
              <AppText variant="h4" fontType="bold" center>
                {title}
              </AppText>
            ) : null}
            {message ? (
              <AppText color="secondary" center>
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
