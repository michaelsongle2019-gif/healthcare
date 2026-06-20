import type Database from "better-sqlite3";
import { realCategories, realProducts } from "@/lib/site-catalog.generated";

type CategorySeed = {
  slug: string;
  nameZh: string;
  nameEn: string;
  descriptionZh: string;
  descriptionEn: string;
  sortOrder: number;
};

type ProductSeed = {
  key: string;
  categorySlug: string;
  slug: string;
  manufacturerZh: string;
  manufacturerEn: string;
  model: string;
  nameZh: string;
  nameEn: string;
  summaryZh: string;
  summaryEn: string;
  applicationZh: string;
  applicationEn: string;
  specificationsZh: string;
  specificationsEn: string;
  packagingZh: string;
  packagingEn: string;
  imageUrl: string;
  sourceUrl: string;
  featured: number;
  seoTitleZh: string;
  seoTitleEn: string;
  seoDescriptionZh: string;
  seoDescriptionEn: string;
  documentAccess?: "public" | "request";
};

function upsertCategory(db: Database.Database, input: CategorySeed) {
  db.prepare(
    `
      INSERT INTO categories (slug, name_zh, name_en, description_zh, description_en, sort_order)
      VALUES (@slug, @nameZh, @nameEn, @descriptionZh, @descriptionEn, @sortOrder)
      ON CONFLICT(slug) DO UPDATE SET
        name_zh = excluded.name_zh,
        name_en = excluded.name_en,
        description_zh = excluded.description_zh,
        description_en = excluded.description_en,
        sort_order = excluded.sort_order
    `
  ).run(input);

  return (
    db.prepare("SELECT id FROM categories WHERE slug = ?").get(input.slug) as {
      id: number;
    }
  ).id;
}

function upsertProduct(
  db: Database.Database,
  input: {
    categoryId: number;
    slug: string;
    manufacturerZh: string;
    manufacturerEn: string;
    model: string;
    nameZh: string;
    nameEn: string;
    summaryZh: string;
    summaryEn: string;
    applicationZh: string;
    applicationEn: string;
    specificationsZh: string;
    specificationsEn: string;
    packagingZh: string;
    packagingEn: string;
    imageUrl: string;
    featured: number;
    seoTitleZh: string;
    seoTitleEn: string;
    seoDescriptionZh: string;
    seoDescriptionEn: string;
  }
) {
  db.prepare(
    `
      INSERT INTO products (
        category_id, slug, manufacturer_zh, manufacturer_en, model, name_zh, name_en,
        summary_zh, summary_en, application_zh, application_en, specifications_zh,
        specifications_en, packaging_zh, packaging_en, image_url, featured,
        seo_title_zh, seo_title_en, seo_description_zh, seo_description_en
      )
      VALUES (
        @categoryId, @slug, @manufacturerZh, @manufacturerEn, @model, @nameZh, @nameEn,
        @summaryZh, @summaryEn, @applicationZh, @applicationEn, @specificationsZh,
        @specificationsEn, @packagingZh, @packagingEn, @imageUrl, @featured,
        @seoTitleZh, @seoTitleEn, @seoDescriptionZh, @seoDescriptionEn
      )
      ON CONFLICT(slug) DO UPDATE SET
        category_id = excluded.category_id,
        manufacturer_zh = excluded.manufacturer_zh,
        manufacturer_en = excluded.manufacturer_en,
        model = excluded.model,
        name_zh = excluded.name_zh,
        name_en = excluded.name_en,
        summary_zh = excluded.summary_zh,
        summary_en = excluded.summary_en,
        application_zh = excluded.application_zh,
        application_en = excluded.application_en,
        specifications_zh = excluded.specifications_zh,
        specifications_en = excluded.specifications_en,
        packaging_zh = excluded.packaging_zh,
        packaging_en = excluded.packaging_en,
        image_url = excluded.image_url,
        featured = excluded.featured,
        seo_title_zh = excluded.seo_title_zh,
        seo_title_en = excluded.seo_title_en,
        seo_description_zh = excluded.seo_description_zh,
        seo_description_en = excluded.seo_description_en
    `
  ).run(input);

  return (
    db.prepare("SELECT id FROM products WHERE slug = ?").get(input.slug) as {
      id: number;
    }
  ).id;
}

function seedDocuments(
  db: Database.Database,
  productIds: Record<string, number>,
  products: readonly ProductSeed[]
) {
  db.prepare("DELETE FROM document_requests").run();
  db.prepare("DELETE FROM documents").run();

  const insertDocument = db.prepare(
    `
      INSERT INTO documents (
        product_id, title_zh, title_en, description_zh, description_en,
        access_level, file_path, storage_path, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `
  );

  products.forEach((product, index) => {
    insertDocument.run(
      productIds[product.key],
      `${product.model} 官方产品页`,
      `${product.model} Official Product Page`,
      "用于核对正式名称、公开规格、图片与资料入口。",
      "Official page for model naming, public specifications, images, and reference materials.",
      product.documentAccess ?? "public",
      product.sourceUrl,
      `official:${product.key}`,
      index + 1
    );
  });
}

function seedNews(db: Database.Database) {
  db.prepare("DELETE FROM news").run();
}

