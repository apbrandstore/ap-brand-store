import type { PaperbaseOrderReceipt } from "@/types/paperbase";

export function isValidOrderPublicId(id: string | undefined | null): boolean {
  return typeof id === "string" && id.length > 0 && id.startsWith("ord_");
}

/**
 * Whether a cached receipt may be shown on `/success/[orderId]` (same browser session).
 */
export function isReceiptEligibleForSuccessPage(
  orderIdFromUrl: string,
  order: PaperbaseOrderReceipt | null,
): order is PaperbaseOrderReceipt {
  if (!order) return false;
  if (!isValidOrderPublicId(orderIdFromUrl)) return false;
  if (order.public_id !== orderIdFromUrl) return false;
  if (order.status === "cancelled") return false;

  if (order.requires_payment === true) {
    const ps = order.payment_status ?? "none";
    if (ps === "failed") return false;
    return ps === "submitted" || ps === "verified";
  }

  return true;
}
