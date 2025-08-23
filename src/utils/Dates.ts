  export function formatDefaultDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric', year: 'numeric' };
  const formatted = d.toLocaleDateString('es-CO', options);
  const match = formatted.match(/^(\d{1,2}) de (\w+) de (\d{4})$/i);
  if (match) {
    const [, day, month, year] = match;
    return `${month} ${day}, ${year}`;
  }
  return formatted;
}