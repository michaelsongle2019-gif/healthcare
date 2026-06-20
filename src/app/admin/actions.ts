"use server";

import fs from "node:fs";
import path from "node:path";
import { redirect } from "next/navigation";
import { getDefaultAdminCredentials, verifyPassword } from "@/lib/auth";
import {
  findDocumentById,
  logAuditAction,
  saveCategory,
  saveDocument,
  saveNews,
  saveProduct,
  saveSiteSettings
} from "@/lib/repository";
import {
  clearAdminSession,
  createAdminSession,
  getSessionUser
} from "@/lib/session";
import { saveUploadedFile } from "@/lib/uploads";
import { getDatabaseFilePath, getWritableRoot, isEphemeralHosting } from "@/lib/runtime-storage";
import {
  categorySchema,
  documentSchema,
  newsSchema,
  productSchema,
  settingsSchema
} from "@/lib/validators";

function toNumber(value: FormDataEntryValue | null) {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
}

function toBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

async function requireAdmin() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/admin/login");
  }
  return user;
}

export async function loginAction(formData: FormData) {
  const username = String(formData.get("username") || "");
  const password = String(formData.get("password") || "");
  const credentials = getDefaultAdminCredentials();

  if (
    username !== credentials.username ||
    !(await verifyPassword(password, credentials.passwordHash))
  ) {
    redirect("/admin/login?error=1");
  }

  await createAdminSession(username);
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}

