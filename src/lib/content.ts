export type LocalizedValue = {
  zh?: string | null;
  en?: string | null;
};

export type DocumentAccess = {
  accessLevel: "public" | "request";
  filePath?: string | null;
};

export function getLocalizedValue(
  locale: "zh" | "en",
  zhValue?: string | null,
  enValue?: string | null
) {
  const zh = zhValue?.trim();
  const enRaw = enValue?.trim();
  const en = enRaw?.startsWith("EN pending:") ? "" : enRaw;

  if (locale === "zh") {
    return zh || en || "";
  }

  return en || zh || "";
}

export function getStructuredInfoRows(value?: string | null) {
  return (value || "")
    .split(/[\n\r]+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split(/[:：]/);
      if (parts.length < 2) {
        return null;
      }

      return {
        label: parts[0].trim(),
        value: parts.slice(1).join("：").trim()
      };
    })
    .filter((row): row is { label: string; value: string } => Boolean(row));
}

export function canDirectDownload(document: DocumentAccess) {
  return document.accessLevel === "public" && Boolean(document.filePath?.trim());
}

export function isProtectedDocument(
  document: Pick<DocumentAccess, "accessLevel">
) {
  return document.accessLevel === "request";
}

export function splitDisplayPoints(value?: string | null) {
  return (value || "")
    .split(/[\n\r]+|；|;|。/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function truncateDisplayText(value?: string | null, maxLength = 50) {
  const text = (value || "").replace(/\s+/g, " ").trim();

  if (!text || text.length <= maxLength) {
    return {
      text,
      truncated: false
    };
  }

  return {
    text: `${text.slice(0, maxLength).trim()}...`,
    truncated: true
  };
}

function firstMeaningfulPoint(value?: string | null) {
  return splitDisplayPoints(value)[0] || "";
}

export function getCatalogCardSummary(
  locale: "zh" | "en",
  fields: {
    applicationZh?: string | null;
    applicationEn?: string | null;
    specificationsZh?: string | null;
    specificationsEn?: string | null;
    summaryZh?: string | null;
    summaryEn?: string | null;
  }
) {
  const application = firstMeaningfulPoint(
    getLocalizedValue(locale, fields.applicationZh, fields.applicationEn)
  );
  const specifications = firstMeaningfulPoint(
    getLocalizedValue(locale, fields.specificationsZh, fields.specificationsEn)
  );
  const summary = firstMeaningfulPoint(
    getLocalizedValue(locale, fields.summaryZh, fields.summaryEn)
  );

  const parts = [application, specifications, summary].filter(Boolean);
  const uniqueParts = parts.filter((part, index) => parts.indexOf(part) === index);

  if (uniqueParts.length >= 2) {
    return uniqueParts.slice(0, 3).join("；");
  }

  return uniqueParts[0] || "";
}
