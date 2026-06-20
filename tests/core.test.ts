import { describe, expect, test } from "vitest";
import {
  createSessionToken,
  getDefaultAdminCredentials,
  verifyPassword,
  verifySessionToken
} from "@/lib/auth";
import {
  canDirectDownload,
  getCatalogCardSummary,
  getLocalizedValue,
  getStructuredInfoRows,
  isProtectedDocument
} from "@/lib/content";
import { documentRequestSchema, productSchema } from "@/lib/validators";

describe("authentication helpers", () => {
  test("default admin credentials are accepted", async () => {
    const credentials = getDefaultAdminCredentials();
    await expect(
      verifyPassword(credentials.password, credentials.passwordHash)
    ).resolves.toBe(true);
  });

  test("session token can be signed and verified", () => {
    const token = createSessionToken({
      username: "admin",
      role: "admin"
    });

    expect(verifySessionToken(token)).toMatchObject({
      username: "admin",
      role: "admin"
    });
  });
});

describe("content helpers", () => {
  test("direct download is only available for public documents with a file path", () => {
    expect(
      canDirectDownload({ accessLevel: "public", filePath: "/files/a.pdf" })
    ).toBe(true);
    expect(
      canDirectDownload({ accessLevel: "request", filePath: "/files/a.pdf" })
    ).toBe(false);
    expect(canDirectDownload({ accessLevel: "public", filePath: "" })).toBe(
      false
    );
  });

  test("protected document detection matches the access level", () => {
    expect(isProtectedDocument({ accessLevel: "request" })).toBe(true);
    expect(isProtectedDocument({ accessLevel: "public" })).toBe(false);
  });

  test("localized values fall back correctly", () => {
    expect(getLocalizedValue("zh", "中文", "English")).toBe("中文");
    expect(getLocalizedValue("zh", "", "English")).toBe("English");
    expect(getLocalizedValue("en", "中文", "English")).toBe("English");
  });

  test("english placeholder values fall back to approved chinese content", () => {
    expect(
      getLocalizedValue(
        "en",
        "图迈 胸腹腔内窥镜手术系统",
        "EN pending: 图迈 胸腹腔内窥镜手术系统"
      )
    ).toBe("图迈 胸腹腔内窥镜手术系统");
  });

  test("structured info rows extract labeled compliance fields", () => {
    const rows = getStructuredInfoRows(
      "价格参考：约1100-1500万元（原表）\n注册证号 / NMPA：国械注准20223010108\n管理类别：III类"
    );

    expect(rows).toEqual([
      { label: "价格参考", value: "约1100-1500万元（原表）" },
      { label: "注册证号 / NMPA", value: "国械注准20223010108" },
      { label: "管理类别", value: "III类" }
    ]);
  });

  test("catalog card summary can include a third factual sentence when available", () => {
    const text = getCatalogCardSummary("zh", {
      applicationZh: "用于软组织切割止血，并可闭合直径不超过5mm的血管。",
      applicationEn: "",
      specificationsZh:
        "官方公开为 Y16 系统主机；与 HP401/HP501 换能器配套使用，为超声刀手柄提供激励信号和高频交流电源。",
      specificationsEn: "",
      summaryZh: "型号 Y16 可在官网公开页面直接对应。",
      summaryEn: ""
    });

    expect(text).toContain("用于软组织切割止血");
    expect(text).toContain("官方公开为 Y16 系统主机");
    expect(text).toContain("型号 Y16 可在官网公开页面直接对应");
  });
});

describe("validators", () => {
  test("product schema accepts bilingual product records with manufacturer and model fields", () => {
    const result = productSchema.safeParse({
      slug: "umr-jupiter-5t",
      categoryId: 1,
      manufacturerZh: "联影医疗",
      manufacturerEn: "United Imaging",
      model: "uMR Jupiter 5.0T",
      nameZh: "超高场人体全身磁共振系统",
      nameEn: "Whole-body UHF MR System",
      summaryZh: "面向科研与高端临床的国产超高场磁共振平台。",
      summaryEn:
        "A domestic ultra-high-field MR platform for advanced clinical and research use.",
      applicationZh: "神经、肿瘤、心血管及转化医学研究",
      applicationEn:
        "Neurology, oncology, cardiovascular and translational medicine",
      specificationsZh:
        "5.0T；8通道体发射线圈；120 mT/m 梯度场强；200 T/m/s 峰值切换率",
      specificationsEn:
        "5.0T; 8-channel volume transmit coil; 120 mT/m gradient; 200 T/m/s peak slew rate",
      packagingZh: "整机系统部署",
      packagingEn: "Turnkey system deployment",
      imageUrl: "https://images.example.com/product.jpg",
      featured: true,
      seoTitleZh: "联影 uMR Jupiter 5.0T",
      seoTitleEn: "United Imaging uMR Jupiter 5.0T",
      seoDescriptionZh: "国产超高场人体全身磁共振系统样板产品信息。",
      seoDescriptionEn:
        "Sample product content for a domestic whole-body 5.0T MR system."
    });

    expect(result.success).toBe(true);
  });

  test("document request schema requires contact information", () => {
    const result = documentRequestSchema.safeParse({
      documentId: 1,
      company: "",
      name: "",
      email: "not-an-email",
      phone: "",
      message: ""
    });

    expect(result.success).toBe(false);
  });
});
