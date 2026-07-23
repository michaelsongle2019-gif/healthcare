import type { ProductRecord } from "@/lib/repository";

export type CatalogTopLevelSlug = "medical-consumables" | "medical-devices";

export type CatalogSubcategorySlug =
  | "protective-consumables"
  | "injection-infusion-consumables"
  | "wound-care-consumables"
  | "disinfection-cleaning-consumables"
  | "testing-sampling-consumables"
  | "basic-care-consumables"
  | "surgical-procedure-packs"
  | "operating-room-consumables"
  | "monitoring-diagnostic-devices"
  | "treatment-infusion-devices"
  | "respiratory-emergency-devices"
  | "anesthesia-surgical-devices"
  | "minimally-invasive-surgical-devices"
  | "surgical-visualization-devices"
  | "robotics-navigation-devices"
  | "specialty-treatment-devices"
  | "ward-care-devices";

type TopLevelDefinition = {
  slug: CatalogTopLevelSlug;
  nameZh: string;
  nameEn: string;
};

type SubcategoryDefinition = {
  slug: CatalogSubcategorySlug;
  topLevelSlug: CatalogTopLevelSlug;
  nameZh: string;
  nameEn: string;
};

export type VisibleCatalogSubcategory = SubcategoryDefinition & {
  products: ProductRecord[];
};

export type VisibleCatalogTopLevel = TopLevelDefinition & {
  children: VisibleCatalogSubcategory[];
};

const topLevels: TopLevelDefinition[] = [
  {
    slug: "medical-consumables",
    nameZh: "医疗耗材",
    nameEn: "Medical Consumables"
  },
  {
    slug: "medical-devices",
    nameZh: "医疗设备",
    nameEn: "Medical Devices"
  }
];

const subcategories: SubcategoryDefinition[] = [
  {
    slug: "protective-consumables",
    topLevelSlug: "medical-consumables",
    nameZh: "防护类",
    nameEn: "Protective Consumables"
  },
  {
    slug: "injection-infusion-consumables",
    topLevelSlug: "medical-consumables",
    nameZh: "注射输液类",
    nameEn: "Injection & Infusion Consumables"
  },
  {
    slug: "wound-care-consumables",
    topLevelSlug: "medical-consumables",
    nameZh: "伤口护理类",
    nameEn: "Wound Care Consumables"
  },
  {
    slug: "disinfection-cleaning-consumables",
    topLevelSlug: "medical-consumables",
    nameZh: "消毒清洁类",
    nameEn: "Disinfection & Cleaning"
  },
  {
    slug: "testing-sampling-consumables",
    topLevelSlug: "medical-consumables",
    nameZh: "检验采样类",
    nameEn: "Testing & Sampling Consumables"
  },
  {
    slug: "basic-care-consumables",
    topLevelSlug: "medical-consumables",
    nameZh: "基础护理类",
    nameEn: "Basic Care Consumables"
  },
  {
    slug: "surgical-procedure-packs",
    topLevelSlug: "medical-consumables",
    nameZh: "手术套包",
    nameEn: "Surgical Procedure Packs"
  },
  {
    slug: "operating-room-consumables",
    topLevelSlug: "medical-consumables",
    nameZh: "手术室耗材",
    nameEn: "Operating Room Consumables"
  },
  {
    slug: "monitoring-diagnostic-devices",
    topLevelSlug: "medical-devices",
    nameZh: "监护诊断设备",
    nameEn: "Monitoring & Diagnostic Devices"
  },
  {
    slug: "treatment-infusion-devices",
    topLevelSlug: "medical-devices",
    nameZh: "治疗输注设备",
    nameEn: "Treatment & Infusion Devices"
  },
  {
    slug: "respiratory-emergency-devices",
    topLevelSlug: "medical-devices",
    nameZh: "呼吸急救设备",
    nameEn: "Respiratory & Emergency Devices"
  },
  {
    slug: "anesthesia-surgical-devices",
    topLevelSlug: "medical-devices",
    nameZh: "手术麻醉设备",
    nameEn: "Anesthesia Devices"
  },
  {
    slug: "minimally-invasive-surgical-devices",
    topLevelSlug: "medical-devices",
    nameZh: "微创外科设备",
    nameEn: "Minimally Invasive Surgical Devices"
  },
  {
    slug: "surgical-visualization-devices",
    topLevelSlug: "medical-devices",
    nameZh: "手术可视化设备",
    nameEn: "Surgical Visualization Devices"
  },
  {
    slug: "robotics-navigation-devices",
    topLevelSlug: "medical-devices",
    nameZh: "手术机器人与导航设备",
    nameEn: "Robotics & Navigation Devices"
  },
  {
    slug: "specialty-treatment-devices",
    topLevelSlug: "medical-devices",
    nameZh: "专科诊疗设备",
    nameEn: "Specialty Treatment Devices"
  },
  {
    slug: "ward-care-devices",
    topLevelSlug: "medical-devices",
    nameZh: "病房护理设备",
    nameEn: "Ward Care Devices"
  }
];

