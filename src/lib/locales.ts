export const LOCALES = ["en", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function ensureLocale(value: string): Locale {
  return isLocale(value) ? value : "en";
}

export const localeNames: Record<Locale, string> = {
  en: "English",
  zh: "中文"
};

export const copy = {
  en: {
    nav: {
      home: "Home",
      about: "About",
      products: "Products",
      documents: "Documents",
      news: "News",
      certifications: "Certifications",
      contact: "Contact",
      admin: "Admin"
    },
    cta: {
      products: "Browse Products",
      documents: "View Documents",
      contact: "Contact Our Team",
      request: "Request access",
      download: "Direct download",
      send: "Send request"
    },
    labels: {
      productCenter: "Product Center",
      documentCenter: "Document Center",
      latestNews: "Latest News",
      contactUs: "Contact Us",
      certifications: "Certifications",
      relatedDocuments: "Related Documents",
      relatedProducts: "Related Products",
      companyOverview: "Company Overview",
      globalSupport: "Global Support",
      search: "Search products",
      category: "Category",
      allCategories: "All Categories",
      featured: "Featured Products",
      publicAccess: "Open Access",
      protectedAccess: "Request required",
      requestSuccess:
        "Your request has been submitted. Our team will contact you shortly.",
      inquirySuccess:
        "Thank you. Your inquiry has been received and our team will follow up soon.",
      curatedPortfolio: "Curated Portfolio",
      portfolioSummary:
        "Authentic product imagery, official product naming, and structured public specifications presented with a cleaner medical-device website standard.",
      matchedProducts: "Matching Products",
      useScenarios: "Intended Use",
      keySpecifications: "Key Specifications",
      deliveryDocuments: "Registration & Delivery",
      officialDocumentEntry: "Official Document Entry"
    }
  },
  zh: {
    nav: {
      home: "首页",
      about: "关于我们",
      products: "产品中心",
      documents: "资料中心",
      news: "新闻动态",
      certifications: "认证资质",
      contact: "联系我们",
      admin: "后台"
    },
    cta: {
      products: "查看产品",
      documents: "查看资料",
      contact: "联系团队",
      request: "提交申请",
      download: "直接下载",
      send: "提交表单"
    },
    labels: {
      productCenter: "产品中心",
      documentCenter: "资料中心",
      latestNews: "新闻动态",
      contactUs: "联系我们",
      certifications: "认证资质",
      relatedDocuments: "相关资料",
      relatedProducts: "相关产品",
      companyOverview: "公司概览",
      globalSupport: "全球服务",
      search: "搜索产品",
      category: "产品分类",
      allCategories: "全部分类",
      featured: "重点产品",
      publicAccess: "公开下载",
      protectedAccess: "申请后获取",
      requestSuccess: "资料申请已提交，我们会尽快与您联系。",
      inquirySuccess: "询盘已提交，团队会尽快跟进。",
      curatedPortfolio: "精选产品样板",
      portfolioSummary:
        "优先展示真实产品图片、正式型号名称与公开规格信息，先把产品官网的专业感做出来。",
      matchedProducts: "当前匹配产品",
      useScenarios: "适用场景",
      keySpecifications: "关键规格",
      deliveryDocuments: "交付与资料",
      officialDocumentEntry: "官方资料入口"
    }
  }
} as const;
