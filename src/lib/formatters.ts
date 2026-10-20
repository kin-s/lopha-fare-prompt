export function formatKsh(amount: number): string {
  return `KSh ${amount.toLocaleString('en-KE')}`;
}
export function maskPhoneNumber(phone: string): string {
  if (!phone) return '';
  return phone.length > 6 ? `${phone.slice(0, 4)}***${phone.slice(-3)}` : phone;
}
export function formatTimestamp(isoString: string): string {
  return new Date(isoString).toLocaleString('en-KE', { dateStyle: 'medium', timeStyle: 'short' });
}