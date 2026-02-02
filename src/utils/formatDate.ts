export const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('vi-VN');
}
export const toYYYYMMDD = (value: string | undefined): string => {
    const d = value ? new Date(value) : new Date();
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }
