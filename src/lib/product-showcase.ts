import type { ProductRecord } from "@/lib/repository";

import { realProducts } from "@/lib/site-catalog.generated";

export type HeroSlide = {
  slug: string;
  eyebrowZh: string;
  eyebrowEn: string;
  titleZh: string;
  titleEn: string;
  bodyZh: string;
  bodyEn: string;
  imageUrl: string;
};

export type ProductFeatureBlock = {
  titleZh: string;
  titleEn: string;
  bodyZh: string;
  bodyEn: string;
  pointsZh?: string[];
  pointsEn?: string[];
};

export type ProductSpecRow = {
  labelZh: string;
  labelEn: string;
  valueZh: string;
  valueEn: string;
};

export type ProductBenchmarkRow = {
  labelZh: string;
  labelEn: string;
  ourValueZh: string;
  ourValueEn: string;
  benchmarkValueZh: string;
  benchmarkValueEn: string;
};

export type ProductBenchmarkShowcase = {
  eyebrowZh: string;
  eyebrowEn: string;
  titleZh: string;
  titleEn: string;
  ourLabelZh: string;
  ourLabelEn: string;
  benchmarkLabelZh: string;
  benchmarkLabelEn: string;
  publicSummaryZh: string;
  publicSummaryEn: string;
  comparisonRows: ProductBenchmarkRow[];
  internalReference: {
    brand: string;
    model: string;
    reasonZh: string;
    reasonEn: string;
    sourceLinks: string[];
  };
};

export type ProductDetailShowcase = {
  heroLabelZh: string;
  heroLabelEn: string;
  heroTitleZh: string;
  heroTitleEn: string;
  heroBodyZh: string;
  heroBodyEn: string;
  gallery: string[];
  featureBlocks: ProductFeatureBlock[];
  specRows: ProductSpecRow[];
  benchmark?: ProductBenchmarkShowcase;
};

export const heroSlides: HeroSlide[] = [
  {
    slug: "uct-780",
    eyebrowZh: "高端 CT 系统",
    eyebrowEn: "Performance CT",
    titleZh: "真实设备大图，先把首屏专业感做出来",
    titleEn: "Real equipment visuals with a stronger flagship first impression",
    bodyZh:
      "以真实设备图片、轻动画和简洁的信息层级来展示国产医疗器械与耗材，先把官网的展示质感做扎实。",
    bodyEn:
      "Present domestic medical devices and consumables through real equipment imagery, restrained motion, and a cleaner information hierarchy.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/ct/780---new/20241105-162329.jpg?h=1464&w=1949&hash=1CD3043C96AB7D8B9904606C7BB77C06"
  },
  {
    slug: "umr-680",
    eyebrowZh: "1.5T 磁共振",
    eyebrowEn: "1.5T MRI",
    titleZh: "按真实行业分类组织产品，筛选体验更自然",
    titleEn: "Industry-aligned categorization for a more natural browsing flow",
    bodyZh:
      "首页突出影像设备主线，产品中心按 CT、MR、DR、乳腺摄影和介入耗材分类，便于客户快速定位。",
    bodyEn:
      "The homepage emphasizes imaging systems first, while the product center follows CT, MR, DR, mammography, and interventional consumable categories.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/mr/mr-products-with-title/680.png?h=530&w=700&hash=26151AD06D221CFA2F7727C99FECF43D"
  },
  {
    slug: "udr-780i-pro",
    eyebrowZh: "数字 X 射线",
    eyebrowEn: "Digital Radiography",
    titleZh: "统一图片比例和留白，让设备本身成为页面主角",
    titleEn: "Consistent framing that keeps the equipment itself in focus",
    bodyZh:
      "全站产品图片统一比例和留白策略，尽量减少人物、场景照和示意图干扰，整体观感更稳。",
    bodyEn:
      "Consistent image ratios and whitespace reduce distraction from people and lifestyle scenes so the products remain the focus.",
    imageUrl:
      "https://global.united-imaging.com/-/media/uih/product/dr/udr_780i.png?h=399&w=525&hash=6C6F30A11A32A252D9D71CADB2FA4F98"
  }
];

