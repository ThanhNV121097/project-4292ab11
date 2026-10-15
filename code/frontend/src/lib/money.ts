/** Prices are in VND, written the Vietnamese way: 34.990.000 ₫. */
export function formatVND(amount: number): string {
  return `${amount.toLocaleString("vi-VN")} ₫`;
}
