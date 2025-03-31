export function formatCurrency(
    amount: number,
    currency: string = 'COP',
    locale: string = 'es-CO'
  ): string {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
    }).format(amount);
  }