const showcaseBySlug: Record<string, ProductDetailShowcase> = {
  "uct-780": {
    heroLabelZh: "160 层 CT 系统",
    heroLabelEn: "160-slice CT",
    heroTitleZh: "uCT 780",
    heroTitleEn: "uCT 780",
    heroBodyZh:
      "基于联影公开资料整理，uCT 780 面向高阶临床 CT 场景，重点强调低剂量下的细节成像、流程效率以及更广的临床应用覆盖。",
    heroBodyEn:
      "Adapted from United Imaging public product information, uCT 780 is positioned for advanced clinical CT with emphasis on low-dose image detail, workflow efficiency, and broader clinical versatility.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/ct/780---new/20241105-162329.jpg?h=1464&w=1949&hash=1CD3043C96AB7D8B9904606C7BB77C06",
      "https://global.united-imaging.com/-/media/uih/product/ct/780---new/780-1212.png?h=1051&w=960&hash=34BB74B2A65F53CD9743AFDBCC01053F",
      "https://global.united-imaging.com/-/media/uih/product/ct/780---new/20241106-095930.jpg?h=1440&w=1920&hash=23FB4C07A7623BB4B096A12B6CC74EE2",
      "https://global.united-imaging.com/-/media/uih/product/ct/780---new/20241106-095944.jpg?h=1440&w=1920&hash=C348BED1DE1E89E54A720962FC73FAC9"
    ],
    featureBlocks: [
      {
        titleZh: "低剂量细节成像",
        titleEn: "Low-dose detail imaging",
        bodyZh:
          "公开页面将 DELTA 深度学习重建作为核心卖点之一，强调在控制辐射剂量的同时提升细节可见性、噪声表现与低对比可探测性。",
        bodyEn:
          "The public product page presents DELTA deep-learning reconstruction as a core capability for preserving detail while improving noise behavior and low-contrast detectability under lower dose conditions.",
        pointsZh: ["同等 LCD 下剂量降低最高 80%", "同等剂量下噪声降低最高 98%", "同等剂量下 LCD 提升最高 155%"],
        pointsEn: [
          "Up to 80% radiation dose reduction at the same LCD",
          "Up to 98% noise reduction at the same dose",
          "Up to 155% LCD improvement at the same dose"
        ]
      },
      {
        titleZh: "面向临床流程的效率设计",
        titleEn: "Workflow-oriented efficiency",
        bodyZh:
          "设备被定位为兼顾技师效率与复杂检查支持的性能型 CT，可覆盖常规检查、心脏成像和急诊流程。",
        bodyEn:
          "The product is framed as a performance CT platform that supports technologist efficiency while covering routine studies, cardiac imaging, and emergency workflows.",
        pointsZh: ["0.3 秒/圈扫描", "80 排探测器", "单圈最高 160 层图像生成"],
        pointsEn: ["0.3 s rotation time", "80 detector rows", "Up to 160 slices generated per rotation"]
      },
      {
        titleZh: "更广的临床适配能力",
        titleEn: "Broader clinical versatility",
        bodyZh:
          "公开资料还强调频谱成像、动态灌注等能力，用于扩展设备在神经、血管和复杂临床场景中的适配范围。",
        bodyEn:
          "Public materials also highlight spectral imaging and dynamic perfusion to broaden use across neuro, vascular, and more complex clinical scenarios.",
        pointsZh: ["动态脑灌注", "频谱成像", "适配心脏与血管检查"],
        pointsEn: ["Dynamic cerebral perfusion", "Spectral imaging", "Suitable for cardiac and vascular exams"]
      }
    ],
    specRows: [
      { labelZh: "球管阳极热容量", labelEn: "Tube anode storage capacity", valueZh: "7.5 MHU", valueEn: "7.5 MHU" },
      { labelZh: "探测器", labelEn: "Detector", valueZh: "Z-Detector", valueEn: "Z-Detector" },
      { labelZh: "探测器排数", labelEn: "Number of detector rows", valueZh: "80", valueEn: "80" },
      { labelZh: "单圈最大成像层数", labelEn: "Max. slices generated per rotation", valueZh: "160", valueEn: "160" },
      { labelZh: "旋转时间", labelEn: "Rotation time", valueZh: "0.3 s / 360°", valueEn: "0.3 s / 360°" },
      { labelZh: "kV 设置", labelEn: "kV settings", valueZh: "70, 80, 100, 120, 140 kV", valueEn: "70, 80, 100, 120, 140 kV" },
      { labelZh: "发生器功率", labelEn: "Generator power", valueZh: "100 kW（可选）", valueEn: "100 kW (optional)" },
      { labelZh: "孔径", labelEn: "Aperture", valueZh: "70 cm", valueEn: "70 cm" },
      { labelZh: "检查床承重", labelEn: "Table load", valueZh: "205 kg / 451 lbs", valueEn: "205 kg / 451 lbs" }
    ]
  },
  "uct-528": {
    heroLabelZh: "40/80 层 CT 系统",
    heroLabelEn: "40/80-slice CT",
    heroTitleZh: "uCT 528",
    heroTitleEn: "uCT 528",
    heroBodyZh:
      "基于联影公开资料整理，uCT 528 以 Smart Workflow、Smart Design 和 Smart Dose 为核心表达，适合放在中高端常规 CT 方案中展示。",
    heroBodyEn:
      "Adapted from United Imaging public materials, uCT 528 emphasizes Smart Workflow, Smart Design, and Smart Dose for routine hospital CT deployment.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/ct/520tu/520_f-min.png?h=735&w=858&hash=1AB3B7C5CBE6C81B97814A163E7D0ED4"
    ],
    featureBlocks: [
      {
        titleZh: "面向常规临床工作流",
        titleEn: "Built for routine clinical workflow",
        bodyZh:
          "适用于综合医院常规 CT 流程、通量优化和更低剂量的日常检查场景。",
        bodyEn:
          "Suitable for routine hospital CT workflows, throughput optimization, and lower-dose daily imaging."
      },
      {
        titleZh: "Smart Workflow",
        titleEn: "Smart Workflow",
        bodyZh:
          "公开资料将 Smart Workflow 作为核心信息点之一，强调围绕效率和标准化流程的使用体验。",
        bodyEn:
          "Public materials highlight Smart Workflow as a central concept around efficiency and standardized operation."
      },
      {
        titleZh: "Smart Dose",
        titleEn: "Smart Dose",
        bodyZh:
          "设备定位围绕 lower radiation dose、higher efficiency 和 improved profitability 展开，适合在官网详情页中做出清晰层次。",
        bodyEn:
          "The product is positioned around lower radiation dose, higher efficiency, and improved profitability."
      }
    ],
    specRows: [
      { labelZh: "成像层数", labelEn: "Slices", valueZh: "40/80-slice CT", valueEn: "40/80-slice CT" },
      { labelZh: "探测器", labelEn: "Detector", valueZh: "Z-Detector", valueEn: "Z-Detector" },
      { labelZh: "产品关键词", labelEn: "Product focus", valueZh: "Smart Workflow / Smart Design / Smart Dose", valueEn: "Smart Workflow / Smart Design / Smart Dose" }
    ]
  },
  "uct-520": {
    heroLabelZh: "40 层 CT 系统",
    heroLabelEn: "40-slice CT",
    heroTitleZh: "uCT 520",
    heroTitleEn: "uCT 520",
    heroBodyZh:
      "基于联影公开资料整理，uCT 520 强调 AI-based workflow、Z-Detector、Exquisite Images 以及 total cost of ownership。",
    heroBodyEn:
      "Adapted from United Imaging public materials, uCT 520 features AI-based workflow, Z-Detector, Exquisite Images, and total cost of ownership.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/ct/520tu/520_f-min.png?h=735&w=858&hash=1AB3B7C5CBE6C81B97814A163E7D0ED4"
    ],
    featureBlocks: [
      {
        titleZh: "面向高频常规 CT 场景",
        titleEn: "Designed for high-volume routine CT",
        bodyZh:
          "适用于体检、发热门诊、急诊和分级医疗中的高频常规 CT 使用场景。",
        bodyEn:
          "Suitable for checkup, fever clinic, emergency, and tiered-care routine CT workflows."
      },
      {
        titleZh: "AI 引导工作流",
        titleEn: "AI-guided workflow",
        bodyZh:
          "公开资料将 AI-based workflow 作为重要表达，用于突出系统在日常使用中的流程友好度。",
        bodyEn:
          "The official description highlights AI-based workflow to emphasize ease of use in day-to-day clinical operation."
      },
      {
        titleZh: "机架倾斜能力",
        titleEn: "Physical gantry tilt support",
        bodyZh:
          "公开参数中提到支持最高 ±30° 物理机架倾斜，适合在详情页参数区进行结构化呈现。",
        bodyEn:
          "Public information states support for up to ±30° physical gantry tilt."
      }
    ],
    specRows: [
      { labelZh: "成像层数", labelEn: "Slices", valueZh: "40-slice CT", valueEn: "40-slice CT" },
      { labelZh: "探测器", labelEn: "Detector", valueZh: "Z-Detector", valueEn: "Z-Detector" },
      { labelZh: "机架倾斜", labelEn: "Gantry tilt", valueZh: "最高 ±30°", valueEn: "Up to ±30°" }
    ]
  },
  "neuviz-prime-ct": {
    heroLabelZh: "128 层 CT 平台",
    heroLabelEn: "128-slice CT Platform",
    heroTitleZh: "NeuViz Prime CT",
    heroTitleEn: "NeuViz Prime CT",
    heroBodyZh:
      "基于东软医疗公开资料整理，NeuViz Prime CT 强调 128 slices、dual energy、Ultra HD imaging 与 low dose design。",
    heroBodyEn:
      "Adapted from Neusoft Medical public materials, NeuViz Prime CT emphasizes 128 slices, dual energy, Ultra HD imaging, and low dose design.",
    gallery: [
      "https://www-dcdn.neusoftmedical.com/files/66acd2fce4b0ec3e6115337e.png"
    ],
    featureBlocks: [
      {
        titleZh: "高分辨临床 CT",
        titleEn: "High-resolution clinical CT",
        bodyZh:
          "适用于高分辨率临床 CT 场景，可在产品页中突出其作为高端 CT 样板机型的定位。",
        bodyEn:
          "Suitable for high-resolution clinical CT and works well as a premium CT sample product in the catalog."
      },
      {
        titleZh: "双能量能力",
        titleEn: "Dual-energy capability",
        bodyZh:
          "公开资料中将 dual energy 作为重要能力点，可用于支撑更专业的临床成像叙述。",
        bodyEn:
          "Dual energy is listed in public materials and strengthens the professional positioning of the product page."
      },
      {
        titleZh: "低剂量设计",
        titleEn: "Low-dose design",
        bodyZh:
          "官方公开文案明确强调 low dose design，适合与图像质量、效率和高端配置一起组织展示。",
        bodyEn:
          "The official product description explicitly highlights low-dose design alongside image quality and platform performance."
      }
    ],
    specRows: [
      { labelZh: "成像层数", labelEn: "Slices", valueZh: "128 slices", valueEn: "128 slices" },
      { labelZh: "双能量", labelEn: "Dual energy", valueZh: "支持", valueEn: "Supported" },
      { labelZh: "分辨率", labelEn: "Resolution", valueZh: "30 lp/cm", valueEn: "30 lp/cm" },
      { labelZh: "最低管电压", labelEn: "Lowest kV", valueZh: "60 kV", valueEn: "60 kV" }
    ]
  },
  "umr-790": {
    heroLabelZh: "3.0T 磁共振系统",
    heroLabelEn: "3.0T MR System",
    heroTitleZh: "uMR 790",
    heroTitleEn: "uMR 790",
    heroBodyZh:
      "基于联影公开资料整理，uMR 790 面向科研型与高阶临床磁共振场景，突出 exceptional gradient performance 与 ultra-high homogeneity。",
    heroBodyEn:
      "Adapted from United Imaging public materials, uMR 790 is positioned for research-oriented and advanced clinical MRI, highlighting exceptional gradient performance and ultra-high homogeneity.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/mr/mr-products-with-title/790.png?h=530&w=700&hash=14DB745AE705C7972D900F61C8609B3D"
    ],
    featureBlocks: [
      {
        titleZh: "科研与高阶临床定位",
        titleEn: "Research and advanced clinical positioning",
        bodyZh:
          "适用于功能成像、复杂全身检查以及对均匀度和梯度性能要求更高的磁共振场景。",
        bodyEn:
          "Suitable for functional imaging, complex whole-body studies, and MRI environments that demand stronger homogeneity and gradient performance."
      },
      {
        titleZh: "超高均匀度",
        titleEn: "Ultra-high homogeneity",
        bodyZh:
          "公开资料将均匀度能力作为重要卖点，用于支撑更高阶的磁共振成像应用。",
        bodyEn:
          "Public materials present homogeneity as a key performance characteristic for advanced MRI applications."
      },
      {
        titleZh: "强梯度平台",
        titleEn: "Powerful gradient platform",
        bodyZh:
          "官方产品描述围绕 exceptional gradient performance 展开，适合与科研和高级应用一并展示。",
        bodyEn:
          "The official positioning revolves around exceptional gradient performance, fitting well with research and advanced application messaging."
      }
    ],
    specRows: [
      { labelZh: "磁场强度", labelEn: "Field strength", valueZh: "3.0T", valueEn: "3.0T" },
      { labelZh: "平台定位", labelEn: "Positioning", valueZh: "科研型与高阶临床 MRI", valueEn: "Research-oriented and advanced clinical MRI" }
    ]
  },
  "umr-780": {
    heroLabelZh: "ACS 3.0T 磁共振系统",
    heroLabelEn: "ACS 3.0T MR",
    heroTitleZh: "uMR 780",
    heroTitleEn: "uMR 780",
    heroBodyZh:
      "基于联影公开资料整理，uMR 780 被描述为 ACS 3.0T MR，强调 rapid imaging、homogeneity 和深度学习加速重建。",
    heroBodyEn:
      "Adapted from United Imaging public materials, uMR 780 is described as an ACS 3.0T MR focused on rapid imaging, homogeneity, and deep-learning-accelerated reconstruction.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/mr/mr-products-with-title/780.png?h=530&w=700&hash=3EBB6C2A6C31515CFE14CC724C22C661"
    ],
    featureBlocks: [
      {
        titleZh: "高端 3.0T 平台",
        titleEn: "Premium 3.0T platform",
        bodyZh:
          "适用于高端临床磁共振、快速序列以及部分科研转化场景。",
        bodyEn:
          "Suitable for premium clinical MRI, accelerated sequences, and selected translational research scenarios."
      },
      {
        titleZh: "快速成像",
        titleEn: "Rapid imaging",
        bodyZh:
          "公开资料将 rapid imaging 作为核心描述之一，适合在详情页亮点区突出展示。",
        bodyEn:
          "Public materials present rapid imaging as one of the core product messages."
      },
      {
        titleZh: "基于 ACS 平台",
        titleEn: "Based on the ACS platform",
        bodyZh:
          "官方信息强调其基于 ACS 成像平台，并围绕 precision 与 broader application coverage 组织描述。",
        bodyEn:
          "Official information emphasizes the ACS imaging platform together with precision and broad application coverage."
      }
    ],
    specRows: [
      { labelZh: "磁场强度", labelEn: "Field strength", valueZh: "3.0T", valueEn: "3.0T" },
      { labelZh: "平台", labelEn: "Platform", valueZh: "ACS 成像平台", valueEn: "ACS imaging platform" }
    ]
  },
  "umr-680": {
    heroLabelZh: "1.5T 磁共振系统",
    heroLabelEn: "1.5T MR System",
    heroTitleZh: "uMR 680",
    heroTitleEn: "uMR 680",
    heroBodyZh:
      "基于联影公开资料整理，uMR 680 被定位为 uAIFI Empowered 1.5T MR，强调梯度性能、高密度射频通道和面向日常临床的图像质量表现。",
    heroBodyEn:
      "Adapted from United Imaging public product information, uMR 680 is presented as a uAIFI Empowered 1.5T MR with emphasis on gradient performance, high-density RF channels, and image quality for routine clinical MRI.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/mr/mr-products-with-title/680.png?h=530&w=700&hash=26151AD06D221CFA2F7727C99FECF43D"
    ],
    featureBlocks: [
      {
        titleZh: "面向日常临床的 1.5T 平台",
        titleEn: "A 1.5T platform for routine clinical MRI",
        bodyZh:
          "官方定位强调通量、宽孔径体验和图像质量的平衡，适合综合临床 MRI 工作流。",
        bodyEn:
          "The official positioning emphasizes a mainstream 1.5T clinical platform balancing throughput, wide-bore comfort, and image quality for routine MRI."
      },
      {
        titleZh: "梯度与通道配置",
        titleEn: "Gradient and channel performance",
        bodyZh:
          "公开资料突出 45 mT/m 梯度强度、200 T/m/s 梯度切换率以及最高 96 独立接收通道。",
        bodyEn:
          "Public materials highlight 45 mT/m gradient strength, 200 T/m/s slew rate, and up to 96 independent receiver channels."
      },
      {
        titleZh: "适配高质量成像流程",
        titleEn: "Built for image-quality-focused workflows",
        bodyZh:
          "适用于图像质量优先、患者舒适度要求较高以及综合临床检查覆盖较广的磁共振工作流。",
        bodyEn:
          "Suitable for image-quality-focused MRI workflows that also value patient comfort and broad routine exam coverage."
      }
    ],
    specRows: [
      { labelZh: "磁场强度", labelEn: "Field strength", valueZh: "1.5T", valueEn: "1.5T" },
      { labelZh: "梯度强度", labelEn: "Gradient strength", valueZh: "45 mT/m", valueEn: "45 mT/m" },
      { labelZh: "梯度切换率", labelEn: "Slew rate", valueZh: "200 T/m/s", valueEn: "200 T/m/s" },
      { labelZh: "独立接收通道", labelEn: "Independent receiver channels", valueZh: "最高 96", valueEn: "Up to 96" }
    ]
  },
  "udr-780i-pro": {
    heroLabelZh: "自动吊顶 DR 系统",
    heroLabelEn: "Auto Ceiling-mounted DR",
    heroTitleZh: "uDR 780i Pro",
    heroTitleEn: "uDR 780i Pro",
    heroBodyZh:
      "基于联影公开资料整理，uDR 780i Pro 面向高通量数字摄影环境，重点强调 remote collimation、automatic stitching 与 tube tracking。",
    heroBodyEn:
      "Adapted from United Imaging public materials, uDR 780i Pro is positioned for high-throughput digital radiography with remote collimation, automatic stitching, and tube tracking.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/dr/udr_780i.png?h=399&w=525&hash=6C6F30A11A32A252D9D71CADB2FA4F98"
    ],
    featureBlocks: [
      {
        titleZh: "面向高通量 DR 工作流",
        titleEn: "Designed for high-throughput DR workflows",
        bodyZh:
          "适用于门诊、住院、体检和综合放射场景，用于提升日常数字摄影流程的连续性与效率。",
        bodyEn:
          "Suitable for outpatient, inpatient, checkup, and general radiography departments where throughput and workflow continuity matter."
      },
      {
        titleZh: "自动化跟踪与定位",
        titleEn: "Automation for tracking and positioning",
        bodyZh:
          "公开资料突出自动管球探测与 tracking 设计，帮助减少重复调位并提高技师操作便捷度。",
        bodyEn:
          "Public information emphasizes auto tube detection and tracking to reduce repeated positioning effort for technologists."
      },
      {
        titleZh: "远程准直与拼接支持",
        titleEn: "Remote collimation and stitching support",
        bodyZh:
          "官网公开描述中将 remote collimation 与 automatic stitching 作为核心能力，用于提升摄影操作体验。",
        bodyEn:
          "The official page highlights remote collimation and automatic stitching as key workflow-support features."
      }
    ],
    specRows: [
      { labelZh: "系统类型", labelEn: "System type", valueZh: "Auto Ceiling-mounted DR", valueEn: "Auto Ceiling-mounted DR" },
      { labelZh: "准直方式", labelEn: "Collimation", valueZh: "支持 remote collimation", valueEn: "Supports remote collimation" },
      { labelZh: "拼接功能", labelEn: "Stitching", valueZh: "支持 automatic stitching", valueEn: "Supports automatic stitching" },
      { labelZh: "跟踪能力", labelEn: "Tracking", valueZh: "支持 auto tube-detect and tracking", valueEn: "Supports auto tube-detect and tracking" }
    ]
  },
  "udr-596i": {
    heroLabelZh: "自动落地式 DR 系统",
    heroLabelEn: "Auto Floor Mounted DR",
    heroTitleZh: "uDR 596i",
    heroTitleEn: "uDR 596i",
    heroBodyZh:
      "基于联影公开资料整理，uDR 596i 被定位为 Auto Floor Mounted DR，适用于标准化综合放射工作流。",
    heroBodyEn:
      "Adapted from United Imaging public materials, uDR 596i is positioned as an Auto Floor Mounted DR for standardized general radiography workflows.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/dr/udr_596i.png?h=399&w=525&hash=4BDEDE6429BEF2F38F9BEA423DDC0E7D"
    ],
    featureBlocks: [
      {
        titleZh: "标准化综合放射工作流",
        titleEn: "Standardized general radiography workflow",
        bodyZh:
          "适用于常规摄片、综合门诊放射和住院影像检查环境。",
        bodyEn:
          "Suitable for general radiography in outpatient and inpatient imaging departments."
      },
      {
        titleZh: "自动落地式平台",
        titleEn: "Auto floor-mounted platform",
        bodyZh:
          "官方公开图示为前后结构机型图，适合在产品页中清晰呈现设备外观和系统形态。",
        bodyEn:
          "The official listing shows a front-and-side system view, making it suitable for a clean equipment presentation."
      }
    ],
    specRows: [
      { labelZh: "系统类型", labelEn: "System type", valueZh: "Auto Floor Mounted DR", valueEn: "Auto Floor Mounted DR" }
    ]
  },
  "udr-380i-pro": {
    heroLabelZh: "移动 DR 系统",
    heroLabelEn: "Mobile DR",
    heroTitleZh: "uDR 380i Pro",
    heroTitleEn: "uDR 380i Pro",
    heroBodyZh:
      "基于联影公开资料整理，uDR 380i Pro 被定位为 Remote-Vision Mobile DR，面向病房、ICU、急诊和床旁摄影场景。",
    heroBodyEn:
      "Adapted from United Imaging public materials, uDR 380i Pro is positioned as a Remote-Vision Mobile DR for ward, ICU, emergency, and bedside imaging.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/dr/ku8a2731--01.png?h=350&w=525&hash=43EF4056FF495081210024974F64D998"
    ],
    featureBlocks: [
      {
        titleZh: "床旁与移动摄影场景",
        titleEn: "Bedside and mobile radiography",
        bodyZh:
          "适用于病房、ICU、急诊等需要更灵活影像覆盖的移动 DR 工作流。",
        bodyEn:
          "Suitable for bedside and mobile DR workflows in wards, ICU, and emergency environments."
      },
      {
        titleZh: "Remote-Vision 定位",
        titleEn: "Remote-Vision positioning",
        bodyZh:
          "公开资料围绕 remote-vision mobile DR 展开，强调更灵活的移动应用表达。",
        bodyEn:
          "The official positioning centers on remote-vision mobile DR use cases."
      }
    ],
    specRows: [
      { labelZh: "系统类型", labelEn: "System type", valueZh: "Remote-Vision Mobile DR", valueEn: "Remote-Vision Mobile DR" }
    ]
  },
  "umammo-890i": {
    heroLabelZh: "乳腺成像平台",
    heroLabelEn: "Breast Imaging Platform",
    heroTitleZh: "uMammo 890i",
    heroTitleEn: "uMammo 890i",
    heroBodyZh:
      "基于联影公开资料整理，uMammo 890i 面向乳腺筛查和诊断流程，重点展示 3D breast imaging 与 10.1 lp/mm CMOS detector。",
    heroBodyEn:
      "Adapted from United Imaging public materials, uMammo 890i is presented for breast screening and diagnosis, featuring 3D breast imaging and a 10.1 lp/mm CMOS detector.",
    gallery: [
      "https://global.united-imaging.com/-/media/uih/product/dr/890i---new/1.png?h=1080&w=1920&hash=1047230B5F7401F4A9515665CBD23618"
    ],
    featureBlocks: [
      {
        titleZh: "面向筛查与诊断",
        titleEn: "Built for screening and diagnosis",
        bodyZh:
          "适用于乳腺筛查和乳腺影像诊断场景，可作为乳腺专科和综合医院产品中心的重要展示机型。",
        bodyEn:
          "Suitable for breast screening and diagnostic workflows, making it a strong sample product for a dedicated breast imaging section."
      },
      {
        titleZh: "3D 乳腺成像",
        titleEn: "3D breast imaging",
        bodyZh:
          "公开资料明确将 3D breast imaging 作为产品亮点之一，用于增强产品页的专业信息表达。",
        bodyEn:
          "The official materials explicitly present 3D breast imaging as a core product highlight."
      },
      {
        titleZh: "高分辨探测器",
        titleEn: "High-resolution detector",
        bodyZh:
          "公开页面披露 10.1 lp/mm CMOS detector 信息，适合放在详情页参数区和功能亮点区中展示。",
        bodyEn:
          "Public materials list a 10.1 lp/mm CMOS detector, which fits well into a professional feature and spec layout."
      }
    ],
    specRows: [
      { labelZh: "平台定位", labelEn: "Platform", valueZh: "乳腺成像平台", valueEn: "Breast imaging platform" },
      { labelZh: "三维成像", labelEn: "3D imaging", valueZh: "支持 3D breast imaging", valueEn: "Supports 3D breast imaging" },
      { labelZh: "探测器", labelEn: "Detector", valueZh: "10.1 lp/mm CMOS detector", valueEn: "10.1 lp/mm CMOS detector" }
    ]
  },
  neovas: {
    heroLabelZh: "可吸收冠脉支架系统",
    heroLabelEn: "Bioresorbable Coronary Stent System",
    heroTitleZh: "NeoVas",
    heroTitleEn: "NeoVas",
    heroBodyZh:
      "基于乐普公开资料整理，NeoVas 被定义为 Sirolimus-eluting Bioresorbable Coronary Stent System，适合放在高值耗材重点产品中展示。",
    heroBodyEn:
      "Adapted from Lepu Medical public materials, NeoVas is defined as a Sirolimus-eluting Bioresorbable Coronary Stent System and works well as a flagship consumables detail page.",
    gallery: [
      "https://en.lepumedical.com/upload/goods/2025-07/6875a54f24931.png"
    ],
    featureBlocks: [
      {
        titleZh: "可吸收支架平台",
        titleEn: "Bioresorbable scaffold platform",
        bodyZh:
          "适用于冠脉可吸收支架平台展示与资料归档，可作为高值耗材分类中的代表性页面。",
        bodyEn:
          "Suitable for bioresorbable coronary scaffold presentation and documentation within a high-value consumables portfolio."
      },
      {
        titleZh: "雷帕霉素洗脱定位",
        titleEn: "Sirolimus-eluting positioning",
        bodyZh:
          "官方英文名称已明确其为 Sirolimus-eluting Bioresorbable Coronary Stent System，适合保留正式名称表达。",
        bodyEn:
          "The official English name itself clearly positions the product as a sirolimus-eluting bioresorbable coronary stent system."
      },
      {
        titleZh: "适合受控资料模式",
        titleEn: "Suitable for controlled-document workflows",
        bodyZh:
          "这类产品适合在前台展示核心信息，同时把 IFU 或更完整资料放入申请后获取模式。",
        bodyEn:
          "This type of product works well with a public-facing overview while keeping IFU or deeper materials request-gated."
      }
    ],
    specRows: [
      {
        labelZh: "正式英文名",
        labelEn: "Official English name",
        valueZh: "NeoVas Sirolimus-eluting Bioresorbable Coronary Stent System",
        valueEn: "NeoVas Sirolimus-eluting Bioresorbable Coronary Stent System"
      },
      { labelZh: "产品类型", labelEn: "Product type", valueZh: "可吸收冠脉支架系统", valueEn: "Bioresorbable coronary stent system" },
      { labelZh: "公开参数", labelEn: "Public parameter reference", valueZh: "公开页面披露 0.13 mm 相关参数信息", valueEn: "Public page includes 0.13 mm-related parameter information" }
    ]
  },
  "buma-supreme": {
    heroLabelZh: "药物涂层冠脉支架系统",
    heroLabelEn: "Drug Coated Coronary Stent System",
    heroTitleZh: "BuMA Supreme",
    heroTitleEn: "BuMA Supreme",
    heroBodyZh:
      "基于赛诺医疗公开资料整理，BuMA Supreme 被定义为 Drug Coated Coronary Stent System，适合用于冠脉支架产品线展示。",
    heroBodyEn:
      "Adapted from Sinomed public materials, BuMA Supreme is defined as a Drug Coated Coronary Stent System and works well in a coronary stent lineup.",
    gallery: [
      "https://www.sinomed.com/wp-content/uploads/2024/12/1-1.png"
    ],
    featureBlocks: [
      {
        titleZh: "冠脉支架产品线样板",
        titleEn: "A coronary stent portfolio sample",
        bodyZh:
          "适用于冠脉药物支架产品线展示与合规资料组织。",
        bodyEn:
          "Suitable for coronary drug-coated stent portfolio presentation and compliance-oriented documentation."
      },
      {
        titleZh: "适合挂接 IFU 与产品页",
        titleEn: "Suitable for IFU-linked presentation",
        bodyZh:
          "公开资料以 device features 与 IFU 为主，适合做正式资料入口。",
        bodyEn:
          "Public materials center on device features and IFU resources, making it suitable for a formal document entry."
      }
    ],
    specRows: [
      { labelZh: "系统类型", labelEn: "System type", valueZh: "Drug Coated Coronary Stent System", valueEn: "Drug Coated Coronary Stent System" }
    ]
  },
  "ht-supreme": {
    heroLabelZh: "药物涂层冠脉支架系统",
    heroLabelEn: "Drug Coated Coronary Stent System",
    heroTitleZh: "HT Supreme",
    heroTitleEn: "HT Supreme",
    heroBodyZh:
      "基于赛诺医疗公开资料整理，HT Supreme 被定义为 Drug Coated Coronary Stent System，适合用于支架平台的扩展示例。",
    heroBodyEn:
      "Adapted from Sinomed public materials, HT Supreme is defined as a Drug Coated Coronary Stent System and works well as a broader product-line sample.",
    gallery: [
      "https://www.sinomed.com/wp-content/uploads/2022/02/图片1-3.png"
    ],
    featureBlocks: [
      {
        titleZh: "支架平台扩展示例",
        titleEn: "Broader stent platform sample",
        bodyZh:
          "适用于冠脉支架平台介绍与产品线扩展示例。",
        bodyEn:
          "Suitable for broader coronary stent platform presentation and product-line expansion."
      },
      {
        titleZh: "公开资料突出结构与洗脱信息",
        titleEn: "Public materials emphasize structure and elution",
        bodyZh:
          "公开页面重在展示药物释放曲线与产品结构相关内容。",
        bodyEn:
          "The public page emphasizes elution behavior and product-structure information."
      }
    ],
    specRows: [
      { labelZh: "系统类型", labelEn: "System type", valueZh: "Drug Coated Coronary Stent System", valueEn: "Drug Coated Coronary Stent System" }
    ]
  },
  vesselin: {
    heroLabelZh: "药涂冠脉球囊导管",
    heroLabelEn: "Drug Coated Coronary Balloon Catheter",
    heroTitleZh: "Vesselin",
    heroTitleEn: "Vesselin",
    heroBodyZh:
      "基于乐普公开资料整理，Vesselin 被定义为 Drug Coated Coronary Balloon Catheter，适合用于药涂球囊分类展示。",
    heroBodyEn:
      "Adapted from Lepu Medical public materials, Vesselin is defined as a Drug Coated Coronary Balloon Catheter for DCB product presentation.",
    gallery: [
      "https://en.lepumedical.com/upload/goods/2025-05/6825530d7a144.png"
    ],
    featureBlocks: [
      {
        titleZh: "药涂球囊产品样板",
        titleEn: "A drug-coated balloon sample",
        bodyZh:
          "适用于冠脉药涂球囊产品展示与线索收集。",
        bodyEn:
          "Suitable for coronary drug-coated balloon presentation and lead generation."
      },
      {
        titleZh: "适合做结构化参数页",
        titleEn: "Fits a structured specification layout",
        bodyZh:
          "公开资料包含有效长度、导丝兼容性、药物浓度和铂金标记等信息。",
        bodyEn:
          "Public information includes effective length, guidewire compatibility, drug concentration, and platinum marker details."
      }
    ],
    specRows: [
      { labelZh: "有效长度", labelEn: "Effective length", valueZh: "135 cm", valueEn: "135 cm" },
      { labelZh: "兼容导丝", labelEn: "Compatible guidewire", valueZh: "0.014 inch", valueEn: "0.014 inch" },
      { labelZh: "药物浓度", labelEn: "Drug concentration", valueZh: "3 ug/mm²", valueEn: "3 ug/mm²" }
    ]
  },
  "firefighter-nc": {
    heroLabelZh: "非顺应性球囊导管",
    heroLabelEn: "Non-compliant Balloon Catheter",
    heroTitleZh: "Firefighter NC",
    heroTitleEn: "Firefighter NC",
    heroBodyZh:
      "基于微创公开资料整理，Firefighter NC 被定位为 PCI 球囊产品线中的非顺应性 PTCA balloon catheter。",
    heroBodyEn:
      "Adapted from MicroPort public materials, Firefighter NC is positioned as a non-compliant PTCA balloon catheter within a PCI balloon portfolio.",
    gallery: [
      "https://microport.com/assets/general/products/_450xAUTO_fit_center-center_100_none/76932/NC_productImage.webp"
    ],
    featureBlocks: [
      {
        titleZh: "后扩张与高压场景",
        titleEn: "Post-dilation and high-pressure use",
        bodyZh:
          "适用于后扩张和高压扩张相关球囊产品展示。",
        bodyEn:
          "Suitable for post-dilation and high-pressure balloon presentation scenarios."
      },
      {
        titleZh: "真实产品图入口",
        titleEn: "True product-image presentation",
        bodyZh:
          "官方产品页提供真实物图与规格入口，适合作为 NC 球囊产品详情模板。",
        bodyEn:
          "The official product page provides a true product image and specification entry for an NC balloon sample."
      }
    ],
    specRows: [
      { labelZh: "产品定位", labelEn: "Positioning", valueZh: "Non-compliant PTCA balloon catheter", valueEn: "Non-compliant PTCA balloon catheter" }
    ]
  },
  tradent: {
    heroLabelZh: "刻痕球囊导管",
    heroLabelEn: "Coronary Scoring Balloon Catheter",
    heroTitleZh: "TRADENT",
    heroTitleEn: "TRADENT",
    heroBodyZh:
      "基于赛诺医疗公开资料整理，TRADENT 被定义为 Coronary Scoring Balloon Catheter，适合用于复杂病变准备类耗材展示。",
    heroBodyEn:
      "Adapted from Sinomed public materials, TRADENT is defined as a Coronary Scoring Balloon Catheter suitable for complex lesion preparation presentation.",
    gallery: [
      "https://www.sinomed.com/wp-content/uploads/2024/09/dab6f3160bdbcb56f87fbb234a35df95_compress.jpg"
    ],
    featureBlocks: [
      {
        titleZh: "复杂病变准备场景",
        titleEn: "Complex lesion preparation",
        bodyZh:
          "适合用于展示刻痕球囊在复杂病变准备中的定位，让耗材板块更接近专业介入产品中心的表达方式。",
        bodyEn:
          "Useful for presenting scoring balloon positioning in complex lesion preparation scenarios."
      },
      {
        titleZh: "结构化规格表达",
        titleEn: "Structured specification presentation",
        bodyZh:
          "公开资料中包含推荐导引导管、推荐导丝、score wires 数量和工作厚度等信息，适合做成正式参数表。",
        bodyEn:
          "Public information includes recommended guiding catheter, recommended guidewire, scoring wire count, and working thickness, which suits a structured spec table."
      },
      {
        titleZh: "适合作为耗材样板页",
        titleEn: "Strong consumables showcase template",
        bodyZh:
          "可作为球囊类耗材详情页模板，用同样的结构继续扩展其他介入耗材产品。",
        bodyEn:
          "It works well as a template for balloon-based consumables and can be reused for similar interventional products."
      }
    ],
    specRows: [
      { labelZh: "推荐导引导管", labelEn: "Recommended guiding catheter", valueZh: "6F", valueEn: "6F" },
      { labelZh: "推荐导丝", labelEn: "Recommended guidewire", valueZh: "0.014 inch", valueEn: "0.014 inch" },
      { labelZh: "刻痕丝数量", labelEn: "Scoring wire count", valueZh: "3 根", valueEn: "Three scoring wires" },
      { labelZh: "工作厚度", labelEn: "Working thickness", valueZh: "0.11 mm", valueEn: "0.11 mm" }
    ]
  },
  "neumr-rena": {
    heroLabelZh: "1.5T 磁共振平台",
    heroLabelEn: "1.5T MRI Platform",
    heroTitleZh: "NeuMR Rena",
    heroTitleEn: "NeuMR Rena",
    heroBodyZh:
      "基于东软医疗公开资料整理，NeuMR Rena 被定义为 1.5T MRI 平台，强调 full digital、boundless platform 与 Deep R。",
    heroBodyEn:
      "Adapted from Neusoft Medical public materials, NeuMR Rena is defined as a 1.5T MRI platform featuring full digital architecture, boundless platform design, and Deep R.",
    gallery: [
      "https://www-dcdn.neusoftmedical.com/files/66acd82ce4b0ec3e61153390.png"
    ],
    featureBlocks: [
      {
        titleZh: "常规临床 MRI 平台",
        titleEn: "Routine clinical MRI platform",
        bodyZh:
          "适用于常规临床 MRI 与智能化流程管理场景，可作为 1.5T 产品组中的重要样板页。",
        bodyEn:
          "Suitable for routine clinical MRI and intelligent workflow scenarios, making it a strong 1.5T sample page."
      },
      {
        titleZh: "全数字架构",
        titleEn: "Full digital architecture",
        bodyZh:
          "公开资料将 full digital 作为核心产品表达之一，用于强调平台基础能力。",
        bodyEn:
          "Public materials highlight full digital architecture as a core product concept."
      },
      {
        titleZh: "Deep R 与平台化设计",
        titleEn: "Deep R and boundless platform design",
        bodyZh:
          "官方文案围绕 boundless platform 与 Deep R 展开，适合在详情页中组织成清晰亮点区。",
        bodyEn:
          "The official description emphasizes boundless platform design and Deep R as key differentiators."
      }
    ],
    specRows: [
      { labelZh: "磁场强度", labelEn: "Field strength", valueZh: "1.5T", valueEn: "1.5T" },
      { labelZh: "梯度强度", labelEn: "Gradient strength", valueZh: "46 mT/m", valueEn: "46 mT/m" },
      { labelZh: "梯度切换率", labelEn: "Slew rate", valueZh: "160 T/m/s", valueEn: "160 T/m/s" }
    ]
  },
  "foxtrot-pro": {
    heroLabelZh: "PTCA 球囊导管",
    heroLabelEn: "PTCA Balloon Product",
    heroTitleZh: "Foxtrot Pro",
    heroTitleEn: "Foxtrot Pro",
    heroBodyZh:
      "基于微创公开资料整理，Foxtrot Pro 作为 PTCA 球囊产品，重点强调 0.017 inch 低通过头端与 6F 兼容能力。",
    heroBodyEn:
      "Adapted from MicroPort public materials, Foxtrot Pro is presented as a PTCA balloon product emphasizing a 0.017-inch low entry profile and full 6F compatibility.",
    gallery: [
      "https://microport.com/assets/general/products/_450xAUTO_fit_center-center_100_none/78626/Foxtrot-Pro.webp"
    ],
    featureBlocks: [
      {
        titleZh: "PCI 预扩张场景",
        titleEn: "PCI predilation use",
        bodyZh:
          "适用于 PCI 术中预扩张和常规冠脉球囊应用展示。",
        bodyEn:
          "Suitable for PCI predilation and general coronary balloon presentation."
      },
      {
        titleZh: "低通过头端",
        titleEn: "Low entry profile",
        bodyZh:
          "公开资料突出 0.017 inch 低通过头端和 0.026 inch crossing profile，适合做成参数表亮点。",
        bodyEn:
          "Public information highlights a 0.017-inch entry profile and 0.026-inch crossing profile."
      },
      {
        titleZh: "6F 兼容与压力参数",
        titleEn: "6F compatibility and pressure profile",
        bodyZh:
          "官网公开参数包含 6F 兼容、NP 6 atm 与 RBP 14 atm。",
        bodyEn:
          "The public specs include full 6F compatibility, nominal pressure of 6 atm, and rated burst pressure of 14 atm."
      }
    ],
    specRows: [
      { labelZh: "Entry profile", labelEn: "Entry profile", valueZh: "0.017 inch", valueEn: "0.017 inch" },
      { labelZh: "Crossing profile", labelEn: "Crossing profile", valueZh: "0.026 inch", valueEn: "0.026 inch" },
      { labelZh: "NP", labelEn: "Nominal pressure", valueZh: "6 atm", valueEn: "6 atm" },
      { labelZh: "RBP", labelEn: "Rated burst pressure", valueZh: "14 atm", valueEn: "14 atm" }
    ]
  },
  tytrak: {
    heroLabelZh: "半顺应性冠脉球囊导管",
    heroLabelEn: "Semi-Compliant Coronary Balloon Catheter",
    heroTitleZh: "Tytrak",
    heroTitleEn: "Tytrak",
    heroBodyZh:
      "基于赛诺医疗公开资料整理，Tytrak 被定义为 Semi-Compliant Coronary Balloon Catheter，适合用于基础球囊产品线展示。",
    heroBodyEn:
      "Adapted from Sinomed public materials, Tytrak is defined as a Semi-Compliant Coronary Balloon Catheter for baseline coronary balloon presentation.",
    gallery: [
      "https://www.sinomed.com/wp-content/uploads/2019/08/1-10.png",
      "https://www.sinomed.com/wp-content/uploads/2019/08/1-11.png"
    ],
    featureBlocks: [
      {
        titleZh: "半顺应性球囊样板",
        titleEn: "Semi-compliant balloon sample",
        bodyZh:
          "适用于半顺应性冠脉球囊产品展示，可作为球囊类基础样板页。",
        bodyEn:
          "Suitable for semi-compliant coronary balloon catheter presentation and as a foundational balloon sample page."
      },
      {
        titleZh: "压力与规格覆盖",
        titleEn: "Pressure and size coverage",
        bodyZh:
          "公开资料提供 2.25 mm 至 5.0 mm 的压力图范围，可直接转为正式参数表。",
        bodyEn:
          "Public materials provide pressure chart coverage from 2.25 mm to 5.0 mm, suitable for a formal specification layout."
      }
    ],
    specRows: [
      { labelZh: "规格范围", labelEn: "Diameter range", valueZh: "2.25 mm - 5.0 mm", valueEn: "2.25 mm - 5.0 mm" },
      { labelZh: "压力信息", labelEn: "Pressure data", valueZh: "含 NP / RBP", valueEn: "Includes NP / RBP" }
    ]
  },
  "nc-thonic": {
    heroLabelZh: "非顺应性冠脉球囊导管",
    heroLabelEn: "Non-Compliant Coronary Balloon Catheter",
    heroTitleZh: "NC Thonic",
    heroTitleEn: "NC Thonic",
    heroBodyZh:
      "基于赛诺医疗公开资料整理，NC Thonic 被定义为 Non-Compliant Coronary Balloon Catheter，适合用于高压后扩张类产品展示。",
    heroBodyEn:
      "Adapted from Sinomed public materials, NC Thonic is defined as a Non-Compliant Coronary Balloon Catheter suited for high-pressure post-dilation positioning.",
    gallery: [
      "https://www.sinomed.com/wp-content/uploads/2019/08/1-18.png",
      "https://www.sinomed.com/wp-content/uploads/2019/08/1-31.png"
    ],
    featureBlocks: [
      {
        titleZh: "高压后扩张定位",
        titleEn: "High-pressure post-dilation positioning",
        bodyZh:
          "适用于高压后扩张和非顺应性球囊产品展示。",
        bodyEn:
          "Suitable for high-pressure post-dilation and non-compliant balloon presentation."
      },
      {
        titleZh: "与 SC 产品形成对照",
        titleEn: "Pairs naturally with SC balloon pages",
        bodyZh:
          "可与 Tytrak 形成 SC / NC 球囊对照展示，便于产品中心组织完整球囊线。",
        bodyEn:
          "Pairs naturally with Tytrak as an SC vs. NC comparison sample within the balloon portfolio."
      }
    ],
    specRows: [
      { labelZh: "规格范围", labelEn: "Diameter range", valueZh: "1.25 mm - 4.0 mm", valueEn: "1.25 mm - 4.0 mm" },
      { labelZh: "压力信息", labelEn: "Pressure data", valueZh: "含 NP / RBP", valueEn: "Includes NP / RBP" }
    ]
  },
  vesscrack: {
    heroLabelZh: "冠脉 IVL 球囊扩张导管系统",
    heroLabelEn: "Coronary IVL Balloon Dilatation Catheter System",
    heroTitleZh: "Vesscrack",
    heroTitleEn: "Vesscrack",
    heroBodyZh:
      "基于乐普公开资料整理，Vesscrack 被定义为 Coronary IVL Balloon Dilatation Catheter System，适合用于重度钙化病变方案展示。",
    heroBodyEn:
      "Adapted from Lepu Medical public materials, Vesscrack is defined as a Coronary IVL Balloon Dilatation Catheter System for heavily calcified lesion presentation.",
    gallery: [
      "https://en.lepumedical.com/upload/goods/2025-06/685515bbe1cac.png"
    ],
    featureBlocks: [
      {
        titleZh: "重钙化病变场景",
        titleEn: "Heavily calcified lesion use",
        bodyZh:
          "适用于重度钙化病变相关产品展示与病例型资料入口。",
        bodyEn:
          "Suitable for presenting coronary IVL solutions for heavily calcified lesions."
      },
      {
        titleZh: "适合结合病例资料展示",
        titleEn: "Strong fit for case-linked presentation",
        bodyZh:
          "可与病例资料、受控下载和应用说明一起组织成更专业的耗材详情页。",
        bodyEn:
          "Works especially well when paired with case materials, gated downloads, and application notes."
      }
    ],
    specRows: [
      { labelZh: "系统类型", labelEn: "System type", valueZh: "Coronary IVL Balloon Dilatation Catheter System", valueEn: "Coronary IVL Balloon Dilatation Catheter System" },
      { labelZh: "公开规格示例", labelEn: "Public size example", valueZh: "2.5×12", valueEn: "2.5×12" }
    ]
  },
  contiguide: {
    heroLabelZh: "延长导管",
    heroLabelEn: "Guide Extension Catheter",
    heroTitleZh: "ContiGuide",
    heroTitleEn: "ContiGuide",
    heroBodyZh:
      "基于乐普公开资料整理，ContiGuide 被定义为 Guide Extension Catheter，适合用于 PCI 支持输送类产品展示。",
    heroBodyEn:
      "Adapted from Lepu Medical public materials, ContiGuide is defined as a Guide Extension Catheter for PCI support-delivery workflows.",
    gallery: [
      "https://en.lepumedical.com/upload/imagesall/2026-01/6979806422ec6.png"
    ],
    featureBlocks: [
      {
        titleZh: "PCI 支持输送场景",
        titleEn: "PCI support-delivery use",
        bodyZh:
          "适用于 PCI 辅助输送和延长导管类产品展示。",
        bodyEn:
          "Suitable for PCI support-delivery workflows and guide extension catheter presentation."
      },
      {
        titleZh: "真实导管产品图",
        titleEn: "True catheter product imagery",
        bodyZh:
          "适合作为导管类真实产品图样板，用于丰富耗材板块的器械层次。",
        bodyEn:
          "Works well as a true catheter product-image sample for a more professional consumables section."
      }
    ],
    specRows: [
      { labelZh: "外径选项", labelEn: "Outer diameter options", valueZh: "5F / 6F / 7F", valueEn: "5F / 6F / 7F" },
      { labelZh: "工作长度", labelEn: "Working length", valueZh: "150 cm", valueEn: "150 cm" },
      { labelZh: "推杆直径", labelEn: "Push-rod diameter", valueZh: "0.020 inch", valueEn: "0.020 inch" }
    ]
  },
  balancium: {
    heroLabelZh: "PTCA 导丝",
    heroLabelEn: "PTCA Guide Wire",
    heroTitleZh: "Balancium",
    heroTitleEn: "Balancium",
    heroBodyZh:
      "基于乐普公开资料整理，Balancium 被定义为 PTCA Guide Wire，适合用于介入导丝产品展示与参数说明。",
    heroBodyEn:
      "Adapted from Lepu Medical public materials, Balancium is defined as a PTCA Guide Wire for PCI guidewire presentation and specification reference.",
    gallery: [
      "https://en.lepumedical.com/upload/goods/2025-05/6825571f8b495.png"
    ],
    featureBlocks: [
      {
        titleZh: "导丝类样板页",
        titleEn: "Guidewire showcase template",
        bodyZh:
          "适用于 PCI 导丝产品展示，可与导管产品页一起构成更完整的介入耗材板块。",
        bodyEn:
          "Suitable for PCI guidewire presentation and pairs naturally with catheter pages in an interventional consumables section."
      },
      {
        titleZh: "多长度与柔顺度选项",
        titleEn: "Length and flexibility options",
        bodyZh:
          "公开资料包含 185 cm / 300 cm 长度和 0.6 g / 1 g / 2 g tip flexibility 选项。",
        bodyEn:
          "Public materials include 185 cm / 300 cm lengths and 0.6 g / 1 g / 2 g tip flexibility options."
      }
    ],
    specRows: [
      { labelZh: "导丝直径", labelEn: "Guidewire diameter", valueZh: "0.014 inch", valueEn: "0.014 inch" },
      { labelZh: "长度", labelEn: "Length", valueZh: "185 cm / 300 cm", valueEn: "185 cm / 300 cm" },
      { labelZh: "头端柔顺度", labelEn: "Tip flexibility", valueZh: "0.6 g / 1 g / 2 g", valueEn: "0.6 g / 1 g / 2 g" }
    ]
  }
};

const categoryBenchmarkTemplates: Record<
  string,
  {
    benchmarkLabelZh: string;
    benchmarkLabelEn: string;
    brand: string;
    model: string;
    publicSummaryZh: string;
    publicSummaryEn: string;
    comparisonRows: ProductBenchmarkRow[];
  }
> = {
  "ultrasonic-surgery-systems-consumables": {
    benchmarkLabelZh: "ETHICON HARMONIC",
    benchmarkLabelEn: "ETHICON HARMONIC",
    brand: "ETHICON",
    model: "HARMONIC",
    publicSummaryZh:
      "按超声能量平台的公开定位整理，用于在详情页中呈现国产超声刀系统与国际主流超声能量平台的公开对标结构。",
    publicSummaryEn:
      "Structured around public positioning for ultrasonic energy platforms so the detail page can present a clean comparison against mainstream international ultrasonic surgery systems.",
    comparisonRows: [
      {
        labelZh: "公开对标平台",
        labelEn: "Benchmark platform",
        ourValueZh: "当前产品对应国产公开样板",
        ourValueEn: "Current domestic public-facing product sample",
        benchmarkValueZh: "ETHICON HARMONIC",
        benchmarkValueEn: "ETHICON HARMONIC"
      },
      {
        labelZh: "产品定位",
        labelEn: "Product positioning",
        ourValueZh: "超声软组织切割止血系统与配套耗材",
        ourValueEn: "Ultrasonic soft-tissue cutting and hemostasis system with matching consumables",
        benchmarkValueZh: "主流超声能量手术平台",
        benchmarkValueEn: "Mainstream ultrasonic energy surgery platform"
      },
      {
        labelZh: "应用场景",
        labelEn: "Primary application",
        ourValueZh: "开放与腔镜软组织切割止血",
        ourValueEn: "Open and laparoscopic soft-tissue cutting and hemostasis",
        benchmarkValueZh: "开放与腔镜能量手术场景",
        benchmarkValueEn: "Open and laparoscopic energy-based surgery workflows"
      },
      {
        labelZh: "公开展示重点",
        labelEn: "Public messaging focus",
        ourValueZh: "主机、换能器与刀头配套展示",
        ourValueEn: "Integrated presentation of host unit, transducer, and handpiece ecosystem",
        benchmarkValueZh: "平台化能量系统表达",
        benchmarkValueEn: "Platform-led energy system positioning"
      },
      {
        labelZh: "官网呈现方式",
        labelEn: "Official presentation style",
        ourValueZh: "设备图、型号与适配关系公开",
        ourValueEn: "Product imagery, model naming, and compatibility are publicly presented",
        benchmarkValueZh: "系统级官方产品呈现",
        benchmarkValueEn: "System-level official product presentation"
      }
    ]
  },
  "surgical-staplers": {
    benchmarkLabelZh: "ETHICON ECHELON",
    benchmarkLabelEn: "ETHICON ECHELON",
    brand: "ETHICON",
    model: "ECHELON",
    publicSummaryZh:
      "按腔镜切割吻合器的公开表达整理，用于建立国产切割吻合器与国际主流产品线之间的公开样板对比。",
    publicSummaryEn:
      "Organized around public positioning for endoscopic stapling systems so the detail page can compare domestic staplers with a mainstream global product line.",
    comparisonRows: [
      {
        labelZh: "公开对标平台",
        labelEn: "Benchmark platform",
        ourValueZh: "国产腔镜切割吻合器公开样板",
        ourValueEn: "Domestic public-facing endoscopic stapler sample",
        benchmarkValueZh: "ETHICON ECHELON",
        benchmarkValueEn: "ETHICON ECHELON"
      },
      {
        labelZh: "产品定位",
        labelEn: "Product positioning",
        ourValueZh: "一次性电动切割吻合器及钉仓组件",
        ourValueEn: "Disposable powered cutter stapler and reload components",
        benchmarkValueZh: "国际主流电动吻合器平台",
        benchmarkValueEn: "Mainstream international powered stapling platform"
      },
      {
        labelZh: "应用场景",
        labelEn: "Primary application",
        ourValueZh: "腔镜下组织离断、切除与缝合",
        ourValueEn: "Laparoscopic tissue transection, resection, and closure",
        benchmarkValueZh: "多学科腔镜缝合切割流程",
        benchmarkValueEn: "Multi-specialty laparoscopic stapling workflows"
      },
      {
        labelZh: "公开展示重点",
        labelEn: "Public messaging focus",
        ourValueZh: "击发手柄、关节头与钉仓适配",
        ourValueEn: "Handle control, articulation head, and reload compatibility",
        benchmarkValueZh: "平台化吻合器操作体验",
        benchmarkValueEn: "Platform-focused stapler workflow experience"
      },
      {
        labelZh: "官网呈现方式",
        labelEn: "Official presentation style",
        ourValueZh: "真机图配合型号和组件关系",
        ourValueEn: "Real-device imagery paired with model naming and component relationships",
        benchmarkValueZh: "系统化官方产品呈现",
        benchmarkValueEn: "Structured official product presentation"
      }
    ]
  },
  "endoscopy-imaging-systems": {
    benchmarkLabelZh: "Stryker 1688 AIM 4K Platform",
    benchmarkLabelEn: "Stryker 1688 AIM 4K Platform",
    brand: "Stryker",
    model: "1688 AIM 4K Platform",
    publicSummaryZh:
      "按 4K/荧光内窥镜成像系统的公开表达整理，用于搭建国产成像平台与国际主流 4K 荧光平台之间的公开比较结构。",
    publicSummaryEn:
      "Structured around public positioning for 4K and fluorescence endoscopy platforms so domestic systems can be compared with a mainstream international imaging benchmark.",
    comparisonRows: [
      {
        labelZh: "公开对标平台",
        labelEn: "Benchmark platform",
        ourValueZh: "国产 4K / 荧光内窥镜成像样板",
        ourValueEn: "Domestic 4K / fluorescence endoscopy sample",
        benchmarkValueZh: "Stryker 1688 AIM 4K Platform",
        benchmarkValueEn: "Stryker 1688 AIM 4K Platform"
      },
      {
        labelZh: "产品定位",
        labelEn: "Product positioning",
        ourValueZh: "4K、3D 或荧光内窥镜成像系统",
        ourValueEn: "4K, 3D, or fluorescence endoscopic imaging system",
        benchmarkValueZh: "国际主流 4K 荧光成像平台",
        benchmarkValueEn: "Mainstream international 4K fluorescence imaging platform"
      },
      {
        labelZh: "应用场景",
        labelEn: "Primary application",
        ourValueZh: "腔镜手术成像与荧光辅助观察",
        ourValueEn: "Laparoscopic imaging and fluorescence-assisted visualization",
        benchmarkValueZh: "多专科腔镜成像工作流",
        benchmarkValueEn: "Multi-specialty endoscopic imaging workflows"
      },
      {
        labelZh: "公开展示重点",
        labelEn: "Public messaging focus",
        ourValueZh: "主机、摄像头、光源与显示链路",
        ourValueEn: "Processor, camera head, light source, and display chain",
        benchmarkValueZh: "4K + 荧光平台化表达",
        benchmarkValueEn: "Platform-based 4K plus fluorescence positioning"
      },
      {
        labelZh: "官网呈现方式",
        labelEn: "Official presentation style",
        ourValueZh: "整机图配合系统级命名",
        ourValueEn: "Complete-system visuals paired with system-level naming",
        benchmarkValueZh: "平台化官方系统展示",
        benchmarkValueEn: "Platform-led official system presentation"
      }
    ]
  },
  "surgical-microscopes": {
    benchmarkLabelZh: "ZEISS KINEVO 900",
    benchmarkLabelEn: "ZEISS KINEVO 900",
    brand: "ZEISS",
    model: "KINEVO 900",
    publicSummaryZh:
      "按手术显微镜公开定位整理，用于在显微外科设备详情页中形成稳定、专业的国际对比样板。",
    publicSummaryEn:
      "Organized around public positioning for surgical microscopes to create a stable and professional comparison frame against a mainstream global platform.",
    comparisonRows: [
      {
        labelZh: "公开对标平台",
        labelEn: "Benchmark platform",
        ourValueZh: "国产手术显微镜公开样板",
        ourValueEn: "Domestic public-facing surgical microscope sample",
        benchmarkValueZh: "ZEISS KINEVO 900",
        benchmarkValueEn: "ZEISS KINEVO 900"
      },
      {
        labelZh: "产品定位",
        labelEn: "Product positioning",
        ourValueZh: "显微外科手术观察与成像放大",
        ourValueEn: "Microsurgical visualization and magnified operative imaging",
        benchmarkValueZh: "高端显微外科手术显微镜平台",
        benchmarkValueEn: "Premium microsurgical operating microscope platform"
      },
      {
        labelZh: "应用场景",
        labelEn: "Primary application",
        ourValueZh: "显微外科、神经外科与五官科",
        ourValueEn: "Microsurgery, neurosurgery, and ENT workflows",
        benchmarkValueZh: "高精度显微外科流程",
        benchmarkValueEn: "High-precision microsurgical workflows"
      },
      {
        labelZh: "公开展示重点",
        labelEn: "Public messaging focus",
        ourValueZh: "光学成像、放大倍率与人机操作",
        ourValueEn: "Optics, magnification, and user-control workflow",
        benchmarkValueZh: "数字增强与显微工作流协同",
        benchmarkValueEn: "Digitally enhanced microscope workflow integration"
      },
      {
        labelZh: "官网呈现方式",
        labelEn: "Official presentation style",
        ourValueZh: "真机大图与参数说明并列呈现",
        ourValueEn: "Large real-device imagery presented alongside specification highlights",
        benchmarkValueZh: "旗舰级系统化官网展示",
        benchmarkValueEn: "Flagship system-style official presentation"
      }
    ]
  },
  "ophthalmic-phaco-systems": {
    benchmarkLabelZh: "Alcon Centurion Vision System",
    benchmarkLabelEn: "Alcon Centurion Vision System",
    brand: "Alcon",
    model: "Centurion Vision System",
    publicSummaryZh:
      "按眼科超乳系统的公开定位整理，用于在白内障手术设备详情页中建立清晰、专业的国际参考框架。",
    publicSummaryEn:
      "Structured around public positioning for ophthalmic phaco systems to provide a clear international reference frame for cataract-surgery equipment detail pages.",
    comparisonRows: [
      {
        labelZh: "公开对标平台",
        labelEn: "Benchmark platform",
        ourValueZh: "国产眼科超乳系统公开样板",
        ourValueEn: "Domestic public-facing ophthalmic phaco sample",
        benchmarkValueZh: "Alcon Centurion Vision System",
        benchmarkValueEn: "Alcon Centurion Vision System"
      },
      {
        labelZh: "产品定位",
        labelEn: "Product positioning",
        ourValueZh: "白内障超声乳化手术系统",
        ourValueEn: "Ophthalmic phacoemulsification surgical system",
        benchmarkValueZh: "国际主流白内障手术平台",
        benchmarkValueEn: "Mainstream international cataract surgery platform"
      },
      {
        labelZh: "应用场景",
        labelEn: "Primary application",
        ourValueZh: "白内障与前节手术场景",
        ourValueEn: "Cataract and anterior-segment surgery workflows",
        benchmarkValueZh: "成熟白内障手术工作流",
        benchmarkValueEn: "Established cataract surgery workflows"
      },
      {
        labelZh: "公开展示重点",
        labelEn: "Public messaging focus",
        ourValueZh: "主机、脚踏与手柄配套展示",
        ourValueEn: "Console, footswitch, and handpiece presentation",
        benchmarkValueZh: "流体控制与超乳平台表达",
        benchmarkValueEn: "Fluidics and phaco platform positioning"
      },
      {
        labelZh: "官网呈现方式",
        labelEn: "Official presentation style",
        ourValueZh: "整机图配合临床适用描述",
        ourValueEn: "System imagery paired with clinical-use messaging",
        benchmarkValueZh: "旗舰眼科系统官网展示",
        benchmarkValueEn: "Flagship ophthalmic system presentation"
      }
    ]
  },
  "ultrasound-diagnostic-systems": {
    benchmarkLabelZh: "Philips EPIQ Elite",
    benchmarkLabelEn: "Philips EPIQ Elite",
    brand: "Philips",
    model: "EPIQ Elite",
    publicSummaryZh:
      "按通用彩超平台的公开定位整理，用于在超声诊断产品详情页中形成一致的国际参考结构。",
    publicSummaryEn:
      "Organized around public positioning for premium general-imaging ultrasound platforms to create a consistent international reference structure.",
    comparisonRows: [
      {
        labelZh: "公开对标平台",
        labelEn: "Benchmark platform",
        ourValueZh: "国产彩色多普勒超声公开样板",
        ourValueEn: "Domestic public-facing color Doppler ultrasound sample",
        benchmarkValueZh: "Philips EPIQ Elite",
        benchmarkValueEn: "Philips EPIQ Elite"
      },
      {
        labelZh: "产品定位",
        labelEn: "Product positioning",
        ourValueZh: "通用与高端全身彩超平台",
        ourValueEn: "General imaging and premium whole-body ultrasound platform",
        benchmarkValueZh: "国际主流高端超声平台",
        benchmarkValueEn: "Mainstream international premium ultrasound platform"
      },
      {
        labelZh: "应用场景",
        labelEn: "Primary application",
        ourValueZh: "腹部、浅表、妇产及综合超声检查",
        ourValueEn: "Abdominal, small-parts, OB/GYN, and general ultrasound exams",
        benchmarkValueZh: "综合临床超声诊断流程",
        benchmarkValueEn: "Comprehensive clinical ultrasound workflows"
      },
      {
        labelZh: "公开展示重点",
        labelEn: "Public messaging focus",
        ourValueZh: "主机、探头生态与影像算法",
        ourValueEn: "Console, probe ecosystem, and imaging algorithms",
        benchmarkValueZh: "平台级成像与工作流表达",
        benchmarkValueEn: "Platform-level imaging and workflow positioning"
      },
      {
        labelZh: "官网呈现方式",
        labelEn: "Official presentation style",
        ourValueZh: "真机图与临床方向组合展示",
        ourValueEn: "Real-device imagery combined with clinical-use directions",
        benchmarkValueZh: "高端系统级官网展示",
        benchmarkValueEn: "Premium system-level official presentation"
      }
    ]
  },
  "surgical-robotics": {
    benchmarkLabelZh: "da Vinci Xi",
    benchmarkLabelEn: "da Vinci Xi",
    brand: "Intuitive",
    model: "da Vinci Xi",
    publicSummaryZh:
      "按手术机器人公开定位整理，用于在国产机器人平台详情页中建立统一的国际主流参考结构。",
    publicSummaryEn:
      "Structured around public positioning for surgical robotics so domestic robotic platforms can be presented against a mainstream international benchmark.",
    comparisonRows: [
      {
        labelZh: "公开对标平台",
        labelEn: "Benchmark platform",
        ourValueZh: "国产手术机器人公开样板",
        ourValueEn: "Domestic public-facing surgical robotics sample",
        benchmarkValueZh: "da Vinci Xi",
        benchmarkValueEn: "da Vinci Xi"
      },
      {
        labelZh: "产品定位",
        labelEn: "Product positioning",
        ourValueZh: "腔镜、骨科或介入机器人平台",
        ourValueEn: "Robotic platform for laparoscopy, orthopedics, or intervention",
        benchmarkValueZh: "国际主流机器人手术平台",
        benchmarkValueEn: "Mainstream international robotic surgery platform"
      },
      {
        labelZh: "应用场景",
        labelEn: "Primary application",
        ourValueZh: "复杂微创手术与导航辅助流程",
        ourValueEn: "Complex minimally invasive surgery and navigation-assisted workflows",
        benchmarkValueZh: "复杂微创机器人手术流程",
        benchmarkValueEn: "Complex minimally invasive robotic surgery workflows"
      },
      {
        labelZh: "公开展示重点",
        labelEn: "Public messaging focus",
        ourValueZh: "机器人本体、控制台与导航协同",
        ourValueEn: "Robot body, console, and navigation integration",
        benchmarkValueZh: "平台级机器人工作流表达",
        benchmarkValueEn: "Platform-focused robotic workflow positioning"
      },
      {
        labelZh: "官网呈现方式",
        labelEn: "Official presentation style",
        ourValueZh: "整机图、系统命名与临床场景组合展示",
        ourValueEn: "System imagery, model naming, and clinical-scene messaging presented together",
        benchmarkValueZh: "旗舰机器人官网展示",
        benchmarkValueEn: "Flagship robotic system presentation"
      }
    ]
  },
  "neurosurgical-navigation-systems": {
    benchmarkLabelZh: "Medtronic StealthStation S8",
    benchmarkLabelEn: "Medtronic StealthStation S8",
    brand: "Medtronic",
    model: "StealthStation S8",
    publicSummaryZh:
      "按神经外科导航平台的公开定位整理，用于在国产导航设备详情页中建立稳定、专业的国际参考结构。",
    publicSummaryEn:
      "Organized around public positioning for neurosurgical navigation platforms to create a stable and professional international reference structure.",
    comparisonRows: [
      {
        labelZh: "公开对标平台",
        labelEn: "Benchmark platform",
        ourValueZh: "国产神经外科导航公开样板",
        ourValueEn: "Domestic public-facing neurosurgical navigation sample",
        benchmarkValueZh: "Medtronic StealthStation S8",
        benchmarkValueEn: "Medtronic StealthStation S8"
      },
      {
        labelZh: "产品定位",
        labelEn: "Product positioning",
        ourValueZh: "神经外科导航与多模态影像引导平台",
        ourValueEn: "Neurosurgical navigation and multimodal image-guidance platform",
        benchmarkValueZh: "国际主流神经导航平台",
        benchmarkValueEn: "Mainstream international neurosurgical navigation platform"
      },
      {
        labelZh: "应用场景",
        labelEn: "Primary application",
        ourValueZh: "神经外科定位、规划与术中引导",
        ourValueEn: "Neurosurgical localization, planning, and intraoperative guidance",
        benchmarkValueZh: "复杂神经外科导航流程",
        benchmarkValueEn: "Complex neurosurgical navigation workflows"
      },
      {
        labelZh: "公开展示重点",
        labelEn: "Public messaging focus",
        ourValueZh: "导航主机、显示与多模态影像融合",
        ourValueEn: "Navigation console, displays, and multimodal image fusion",
        benchmarkValueZh: "平台级导航工作流表达",
        benchmarkValueEn: "Platform-level navigation workflow positioning"
      },
      {
        labelZh: "官网呈现方式",
        labelEn: "Official presentation style",
        ourValueZh: "设备图、工作站与导航应用展示",
        ourValueEn: "Device visuals combined with workstation and navigation-use presentation",
        benchmarkValueZh: "系统级神经导航官网展示",
        benchmarkValueEn: "System-level neurosurgical navigation presentation"
      }
    ]
  }
};