const categories: CategorySeed[] = [
  {
    slug: "ct-systems",
    nameZh: "CT系统",
    nameEn: "CT Systems",
    descriptionZh: "按照行业常用口径整理的X射线计算机断层成像设备。",
    descriptionEn: "Computed tomography systems grouped using standard industry taxonomy.",
    sortOrder: 1
  },
  {
    slug: "mr-systems",
    nameZh: "MR系统",
    nameEn: "MR Systems",
    descriptionZh: "按照行业常用口径整理的磁共振成像设备。",
    descriptionEn: "Magnetic resonance systems grouped using standard industry taxonomy.",
    sortOrder: 2
  },
  {
    slug: "digital-radiography-systems",
    nameZh: "数字X射线系统",
    nameEn: "Digital Radiography Systems",
    descriptionZh: "包括固定式、移动式与自动化数字摄影设备。",
    descriptionEn: "Fixed, mobile, and automated digital radiography systems.",
    sortOrder: 3
  },
  {
    slug: "mammography-systems",
    nameZh: "乳腺X射线系统",
    nameEn: "Mammography Systems",
    descriptionZh: "乳腺筛查与乳腺影像系统。",
    descriptionEn: "Breast screening and mammography systems.",
    sortOrder: 4
  },
  {
    slug: "coronary-stent-systems",
    nameZh: "冠脉支架系统",
    nameEn: "Coronary Stent Systems",
    descriptionZh: "冠脉药物支架与可吸收支架产品。",
    descriptionEn: "Coronary drug-eluting stent and bioresorbable scaffold products.",
    sortOrder: 5
  },
  {
    slug: "coronary-balloon-catheters",
    nameZh: "冠脉球囊导管",
    nameEn: "Coronary Balloon Catheters",
    descriptionZh: "包括药涂球囊、PTCA球囊、NC球囊、刻痕球囊与IVL球囊。",
    descriptionEn: "Drug-coated, PTCA, non-compliant, scoring, and IVL coronary balloon catheters.",
    sortOrder: 6
  },
  {
    slug: "interventional-catheters-guidewires",
    nameZh: "介入导管与导丝",
    nameEn: "Interventional Catheters & Guidewires",
    descriptionZh: "PCI常用延长导管与导丝产品。",
    descriptionEn: "Guide extension catheter and guidewire products commonly used in PCI.",
    sortOrder: 7
  }
];

