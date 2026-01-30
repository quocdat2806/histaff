import React, { useEffect, useRef } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    StyleSheet,
    Animated,
    ViewStyle,
    TextStyle,
} from 'react-native';

import { AppText } from '@/components/ui';
import { AppButton } from '@/components/ui';
import { Colors } from '@/constants/colors';
import { BorderRadius, Spacing, FontSize, Width, IconSize } from '@/constants/dimens';
import AppStyles from '@/style';


export type ModalType = 'success' | 'error' | 'warning' | 'info' | 'default';
export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalAction {
    label: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    loading?: boolean;
    disabled?: boolean;
}

export interface AppModalProps {
    visible: boolean;
    onClose: () => void;

    title?: string;
    message?: string;
    children?: React.ReactNode;

    type?: ModalType;
    icon?: React.ReactNode;
    showIcon?: boolean;

    primaryAction?: ModalAction;
    secondaryAction?: ModalAction;
    actions?: ModalAction[];

    size?: ModalSize;
    dismissable?: boolean;
    showCloseButton?: boolean;

    containerStyle?: ViewStyle;
    contentStyle?: ViewStyle;

    animationType?: 'fade' | 'slide' | 'scale';
}


export const AppModal: React.FC<AppModalProps> = ({
    visible,
    onClose,

    title,
    message,
    children,

    type = 'default',
    icon,
    showIcon = true,

    primaryAction,
    secondaryAction,
    actions,

    size = 'md',

    dismissable = true,
    showCloseButton = false,

    containerStyle,
    contentStyle,

    animationType = 'scale',
}) => {
    const overlayOpacity = useRef(new Animated.Value(0)).current;
    const modalScale = useRef(new Animated.Value(0.9)).current;
    const modalTranslateY = useRef(new Animated.Value(50)).current;
    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(overlayOpacity, {
                    toValue: 1,
                    duration: 200,
                    useNativeDriver: true,
                }),
                Animated.spring(modalScale, {
                    toValue: 1,
                    damping: 15,
                    useNativeDriver: true,
                }),
                Animated.spring(modalTranslateY, {
                    toValue: 0,
                    damping: 15,
                    useNativeDriver: true,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(overlayOpacity, {
                    toValue: 0,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(modalScale, {
                    toValue: 0.9,
                    duration: 150,
                    useNativeDriver: true,
                }),
                Animated.timing(modalTranslateY, {
                    toValue: 50,
                    duration: 150,
                    useNativeDriver: true,
                }),
            ]).start();
        }
    }, [visible]);

    const getModalTransform = () => {
        switch (animationType) {
            case 'scale':
                return [{ scale: modalScale }];
            case 'slide':
                return [{ translateY: modalTranslateY }];
            case 'fade':
                return [];
            default:
                return [{ scale: modalScale }];
        }
    };

    const handleBackdropPress = () => {
        if (dismissable) {
            onClose();
        }
    };

    const getTypeIcon = () => {
        if (icon) return icon;
        if (!showIcon) return null;

        const iconMap: Record<ModalType, string> = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ',
            default: '',
        };

        const typeIcon = iconMap[type];
        if (!typeIcon) return null;

        return (
            <View style={[styles.iconContainer, getIconBackgroundColor(type)]}>
                <AppText fontType='bold' variant='h1' style={[getIconColor(type)]}>
                    {typeIcon}
                </AppText>
            </View>
        );
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
                            variant={action.variant || 'primary'}
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
                        variant={primaryAction.variant || getDefaultVariant(type)}
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
                        variant={secondaryAction.variant || 'outline'}
                        loading={secondaryAction.loading}
                        disabled={secondaryAction.disabled}
                        style={styles.twoActionButton}
                    />
                    <AppButton
                        label={primaryAction.label}
                        onPress={primaryAction.onPress}
                        variant={primaryAction.variant || getDefaultVariant(type)}
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
            <Animated.View
                style={[
                    styles.overlay,
                    AppStyles.f_1,
                    AppStyles.a_center,
                    AppStyles.j_center,
                    {
                        opacity: overlayOpacity,
                    },
                ]}
            >
                <TouchableOpacity
                    style={StyleSheet.absoluteFill}
                    activeOpacity={1}
                    onPress={handleBackdropPress}
                />

                <Animated.View
                    style={[
                        styles.modalContainer,
                        sizeStyles[size],
                        {
                            transform: getModalTransform(),
                            opacity: animationType === 'fade' ? overlayOpacity : 1,
                        },
                        containerStyle,
                    ]}
                >
                    {showCloseButton && (
                        <TouchableOpacity
                            style={[styles.closeButton, AppStyles.a_center, AppStyles.j_center]}
                            onPress={onClose}
                            hitSlop={10}
                        >
                            <AppText variant='h5' color={Colors.white}>✕</AppText>
                        </TouchableOpacity>
                    )}

                    <View style={[styles.content, contentStyle]}>
                        {getTypeIcon()}

                        {title && (
                            <AppText
                                variant="h4"
                                fontType="bold"
                                center
                                style={styles.title}
                            >
                                {title}
                            </AppText>
                        )}

                        {message && (
                            <AppText
                                variant="body"
                                color="secondary"
                                center
                                style={styles.message}
                            >
                                {message}
                            </AppText>
                        )}

                        {children}
                    </View>

                    {renderActions()}
                </Animated.View>
            </Animated.View>
        </Modal>
    );
};


const getIconBackgroundColor = (type: ModalType): ViewStyle => {
    const colorMap: Record<ModalType, string> = {
        success: Colors.success,
        error: Colors.error,
        warning: Colors.warning,
        info: Colors.white,
        default: Colors.warning,
    };
    return { backgroundColor: colorMap[type] };
};

const getIconColor = (type: ModalType): TextStyle => {
    const colorMap: Record<ModalType, string> = {
        success: Colors.success,
        error: Colors.error,
        warning: Colors.warning,
        info: Colors.white,
        default: Colors.white,
    };
    return { color: colorMap[type] };
};

const getDefaultVariant = (type: ModalType) => {
    const variantMap: Record<ModalType, 'primary' | 'danger' | 'success'> = {
        success: 'success',
        error: 'danger',
        warning: 'primary',
        info: 'primary',
        default: 'primary',
    };
    return variantMap[type];
};

const styles = StyleSheet.create({
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: Spacing.lg,
    },
    modalContainer: {
        backgroundColor: Colors.white,
        borderRadius: BorderRadius.xl,
        overflow: 'hidden',
        maxWidth: Width.fullScreenDimensionWidth - Spacing.lg * 2,
    },
    closeButton: {
        position: 'absolute',
        top: Spacing.md,
        right: Spacing.md,
        width: IconSize.md,
        height: IconSize.md,
        borderRadius: BorderRadius.xl,
        backgroundColor: Colors.lightGray,
        zIndex: 10,
    },

    content: {
        padding: Spacing.xl,
        alignItems: 'center',
    },
    iconContainer: {
        width: IconSize.md,
        height: IconSize.md,
        borderRadius: BorderRadius.xxxxxxl,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Spacing.md,
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

const sizeStyles: Record<ModalSize, ViewStyle> = {
    sm: {
        width: Width.fullScreenDimensionWidth * 0.75,
        maxWidth: 300,
    },
    md: {
        width: Width.fullScreenDimensionWidth * 0.85,
        maxWidth: 400,
    },
    lg: {
        width: Width.fullScreenDimensionWidth * 0.9,
        maxWidth: 500,
    },
    full: {
        width: Width.fullScreenDimensionWidth - Spacing.lg * 2,
        maxWidth: Width.fullScreenDimensionWidth,
    },
};