const showcaseBenchmarkBySlug: Record<string, ProductBenchmarkShowcase> = {
  "umr-790": {
    eyebrowZh: "国际同级对比",
    eyebrowEn: "Benchmark Perspective",
    titleZh: "uMR 790 与 MAGNETOM Vida 公开规格对比",
    titleEn: "uMR 790 and MAGNETOM Vida public specification comparison",
    ourLabelZh: "uMR 790",
    ourLabelEn: "uMR 790",
    benchmarkLabelZh: "MAGNETOM Vida",
    benchmarkLabelEn: "MAGNETOM Vida",
    publicSummaryZh:
      "本节仅整理双方官网可直接核对的公开参数与功能表述，用于呈现高端 3.0T MRI 平台在公开规格层面的客观比较。",
    publicSummaryEn:
      "This section consolidates only directly verifiable public specifications and feature statements from the official materials of both premium 3.0T MRI platforms.",
    comparisonRows: [
      { labelZh: "对标平台", labelEn: "Benchmark platform", ourValueZh: "uMR 790", ourValueEn: "uMR 790", benchmarkValueZh: "MAGNETOM Vida", benchmarkValueEn: "MAGNETOM Vida" },
      { labelZh: "磁场强度", labelEn: "Field strength", ourValueZh: "3.0T", ourValueEn: "3.0T", benchmarkValueZh: "3.0T", benchmarkValueEn: "3.0T" },
      { labelZh: "最大梯度场强", labelEn: "Maximum gradient strength", ourValueZh: "100 mT/m", ourValueEn: "100 mT/m", benchmarkValueZh: "60 mT/m", benchmarkValueEn: "60 mT/m" },
      { labelZh: "最大梯度切换率", labelEn: "Maximum slew rate", ourValueZh: "200 T/m/s", ourValueEn: "200 T/m/s", benchmarkValueZh: "200 T/m/s", benchmarkValueEn: "200 T/m/s" },
      { labelZh: "平台定位", labelEn: "Platform positioning", ourValueZh: "科研型与高阶临床 3.0T MRI", ourValueEn: "Research-oriented and advanced clinical 3.0T MRI", benchmarkValueZh: "高端 3.0T 临床 MRI 平台", benchmarkValueEn: "Premium clinical 3.0T MRI platform" },
      { labelZh: "公开卖点", labelEn: "Public feature emphasis", ourValueZh: "ultra-high homogeneity 与 exceptional gradient performance", ourValueEn: "Ultra-high homogeneity and exceptional gradient performance", benchmarkValueZh: "高端临床成像平台能力", benchmarkValueEn: "High-end clinical imaging platform capability" }
    ],
    internalReference: {
      brand: "Siemens Healthineers",
      model: "MAGNETOM Vida",
      reasonZh: "按 3.0T 高端 MRI 平台的公开对标方向整理，用于在详情页中形成统一、可读的国际比较结构。",
      reasonEn: "Structured around the public benchmark direction for premium 3.0T MRI platforms so the detail page can present a consistent international comparison.",
      sourceLinks: [
        "https://www.siemens-healthineers.com/magnetic-resonance-imaging/3t-mri-scanner/magnetom-vida",
        "https://global.united-imaging.com/en/product/mr/uMR-790"
      ]
    }
  },
  "umr-780": {
    eyebrowZh: "国际同级对比",
    eyebrowEn: "Benchmark Perspective",
    titleZh: "uMR 780 与 MAGNETOM Vida 公开规格对比",
    titleEn: "uMR 780 and MAGNETOM Vida public specification comparison",
    ourLabelZh: "uMR 780",
    ourLabelEn: "uMR 780",
    benchmarkLabelZh: "MAGNETOM Vida",
    benchmarkLabelEn: "MAGNETOM Vida",
    publicSummaryZh:
      "本节整理官网可直接核对的 3.0T MRI 公开信息，用于作为产品页中的国际参考样板。",
    publicSummaryEn:
      "This section gathers directly verifiable 3.0T MRI information from official sources as an international reference layer for the product page.",
    comparisonRows: [
      { labelZh: "对标平台", labelEn: "Benchmark platform", ourValueZh: "uMR 780", ourValueEn: "uMR 780", benchmarkValueZh: "MAGNETOM Vida", benchmarkValueEn: "MAGNETOM Vida" },
      { labelZh: "磁场强度", labelEn: "Field strength", ourValueZh: "3.0T", ourValueEn: "3.0T", benchmarkValueZh: "3.0T", benchmarkValueEn: "3.0T" },
      { labelZh: "平台定位", labelEn: "Platform positioning", ourValueZh: "ACS 3.0T 磁共振系统", ourValueEn: "ACS 3.0T MR system", benchmarkValueZh: "高端 3.0T 临床 MRI 平台", benchmarkValueEn: "Premium clinical 3.0T MRI platform" },
      { labelZh: "公开卖点", labelEn: "Public feature emphasis", ourValueZh: "ACS 成像平台与高质量图像表现", ourValueEn: "ACS imaging platform and high-quality image performance", benchmarkValueZh: "高端临床成像平台能力", benchmarkValueEn: "High-end clinical imaging platform capability" },
      { labelZh: "官网呈现方式", labelEn: "Official presentation style", ourValueZh: "真机图与系统级命名公开", ourValueEn: "System imagery and platform naming are publicly presented", benchmarkValueZh: "系统级旗舰官网展示", benchmarkValueEn: "Flagship system-level presentation" }
    ],
    internalReference: {
      brand: "Siemens Healthineers",
      model: "MAGNETOM Vida",
      reasonZh: "按 3.0T MRI 平台的公开对标方向整理，便于统一产品详情页的国际比较框架。",
      reasonEn: "Structured around public 3.0T MRI benchmark direction for a consistent international comparison frame.",
      sourceLinks: [
        "https://www.siemens-healthineers.com/magnetic-resonance-imaging/3t-mri-scanner/magnetom-vida",
        "https://global.united-imaging.com/en"
      ]
    }
  },
  "umr-680": {
    eyebrowZh: "国际同级对比",
    eyebrowEn: "Benchmark Perspective",
    titleZh: "uMR 680 与 Philips MR 5300 公开规格对比",
    titleEn: "uMR 680 and Philips MR 5300 public specification comparison",
    ourLabelZh: "uMR 680",
    ourLabelEn: "uMR 680",
    benchmarkLabelZh: "Philips MR 5300",
    benchmarkLabelEn: "Philips MR 5300",
    publicSummaryZh:
      "本节仅整理双方官网可直接核对的公开参数与产品表达，用于作为 1.5T 临床 MRI 平台的客观参考。",
    publicSummaryEn:
      "This section includes only directly verifiable public specifications and platform messaging from both official sources, serving as an objective reference for 1.5T clinical MRI platforms.",
    comparisonRows: [
      { labelZh: "对标平台", labelEn: "Benchmark platform", ourValueZh: "uMR 680", ourValueEn: "uMR 680", benchmarkValueZh: "Philips MR 5300", benchmarkValueEn: "Philips MR 5300" },
      { labelZh: "磁场强度", labelEn: "Field strength", ourValueZh: "1.5T", ourValueEn: "1.5T", benchmarkValueZh: "1.5T", benchmarkValueEn: "1.5T" },
      { labelZh: "最大梯度场强", labelEn: "Maximum gradient strength", ourValueZh: "45 mT/m", ourValueEn: "45 mT/m", benchmarkValueZh: "33 mT/m", benchmarkValueEn: "33 mT/m" },
      { labelZh: "最大梯度切换率", labelEn: "Maximum slew rate", ourValueZh: "200 T/m/s", ourValueEn: "200 T/m/s", benchmarkValueZh: "120 T/m/s", benchmarkValueEn: "120 T/m/s" },
      { labelZh: "磁体均匀度", labelEn: "Magnet homogeneity", ourValueZh: "0.033 ppm @ 30 cm DSV（Typical）", ourValueEn: "0.033 ppm @ 30 cm DSV (Typical)", benchmarkValueZh: "高均匀度临床平台", benchmarkValueEn: "High-homogeneity clinical platform" },
      { labelZh: "接收通道", labelEn: "Receiver channels", ourValueZh: "最高 96 独立接收通道", ourValueEn: "Up to 96 independent receiver channels", benchmarkValueZh: "dStream 临床平台架构", benchmarkValueEn: "dStream clinical platform architecture" },
      { labelZh: "平台定位", labelEn: "Platform positioning", ourValueZh: "uAIFI Empowered 1.5T MR", ourValueEn: "uAIFI Empowered 1.5T MR", benchmarkValueZh: "BlueSeal 1.5T 临床平台", benchmarkValueEn: "BlueSeal 1.5T clinical MRI platform" },
      { labelZh: "患者体验", labelEn: "Patient workflow orientation", ourValueZh: "宽孔径体验与日常临床覆盖", ourValueEn: "Wide-bore experience and routine clinical coverage", benchmarkValueZh: "面向临床效率与可持续运行", benchmarkValueEn: "Designed for clinical efficiency and sustainable operation" }
    ],
    internalReference: {
      brand: "Philips",
      model: "MR 5300",
      reasonZh: "按 1.5T 主流临床 MRI 平台的公开对标方向整理，用于在详情页中形成统一、可读的国际比较结构。",
      reasonEn: "Structured around the public benchmark direction for mainstream 1.5T clinical MRI platforms so the detail page can present a consistent and readable international comparison.",
      sourceLinks: [
        "https://global.united-imaging.com/en",
        "https://www.usa.philips.com/healthcare/product/HC781342/mr-5300-1-5t-mr-system",
        "https://www.philips.com/a-w/about/news/archive/standard/news/press/2021/20211201-philips-expands-mr-portfolio-with-new-mr-5300-system.html"
      ]
    }
  },
  "neumr-rena": {
    eyebrowZh: "国际同级对比",
    eyebrowEn: "Benchmark Perspective",
    titleZh: "NeuMR Rena 与 Philips MR 5300 公开规格对比",
    titleEn: "NeuMR Rena and Philips MR 5300 public specification comparison",
    ourLabelZh: "NeuMR Rena",
    ourLabelEn: "NeuMR Rena",
    benchmarkLabelZh: "Philips MR 5300",
    benchmarkLabelEn: "Philips MR 5300",
    publicSummaryZh:
      "本节按双方公开资料中的可核对参数与平台表达整理，用于形成 1.5T MRI 平台的清晰国际参考样板。",
    publicSummaryEn:
      "This section is structured from directly verifiable public specifications and platform messaging from both sources to create a clear international 1.5T MRI reference frame.",
    comparisonRows: [
      { labelZh: "对标平台", labelEn: "Benchmark platform", ourValueZh: "NeuMR Rena", ourValueEn: "NeuMR Rena", benchmarkValueZh: "Philips MR 5300", benchmarkValueEn: "Philips MR 5300" },
      { labelZh: "磁场强度", labelEn: "Field strength", ourValueZh: "1.5T", ourValueEn: "1.5T", benchmarkValueZh: "1.5T", benchmarkValueEn: "1.5T" },
      { labelZh: "最大梯度场强", labelEn: "Maximum gradient strength", ourValueZh: "46 mT/m", ourValueEn: "46 mT/m", benchmarkValueZh: "33 mT/m", benchmarkValueEn: "33 mT/m" },
      { labelZh: "最大梯度切换率", labelEn: "Maximum slew rate", ourValueZh: "160 T/m/s", ourValueEn: "160 T/m/s", benchmarkValueZh: "120 T/m/s", benchmarkValueEn: "120 T/m/s" },
      { labelZh: "平台架构", labelEn: "Platform architecture", ourValueZh: "Full digital 架构", ourValueEn: "Full digital architecture", benchmarkValueZh: "dStream 临床平台架构", benchmarkValueEn: "dStream clinical platform architecture" },
      { labelZh: "公开卖点", labelEn: "Public feature emphasis", ourValueZh: "Boundless platform 与 Deep R", ourValueEn: "Boundless platform and Deep R", benchmarkValueZh: "BlueSeal 与临床效率平台", benchmarkValueEn: "BlueSeal and a clinically efficient platform" }
    ],
    internalReference: {
      brand: "Philips",
      model: "MR 5300",
      reasonZh: "按 1.5T MRI 平台的公开对标方向整理，用于统一详情页中的国际比较层次。",
      reasonEn: "Structured around the public benchmark direction for 1.5T MRI platforms so the detail page can maintain a consistent international comparison layer.",
      sourceLinks: [
        "https://www.neusoftmedical.com/",
        "https://www.usa.philips.com/healthcare/product/HC781342/mr-5300-1-5t-mr-system"
      ]
    }
  }
};