const products: ProductSeed[] = [
  {
    key: "uct-780",
    categorySlug: "ct-systems",
    slug: "uct-780",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uCT 780",
    nameZh: "uCT 780",
    nameEn: "uCT 780",
    summaryZh: "联影官网将 uCT 780 定位为 160-slice CT，强调 fine sampling、low noise、cardiac imaging 与 dose control。",
    summaryEn:
      "United Imaging positions uCT 780 as a 160-slice CT platform focused on fine sampling, low noise, cardiac imaging, and dose control.",
    applicationZh: "适用于心脏、血管、急诊及综合影像科常规与高阶CT检查场景。",
    applicationEn: "Suitable for cardiac, vascular, emergency, and routine advanced CT workflows.",
    specificationsZh: "80排探测器；单圈最大160层；0.3 s/360°；孔径70 cm；机架功率100 kW。",
    specificationsEn:
      "80 detector rows; up to 160 slices per rotation; 0.3 s/360°; 70 cm aperture; 100 kW generator power.",
    packagingZh: "官网公开资料以正式产品页为主，可继续挂接彩页或招投标资料。",
    packagingEn: "Public materials currently center on the official product page, with brochures to be added later.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/ct/uct_530.png?h=399&w=525&hash=13709468C9E23D267944B511313EE4AA",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/ct/uct-780",
    featured: 1,
    seoTitleZh: "联影 uCT 780",
    seoTitleEn: "United Imaging uCT 780",
    seoDescriptionZh: "联影 uCT 780 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uCT 780."
  },
  {
    key: "uct-528",
    categorySlug: "ct-systems",
    slug: "uct-528",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uCT 528",
    nameZh: "uCT 528",
    nameEn: "uCT 528",
    summaryZh: "联影官网将 uCT 528 描述为 40/80-slice CT，突出 Smart Workflow、Smart Design 与 Smart Dose。",
    summaryEn:
      "United Imaging describes uCT 528 as a 40/80-slice CT platform emphasizing Smart Workflow, Smart Design, and Smart Dose.",
    applicationZh: "适用于综合医院常规CT流程、效率优化与低剂量检查场景。",
    applicationEn: "Suitable for routine hospital CT workflows, throughput optimization, and lower-dose imaging.",
    specificationsZh: "40/80-slice CT；Z-Detector；主打 lower radiation dose、higher efficiency 与 improved profitability。",
    specificationsEn:
      "40/80-slice CT; Z-Detector; positioned around lower radiation dose, higher efficiency, and improved profitability.",
    packagingZh: "可优先展示官网正式产品页，后续追加彩页或下载资料。",
    packagingEn: "The official product page can be used first, with brochure downloads added later.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/ct/520tu/520_f-min.png?h=735&w=858&hash=1AB3B7C5CBE6C81B97814A163E7D0ED4",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/ct/uct-528",
    featured: 0,
    seoTitleZh: "联影 uCT 528",
    seoTitleEn: "United Imaging uCT 528",
    seoDescriptionZh: "联影 uCT 528 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uCT 528."
  },
  {
    key: "uct-520",
    categorySlug: "ct-systems",
    slug: "uct-520",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uCT 520",
    nameZh: "uCT 520",
    nameEn: "uCT 520",
    summaryZh: "联影官网将 uCT 520 定义为 40-slice CT，强调 AI-based workflow、Z-Detector、Exquisite Images 与 total cost of ownership。",
    summaryEn:
      "United Imaging defines uCT 520 as a 40-slice CT featuring AI-based workflow, Z-Detector, Exquisite Images, and total cost of ownership.",
    applicationZh: "适用于体检、发热门诊、急诊与分级医疗等高频常规CT使用场景。",
    applicationEn: "Suitable for routine CT in checkup, fever clinic, emergency, and tiered-care scenarios.",
    specificationsZh: "40-slice CT；支持 ±30° 物理机架倾斜；基于 AI 导航工作流与 Z-Detector 平台。",
    specificationsEn:
      "40-slice CT; supports up to ±30° physical gantry tilt; built on AI-guided workflow and the Z-Detector platform.",
    packagingZh: "适合用于首版官网中的标准设备展示卡片与详情页。",
    packagingEn: "Well suited to standard product cards and detail pages in the first website release.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/ct/520tu/520_f-min.png?h=735&w=858&hash=1AB3B7C5CBE6C81B97814A163E7D0ED4",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/ct/uct-520",
    featured: 0,
    seoTitleZh: "联影 uCT 520",
    seoTitleEn: "United Imaging uCT 520",
    seoDescriptionZh: "联影 uCT 520 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uCT 520."
  },
  {
    key: "neuviz-prime-ct",
    categorySlug: "ct-systems",
    slug: "neuviz-prime-ct",
    manufacturerZh: "东软医疗",
    manufacturerEn: "Neusoft Medical Systems",
    model: "NeuViz Prime CT",
    nameZh: "NeuViz Prime CT",
    nameEn: "NeuViz Prime CT",
    summaryZh: "东软官网将 NeuViz Prime CT 描述为具备 128 slices、dual energy、Ultra HD imaging 与 low dose design 的CT平台。",
    summaryEn:
      "Neusoft Medical describes NeuViz Prime CT as a CT platform with 128 slices, dual energy, Ultra HD imaging, and low dose design.",
    applicationZh: "适用于高分辨率临床CT、双能量检查与低剂量成像流程。",
    applicationEn: "Suitable for high-resolution clinical CT, dual-energy studies, and low-dose imaging workflows.",
    specificationsZh: "128 slices；dual energy；30 lp/cm；60 kV。",
    specificationsEn: "128 slices; dual energy; 30 lp/cm; 60 kV.",
    packagingZh: "当前以官网正式产品页作为公开资料入口。",
    packagingEn: "Public materials currently center on the official product page.",
    imageUrl: "https://www-dcdn.neusoftmedical.com/files/66acd2fce4b0ec3e6115337e.png",
    sourceUrl: "https://www.neusoftmedical.com/en/products-solutions/ct/NeuViz-Prime-CT",
    featured: 1,
    seoTitleZh: "东软 NeuViz Prime CT",
    seoTitleEn: "Neusoft NeuViz Prime CT",
    seoDescriptionZh: "东软 NeuViz Prime CT 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Neusoft NeuViz Prime CT."
  },
  {
    key: "umr-790",
    categorySlug: "mr-systems",
    slug: "umr-790",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uMR 790",
    nameZh: "uMR 790",
    nameEn: "uMR 790",
    summaryZh: "联影官网将 uMR 790 定位为 3.0T MR，强调 exceptional gradient performance 与 ultra-high homogeneity。",
    summaryEn:
      "United Imaging positions uMR 790 as a 3.0T MR designed around exceptional gradient performance and ultra-high homogeneity.",
    applicationZh: "适用于科研型与高阶临床磁共振场景，包括功能成像与复杂全身检查。",
    applicationEn: "Suitable for research-oriented and advanced clinical MRI, including functional and complex whole-body studies.",
    specificationsZh: "3.0T MR；官网强调科研级均匀度、强梯度平台与高级应用覆盖。",
    specificationsEn:
      "3.0T MR; the official page highlights research-grade homogeneity, powerful gradients, and broad advanced applications.",
    packagingZh: "建议前台详情页挂接正式产品页，并预留后续科研资料下载位。",
    packagingEn: "The official page works as the core reference, with room to add future research materials.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/mr/mr-products-with-title/790.png?h=530&w=700&hash=14DB745AE705C7972D900F61C8609B3D",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/mr/umr-790",
    featured: 0,
    seoTitleZh: "联影 uMR 790",
    seoTitleEn: "United Imaging uMR 790",
    seoDescriptionZh: "联影 uMR 790 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uMR 790."
  },
  {
    key: "umr-780",
    categorySlug: "mr-systems",
    slug: "umr-780",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uMR 780",
    nameZh: "uMR 780",
    nameEn: "uMR 780",
    summaryZh: "联影官网将 uMR 780 描述为 ACS 3.0T MR，强调 rapid imaging、homogeneity 与深度学习重建效率。",
    summaryEn:
      "United Imaging describes uMR 780 as an ACS 3.0T MR built for rapid imaging, strong homogeneity, and deep-learning-accelerated reconstruction.",
    applicationZh: "适用于高端临床磁共振、快速序列与部分科研转化场景。",
    applicationEn: "Suitable for premium clinical MRI, accelerated sequences, and translational research scenarios.",
    specificationsZh: "3.0T MR；基于 ACS 成像平台；强调 high speed、precision 与 broad application coverage。",
    specificationsEn:
      "3.0T MR; based on the ACS imaging platform; focused on high speed, precision, and broad application coverage.",
    packagingZh: "可作为高端3.0T机型样板数据在官网中展示。",
    packagingEn: "Suitable as a premium 3.0T sample product in the first release.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/mr/mr-products-with-title/780.png?h=530&w=700&hash=3EBB6C2A6C31515CFE14CC724C22C661",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/mr/umr-780",
    featured: 1,
    seoTitleZh: "联影 uMR 780",
    seoTitleEn: "United Imaging uMR 780",
    seoDescriptionZh: "联影 uMR 780 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uMR 780."
  },
  {
    key: "umr-680",
    categorySlug: "mr-systems",
    slug: "umr-680",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uMR 680",
    nameZh: "uMR 680",
    nameEn: "uMR 680",
    summaryZh: "联影官网将 uMR 680 描述为 uAIFI Empowered 1.5T MR，突出 gradient performance 与 high-density RF channels。",
    summaryEn:
      "United Imaging describes uMR 680 as a uAIFI Empowered 1.5T MR with strong gradient performance and high-density RF channels.",
    applicationZh: "适用于日常临床磁共振、宽孔径需求与图像质量优先的检查流程。",
    applicationEn: "Suitable for routine clinical MRI, wide-bore workflows, and image-quality-focused applications.",
    specificationsZh: "1.5T MR；45 mT/m；200 T/m/s；独立接收通道最高可达 96。",
    specificationsEn: "1.5T MR; 45 mT/m; 200 T/m/s; up to 96 independent receiver channels.",
    packagingZh: "可直接使用官网正式页作为资料中心公开入口。",
    packagingEn: "The official product page can be used directly in the document center.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/mr/mr-products-with-title/680.png?h=530&w=700&hash=26151AD06D221CFA2F7727C99FECF43D",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/mr/umr-680",
    featured: 1,
    seoTitleZh: "联影 uMR 680",
    seoTitleEn: "United Imaging uMR 680",
    seoDescriptionZh: "联影 uMR 680 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uMR 680."
  },
  {
    key: "neumr-rena",
    categorySlug: "mr-systems",
    slug: "neumr-rena",
    manufacturerZh: "东软医疗",
    manufacturerEn: "Neusoft Medical Systems",
    model: "NeuMR Rena",
    nameZh: "NeuMR Rena",
    nameEn: "NeuMR Rena",
    summaryZh: "东软官网将 NeuMR Rena 定义为 1.5T MRI 平台，强调 full digital、boundless platform 与 Deep R。",
    summaryEn:
      "Neusoft Medical defines NeuMR Rena as a 1.5T MRI platform featuring full digital architecture, boundless platform design, and Deep R.",
    applicationZh: "适用于常规临床MRI与智能化流程管理场景。",
    applicationEn: "Suitable for routine clinical MRI and intelligent workflow scenarios.",
    specificationsZh: "1.5T MRI；46 mT/m；160 T/m/s。",
    specificationsEn: "1.5T MRI; 46 mT/m; 160 T/m/s.",
    packagingZh: "公开资料以正式产品页为主。",
    packagingEn: "Public materials currently center on the official product page.",
    imageUrl: "https://www-dcdn.neusoftmedical.com/files/66acd82ce4b0ec3e61153390.png",
    sourceUrl: "https://www.neusoftmedical.com/en/products-solutions/mr/NeuMR-Rena",
    featured: 0,
    seoTitleZh: "东软 NeuMR Rena",
    seoTitleEn: "Neusoft NeuMR Rena",
    seoDescriptionZh: "东软 NeuMR Rena 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Neusoft NeuMR Rena."
  },
  {
    key: "udr-780i-pro",
    categorySlug: "digital-radiography-systems",
    slug: "udr-780i-pro",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uDR 780i Pro",
    nameZh: "uDR 780i Pro",
    nameEn: "uDR 780i Pro",
    summaryZh: "联影官网将 uDR 780i Pro 定义为 Auto Ceiling-mounted DR，强调 remote collimation、automatic stitching 与 tube tracking。",
    summaryEn:
      "United Imaging defines uDR 780i Pro as an Auto Ceiling-mounted DR with remote collimation, automatic stitching, and tube tracking.",
    applicationZh: "适用于门诊、住院、体检与高通量数字摄影环境。",
    applicationEn: "Suitable for outpatient, inpatient, checkup, and high-throughput radiography environments.",
    specificationsZh: "吊顶自动化DR；支持 remote collimation；支持 auto tube-detect and tracking。",
    specificationsEn:
      "Auto ceiling-mounted DR; supports remote collimation; supports auto tube-detect and tracking.",
    packagingZh: "适合在官网产品中心中作为高端DR样板展示。",
    packagingEn: "Suitable as a premium DR sample product in the product center.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/dr/udr_780i.png?h=399&w=525&hash=6C6F30A11A32A252D9D71CADB2FA4F98",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/dr/udr-780i-pro",
    featured: 1,
    seoTitleZh: "联影 uDR 780i Pro",
    seoTitleEn: "United Imaging uDR 780i Pro",
    seoDescriptionZh: "联影 uDR 780i Pro 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uDR 780i Pro."
  },
  {
    key: "udr-596i",
    categorySlug: "digital-radiography-systems",
    slug: "udr-596i",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uDR 596i",
    nameZh: "uDR 596i",
    nameEn: "uDR 596i",
    summaryZh: "联影官网将 uDR 596i 定位为 Auto Floor Mounted DR，适合标准化综合放射工作流。",
    summaryEn:
      "United Imaging positions uDR 596i as an Auto Floor Mounted DR for standardized general radiography workflows.",
    applicationZh: "适用于常规摄片、综合门诊放射与住院影像检查。",
    applicationEn: "Suitable for general radiography in outpatient and inpatient imaging departments.",
    specificationsZh: "自动落地式DR；官网公开图示为前后结构机型图；适配常规数字摄影使用场景。",
    specificationsEn:
      "Auto floor-mounted DR; the official product listing shows a front-and-side system view for standard digital radiography use.",
    packagingZh: "适合作为常规DR产品线中的标准机型样板。",
    packagingEn: "Fits well as a standard model sample within the DR lineup.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/dr/udr_596i.png?h=399&w=525&hash=4BDEDE6429BEF2F38F9BEA423DDC0E7D",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/dr/udr-596i",
    featured: 0,
    seoTitleZh: "联影 uDR 596i",
    seoTitleEn: "United Imaging uDR 596i",
    seoDescriptionZh: "联影 uDR 596i 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uDR 596i."
  },
  {
    key: "udr-380i-pro",
    categorySlug: "digital-radiography-systems",
    slug: "udr-380i-pro",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uDR 380i Pro",
    nameZh: "uDR 380i Pro",
    nameEn: "uDR 380i Pro",
    summaryZh: "联影官网将 uDR 380i Pro 定位为 Remote-Vision Mobile DR，强调移动DR使用场景与远距可视化操作。",
    summaryEn:
      "United Imaging positions uDR 380i Pro as a Remote-Vision Mobile DR focused on mobile radiography and remote visualization.",
    applicationZh: "适用于病房、ICU、急诊与床旁数字摄影场景。",
    applicationEn: "Suitable for ward, ICU, emergency, and bedside digital radiography scenarios.",
    specificationsZh: "移动DR；官方列表图为整机实物图；面向 remote-vision mobile DR 场景。",
    specificationsEn:
      "Mobile DR; the official listing uses a full-device product image; intended for remote-vision mobile DR workflows.",
    packagingZh: "前台可按移动DR分类独立展示。",
    packagingEn: "Can be displayed as a standalone mobile DR sample product.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/dr/ku8a2731--01.png?h=350&w=525&hash=43EF4056FF495081210024974F64D998",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/dr/udr-380i-pro",
    featured: 0,
    seoTitleZh: "联影 uDR 380i Pro",
    seoTitleEn: "United Imaging uDR 380i Pro",
    seoDescriptionZh: "联影 uDR 380i Pro 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uDR 380i Pro."
  },
  {
    key: "umammo-890i",
    categorySlug: "mammography-systems",
    slug: "umammo-890i",
    manufacturerZh: "联影医疗",
    manufacturerEn: "United Imaging",
    model: "uMammo 890i",
    nameZh: "uMammo 890i",
    nameEn: "uMammo 890i",
    summaryZh: "联影官网将 uMammo 890i 定位为乳腺成像平台，强调 3D breast imaging 与 10.1 lp/mm CMOS detector。",
    summaryEn:
      "United Imaging positions uMammo 890i as a breast imaging platform featuring 3D breast imaging and a 10.1 lp/mm CMOS detector.",
    applicationZh: "适用于乳腺筛查与乳腺影像诊断场景。",
    applicationEn: "Suitable for breast screening and mammography diagnostic workflows.",
    specificationsZh: "支持 3D breast imaging；10.1 lp/mm CMOS detector。",
    specificationsEn: "Supports 3D breast imaging; 10.1 lp/mm CMOS detector.",
    packagingZh: "可直接挂接官网彩页或产品页作为资料中心内容。",
    packagingEn: "The official page or brochure can be attached directly in the document center.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/dr/890i---new/1.png?h=1080&w=1920&hash=1047230B5F7401F4A9515665CBD23618",
    sourceUrl: "https://global.united-imaging.com/en/product-service/products/mammography/umammo-890i",
    featured: 0,
    seoTitleZh: "联影 uMammo 890i",
    seoTitleEn: "United Imaging uMammo 890i",
    seoDescriptionZh: "联影 uMammo 890i 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for United Imaging uMammo 890i."
  },
  {
    key: "neovas",
    categorySlug: "coronary-stent-systems",
    slug: "neovas",
    manufacturerZh: "乐普医疗",
    manufacturerEn: "Lepu Medical",
    model: "NeoVas",
    nameZh: "NeoVas",
    nameEn: "NeoVas Sirolimus-eluting Bioresorbable Coronary Stent System",
    summaryZh: "乐普官网将 NeoVas 定义为 Sirolimus-eluting Bioresorbable Coronary Stent System。",
    summaryEn:
      "Lepu Medical defines NeoVas as a Sirolimus-eluting Bioresorbable Coronary Stent System.",
    applicationZh: "适用于冠脉可吸收支架产品展示与资料归档。",
    applicationEn: "Suitable for presentation and documentation of a bioresorbable coronary scaffold platform.",
    specificationsZh: "可吸收冠脉支架平台；公开页面披露 0.13 mm 相关参数信息。",
    specificationsEn: "Bioresorbable coronary scaffold platform; the public page includes 0.13 mm-related parameter information.",
    packagingZh: "建议配合受控资料或IFU入口使用。",
    packagingEn: "Best presented together with controlled documents or IFU access.",
    imageUrl: "https://en.lepumedical.com/upload/goods/2025-07/6875a54f24931.png",
    sourceUrl:
      "https://en.lepumedical.com/products/neovas-sirolimus-eluting-bioresorbable-coronary-stent-system/",
    featured: 1,
    seoTitleZh: "乐普 NeoVas",
    seoTitleEn: "Lepu NeoVas Sirolimus-eluting Bioresorbable Coronary Stent System",
    seoDescriptionZh: "乐普 NeoVas 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Lepu NeoVas.",
    documentAccess: "request"
  },
  {
    key: "buma-supreme",
    categorySlug: "coronary-stent-systems",
    slug: "buma-supreme",
    manufacturerZh: "赛诺医疗",
    manufacturerEn: "Sinomed",
    model: "BuMA Supreme",
    nameZh: "BuMA Supreme",
    nameEn: "BuMA Supreme Drug Coated Coronary Stent System",
    summaryZh: "赛诺官网将 BuMA Supreme 定义为 Drug Coated Coronary Stent System。",
    summaryEn: "Sinomed defines BuMA Supreme as a Drug Coated Coronary Stent System.",
    applicationZh: "适用于冠脉药物支架产品线展示与合规资料管理。",
    applicationEn: "Suitable for coronary DES lineup presentation and compliance-oriented documentation.",
    specificationsZh: "公开资料以 device features 与 IFU 为主，适合做正式资料入口。",
    specificationsEn: "Public materials center on device features and IFU resources.",
    packagingZh: "建议挂接产品页与 IFU 文档。",
    packagingEn: "Suitable for linking to the official product page and IFU.",
    imageUrl: "https://www.sinomed.com/wp-content/uploads/2024/12/1-1.png",
    sourceUrl: "https://www.sinomed.com/buma-supreme-e-2/",
    featured: 0,
    seoTitleZh: "赛诺医疗 BuMA Supreme",
    seoTitleEn: "Sinomed BuMA Supreme Drug Coated Coronary Stent System",
    seoDescriptionZh: "赛诺医疗 BuMA Supreme 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Sinomed BuMA Supreme.",
    documentAccess: "request"
  },
  {
    key: "ht-supreme",
    categorySlug: "coronary-stent-systems",
    slug: "ht-supreme",
    manufacturerZh: "赛诺医疗",
    manufacturerEn: "Sinomed",
    model: "HT Supreme",
    nameZh: "HT Supreme",
    nameEn: "HT Supreme Drug Coated Coronary Stent System",
    summaryZh: "赛诺官网将 HT Supreme 定义为 Drug Coated Coronary Stent System。",
    summaryEn: "Sinomed defines HT Supreme as a Drug Coated Coronary Stent System.",
    applicationZh: "适用于冠脉支架平台介绍与产品线扩展示例。",
    applicationEn: "Suitable for coronary stent platform presentation and broader product-line coverage.",
    specificationsZh: "公开页重点展示药物释放曲线与产品结构相关内容。",
    specificationsEn: "The public page emphasizes elution behavior and product-structure information.",
    packagingZh: "适合作为第二款支架系统样板数据。",
    packagingEn: "Works well as a second stent-system sample product.",
    imageUrl: "https://www.sinomed.com/wp-content/uploads/2022/02/图片1-3.png",
    sourceUrl: "https://www.sinomed.com/ht-supreme/",
    featured: 0,
    seoTitleZh: "赛诺医疗 HT Supreme",
    seoTitleEn: "Sinomed HT Supreme Drug Coated Coronary Stent System",
    seoDescriptionZh: "赛诺医疗 HT Supreme 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Sinomed HT Supreme.",
    documentAccess: "request"
  },
  {
    key: "vesselin",
    categorySlug: "coronary-balloon-catheters",
    slug: "vesselin",
    manufacturerZh: "乐普医疗",
    manufacturerEn: "Lepu Medical",
    model: "Vesselin",
    nameZh: "Vesselin",
    nameEn: "Vesselin Drug Coated Coronary Balloon Catheter",
    summaryZh: "乐普官网将 Vesselin 定义为 Drug Coated Coronary Balloon Catheter。",
    summaryEn: "Lepu Medical defines Vesselin as a Drug Coated Coronary Balloon Catheter.",
    applicationZh: "适用于冠脉药涂球囊产品展示与线索收集。",
    applicationEn: "Suitable for coronary drug-coated balloon presentation and lead generation.",
    specificationsZh: "有效长度 135 cm；兼容导丝 0.014 inch；药物浓度 3 ug/mm²；两端铂标记。",
    specificationsEn:
      "Effective length 135 cm; compatible guidewire 0.014 inch; drug concentration 3 ug/mm²; platinum marker at each end.",
    packagingZh: "公开展示可配合产品页，深度资料可转为申请后获取。",
    packagingEn: "The product page can remain public, while deeper materials can be request-only.",
    imageUrl: "https://en.lepumedical.com/upload/goods/2025-05/6825530d7a144.png",
    sourceUrl: "https://en.lepumedical.com/products/vesselin-drug-coated-coronary-balloon-catheter.html",
    featured: 1,
    seoTitleZh: "乐普 Vesselin",
    seoTitleEn: "Lepu Vesselin Drug Coated Coronary Balloon Catheter",
    seoDescriptionZh: "乐普 Vesselin 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Lepu Vesselin."
  },
  {
    key: "foxtrot-pro",
    categorySlug: "coronary-balloon-catheters",
    slug: "foxtrot-pro",
    manufacturerZh: "微创医疗",
    manufacturerEn: "MicroPort",
    model: "Foxtrot Pro",
    nameZh: "Foxtrot Pro",
    nameEn: "Foxtrot Pro",
    summaryZh: "微创官网将 Foxtrot Pro 作为 PTCA 球囊产品，重点强调 0.017 inch 低通过头端与 6F 兼容能力。",
    summaryEn:
      "MicroPort presents Foxtrot Pro as a PTCA balloon product emphasizing a 0.017-inch low entry profile and full 6F compatibility.",
    applicationZh: "适用于PCI术中预扩张与常规冠脉球囊应用展示。",
    applicationEn: "Suitable for PCI predilation and general coronary balloon presentation.",
    specificationsZh: "entry profile 0.017 inch；crossing profile 0.026 inch；NP 6 atm；RBP 14 atm。",
    specificationsEn:
      "Entry profile 0.017 inch; crossing profile 0.026 inch; nominal pressure 6 atm; rated burst pressure 14 atm.",
    packagingZh: "适合在详情页中展示规格与订货信息入口。",
    packagingEn: "Works well for a detail page with specification and ordering entry points.",
    imageUrl: "https://microport.com/assets/general/products/_450xAUTO_fit_center-center_100_none/78626/Foxtrot-Pro.webp",
    sourceUrl:
      "https://microport.com/healthcare-professional/cardiovascular/percutaneous-coronary-intervention/foxtrot-pro",
    featured: 0,
    seoTitleZh: "微创 Foxtrot Pro",
    seoTitleEn: "MicroPort Foxtrot Pro",
    seoDescriptionZh: "微创 Foxtrot Pro 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for MicroPort Foxtrot Pro."
  },
  {
    key: "firefighter-nc",
    categorySlug: "coronary-balloon-catheters",
    slug: "firefighter-nc",
    manufacturerZh: "微创医疗",
    manufacturerEn: "MicroPort",
    model: "Firefighter NC",
    nameZh: "Firefighter NC",
    nameEn: "Firefighter NC",
    summaryZh: "微创官网将 Firefighter NC 定位为 PTCA Balloon Catheter 产品线中的 NC 球囊型号。",
    summaryEn:
      "MicroPort positions Firefighter NC as a non-compliant PTCA balloon catheter within its PCI balloon portfolio.",
    applicationZh: "适用于后扩张与高压扩张相关的球囊产品展示。",
    applicationEn: "Suitable for post-dilation and high-pressure balloon presentation scenarios.",
    specificationsZh: "官方产品页提供实物图与规格入口，可作为 NC 球囊样板数据。",
    specificationsEn: "The official product page provides a true product image and specification entry for an NC balloon sample.",
    packagingZh: "建议作为冠脉球囊分类中的补充型号。",
    packagingEn: "Recommended as a complementary model within the coronary balloon category.",
    imageUrl:
      "https://microport.com/assets/general/products/_450xAUTO_fit_center-center_100_none/76932/NC_productImage.webp",
    sourceUrl:
      "https://microport.com/healthcare-professional/cardiovascular/percutaneous-coronary-intervention/firefighter-nc",
    featured: 0,
    seoTitleZh: "微创 Firefighter NC",
    seoTitleEn: "MicroPort Firefighter NC",
    seoDescriptionZh: "微创 Firefighter NC 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for MicroPort Firefighter NC."
  },
  {
    key: "tytrak",
    categorySlug: "coronary-balloon-catheters",
    slug: "tytrak",
    manufacturerZh: "赛诺医疗",
    manufacturerEn: "Sinomed",
    model: "Tytrak",
    nameZh: "Tytrak",
    nameEn: "Tytrak Semi-Compliant Coronary Balloon Catheter",
    summaryZh: "赛诺官网将 Tytrak 定义为 Semi-Compliant Coronary Balloon Catheter。",
    summaryEn: "Sinomed defines Tytrak as a Semi-Compliant Coronary Balloon Catheter.",
    applicationZh: "适用于半顺应性冠脉球囊产品展示。",
    applicationEn: "Suitable for semi-compliant coronary balloon catheter presentation.",
    specificationsZh: "额定压力表覆盖 2.25 mm 至 5.0 mm 规格；支持 NP 与 RBP 展示。",
    specificationsEn: "Pressure chart coverage spans diameters from 2.25 mm to 5.0 mm with NP and RBP data.",
    packagingZh: "适合在详情页中按规格表方式展示。",
    packagingEn: "Suitable for a detail page that presents a pressure-and-size table.",
    imageUrl: "https://www.sinomed.com/wp-content/uploads/2019/08/1-10.png",
    sourceUrl: "https://www.sinomed.com/tytrak/",
    featured: 0,
    seoTitleZh: "赛诺医疗 Tytrak",
    seoTitleEn: "Sinomed Tytrak Semi-Compliant Coronary Balloon Catheter",
    seoDescriptionZh: "赛诺医疗 Tytrak 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Sinomed Tytrak."
  },
  {
    key: "nc-thonic",
    categorySlug: "coronary-balloon-catheters",
    slug: "nc-thonic",
    manufacturerZh: "赛诺医疗",
    manufacturerEn: "Sinomed",
    model: "NC Thonic",
    nameZh: "NC Thonic",
    nameEn: "NC Thonic Non-Compliant Coronary Balloon Catheter",
    summaryZh: "赛诺官网将 NC Thonic 定义为 Non-Compliant Coronary Balloon Catheter。",
    summaryEn: "Sinomed defines NC Thonic as a Non-Compliant Coronary Balloon Catheter.",
    applicationZh: "适用于高压后扩张与非顺应性球囊产品展示。",
    applicationEn: "Suitable for high-pressure post-dilation and non-compliant balloon presentation.",
    specificationsZh: "额定压力表覆盖 1.25 mm 至 4.0 mm 规格；官网展示 NP 与 RBP 信息。",
    specificationsEn: "Pressure chart coverage spans diameters from 1.25 mm to 4.0 mm with NP and RBP information.",
    packagingZh: "可与 Tytrak 形成 SC / NC 球囊对照展示。",
    packagingEn: "Pairs well with Tytrak as an SC vs. NC product comparison sample.",
    imageUrl: "https://www.sinomed.com/wp-content/uploads/2019/08/1-18.png",
    sourceUrl: "https://www.sinomed.com/nc-thonic/",
    featured: 0,
    seoTitleZh: "赛诺医疗 NC Thonic",
    seoTitleEn: "Sinomed NC Thonic Non-Compliant Coronary Balloon Catheter",
    seoDescriptionZh: "赛诺医疗 NC Thonic 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Sinomed NC Thonic."
  },
  {
    key: "tradent",
    categorySlug: "coronary-balloon-catheters",
    slug: "tradent",
    manufacturerZh: "赛诺医疗",
    manufacturerEn: "Sinomed",
    model: "TRADENT",
    nameZh: "TRADENT",
    nameEn: "TRADENT Coronary Scoring Balloon Catheter",
    summaryZh: "赛诺官网将 TRADENT 定义为 Coronary Scoring Balloon Catheter。",
    summaryEn: "Sinomed defines TRADENT as a Coronary Scoring Balloon Catheter.",
    applicationZh: "适用于刻痕球囊产品展示与复杂病变准备场景说明。",
    applicationEn: "Suitable for scoring balloon presentation and lesion-preparation use cases.",
    specificationsZh: "推荐导引导管 6F；推荐导丝 0.014 inch；score wires 3 根；工作厚度 0.11 mm。",
    specificationsEn:
      "Recommended guiding catheter 6F; recommended guidewire 0.014 inch; three scoring wires; 0.11 mm scoring-wire working thickness.",
    packagingZh: "适合用作复杂病变器械样板展示。",
    packagingEn: "Suitable as a sample product for complex-lesion device presentation.",
    imageUrl: "https://www.sinomed.com/wp-content/uploads/2024/09/dab6f3160bdbcb56f87fbb234a35df95_compress.jpg",
    sourceUrl: "https://www.sinomed.com/tradent-2/",
    featured: 1,
    seoTitleZh: "赛诺医疗 TRADENT",
    seoTitleEn: "Sinomed TRADENT Coronary Scoring Balloon Catheter",
    seoDescriptionZh: "赛诺医疗 TRADENT 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Sinomed TRADENT."
  },
  {
    key: "vesscrack",
    categorySlug: "coronary-balloon-catheters",
    slug: "vesscrack",
    manufacturerZh: "乐普医疗",
    manufacturerEn: "Lepu Medical",
    model: "Vesscrack",
    nameZh: "Vesscrack",
    nameEn: "Vesscrack Coronary IVL Balloon Dilatation Catheter System",
    summaryZh: "乐普官网将 Vesscrack 定义为 Coronary IVL Balloon Dilatation Catheter System。",
    summaryEn:
      "Lepu Medical defines Vesscrack as a Coronary IVL Balloon Dilatation Catheter System.",
    applicationZh: "适用于重度钙化病变相关产品展示与病例型资料入口。",
    applicationEn: "Suitable for presentation of coronary IVL solutions for heavily calcified lesions.",
    specificationsZh: "官网案例公开展示 2.5×12 等规格型号，可用于重钙化病变处理场景说明。",
    specificationsEn:
      "Official case materials publicly reference specifications such as 2.5×12 for severe calcified lesion treatment scenarios.",
    packagingZh: "适合与病例链接或资料下载一起展示。",
    packagingEn: "Pairs well with case-study links or downloadable supporting materials.",
    imageUrl: "https://en.lepumedical.com/upload/goods/2025-06/685515bbe1cac.png",
    sourceUrl: "https://en.lepumedical.com/Vesscrack-Coronary-IVL-Balloon-Dilatation-Catheter-System.html",
    featured: 0,
    seoTitleZh: "乐普 Vesscrack",
    seoTitleEn: "Lepu Vesscrack Coronary IVL Balloon Dilatation Catheter System",
    seoDescriptionZh: "乐普 Vesscrack 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Lepu Vesscrack."
  },
  {
    key: "contiguide",
    categorySlug: "interventional-catheters-guidewires",
    slug: "contiguide",
    manufacturerZh: "乐普医疗",
    manufacturerEn: "Lepu Medical",
    model: "ContiGuide",
    nameZh: "ContiGuide",
    nameEn: "ContiGuide Guide Extension Catheter",
    summaryZh: "乐普官网将 ContiGuide 定义为 Guide Extension Catheter。",
    summaryEn: "Lepu Medical defines ContiGuide as a Guide Extension Catheter.",
    applicationZh: "适用于PCI辅助输送与导管类产品展示。",
    applicationEn: "Suitable for PCI support-delivery workflows and guide-extension catheter presentation.",
    specificationsZh: "导管外径覆盖 5F / 6F / 7F；工作长度 150 cm；推杆直径 0.020 inch。",
    specificationsEn:
      "Catheter outer diameter options include 5F, 6F, and 7F; working length 150 cm; push-rod diameter 0.020 inch.",
    packagingZh: "适合作为导管类真实产品图样板。",
    packagingEn: "Works well as a true-product-image sample for the catheter category.",
    imageUrl: "https://en.lepumedical.com/upload/imagesall/2026-01/6979806422ec6.png",
    sourceUrl: "https://en.lepumedical.com/ContiGuide-Guide-Extension-Catheter.html",
    featured: 0,
    seoTitleZh: "乐普 ContiGuide",
    seoTitleEn: "Lepu ContiGuide Guide Extension Catheter",
    seoDescriptionZh: "乐普 ContiGuide 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Lepu ContiGuide."
  },
  {
    key: "balancium",
    categorySlug: "interventional-catheters-guidewires",
    slug: "balancium",
    manufacturerZh: "乐普医疗",
    manufacturerEn: "Lepu Medical",
    model: "Balancium",
    nameZh: "Balancium",
    nameEn: "Balancium PTCA Guide Wire",
    summaryZh: "乐普官网将 Balancium 定义为 PTCA Guide Wire。",
    summaryEn: "Lepu Medical defines Balancium as a PTCA Guide Wire.",
    applicationZh: "适用于PCI导丝产品展示与规格说明。",
    applicationEn: "Suitable for PCI guidewire presentation and specification reference.",
    specificationsZh: "导丝直径 0.014 inch；长度 185 cm / 300 cm；tip flexibility 0.6 g、1 g、2 g 可选。",
    specificationsEn:
      "Guidewire diameter 0.014 inch; lengths 185 cm and 300 cm; tip flexibility options of 0.6 g, 1 g, and 2 g.",
    packagingZh: "适合与介入导管一并归入导丝/配件栏目展示。",
    packagingEn: "Pairs naturally with interventional catheter products in a guidewire/accessory section.",
    imageUrl: "https://en.lepumedical.com/upload/goods/2025-05/6825571f8b495.png",
    sourceUrl: "https://en.lepumedical.com/Balancium-PTCA-Guide-Wire.html",
    featured: 0,
    seoTitleZh: "乐普 Balancium",
    seoTitleEn: "Lepu Balancium PTCA Guide Wire",
    seoDescriptionZh: "乐普 Balancium 官方型号与公开规格展示。",
    seoDescriptionEn: "Officially aligned product presentation for Lepu Balancium."
  }
];

