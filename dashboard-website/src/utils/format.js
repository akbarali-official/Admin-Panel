// $1,234.00
export const formatMoney = (n) =>
  `$${Number(n || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

// $961
export const formatWhole = (n) => `$${Math.round(Number(n || 0)).toLocaleString('en-US')}`;

// 203000 -> $203k
export const formatCompact = (n) => {
  const num = Number(n || 0);
  if (Math.abs(num) >= 1000) {
    const k = num / 1000;
    return `$${Number.isInteger(k) ? k : k.toFixed(1)}k`;
  }
  return `$${num}`;
};