const showcaseFallbackProducts: Record<string, ProductRecord> = {
  "umr-680": {
    id: "showcase-umr-680",
    categoryId: "showcase-mr",
    slug: "umr-680",
    manufacturerZh: "联影",
    manufacturerEn: "United Imaging",
    model: "uMR 680",
    nameZh: "uMR 680",
    nameEn: "uMR 680",
    summaryZh: "联影 1.5T 磁共振系统公开样板页。",
    summaryEn: "Public-facing showcase page for the United Imaging 1.5T MR system.",
    applicationZh: "面向常规临床 MRI 检查流程。",
    applicationEn: "Designed for routine clinical MRI workflows.",
    specificationsZh: "公开资料强调梯度性能、高密度射频通道与图像质量表现。",
    specificationsEn: "Public materials emphasize gradient performance, high-density RF channels, and image quality.",
    packagingZh: "基于公开官方资料整理。",
    packagingEn: "Compiled from public official materials.",
    imageUrl: "https://global.united-imaging.com/-/media/uih/product/mr/mr-products-with-title/680.png?h=530&w=700&hash=26151AD06D221CFA2F7727C99FECF43D",
    featured: 0,
    seoTitleZh: "uMR 680",
    seoTitleEn: "uMR 680",
    seoDescriptionZh: "联影 1.5T 磁共振系统公开样板页。",
    seoDescriptionEn: "Public-facing showcase page for the United Imaging 1.5T MR system.",
    categorySlug: "mr-systems",
    categoryNameZh: "磁共振系统",
    categoryNameEn: "MR Systems"
  }
};

