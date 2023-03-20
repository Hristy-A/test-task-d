export function formatDate(dateString) {
  if (!dateString) return 'Unknown date';
  return new Date(Date.parse(dateString)).toLocaleDateString();
}
