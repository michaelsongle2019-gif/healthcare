import { z } from "zod";

const optionalUrl = z
  .string()
  .trim()
  .refine(
    (value) =>
      value.length === 0 || /^https?:\/\//.test(value) || value.startsWith("/"),
    "Invalid URL"
  );

export const categorySchema = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().trim().min(2),
  nameZh: z.string().trim().min(2),
  nameEn: z.string().trim().min(2),
  descriptionZh: z.string().trim().min(2),
  descriptionEn: z.string().trim().min(2),
  sortOrder: z.number().int().min(0).default(0)
});

export const productSchema = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().trim().min(2),
  categoryId: z.number().int().positive(),
  manufacturerZh: z.string().trim().min(2),
  manufacturerEn: z.string().trim().min(2),
  model: z.string().trim().min(2),
  nameZh: z.string().trim().min(2),
  nameEn: z.string().trim().min(2),
  summaryZh: z.string().trim().min(2),
  summaryEn: z.string().trim().min(2),
  applicationZh: z.string().trim().min(2),
  applicationEn: z.string().trim().min(2),
  specificationsZh: z.string().trim().min(2),
  specificationsEn: z.string().trim().min(2),
  packagingZh: z.string().trim().min(2),
  packagingEn: z.string().trim().min(2),
  imageUrl: optionalUrl,
  featured: z.boolean().default(false),
  seoTitleZh: z.string().trim().min(2),
  seoTitleEn: z.string().trim().min(2),
  seoDescriptionZh: z.string().trim().min(2),
  seoDescriptionEn: z.string().trim().min(2)
});

export const documentSchema = z.object({
  id: z.number().int().positive().optional(),
  productId: z.number().int().positive().nullable().optional(),
  titleZh: z.string().trim().min(2),
  titleEn: z.string().trim().min(2),
  descriptionZh: z.string().trim().min(2),
  descriptionEn: z.string().trim().min(2),
  accessLevel: z.enum(["public", "request"]),
  filePath: z.string().trim().optional().default(""),
  storagePath: z.string().trim().optional().default(""),
  sortOrder: z.number().int().min(0).default(0)
});

export const newsSchema = z.object({
  id: z.number().int().positive().optional(),
  slug: z.string().trim().min(2),
  titleZh: z.string().trim().min(2),
  titleEn: z.string().trim().min(2),
  summaryZh: z.string().trim().min(2),
  summaryEn: z.string().trim().min(2),
  contentZh: z.string().trim().min(2),
  contentEn: z.string().trim().min(2),
  publishedAt: z.string().trim().min(2),
  featured: z.boolean().default(false)
});

export const documentRequestSchema = z.object({
  documentId: z.number().int().positive(),
  company: z.string().trim().min(2),
  name: z.string().trim().min(2),
  email: z.email(),
  phone: z.string().trim().min(6),
  message: z.string().trim().min(4)
});

export const inquirySchema = z.object({
  name: z.string().trim().min(2),
  company: z.string().trim().min(2),
  email: z.email(),
  phone: z.string().trim().min(6),
  country: z.string().trim().min(2),
  message: z.string().trim().min(10)
});

export const settingsSchema = z.object({
  companyNameZh: z.string().trim().min(2),
  companyNameEn: z.string().trim().min(2),
  taglineZh: z.string().trim().min(2),
  taglineEn: z.string().trim().min(2),
  addressZh: z.string().trim().min(2),
  addressEn: z.string().trim().min(2),
  phone: z.string().trim().min(6),
  email: z.email(),
  heroTitleZh: z.string().trim().min(2),
  heroTitleEn: z.string().trim().min(2),
  heroBodyZh: z.string().trim().min(2),
  heroBodyEn: z.string().trim().min(2),
  seoDescriptionZh: z.string().trim().min(2),
  seoDescriptionEn: z.string().trim().min(2)
});

export type CategoryInput = z.infer<typeof categorySchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type DocumentInput = z.infer<typeof documentSchema>;
export type NewsInput = z.infer<typeof newsSchema>;
export type DocumentRequestInput = z.infer<typeof documentRequestSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
export type SettingsInput = z.infer<typeof settingsSchema>;
