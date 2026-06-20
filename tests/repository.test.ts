import { describe, expect, test } from "vitest";
import { createDatabase, initializeDatabase } from "@/lib/db";
import {
  createDocumentRequest,
  listDocumentRequests,
  listProducts,
  saveCategory,
  saveDocument,
  saveProduct
} from "@/lib/repository";

describe("repository flows", () => {
  test("products can be created and updated with manufacturer and model details", () => {
    const db = createDatabase(":memory:");
    initializeDatabase(db);

    const categoryId = saveCategory(db, {
      slug: "interventional-consumables",
      nameZh: "心血管介入耗材",
      nameEn: "Cardiovascular Consumables",
      descriptionZh: "心血管介入类样板产品",
      descriptionEn: "Sample cardiovascular interventional products",
      sortOrder: 1
    });

    const productId = saveProduct(db, {
      slug: "firehawk-coronary-stent",
      categoryId,
      manufacturerZh: "微创医疗",
      manufacturerEn: "MicroPort",
      model: "Firehawk",
      nameZh: "雷帕霉素靶向洗脱冠脉支架系统",
      nameEn: "Target Eluting Coronary Stent System",
      summaryZh: "国产高值耗材样板信息，用于冠脉介入官网展示。",
      summaryEn:
        "Sample domestic high-value consumable content for coronary intervention catalog pages.",
      applicationZh: "冠状动脉狭窄或闭塞病变介入治疗",
      applicationEn: "Interventional treatment of coronary stenosis and occlusive lesions",
      specificationsZh: "86 μm 支架梁厚；2.25-4.00 mm 直径；13-38 mm 长度",
      specificationsEn:
        "86 μm strut thickness; 2.25-4.00 mm diameters; 13-38 mm lengths",
      packagingZh: "支架系统，按规格配置",
      packagingEn: "Stent system, configured by specification",
      imageUrl: "https://images.example.com/firehawk.jpg",
      featured: true,
      seoTitleZh: "微创 Firehawk 冠脉支架系统",
      seoTitleEn: "MicroPort Firehawk Coronary Stent System",
      seoDescriptionZh: "用于官网样板展示的国产冠脉支架产品资料。",
      seoDescriptionEn:
        "Sample domestic coronary stent product content for healthcare website demos."
    });

    saveProduct(db, {
      id: productId,
      slug: "firehawk-coronary-stent",
      categoryId,
      manufacturerZh: "微创医疗",
      manufacturerEn: "MicroPort",
      model: "Firehawk NG",
      nameZh: "雷帕霉素靶向洗脱冠脉支架系统",
      nameEn: "Target Eluting Coronary Stent System",
      summaryZh: "升级版官网样板文案。",
      summaryEn: "Updated website demo copy.",
      applicationZh: "冠状动脉狭窄或闭塞病变介入治疗",
      applicationEn: "Interventional treatment of coronary stenosis and occlusive lesions",
      specificationsZh: "86 μm 支架梁厚；2.25-4.00 mm 直径；13-38 mm 长度",
      specificationsEn:
        "86 μm strut thickness; 2.25-4.00 mm diameters; 13-38 mm lengths",
      packagingZh: "支架系统，按规格配置",
      packagingEn: "Stent system, configured by specification",
      imageUrl: "https://images.example.com/firehawk-ng.jpg",
      featured: false,
      seoTitleZh: "微创 Firehawk NG 冠脉支架系统",
      seoTitleEn: "MicroPort Firehawk NG Coronary Stent System",
      seoDescriptionZh: "更新后的国产冠脉支架样板资料。",
      seoDescriptionEn:
        "Updated sample data for a domestic coronary stent product page."
    });

    const products = listProducts(db);

    expect(products).toHaveLength(1);
    expect(products[0]).toMatchObject({
      manufacturerEn: "MicroPort",
      model: "Firehawk NG",
      featured: 0
    });
  });

  test("protected document requests are stored for follow-up", () => {
    const db = createDatabase(":memory:");
    initializeDatabase(db);

    const categoryId = saveCategory(db, {
      slug: "medical-imaging",
      nameZh: "医学影像设备",
      nameEn: "Medical Imaging",
      descriptionZh: "医学影像设备样板产品线",
      descriptionEn: "Medical imaging sample product line",
      sortOrder: 1
    });

    const productId = saveProduct(db, {
      slug: "uct-780",
      categoryId,
      manufacturerZh: "联影医疗",
      manufacturerEn: "United Imaging",
      model: "uCT 780",
      nameZh: "160层 CT 系统",
      nameEn: "160-slice CT System",
      summaryZh: "适合高端医院影像中心的国产CT样板。",
      summaryEn: "A domestic CT sample for advanced imaging departments.",
      applicationZh: "心血管、头颈、胸腹部及急诊影像",
      applicationEn: "Cardiac, neuro, torso and emergency imaging",
      specificationsZh: "160层；0.5 mm 探测器单元；动态螺距技术",
      specificationsEn: "160-slice; 0.5 mm detector element; dynamic pitch technology",
      packagingZh: "整机系统部署",
      packagingEn: "Turnkey system deployment",
      imageUrl: "https://images.example.com/uct780.jpg",
      featured: true,
      seoTitleZh: "联影 uCT 780",
      seoTitleEn: "United Imaging uCT 780",
      seoDescriptionZh: "国产高端CT样板产品资料。",
      seoDescriptionEn: "Sample content for a domestic premium CT system."
    });

    const documentId = saveDocument(db, {
      productId,
      titleZh: "uCT 780 注册与招采资料包",
      titleEn: "uCT 780 Regulatory and Tender Pack",
      descriptionZh: "仅限提交申请后获取。",
      descriptionEn: "Available after request review.",
      accessLevel: "request",
      filePath: "",
      storagePath: "data/protected/uct780-pack.pdf",
      sortOrder: 1
    });

    createDocumentRequest(db, {
      documentId,
      company: "Northwind Health",
      name: "Avery Chen",
      email: "avery@example.com",
      phone: "+86-13800000000",
      message: "Please share the regulatory package."
    });

    const requests = listDocumentRequests(db);

    expect(requests).toHaveLength(1);
    expect(requests[0]).toMatchObject({
      company: "Northwind Health",
      documentTitleEn: "uCT 780 Regulatory and Tender Pack"
    });
  });
});
