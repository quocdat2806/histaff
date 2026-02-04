import { AppText } from '@/components/ui';
import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { TimerPickerModal } from 'react-native-timer-picker';
import { Width } from '@/constants/dimens';
import { Colors } from '@/constants/colors';
import { useTranslation } from '@/hooks/useTranslation';
export interface OpenTimePickerOptions {
  defaultTime?: string;
  onTimeChange: (time: string) => void;
}

interface TimePickerContextValue {
  openTimePicker: (options: OpenTimePickerOptions) => void;
  closeTimePicker: () => void;
}

const TimePickerContext = createContext<TimePickerContextValue | undefined>(
  undefined,
);

function parseTimeString(timeStr: string): {
  hours: number;
  minutes: number;
} {
  const parts = timeStr.trim().split(':').map(Number);
  return {
    hours: Math.min(23, Math.max(0, parts[0] ?? 0)),
    minutes: Math.min(59, Math.max(0, parts[1] ?? 0)),
  };
}

function formatDuration(hours: number, minutes: number): string {
  const h = String(hours).padStart(2, '0');
  const m = String(minutes).padStart(2, '0');
  return `${h}:${m}`;
}

export const useTimePicker = () => {
  const ctx = useContext(TimePickerContext);
  if (!ctx) {
    throw new Error('useTimePicker must be used within TimePickerProvider');
  }
  return ctx;
};

export const TimePickerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);
  const [initialValue, setInitialValue] = useState<{
    hours: number;
    minutes: number;
  }>({ hours: 8, minutes: 0 });
  const onTimeChangeRef = useRef<(time: string) => void>(() => {});

  const openTimePicker = useCallback((options: OpenTimePickerOptions) => {
    onTimeChangeRef.current = options.onTimeChange;
    if (options.defaultTime) {
      setInitialValue(parseTimeString(options.defaultTime));
    } else {
      setInitialValue({ hours: 0, minutes: 0 });
    }
    setVisible(true);
  }, []);

  const closeTimePicker = useCallback(() => {
    setVisible(false);
  }, []);

  const handleConfirm = useCallback(
    ({ hours, minutes }: { hours: number; minutes: number }) => {
      const timeStr = formatDuration(hours, minutes);
      closeTimePicker();
      setTimeout(() => {
        onTimeChangeRef.current(timeStr);
      }, 250);
    },
    [closeTimePicker],
  );

  return (
    <TimePickerContext.Provider value={{ openTimePicker, closeTimePicker }}>
      {children}
      <TimerPickerModal
        hourLabel=""
        minuteLabel=""
        visible={visible}
        setIsVisible={setVisible}
        onConfirm={handleConfirm}
        onCancel={closeTimePicker}
        closeOnOverlayPress
        hideDays
        hideSeconds={true}
        initialValue={initialValue}
        cancelButton={
          <AppText
            center
            style={{
              width: Width.fullScreenDimensionWidth / 3,
            }}
          >
            {t('cancel')}
          </AppText>
        }
        confirmButton={
          <AppText
            color={Colors.primary}
            center
            style={{
              width: Width.fullScreenDimensionWidth / 3,
            }}
          >
            {t('confirm')}
          </AppText>
        }
        styles={{}}
      />
    </TimePickerContext.Provider>
  );
};
