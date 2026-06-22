export type LocalizedValue = {
  zh?: string | null;
  en?: string | null;
};

export type DocumentAccess = {
  accessLevel: "public" | "request";
  filePath?: string | null;
};

function containsHan(value: string) {
  return /[\u3400-\u9fff]/.test(value);
}

function normalizeEnglishMedicalText(value: string) {
  return value
    .replace(/国械注准\s*/g, "NMPA Registration No. ")
    .replace(/国械注进\s*/g, "NMPA Import Registration No. ")
    .replace(/国械注许\s*/g, "NMPA Approval No. ")
    .replace(/注册证号\s*\/\s*NMPA/gi, "Registration Certificate / NMPA")
    .replace(/注册证号/g, "Registration Certificate / NMPA")
    .replace(/注册证名称/g, "Registered Product Name")
    .replace(/注册人\s*\/\s*持证人/g, "Registrant / Certificate Holder")
    .replace(/管理类别/g, "Regulatory Class")
    .replace(/NMPA核验状态/g, "NMPA Verification Status")
    .replace(/III类/g, "Class III")
    .replace(/II类/g, "Class II")
    .replace(/I类/g, "Class I")
    .replace(/[（]/g, "(")
    .replace(/[）]/g, ")")
    .replace(/[：]/g, ": ")
    .replace(/[；]/g, "; ")
    .replace(/[^\S\r\n]+/g, " ")
    .trim();
}

function isConfidentialPriceText(value: string) {
  const normalized = value.toLowerCase();

  return [
    "价格",
    "价位",
    "价格带",
    "报价",
    "price reference",
    "price band",
    "pricing",
    "quoted price"
  ].some((keyword) => normalized.includes(keyword));
}

function sanitizePublicDisplayText(value: string) {
  return value
    .split(/[\r\n]+/)
    .map((line) => line.trim())
    .filter((line) => line && !isConfidentialPriceText(line))
    .join("\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{2,}/g, "\n")
    .trim();
}

export function getLocalizedValue(
  locale: "zh" | "en",
  zhValue?: string | null,
  enValue?: string | null
) {
  const zh = zhValue?.trim() || "";
  const enRaw = enValue?.trim() || "";
  const en = enRaw.startsWith("EN pending:") ? "" : enRaw;

  if (locale === "zh") {
    return sanitizePublicDisplayText(zh || en || "");
  }

  const englishPreferred = en || (!containsHan(zh) ? zh : "");
  return sanitizePublicDisplayText(normalizeEnglishMedicalText(englishPreferred));
}

export function getStructuredInfoRows(value?: string | null) {
  return sanitizePublicDisplayText(value || "")
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
        value: parts.slice(1).join(":").trim()
      };
    })
    .filter(
      (row) => row && !isConfidentialPriceText(`${row.label} ${row.value}`)
    )
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
    .split(/[\n\r]+|[；;]+/)
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

function trimTrailingPunctuation(value: string) {
  return value.replace(/[。；;,.，\s]+$/g, "").trim();
}

function firstMeaningfulPoint(value?: string | null) {
  return trimTrailingPunctuation(splitDisplayPoints(value)[0] || "");
}

function isSourceVerificationPoint(value: string) {
  const normalized = value.toLowerCase();

  return [
    "official website",
    "official product page",
    "public official",
    "cross-verified",
    "cross-checked",
    "matched",
    "registration certificate number",
    "nmpa registration no.",
    "nmpa import registration no.",
    "recent nmpa delivery information",
    "can be directly matched"
  ].some((keyword) => normalized.includes(keyword));
}

function joinLocalizedSummaryParts(
  locale: "zh" | "en",
  parts: string[],
  maxParts = 3
) {
  const uniqueParts = parts.filter(
    (part, index) => part && parts.indexOf(part) === index
  );

  if (!uniqueParts.length) {
    return "";
  }

  const selectedParts = uniqueParts.slice(0, maxParts);

  if (locale === "en") {
    return `${selectedParts.join(". ")}.`;
  }

  return selectedParts.join("；");
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

  return joinLocalizedSummaryParts(
    locale,
    [application, specifications, summary],
    3
  );
}

export function getHomepageHeroSummary(
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
  const summary = firstMeaningfulPoint(
    getLocalizedValue(locale, fields.summaryZh, fields.summaryEn)
  );
  const application = firstMeaningfulPoint(
    getLocalizedValue(locale, fields.applicationZh, fields.applicationEn)
  );
  const specifications = firstMeaningfulPoint(
    getLocalizedValue(locale, fields.specificationsZh, fields.specificationsEn)
  );

  if (locale === "en") {
    const preferredSummary = isSourceVerificationPoint(summary) ? "" : summary;

    return joinLocalizedSummaryParts(
      locale,
      [application, specifications, preferredSummary],
      2
    );
  }

  return joinLocalizedSummaryParts(locale, [summary, application, specifications], 2);
}
