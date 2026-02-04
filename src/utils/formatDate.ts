import moment from 'moment';

moment.locale('vi');

export const formatDate = (date: string) => {
  return moment(date).format('L');
};

export const toYYYYMMDD = (value: string | undefined): string => {
  return moment(value).format('YYYY-MM-DD');
};

export const toDisplayDate = (dateStr: string): string => {
  return moment(dateStr).format('DD/MM/YYYY');
};

export const getDatesInRange = (fromDate: string, toDate: string): string[] => {
  const from = moment(fromDate, 'YYYY-MM-DD', true);
  const to = moment(toDate, 'YYYY-MM-DD', true);
  if (!from.isValid() || !to.isValid() || from.isAfter(to)) {
    return [];
  }
  const dates: string[] = [];
  const current = from.clone();
  while (current.isSameOrBefore(to, 'day')) {
    dates.push(current.format('YYYY-MM-DD'));
    current.add(1, 'day');
  }
  return dates;
};
