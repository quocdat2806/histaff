import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  ReactNode,
} from 'react';
import { CalendarPickerModal } from '@/components/shared/CalendarPicker';

export interface OpenCalendarPickerOptions {
  defaultDate?: string;
  onDateChange: (date: string) => void;
}

interface CalendarPickerContextValue {
  openCalendarPicker: (options: OpenCalendarPickerOptions) => void;
  closeCalendarPicker: () => void;
}

const CalendarPickerContext = createContext<CalendarPickerContextValue | undefined>(undefined);

export const useCalendarPicker = () => {
  const ctx = useContext(CalendarPickerContext);
  if (!ctx) {
    throw new Error('useCalendarPicker must be used within CalendarPickerProvider');
  }
  return ctx;
};

export const CalendarPickerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [defaultDate, setDefaultDate] = useState<string | undefined>();
  const onDateChangeRef = useRef<(date: string) => void>(() => {});

  const openCalendarPicker = useCallback((options: OpenCalendarPickerOptions) => {
    onDateChangeRef.current = options.onDateChange;
    setDefaultDate(options.defaultDate);
    setVisible(true);
  }, []);

  const closeCalendarPicker = useCallback(() => {
    setVisible(false);
  }, []);

  const handleDateChange = useCallback((date: string) => {
    onDateChangeRef.current(date);
    closeCalendarPicker();
  }, [closeCalendarPicker]);

  return (
    <CalendarPickerContext.Provider value={{ openCalendarPicker, closeCalendarPicker }}>
      {children}
      <CalendarPickerModal
        isVisible={visible}
        defaultDate={defaultDate}
        onDateChange={handleDateChange}
        onClose={closeCalendarPicker}
      />
    </CalendarPickerContext.Provider>
  );
};
