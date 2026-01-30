import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

import { AppModal, AppModalProps } from '@/components/shared/Alert/AlertModal';


type GlobalAlertConfig = Omit<AppModalProps, 'visible' | 'onClose'>;

export interface AlertOptions {
    title: string;
    message?: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    showIcon?: boolean;
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
        ({ title, message, onConfirm, showIcon = true }: AlertOptions) => {
            showAlert({
                type: 'success',
                title,
                message,
                showIcon,
                primaryAction: {
                    label: 'OK',
                    onPress: () => {
                        hideAlert();
                        onConfirm?.();
                    },
                },
                dismissable: true,
            });
        },
        [showAlert, hideAlert]
    );

    const showError = useCallback(
        ({ title, message, onConfirm, showIcon = true }: AlertOptions) => {
            showAlert({
                type: 'error',
                title,
                message,
                showIcon,
                primaryAction: {
                    label: 'Đóng',
                    onPress: () => {
                        hideAlert();
                        onConfirm?.();
                    },
                },
                dismissable: true,
            });
        },
        [showAlert, hideAlert]
    );

    const showConfirm = useCallback(
        ({ title, message, onConfirm, onCancel, showIcon = true }: AlertOptions) => {
            showAlert({
                type: 'warning',
                title,
                message,
                showIcon,
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
                dismissable: false,
            });
        },
        [showAlert, hideAlert]
    );

    const showInfo = useCallback(
        ({ title, message, onConfirm, showIcon = true }: AlertOptions) => {
            showAlert({
                type: 'info',
                title,
                message,
                showIcon,
                primaryAction: {
                    label: 'OK',
                    onPress: () => {
                        hideAlert();
                        onConfirm?.();
                    },
                },
                dismissable: true,
            });
        },
        [showAlert, hideAlert]
    );

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
                {...config}
            />
        </AlertContext.Provider>
    );
};
