/**
 * Formatting helpers for the My Fleet client app — French locale defaults.
 */

import { centsToUnits } from "./money";

const DEFAULT_CURRENCY = "EUR";
const DEFAULT_LOCALE = "fr-FR";

/**
 * Format a monetary amount. Input is in **cents** (the canonical unit on the
 * wire and in the DB). Output uses French locale (e.g. 123456 -> "1 234,56 EUR").
 */
export function formatCurrency(
  cents: number,
  currency: string = DEFAULT_CURRENCY,
): string {
  return new Intl.NumberFormat(DEFAULT_LOCALE, {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(centsToUnits(cents));
}
