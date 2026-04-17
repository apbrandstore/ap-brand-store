import type { PaperbaseStorePublic } from "@/types/paperbase";

type ExtraFieldLabels = { yes: string; no: string };

function formatExtraFieldValue(value: unknown, labels?: ExtraFieldLabels): string {
  if (value === null || value === undefined) {
    return "";
  }
  if (typeof value === "boolean") {
    if (labels) {
      return value ? labels.yes : labels.no;
    }
    return value ? "Yes" : "No";
  }
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }
  if (Array.isArray(value)) {
    return value
      .map((item) => formatExtraFieldValue(item, labels))
      .filter((item) => item.trim().length > 0)
      .join(", ");
  }
  return JSON.stringify(value);
}

/** Splits description into one bullet per non-empty line; blank lines are skipped. */
export function splitProductDescriptionBullets(description: string): string[] {
  const t = description.trim();
  if (!t) return [];
  const lines = t
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  return lines.length > 0 ? lines : [t];
}

function humanizeExtraKey(key: string): string {
  return key
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Keys used only for UI / merchandising — not shown as customer-facing specs. */
const INTERNAL_EXTRA_DATA_KEYS = new Set(["card_gallery_urls"]);

/** Builds human-readable lines for the product details section from store schema + `extra_data`. */
export function buildProductExtraDetailLines(
  schema: PaperbaseStorePublic["extra_field_schema"] | undefined,
  extraData: Record<string, unknown> | undefined,
  labels?: ExtraFieldLabels,
): string[] {
  const data = extraData ?? {};
  const fields = schema ?? [];
  const entityOf = (field: (typeof fields)[number]) => {
    const raw =
      (field as { entityType?: string }).entityType ?? (field as { entity_type?: string }).entity_type;
    return raw != null ? String(raw).toLowerCase() : "";
  };

  const productFields = fields
    .filter((field) => {
      const entity = entityOf(field);
      return !entity || entity === "product";
    })
    .slice()
    .sort((a, b) => {
      const orderA = (a as { order?: number }).order ?? 0;
      const orderB = (b as { order?: number }).order ?? 0;
      return orderA - orderB;
    });

  const lines: string[] = [];
  const covered = new Set<string>();

  for (const field of productFields) {
    const fieldId = (field as { id?: string }).id;
    const fieldName = (field as { name?: string }).name;
    if (!fieldId || !fieldName) {
      continue;
    }
    const text = formatExtraFieldValue(data[fieldId], labels).trim();
    if (!text) {
      continue;
    }
    covered.add(fieldId);
    lines.push(`${fieldName}: ${text}`);
  }

  for (const [key, raw] of Object.entries(data)) {
    if (covered.has(key) || INTERNAL_EXTRA_DATA_KEYS.has(key)) {
      continue;
    }
    const text = formatExtraFieldValue(raw, labels).trim();
    if (!text) {
      continue;
    }
    lines.push(`${humanizeExtraKey(key)}: ${text}`);
  }

  return lines;
}