const topLevelBySlug = new Map<string, TopLevelDefinition>(
  topLevels.map((entry) => [entry.slug, entry])
);
const subcategoryBySlug = new Map<string, SubcategoryDefinition>(
  subcategories.map((entry) => [entry.slug, entry])
);

const categoryByWebsiteSlug: Record<string, CatalogSubcategorySlug> = {
  "1-1-y16": "minimally-invasive-surgical-devices",
  "1-2-hp401": "minimally-invasive-surgical-devices",
  "1-3-hp501": "minimally-invasive-surgical-devices",
  "1-4-sg": "minimally-invasive-surgical-devices",
  "1-5-ss": "minimally-invasive-surgical-devices",
  "1-6-ocbsgbl": "minimally-invasive-surgical-devices",
  "1-7-hifcbsgpl22": "minimally-invasive-surgical-devices",
  "1-8-hifcbsgpl35": "minimally-invasive-surgical-devices",
  "1-9-hifcbsgpl45": "minimally-invasive-surgical-devices",
  "1-10-ifcbsgpl22": "minimally-invasive-surgical-devices",
  "1-11-ifcbsgpl35": "minimally-invasive-surgical-devices",
  "1-12-ifcbsgpl45": "minimally-invasive-surgical-devices",
  "2-1": "minimally-invasive-surgical-devices",
  "2-2": "minimally-invasive-surgical-devices",
  "2-3": "minimally-invasive-surgical-devices",
  "2-4": "minimally-invasive-surgical-devices",
  "3-1-hypixel-ux5-4k": "surgical-visualization-devices",
  "4-1-oms3500": "surgical-visualization-devices",
  "4-2-oms2350": "surgical-visualization-devices",
  "5-1-rosewood": "specialty-treatment-devices",
  "6-1-consona-n9": "monitoring-diagnostic-devices",
  "6-2-resona-i9": "monitoring-diagnostic-devices",
  "7-1-toumai": "robotics-navigation-devices",
  "7-2-skywalker": "robotics-navigation-devices",
  "7-3-r-one": "robotics-navigation-devices",
  "8-1-excelim-116": "robotics-navigation-devices",
  "8-2-neuronav-118": "robotics-navigation-devices"
};

