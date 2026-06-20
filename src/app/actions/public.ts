"use server";

import { redirect } from "next/navigation";
import { createDocumentRequest, findDocumentById, saveInquiry } from "@/lib/repository";
import { documentRequestSchema, inquirySchema } from "@/lib/validators";

export async function submitInquiryAction(formData: FormData) {
  const locale = String(formData.get("locale") || "en");

  const parsed = inquirySchema.safeParse({
    name: formData.get("name"),
    company: formData.get("company"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    redirect(`/${locale}/contact?status=error`);
  }

  saveInquiry(undefined, parsed.data);
  redirect(`/${locale}/contact?status=success`);
}

export async function submitDocumentRequestAction(formData: FormData) {
  const locale = String(formData.get("locale") || "en");
  const documentId = Number(formData.get("documentId") || 0);

  if (!findDocumentById(documentId)) {
    redirect(`/${locale}/documents?status=missing`);
  }

  const parsed = documentRequestSchema.safeParse({
    documentId,
    company: formData.get("company"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    message: formData.get("message")
  });

  if (!parsed.success) {
    redirect(`/${locale}/documents?status=error`);
  }

  createDocumentRequest(undefined, parsed.data);
  redirect(`/${locale}/documents?status=success`);
}
