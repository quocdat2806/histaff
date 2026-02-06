import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Animated,
} from 'react-native';
import { Colors } from '@/constants/colors';
import AppStyles from '@/style';
import { AppText } from '@/components/ui';

export interface DropdownOption<T = string> {
  label: string;
  value: T;
}

export interface OpenDropdownOptions<T = string> {
  options: DropdownOption<T>[];
  value?: T;
  placeholder?: string;
  onChange: (value: T) => void;
}

interface DropdownContextValue {
  openDropdown: <T = string>(options: OpenDropdownOptions<T>) => void;
  closeDropdown: () => void;
}

const DropdownContext = createContext<DropdownContextValue | undefined>(
  undefined,
);

export const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) {
    throw new Error('useDropdown must be used within DropdownProvider');
  }
  return ctx;
};

export const DropdownProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [config, setConfig] = useState<{
    options: DropdownOption<unknown>[];
    value: unknown;
    placeholder: string;
  }>({ options: [], value: undefined, placeholder: 'Chọn' });
  const onChangeRef = useRef<(value: unknown) => void>(() => {});
  const [animating, setAnimating] = useState(false);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.9)).current;

  const openDropdown = useCallback(
    (options: OpenDropdownOptions<any>) => {
      onChangeRef.current = options.onChange as (value: unknown) => void;
      setConfig({
        options: options.options as DropdownOption<unknown>[],
        value: options.value,
        placeholder: options.placeholder ?? 'Chọn',
      });
      setVisible(true);
      setAnimating(true);
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.9);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 8,
          tension: 100,
          useNativeDriver: true,
        }),
      ]).start(() => setAnimating(false));
    },
    [fadeAnim, scaleAnim],
  ) as <T = string>(options: OpenDropdownOptions<T>) => void;

  const closeDropdown = useCallback(() => {
    setAnimating(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setVisible(false);
      setAnimating(false);
    });
  }, [fadeAnim, scaleAnim]);

  const handleSelect = useCallback(
    (optionValue: unknown) => {
      if (animating) return;
      closeDropdown();
      setTimeout(() => {
        onChangeRef.current(optionValue);
      }, 200);
    },
    [animating, closeDropdown],
  );

  return (
    <DropdownContext.Provider value={{ openDropdown, closeDropdown }}>
      {children}
      <Modal
        visible={visible}
        transparent
        animationType="none"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={[AppStyles.f_1]}
          onPress={closeDropdown}
        >
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              AppStyles.backGroundModal,
              { opacity: fadeAnim },
            ]}
          />
          <View
            style={[
              AppStyles.f_1,
              AppStyles.j_center,
              AppStyles.paddingHorizontal16,
            ]}
          >
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                opacity: fadeAnim,
              }}
            >
              <View
                style={[AppStyles.backGroundWhite, AppStyles.borderRadius8]}
                onStartShouldSetResponder={() => true}
              >
                {config.options.map((option) => {
                  const isSelected = option.value === config.value;
                  return (
                    <TouchableOpacity
                      key={String(option.value)}
                      style={[
                        AppStyles.paddingVertical8,
                        AppStyles.paddingHorizontal12,
                        styles.option,
                      ]}
                      onPress={() => handleSelect(option.value)}
                      activeOpacity={0.7}
                    >
                      <AppText
                        color={isSelected ? Colors.primary : Colors.black}
                      >
                        {option.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          </View>
        </TouchableOpacity>
      </Modal>
    </DropdownContext.Provider>
  );
};

const styles = StyleSheet.create({
  option: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
});
