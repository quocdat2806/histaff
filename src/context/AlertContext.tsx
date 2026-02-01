import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo } from 'react';

import { AppModal, AppModalProps, ModalAction } from '@/components/shared';

type GlobalAlertConfig = Omit<AppModalProps, 'visible' | 'onClose'>;

export interface AlertOptions {
    title: string;
    message?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
}

interface AlertContextProps {
    showAlert: (config: GlobalAlertConfig) => void;
    hideAlert: () => void;
    showSuccess: (options: AlertOptions) => void;
    showError: (options: AlertOptions) => void;
    showConfirm: (options: AlertOptions) => void;
    showInfo: (options: AlertOptions) => void;
}



const AlertContext = createContext<AlertContextProps | undefined>(undefined);

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error('useAlert must be used within an AlertProvider');
    }
    return context;
};


export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [config, setConfig] = useState<GlobalAlertConfig>({});

    const showAlert = useCallback((newConfig: GlobalAlertConfig) => {
        setConfig(newConfig);
        setVisible(true);
    }, []);

    const hideAlert = useCallback(() => {
        setVisible(false);
    }, []);

    const showSuccess = useCallback(
        ({ title, message, onConfirm }: AlertOptions) => {
            showAlert({
                title,
                message,
                primaryAction: {
                    label: 'OK',
                    onPress: () => {
                        hideAlert();
                        onConfirm?.();
                    },
                },
                dismissAble: true,
            });
        },
        [showAlert, hideAlert]
    );

    const showError = useCallback(
        ({ title, message, onConfirm }: AlertOptions) => {
            showAlert({
                title,
                message,
                primaryAction: {
                    label: 'Đóng',
                    onPress: () => {
                        hideAlert();
                        onConfirm?.();
                    },
                },
                dismissAble: true,
            });
        },
        [showAlert, hideAlert]
    );

    const showConfirm = useCallback(
        ({ title, message, onConfirm, onCancel }: AlertOptions) => {
            showAlert({
                title,
                message,
                primaryAction: {
                    label: 'Xác nhận',
                    onPress: () => {
                        hideAlert();
                        onConfirm?.();
                    },
                },
                secondaryAction: {
                    label: 'Hủy',
                    onPress: () => {
                        hideAlert();
                        onCancel?.();
                    },
                },
                dismissAble: false,
            });
        },
        [showAlert, hideAlert]
    );

    const showInfo = useCallback(
        ({ title, message, onConfirm }: AlertOptions) => {
            showAlert({
                title,
                message,
                primaryAction: {
                    label: 'OK',
                    onPress: () => {
                        hideAlert();
                        onConfirm?.();
                    },
                },
                dismissAble: true,
            });
        },
        [showAlert, hideAlert]
    );

    const wrappedConfig = useMemo(() => {
        const wrapAction = (action: ModalAction): ModalAction => ({
            ...action,
            onPress: () => {
                hideAlert();
                action.onPress();
            },
        });
        return {
            ...config,
            primaryAction: config.primaryAction ? wrapAction(config.primaryAction) : undefined,
            secondaryAction: config.secondaryAction ? wrapAction(config.secondaryAction) : undefined,
            actions: config.actions?.map(wrapAction),
        };
    }, [config, hideAlert]);

    return (
        <AlertContext.Provider
            value={{
                showAlert,
                hideAlert,
                showSuccess,
                showError,
                showConfirm,
                showInfo,
            }}
        >
            {children}
            <AppModal
                visible={visible}
                onClose={hideAlert}
                {...wrappedConfig}
            />
        </AlertContext.Provider>
    );
};