function getSourceLinks(product: ProductRecord) {
  const sourceValue = String((product as Record<string, unknown>).sourceUrl || "").trim();
  return sourceValue
    .split(/[\n\r]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function buildGenericBenchmark(product: ProductRecord): ProductBenchmarkShowcase | null {
  const categorySlug = String(product.categorySlug || "");
  const template = categoryBenchmarkTemplates[categorySlug];

  if (!template) {
    return null;
  }

  const ourLabelEn = String(product.nameEn || product.model || "");
  const ourLabelZh = String(product.nameZh || product.model || "");
  const sourceLinks = getSourceLinks(product);

  return {
    eyebrowZh: "国际参考对比",
    eyebrowEn: "Benchmark Perspective",
    titleZh: `${ourLabelZh} 公开资料对比`,
    titleEn: `${ourLabelEn} public benchmark snapshot`,
    ourLabelZh,
    ourLabelEn,
    benchmarkLabelZh: template.benchmarkLabelZh,
    benchmarkLabelEn: template.benchmarkLabelEn,
    publicSummaryZh: template.publicSummaryZh,
    publicSummaryEn: template.publicSummaryEn,
    comparisonRows: template.comparisonRows,
    internalReference: {
      brand: template.brand,
      model: template.model,
      reasonZh: "按所属产品品类的国际主流公开对标方向整理，用于在详情页中形成统一、可读的比较结构。",
      reasonEn: "Structured around the mainstream public benchmark direction for this product category so the detail page can present a consistent and readable comparison.",
      sourceLinks
    }
  };
}

export function getProductShowcase(slug: string) {
  const showcase = showcaseBySlug[slug];

  if (!showcase) {
    return null;
  }

  const benchmark = showcaseBenchmarkBySlug[slug];
  return benchmark ? { ...showcase, benchmark } : showcase;
}

export function getFallbackGallery(product: ProductRecord) {
  const imageUrl = String(product.imageUrl || "").trim();
  return imageUrl ? [imageUrl] : [];
}

export function getCatalogBenchmark(slug: string): ProductBenchmarkShowcase | null {
  const showcaseBenchmark = showcaseBenchmarkBySlug[slug];

  if (showcaseBenchmark) {
    return showcaseBenchmark;
  }

  const product = realProducts.find((entry) => entry.slug === slug);
  return product ? buildGenericBenchmark(product as unknown as ProductRecord) : null;
}

export function getShowcaseFallbackProduct(slug: string) {
  return showcaseFallbackProducts[slug] ?? null;
}