const categoryByProductName: Record<string, CatalogSubcategorySlug> = {
  "医用外科手套": "protective-consumables",
  "医用口罩及个人防护装备": "protective-consumables",
  "医用检查手套": "protective-consumables",
  "医用外科口罩": "protective-consumables",
  "医用防护服（隔离衣）": "protective-consumables",
  "医用鞋套": "protective-consumables",
  "医用一次性帽子": "protective-consumables",
  "医用护目镜": "protective-consumables",
  "医用防护面屏": "protective-consumables",
  "注射器及针头": "injection-infusion-consumables",
  "静脉输液器及留置针": "injection-infusion-consumables",
  "一次性输液器": "injection-infusion-consumables",
  "采血针": "injection-infusion-consumables",
  "伤口敷料及绷带": "wound-care-consumables",
  "医用止血带": "wound-care-consumables",
  "医用胶带": "wound-care-consumables",
  "创可贴": "wound-care-consumables",
  "医用纱布": "wound-care-consumables",
  "医用棉球": "wound-care-consumables",
  "医用剪刀": "wound-care-consumables",
  "医用镊子": "wound-care-consumables",
  "医用酒精": "disinfection-cleaning-consumables",
  "碘伏": "disinfection-cleaning-consumables",
  "消毒湿巾": "disinfection-cleaning-consumables",
  "免洗洗手液": "disinfection-cleaning-consumables",
  "医用消毒凝胶": "disinfection-cleaning-consumables",
  "真空采血管": "testing-sampling-consumables",
  "快速诊断检测试剂盒": "testing-sampling-consumables",
  "医用尿袋": "basic-care-consumables",
  "医用导管": "basic-care-consumables",
  "医用手术洞巾及手术衣": "basic-care-consumables",
  "医用体温计": "basic-care-consumables",
  "医用血压计": "basic-care-consumables",
  "医用听诊器": "basic-care-consumables",
  "医用床单": "basic-care-consumables",
  "医用枕套": "basic-care-consumables",
  "医用垃圾袋": "basic-care-consumables",
  "医用锐器盒": "basic-care-consumables",
  "病人监护仪": "monitoring-diagnostic-devices",
  "心电图机": "monitoring-diagnostic-devices",
  "超声系统": "monitoring-diagnostic-devices",
  "输液泵": "treatment-infusion-devices",
  "呼吸机": "respiratory-emergency-devices",
  "除颤仪": "respiratory-emergency-devices",
  "制氧机": "respiratory-emergency-devices",
  "吸引器": "respiratory-emergency-devices",
  "麻醉机": "anesthesia-surgical-devices",
  "病床": "ward-care-devices"
};

export function buildVisibleCatalogStructure(
  products: ProductRecord[]
): VisibleCatalogTopLevel[] {
  const groupedProducts = new Map<string, ProductRecord[]>();

  for (const product of products) {
    const slug = String(product.categorySlug || "") as CatalogSubcategorySlug;
    if (!subcategoryBySlug.has(slug)) {
      continue;
    }

    const existing = groupedProducts.get(slug) ?? [];
    existing.push(product);
    groupedProducts.set(slug, existing);
  }

  return topLevels
    .map((topLevel) => {
      const children = subcategories
        .filter((subcategory) => subcategory.topLevelSlug === topLevel.slug)
        .map((subcategory) => ({
          ...subcategory,
          products: groupedProducts.get(subcategory.slug) ?? []
        }))
        .filter((subcategory) => subcategory.products.length > 0);

      return {
        ...topLevel,
        children
      };
    })
    .filter((topLevel) => topLevel.children.length > 0);
}

export function getCategoryDisplayNames(subcategorySlug: string) {
  const subcategory = subcategoryBySlug.get(subcategorySlug);

  if (!subcategory) {
    const fallbackTopLevel = topLevelBySlug.get("medical-devices");
    return {
      topLevelSlug: fallbackTopLevel?.slug ?? "medical-devices",
      topLevelNameZh: fallbackTopLevel?.nameZh ?? "医疗设备",
      topLevelNameEn: fallbackTopLevel?.nameEn ?? "Medical Devices",
      subcategorySlug,
      subcategoryNameZh: "未分类",
      subcategoryNameEn: "Uncategorized"
    };
  }

  const topLevel = topLevelBySlug.get(subcategory.topLevelSlug);

  return {
    topLevelSlug: subcategory.topLevelSlug,
    topLevelNameZh: topLevel?.nameZh ?? "医疗设备",
    topLevelNameEn: topLevel?.nameEn ?? "Medical Devices",
    subcategorySlug: subcategory.slug,
    subcategoryNameZh: subcategory.nameZh,
    subcategoryNameEn: subcategory.nameEn
  };
}

export function resolveCatalogCategorySlug(input: {
  slug?: string;
  nameZh?: string;
  currentCategorySlug?: string;
}): CatalogSubcategorySlug | null {
  const slug = String(input.slug || "").trim();
  if (slug && categoryByWebsiteSlug[slug]) {
    return categoryByWebsiteSlug[slug];
  }

  const nameZh = String(input.nameZh || "").trim();
  if (nameZh && categoryByProductName[nameZh]) {
    return categoryByProductName[nameZh];
  }

  const currentCategorySlug = String(input.currentCategorySlug || "").trim();
  if (currentCategorySlug && subcategoryBySlug.has(currentCategorySlug)) {
    return currentCategorySlug as CatalogSubcategorySlug;
  }

  return null;
}
