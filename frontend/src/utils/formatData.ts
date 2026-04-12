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

export const formatDateWithAge = (dateString: string): string => {
  const [yearNumber, monthNumber, dayNumber] = dateString
    .split('-')
    .map(Number);
  const date = new Date(yearNumber, monthNumber - 1, dayNumber);

  if (isNaN(date.getTime())) return '';

  const today = new Date();

  let age = today.getFullYear() - date.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > date.getMonth() ||
    (today.getMonth() === date.getMonth() && today.getDate() >= date.getDate());

  if (age > 0 && !hasHadBirthdayThisYear) {
    age--;
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year} ${age ? `(${age} ${age > 1 ? 'anos' : 'ano'})` : ''}`;
};

export function formatDateWithYearOrMonthAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();

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

  let yearsDiff = now.getFullYear() - year;
  let monthsDiff = now.getMonth() - date.getMonth();

  if (monthsDiff < 0) {
    yearsDiff--;
    monthsDiff += 12;
  }

  let relative = '';

  if (yearsDiff > 0) {
    relative = `há ${yearsDiff} ano${yearsDiff > 1 ? 's' : ''}`;
  } else if (monthsDiff > 0) {
    relative = `há ${monthsDiff} mês${monthsDiff > 1 ? 'es' : ''}`;
  } else {
    relative = 'este mês';
  }

  return `${month} ${year} (${relative})`;
}
