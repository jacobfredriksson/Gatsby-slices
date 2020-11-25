const formatter = Intl.NumberFormat('sv-SE', {
  style: 'currency',
  currency: 'SEK'
})

export const formatMoney = (sek) => {
  return formatter.format(sek)
}