export async function saveSettingsAction(formData: FormData) {
  const user = await requireAdmin();
  const parsed = settingsSchema.safeParse({
    companyNameZh: formData.get("companyNameZh"),
    companyNameEn: formData.get("companyNameEn"),
    taglineZh: formData.get("taglineZh"),
    taglineEn: formData.get("taglineEn"),
    addressZh: formData.get("addressZh"),
    addressEn: formData.get("addressEn"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    heroTitleZh: formData.get("heroTitleZh"),
    heroTitleEn: formData.get("heroTitleEn"),
    heroBodyZh: formData.get("heroBodyZh"),
    heroBodyEn: formData.get("heroBodyEn"),
    seoDescriptionZh: formData.get("seoDescriptionZh"),
    seoDescriptionEn: formData.get("seoDescriptionEn")
  });

  if (!parsed.success) {
    redirect("/admin/settings?status=error");
  }

  saveSiteSettings(undefined, parsed.data);
  logAuditAction(user.username, "site_settings.updated", "Updated site settings");
  redirect("/admin/settings?status=saved");
}

export async function saveCategoryAction(formData: FormData) {
  const user = await requireAdmin();
  const parsed = categorySchema.safeParse({
    id: toNumber(formData.get("id")) || undefined,
    slug: formData.get("slug"),
    nameZh: formData.get("nameZh"),
    nameEn: formData.get("nameEn"),
    descriptionZh: formData.get("descriptionZh"),
    descriptionEn: formData.get("descriptionEn"),
    sortOrder: toNumber(formData.get("sortOrder"))
  });

  if (!parsed.success) {
    redirect("/admin/categories?status=error");
  }

  const id = saveCategory(undefined, parsed.data);
  logAuditAction(user.username, "category.saved", `Category ${id} saved`);
  redirect("/admin/categories?status=saved");
}

export async function saveProductAction(formData: FormData) {
  const user = await requireAdmin();
  const uploadedImage = formData.get("imageFile");
  const imageAsset =
    uploadedImage instanceof File && uploadedImage.size > 0
      ? await saveUploadedFile(uploadedImage, "product-images")
      : null;

  const parsed = productSchema.safeParse({
    id: toNumber(formData.get("id")) || undefined,
    slug: formData.get("slug"),
    categoryId: toNumber(formData.get("categoryId")),
    manufacturerZh: formData.get("manufacturerZh"),
    manufacturerEn: formData.get("manufacturerEn"),
    model: formData.get("model"),
    nameZh: formData.get("nameZh"),
    nameEn: formData.get("nameEn"),
    summaryZh: formData.get("summaryZh"),
    summaryEn: formData.get("summaryEn"),
    applicationZh: formData.get("applicationZh"),
    applicationEn: formData.get("applicationEn"),
    specificationsZh: formData.get("specificationsZh"),
    specificationsEn: formData.get("specificationsEn"),
    packagingZh: formData.get("packagingZh"),
    packagingEn: formData.get("packagingEn"),
    imageUrl: imageAsset?.filePath ?? formData.get("imageUrl"),
    featured: toBoolean(formData.get("featured")),
    seoTitleZh: formData.get("seoTitleZh"),
    seoTitleEn: formData.get("seoTitleEn"),
    seoDescriptionZh: formData.get("seoDescriptionZh"),
    seoDescriptionEn: formData.get("seoDescriptionEn")
  });

  if (!parsed.success) {
    redirect("/admin/products?status=error");
  }

  const id = saveProduct(undefined, parsed.data);
  logAuditAction(user.username, "product.saved", `Product ${id} saved`);
  redirect("/admin/products?status=saved");
}

export async function saveDocumentAction(formData: FormData) {
  const user = await requireAdmin();
  const accessLevel = String(formData.get("accessLevel") || "public") as
    | "public"
    | "request";
  const uploadedFile = formData.get("documentFile");
  const uploadedAsset =
    uploadedFile instanceof File && uploadedFile.size > 0
      ? await saveUploadedFile(
          uploadedFile,
          accessLevel === "public" ? "public-documents" : "protected-documents"
        )
      : null;

  const parsed = documentSchema.safeParse({
    id: toNumber(formData.get("id")) || undefined,
    productId: toNumber(formData.get("productId")) || null,
    titleZh: formData.get("titleZh"),
    titleEn: formData.get("titleEn"),
    descriptionZh: formData.get("descriptionZh"),
    descriptionEn: formData.get("descriptionEn"),
    accessLevel,
    filePath: uploadedAsset?.filePath ?? String(formData.get("filePath") || ""),
    storagePath:
      uploadedAsset?.storagePath ?? String(formData.get("storagePath") || ""),
    sortOrder: toNumber(formData.get("sortOrder"))
  });

  if (!parsed.success) {
    redirect("/admin/documents?status=error");
  }

  const id = saveDocument(undefined, parsed.data);
  logAuditAction(user.username, "document.saved", `Document ${id} saved`);
  redirect("/admin/documents?status=saved");
}

export async function saveNewsAction(formData: FormData) {
  const user = await requireAdmin();
  const parsed = newsSchema.safeParse({
    id: toNumber(formData.get("id")) || undefined,
    slug: formData.get("slug"),
    titleZh: formData.get("titleZh"),
    titleEn: formData.get("titleEn"),
    summaryZh: formData.get("summaryZh"),
    summaryEn: formData.get("summaryEn"),
    contentZh: formData.get("contentZh"),
    contentEn: formData.get("contentEn"),
    publishedAt: formData.get("publishedAt"),
    featured: toBoolean(formData.get("featured"))
  });

  if (!parsed.success) {
    redirect("/admin/news?status=error");
  }

  const id = saveNews(undefined, parsed.data);
  logAuditAction(user.username, "news.saved", `News ${id} saved`);
  redirect("/admin/news?status=saved");
}

export async function createBackupAction() {
  const user = await requireAdmin();
  if (isEphemeralHosting()) {
    redirect("/admin?status=backup-disabled");
  }

  const databaseFile = getDatabaseFilePath();
  const backupDirectory = path.join(getWritableRoot(), "backups");
  fs.mkdirSync(backupDirectory, { recursive: true });
  const backupFile = path.join(
    backupDirectory,
    `healthcare-backup-${Date.now()}.db`
  );
  fs.copyFileSync(databaseFile, backupFile);
  logAuditAction(user.username, "backup.created", backupFile);
  redirect("/admin?status=backup-created");
}
