export const formatMMMYYYY = (dateString: string): string => {
  const date = new Date(dateString);

  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${year}`;
};

export function formatDDMMMYYYY(dateString: string): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) return '';

  const day = date.getDate();

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    month: 'short',
    year: 'numeric',
  });

  const parts = formatter.formatToParts(date);

  const month = parts.find(p => p.type === 'month')?.value ?? '';
  const year = parts.find(p => p.type === 'year')?.value ?? '';

  return `${day} de ${month} de ${year}`;
}
