const czk = new Intl.NumberFormat('cs-CZ', {
  style: 'currency',
  currency: 'CZK',
  maximumFractionDigits: 0,
})

const num = new Intl.NumberFormat('cs-CZ', { maximumFractionDigits: 1 })

export function formatCzk(value: number): string {
  if (!isFinite(value)) return '—'
  return czk.format(Math.round(value))
}

export function formatNumber(value: number): string {
  if (!isFinite(value)) return '—'
  return num.format(value)
}