export function seedDemoContent(db: Database.Database) {
  db.prepare("DELETE FROM document_requests").run();
  db.prepare("DELETE FROM documents").run();
  db.prepare("DELETE FROM news").run();
  db.prepare("DELETE FROM products").run();
  db.prepare("DELETE FROM categories").run();

  const categoryIds = Object.fromEntries(
    realCategories.map((category) => [category.slug, upsertCategory(db, category)])
  ) as Record<string, number>;

  const productIds: Record<string, number> = {};

  realProducts.forEach((product) => {
    productIds[product.key] = upsertProduct(db, {
      categoryId: categoryIds[product.categorySlug],
      slug: product.slug,
      manufacturerZh: product.manufacturerZh,
      manufacturerEn: product.manufacturerEn,
      model: product.model,
      nameZh: product.nameZh,
      nameEn: product.nameEn,
      summaryZh: product.summaryZh,
      summaryEn: product.summaryEn,
      applicationZh: product.applicationZh,
      applicationEn: product.applicationEn,
      specificationsZh: product.specificationsZh,
      specificationsEn: product.specificationsEn,
      packagingZh: product.packagingZh,
      packagingEn: product.packagingEn,
      imageUrl: product.imageUrl,
      featured: product.featured,
      seoTitleZh: product.seoTitleZh,
      seoTitleEn: product.seoTitleEn,
      seoDescriptionZh: product.seoDescriptionZh,
      seoDescriptionEn: product.seoDescriptionEn
    });
  });

  seedDocuments(db, productIds, realProducts);
  seedNews(db);
}
