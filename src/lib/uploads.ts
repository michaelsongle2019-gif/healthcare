import path from "node:path";
import fs from "node:fs/promises";
import {
  getProtectedUploadDirectory,
  isEphemeralHosting
} from "@/lib/runtime-storage";

function sanitizeName(name: string) {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, "-").toLowerCase();
}

export async function saveUploadedFile(
  file: File,
  target: "product-images" | "public-documents" | "protected-documents"
) {
  if (!file || file.size === 0) {
    return null;
  }

  const bytes = Buffer.from(await file.arrayBuffer());
  const timestamp = Date.now();
  const safeName = sanitizeName(file.name || "upload.bin");

  if (isEphemeralHosting() && target !== "protected-documents") {
    throw new Error(
      "Runtime uploads for public assets are disabled on hosted preview deployments."
    );
  }

  if (target === "protected-documents") {
    const directory = getProtectedUploadDirectory();
    await fs.mkdir(directory, { recursive: true });
    const storagePath = path.join(directory, `${timestamp}-${safeName}`);
    await fs.writeFile(storagePath, bytes);
    return {
      filePath: "",
      storagePath
    };
  }

  const subDirectory = target === "product-images" ? "images" : "documents";
  const directory = path.join(process.cwd(), "public", "uploads", subDirectory);
  await fs.mkdir(directory, { recursive: true });
  const storagePath = path.join(directory, `${timestamp}-${safeName}`);
  await fs.writeFile(storagePath, bytes);
  const filePath = `/uploads/${subDirectory}/${timestamp}-${safeName}`;

  return {
    filePath,
    storagePath
  };
}
