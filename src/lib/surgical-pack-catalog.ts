import type Database from "better-sqlite3";
import {
  findProductBySlug,
  listCategories,
  saveCategory,
  saveProduct
} from "@/lib/repository";

export type SurgicalPackDefinition = {
  slug: string;
  imageUrl: string;
  nameZh: string;
  nameEn: string;
  clinicalTagZh: string;
  clinicalTagEn: string;
  contentsZh: string[];
  contentsEn: string[];
};

export type OperatingRoomConsumableDefinition = {
  slug: string;
  imageUrl: string;
  nameZh: string;
  nameEn: string;
  applicationZh: string;
  applicationEn: string;
  specificationsZh: string[];
  specificationsEn: string[];
};

const pack = (
  slug: string,
  nameZh: string,
  nameEn: string,
  clinicalTagZh: string,
  clinicalTagEn: string,
  contentsZh: string[],
  contentsEn: string[]
): SurgicalPackDefinition => ({
  slug,
  imageUrl: `/uploads/images/surgical-packs/${slug}.webp`,
  nameZh,
  nameEn,
  clinicalTagZh,
  clinicalTagEn,
  contentsZh,
  contentsEn
});

export const SURGICAL_PACKS: SurgicalPackDefinition[] = [
  pack("disposable-angiography-pack", "一次性使用介入手术包（血管造影专用）", "Disposable Angiography Pack", "血管介入及血管造影", "angiography and vascular intervention", [
    "手术洞巾 210 × 350 cm", "手术单 100 × 150 cm", "边单 50 × 75 cm",
    "一次性使用无菌保护罩，直径 100 cm", "一次性使用加强型手术衣，L 号", "塑料方盘",
    "量碗 500 mL", "量碗 500 mL", "塑料弯盘 250 mL", "包布 150 × 190 cm"
  ], [
    "Fenestrated drape 210 × 350 cm", "Drape 100 × 150 cm", "Side drape 50 × 75 cm",
    "Disposable sterile equipment cover, 100 cm diameter", "Disposable surgical gown, reinforced, size L",
    "Square plastic tray", "Graduated bowl, 500 mL", "Graduated bowl, 500 mL",
    "Plastic kidney basin, 250 mL", "Back table cover, 150 × 190 cm"
  ]),
  pack("disposable-general-ophthalmic-pack", "一次性使用眼科手术包（通用眼科）", "Disposable General Ophthalmic Pack", "通用眼科手术", "general ophthalmic procedures", [
    "手术洞巾 100 × 120 cm", "手术单 50 × 75 cm", "手术单 85 × 100 cm", "手术单 50 × 80 cm",
    "量杯", "医用无菌棉签，8 cm", "医用外科纱布敷料 5 × 7 cm，8 层", "包布 70 × 90 cm"
  ], [
    "Fenestrated drape 100 × 120 cm", "Drape 50 × 75 cm", "Drape 85 × 100 cm", "Drape 50 × 80 cm",
    "Graduated cup", "Sterile cotton-tipped applicators, 8 cm", "Surgical gauze swab, 5 × 7 cm, 8-ply",
    "Sterilization wrap 70 × 90 cm"
  ]),
  pack("disposable-basic-procedure-pack", "一次性使用基础手术包", "Disposable Basic Procedure Pack", "基础手术", "basic surgical procedures", [
    "一次性使用加强型手术衣，M 号", "手术单 40 × 60 cm", "手术单 100 × 200 cm",
    "手术洞巾 150 × 250 cm", "医用外科口罩", "包布 100 × 100 cm"
  ], [
    "Disposable surgical gown, reinforced, size M", "Drape 40 × 60 cm", "Drape 100 × 200 cm",
    "Fenestrated drape 150 × 250 cm", "Surgical mask", "Sterilization wrap 100 × 100 cm"
  ]),
  pack("disposable-cataract-surgery-pack", "一次性使用眼科手术包（白内障专用）", "Disposable Cataract Surgery Pack", "白内障手术", "cataract surgery", [
    "眼科手术洞巾 80 × 160 cm", "医用无菌棉签，8 cm", "包布 80 × 100 cm",
    "包布 50 × 80 cm", "包布 60 × 60 cm"
  ], [
    "Ophthalmic fenestrated drape, 80 × 160 cm", "Sterile cotton-tipped applicators, 8 cm",
    "Sterilization wrap 80 × 100 cm", "Sterilization wrap 50 × 80 cm", "Sterilization wrap 60 × 60 cm"
  ]),
  pack("disposable-dental-care-pack", "一次性使用口腔包（护理型）", "Disposable Dental Care Pack", "口腔护理", "dental care", [
    "手术洞巾 100 × 150 cm", "手术单 60 × 80 cm", "一次性使用无菌保护套 8 × 120 cm",
    "一次性使用口腔输水管", "一次性使用无菌保护罩 20 × 20 cm", "一次性使用手术衣，L 号",
    "包布 100 × 150 cm"
  ], [
    "Fenestrated drape 100 × 150 cm", "Drape 60 × 80 cm", "Disposable sterile equipment sleeve, 8 × 120 cm",
    "Disposable dental irrigation tube", "Disposable sterile equipment cover, 20 × 20 cm",
    "Disposable surgical gown, size L", "Sterilization wrap 100 × 150 cm"
  ]),
  pack("disposable-vaginal-delivery-pack", "一次性使用手术包（顺产专用）", "Disposable Vaginal Delivery Pack", "阴道分娩", "vaginal delivery", [
    "一次性使用医用橡胶检查手套", "一次性使用手术衣，M 号", "医用棉球", "塑料弯盘 500 mL",
    "手术单 80 × 150 cm", "医用脱脂纱布垫 15 × 30 cm，2 层", "腿套 35 × 85 cm",
    "手术单 60 × 60 cm", "护理垫单 60 × 90 cm", "手术洞巾 110 × 130 cm",
    "医用脱脂纱布块 7.5 × 7.5 cm，8 层", "包布 110 × 110 cm"
  ], [
    "Disposable medical examination gloves", "Disposable surgical gown, size M", "Cotton balls",
    "Plastic kidney basin, 500 mL", "Drape 80 × 150 cm", "Absorbent gauze pad 15 × 30 cm, 2-ply",
    "Leggings, 35 × 85 cm", "Drape 60 × 60 cm", "Absorbent underpad 60 × 90 cm",
    "Fenestrated drape 110 × 130 cm", "Absorbent gauze swab 7.5 × 7.5 cm, 8-ply",
    "Sterilization wrap 110 × 110 cm"
  ]),
  pack("disposable-dental-implant-pack", "一次性使用口腔包（口腔种植专用）", "Disposable Dental Implant Pack", "口腔种植", "dental implant procedures", [
    "一次性使用手术衣，L 号", "一次性使用无菌保护套 8 × 120 cm", "一次性使用无菌保护罩 78 × 100 cm",
    "手术洞巾 120 × 180 cm", "手术单 60 × 80 cm", "医用脱脂纱布块 5 × 7 cm，8 层",
    "包布 120 × 120 cm", "一次性使用帽子", "锡箔纸 15 × 22 cm", "塑料弯盘 250 mL"
  ], [
    "Disposable surgical gown, size L", "Disposable sterile equipment sleeve, 8 × 120 cm",
    "Disposable sterile equipment cover, 78 × 100 cm", "Fenestrated drape 120 × 180 cm",
    "Drape 60 × 80 cm", "Absorbent gauze swab 5 × 7 cm, 8-ply", "Sterilization wrap 120 × 120 cm",
    "Disposable cap", "Aluminium foil 15 × 22 cm", "Plastic kidney basin, 250 mL"
  ]),
  pack("disposable-dressing-change-kit", "一次性使用换药包（换药型）", "Disposable Dressing Change Kit", "换药护理", "dressing changes", [
    "手术刀片", "碘伏棉球（5 粒装）", "蓝色工程塑料镊子，125 mm", "无粉光面手术手套，7.5 号",
    "漂白纱布块 8 × 8 cm，8 层；100% 纯棉", "包布 50 × 60 cm；蓝色 SMS，45 g/m²，标准阻隔性能",
    "一次性金属镊子（弯头带保护套），135 mm"
  ], [
    "Scalpel blade", "Povidone-iodine cotton balls (pack of 5)", "Blue plastic forceps, 125 mm",
    "Powder-free surgical gloves, size 7.5", "Bleached gauze swab, 8 × 8 cm, 8-ply; 100% cotton",
    "Sterilization wrap, 50 × 60 cm; blue SMS, 45 g/m², standard performance",
    "Disposable metal forceps (curved tip with protective sleeve), 135 mm"
  ]),
  pack("disposable-suture-kit", "一次性使用换药包（缝合型）", "Disposable Suture Kit", "伤口缝合", "wound suturing", [
    "医用脱脂纱布块", "医用棉球", "包布", "医用缝合针（圆针，1/2 圆，7 × 17 mm）",
    "医用缝合针（角针，1/2 圆，7 × 17 mm）", "手术洞巾 40 × 40 cm（中央孔直径 10 cm）",
    "无粉光面手术手套，7.5 号", "非吸收缝合线，3-0", "一次性使用敷料镊",
    "乳白色塑料托盘", "蓝色工程塑料镊子"
  ], [
    "Absorbent gauze swab", "Cotton balls", "Sterilization wrap",
    "Medical suture needle (round-bodied, 1/2 circle, 7 × 17 mm)",
    "Medical suture needle (cutting, 1/2 circle, 7 × 17 mm)",
    "Fenestrated drape 40 × 40 cm (central hole, diameter 10 cm)",
    "Powder-free surgical gloves, size 7.5", "Non-absorbable suture, size 3-0",
    "Disposable dressing forceps", "Off-white plastic tray", "Blue plastic forceps"
  ]),
  pack("disposable-caesarean-section-pack", "一次性使用手术包（剖腹产专用）", "Disposable Caesarean Section Pack", "剖宫产", "caesarean section procedures", [
    "器械台套 80 × 145 cm", "一次性使用加强型手术衣，M 号", "护理垫单 40 × 60 cm",
    "护理垫单 100 × 150 cm", "手术洞巾 250 × 330 cm", "包布 150 × 190 cm"
  ], [
    "Mayo stand cover, 80 × 145 cm", "Disposable surgical gown, reinforced, size M",
    "Absorbent underpad 40 × 60 cm", "Absorbent underpad 100 × 150 cm",
    "Fenestrated drape 250 × 330 cm", "Back table cover, 150 × 190 cm"
  ]),
  pack("disposable-upper-extremity-pack", "一次性使用手术包（上肢专用）", "Disposable Upper Extremity Pack", "上肢手术", "upper-extremity surgery", [
    "上肢手术洞巾 200 × 360 cm，K 型", "手术单 150 × 190 cm", "U 型手术单 100 × 100 cm",
    "手术单 120 × 180 cm", "边单 50 × 75 cm", "边单 75 × 80 cm", "弹力袜套 22 × 75 cm",
    "背胶料 10 × 50 cm", "弹性绷带 10 × 450 cm", "包布 150 × 190 cm"
  ], [
    "Upper extremity drape, 200 × 360 cm, K", "Drape 150 × 190 cm", "U-drape 100 × 100 cm",
    "Drape 120 × 180 cm", "Side drape 50 × 75 cm", "Side drape 75 × 80 cm",
    "Stockinette, 22 × 75 cm", "Adhesive tape 10 × 50 cm", "Elastic bandage 10 × 450 cm",
    "Back table cover, 150 × 190 cm"
  ]),
  pack("disposable-lower-extremity-pack", "一次性使用手术包（下肢专用）", "Disposable Lower Extremity Pack", "下肢手术", "lower-extremity surgery", [
    "下肢手术洞巾 200 × 300 cm", "手术单 150 × 190 cm", "边单 70 × 80 cm",
    "U 型手术单 100 × 100 cm", "手术单 150 × 150 cm", "垃圾袋 62 × 48 cm",
    "背胶料 10 × 50 cm", "弹力袜套 22 × 75 cm", "弹性绷带 10 × 450 cm", "包布 150 × 190 cm"
  ], [
    "Lower extremity drape, 200 × 300 cm", "Drape 150 × 190 cm", "Side drape 70 × 80 cm",
    "U-drape 100 × 100 cm", "Drape 150 × 150 cm", "Waste bag 62 × 48 cm",
    "Adhesive tape 10 × 50 cm", "Stockinette, 22 × 75 cm", "Elastic bandage 10 × 450 cm",
    "Back table cover, 150 × 190 cm"
  ]),
  pack("disposable-shoulder-surgery-pack", "一次性使用手术包（肩关节专用）", "Disposable Shoulder Surgery Pack", "肩关节手术", "shoulder surgery", [
    "上肢手术洞巾 200 × 360 cm", "手术单 150 × 190 cm", "U 型手术单 100 × 100 cm",
    "手术单 120 × 150 cm", "边单 50 × 75 cm", "边单 75 × 80 cm", "弹力袜套 22 × 75 cm",
    "背胶料 10 × 50 cm", "弹性绷带 10 × 450 cm", "一次性使用加强型手术衣",
    "包布 150 × 120 cm"
  ], [
    "Upper extremity drape, 200 × 360 cm", "Drape 150 × 190 cm", "U-drape 100 × 100 cm",
    "Drape 120 × 150 cm", "Side drape 50 × 75 cm", "Side drape 75 × 80 cm",
    "Stockinette, 22 × 75 cm", "Adhesive tape 10 × 50 cm", "Elastic bandage 10 × 450 cm",
    "Disposable surgical gown, reinforced", "Sterilization wrap 150 × 120 cm"
  ]),
  pack("disposable-knee-surgery-pack", "一次性使用手术包（膝关节专用）", "Disposable Knee Surgery Pack", "膝关节手术", "knee surgery", [
    "手术单 150 × 190 cm", "U 型手术单 100 × 100 cm", "边单 75 × 80 cm",
    "手术单 150 × 150 cm", "膝关节手术洞巾 200 × 335 cm", "器械台套 60 × 125 cm",
    "擦手巾 30 × 40 cm", "背胶料 10 × 50 cm", "弹力袜套 22 × 75 cm",
    "弹性绷带 10 × 450 cm", "包布 150 × 190 cm"
  ], [
    "Drape 150 × 190 cm", "U-drape 100 × 100 cm", "Side drape 75 × 80 cm",
    "Drape 150 × 150 cm", "Knee drape, 200 × 335 cm", "Mayo stand cover, 60 × 125 cm",
    "Hand towel 30 × 40 cm", "Adhesive tape 10 × 50 cm", "Stockinette, 22 × 75 cm",
    "Elastic bandage 10 × 450 cm", "Back table cover, 150 × 190 cm"
  ]),
  pack("disposable-laparoscopy-pack", "一次性使用手术包（腹腔镜专用）", "Disposable Laparoscopy Pack", "腹腔镜手术", "laparoscopic surgery", [
    "腹腔镜手术洞巾 200 × 300 cm", "器械台套 80 × 145 cm", "背胶料 10 × 50 cm",
    "一次性使用加强型手术衣，L 号", "一次性使用无菌保护罩，直径 100 cm",
    "擦手巾 40 × 40 cm", "边单 75 × 90 cm", "器械包布 150 × 200 cm"
  ], [
    "Laparoscopy drape, 200 × 300 cm", "Mayo stand cover, 80 × 145 cm",
    "Adhesive tape 10 × 50 cm", "Disposable surgical gown, reinforced, size L",
    "Disposable sterile equipment cover, 100 cm diameter", "Hand towel 40 × 40 cm",
    "Side drape 75 × 90 cm", "Back table cover, 150 × 200 cm"
  ]),
  pack("disposable-dilation-curettage-pack", "一次性使用手术包（人工流产专用）", "Disposable Dilation and Curettage (D&C) Pack", "人工流产及刮宫术", "dilation and curettage procedures", [
    "手术洞巾 80 × 100 cm", "腿套 30 × 90 cm", "一次性使用妇科刮板", "包布 90 × 90 cm",
    "医用棉球", "一次性使用无菌阴道扩张器", "塑料弯盘 250 mL",
    "医用脱脂纱布块 10 × 10 cm，8 层", "一次性使用医用橡胶检查手套",
    "一次性使用手术衣，L 号", "塑料镊子"
  ], [
    "Fenestrated drape 80 × 100 cm", "Leggings, 30 × 90 cm", "Disposable gynecological spatula",
    "Sterilization wrap 90 × 90 cm", "Cotton balls", "Disposable sterile vaginal speculum",
    "Plastic kidney basin, 250 mL", "Absorbent gauze swab 10 × 10 cm, 8-ply",
    "Disposable medical examination gloves", "Disposable surgical gown, size L", "Plastic forceps"
  ])
];

export const OPERATING_ROOM_CONSUMABLES: OperatingRoomConsumableDefinition[] = [
  {
    slug: "sterile-equipment-covers-and-sleeves",
    imageUrl: "/uploads/images/operating-room/sterile-equipment-covers-and-sleeves.webp",
    nameZh: "一次性无菌设备保护罩及保护套",
    nameEn: "Disposable Sterile Equipment Covers and Sleeves",
    applicationZh: "手术室设备及线缆的无菌隔离保护",
    applicationEn: "Sterile barrier protection for operating-room equipment and cables",
    specificationsZh: ["保护套：8 × 120 cm", "保护罩：20 × 20 cm、78 × 100 cm", "圆形保护罩：直径 100 cm"],
    specificationsEn: ["Equipment sleeve: 8 × 120 cm", "Equipment covers: 20 × 20 cm and 78 × 100 cm", "Round equipment cover: 100 cm diameter"]
  },
  {
    slug: "mayo-stand-covers",
    imageUrl: "/uploads/images/operating-room/mayo-stand-covers.webp",
    nameZh: "一次性器械台套",
    nameEn: "Disposable Mayo Stand Covers",
    applicationZh: "手术器械台的无菌覆盖",
    applicationEn: "Sterile covering of Mayo stands in the operating room",
    specificationsZh: ["60 × 125 cm", "80 × 145 cm"],
    specificationsEn: ["60 × 125 cm", "80 × 145 cm"]
  },
  {
    slug: "sterilization-wraps-and-back-table-covers",
    imageUrl: "/uploads/images/operating-room/sterilization-wraps-and-back-table-covers.webp",
    nameZh: "医用包布及后桌罩",
    nameEn: "Sterilization Wraps and Back Table Covers",
    applicationZh: "器械包裹、无菌区域建立及后桌覆盖",
    applicationEn: "Instrument wrapping, sterile field setup, and back-table coverage",
    specificationsZh: ["包布：50 × 60 cm 至 150 × 190 cm", "后桌罩：150 × 190 cm、150 × 200 cm", "可选蓝色 SMS，45 g/m²"],
    specificationsEn: ["Sterilization wraps: 50 × 60 cm to 150 × 190 cm", "Back table covers: 150 × 190 cm and 150 × 200 cm", "Blue SMS, 45 g/m² available"]
  },
  {
    slug: "graduated-bowls-and-kidney-basins",
    imageUrl: "/uploads/images/operating-room/graduated-bowls-and-kidney-basins.webp",
    nameZh: "医用量碗、量杯及弯盘",
    nameEn: "Graduated Bowls, Cups, and Kidney Basins",
    applicationZh: "手术室液体盛装、计量及器械暂存",
    applicationEn: "Fluid collection, measurement, and temporary instrument holding",
    specificationsZh: ["量碗：500 mL", "量杯", "塑料弯盘：250 mL、500 mL", "塑料方盘及托盘"],
    specificationsEn: ["Graduated bowl: 500 mL", "Graduated cup", "Plastic kidney basins: 250 mL and 500 mL", "Square plastic trays and procedure trays"]
  },
  {
    slug: "surgical-stockinettes-and-leggings",
    imageUrl: "/uploads/images/operating-room/surgical-stockinettes-and-leggings.webp",
    nameZh: "手术用弹力袜套及腿套",
    nameEn: "Surgical Stockinettes and Leggings",
    applicationZh: "肢体手术及妇产科手术的无菌覆盖",
    applicationEn: "Sterile limb covering for orthopedic and obstetric procedures",
    specificationsZh: ["弹力袜套：22 × 75 cm", "腿套：30 × 90 cm、35 × 85 cm"],
    specificationsEn: ["Stockinette: 22 × 75 cm", "Leggings: 30 × 90 cm and 35 × 85 cm"]
  },
  {
    slug: "sterile-hand-towels-and-absorbent-underpads",
    imageUrl: "/uploads/images/operating-room/sterile-hand-towels-and-absorbent-underpads.webp",
    nameZh: "无菌擦手巾及吸收垫单",
    nameEn: "Sterile Hand Towels and Absorbent Underpads",
    applicationZh: "术前擦手及术中液体吸收",
    applicationEn: "Surgical hand drying and intraoperative fluid absorption",
    specificationsZh: ["擦手巾：30 × 40 cm、40 × 40 cm", "护理垫单：40 × 60 cm、60 × 90 cm、100 × 150 cm"],
    specificationsEn: ["Hand towels: 30 × 40 cm and 40 × 40 cm", "Absorbent underpads: 40 × 60 cm, 60 × 90 cm, and 100 × 150 cm"]
  },
  {
    slug: "disposable-dental-irrigation-tube",
    imageUrl: "/uploads/images/operating-room/disposable-dental-irrigation-tube.webp",
    nameZh: "一次性使用口腔输水管",
    nameEn: "Disposable Dental Irrigation Tube",
    applicationZh: "口腔护理及口腔种植术中的冲洗供水",
    applicationEn: "Irrigation during dental care and implant procedures",
    specificationsZh: ["一次性使用", "无菌配置可选", "接口及长度按项目确认"],
    specificationsEn: ["Single use", "Sterile configuration available", "Connector and length to be confirmed by project"]
  },
  {
    slug: "gynecological-procedure-accessories",
    imageUrl: "/uploads/images/operating-room/gynecological-procedure-accessories.webp",
    nameZh: "一次性妇科操作附件",
    nameEn: "Disposable Gynecological Procedure Accessories",
    applicationZh: "妇科检查、扩张及刮宫相关操作",
    applicationEn: "Gynecological examination, dilation, and curettage procedures",
    specificationsZh: ["一次性妇科刮板", "一次性无菌阴道扩张器", "塑料镊子"],
    specificationsEn: ["Disposable gynecological spatula", "Disposable sterile vaginal speculum", "Plastic forceps"]
  }
];

export function installSurgicalPackCatalog(database: Database.Database) {
  const existingCategory = listCategories(database).find(
    (category) => category.slug === "surgical-procedure-packs"
  );
  const categoryId = saveCategory(database, {
    ...(existingCategory ? { id: Number(existingCategory.id) } : {}),
    slug: "surgical-procedure-packs",
    nameZh: "手术套包",
    nameEn: "Surgical Procedure Packs",
    descriptionZh: "按临床术式配置的一次性无菌手术套包，可按项目要求定制。",
    descriptionEn: "Disposable sterile procedure packs configured by clinical procedure and customizable to project requirements.",
    sortOrder: 70
  });

  const productIds = SURGICAL_PACKS.map((definition) => {
    const existing = findProductBySlug(definition.slug, database);
    return saveProduct(database, {
      ...(existing ? { id: Number(existing.id) } : {}),
      categoryId,
      slug: definition.slug,
      manufacturerZh: "供应商待确认",
      manufacturerEn: "Manufacturer information available on request",
      model: "Custom Pack",
      nameZh: definition.nameZh,
      nameEn: definition.nameEn,
      summaryZh: `适用于${definition.clinicalTagZh}场景的一次性无菌手术套包，配置可按项目要求调整。`,
      summaryEn: `Disposable sterile procedure pack configured for ${definition.clinicalTagEn}; contents can be customized to project requirements.`,
      applicationZh: definition.clinicalTagZh,
      applicationEn: definition.clinicalTagEn,
      specificationsZh: definition.contentsZh.map((item, index) => `${index + 1}. ${item}`).join("\n"),
      specificationsEn: definition.contentsEn.map((item, index) => `${index + 1}. ${item}`).join("\n"),
      packagingZh: "独立无菌包装；装箱规格待确认。",
      packagingEn:
        "Individually sterile packed; carton configuration and sterilization method are available on request.",
      imageUrl: definition.imageUrl,
      featured: false,
      seoTitleZh: definition.nameZh,
      seoTitleEn: definition.nameEn,
      seoDescriptionZh: `了解${definition.nameZh}的标准配置及定制选项。`,
      seoDescriptionEn: `Review the standard configuration and customization options for the ${definition.nameEn}.`
    });
  });

  const existingConsumablesCategory = listCategories(database).find(
    (category) => category.slug === "operating-room-consumables"
  );
  const consumablesCategoryId = saveCategory(database, {
    ...(existingConsumablesCategory ? { id: Number(existingConsumablesCategory.id) } : {}),
    slug: "operating-room-consumables",
    nameZh: "手术室耗材",
    nameEn: "Operating Room Consumables",
    descriptionZh: "未与现有目录重复的手术室专用耗材产品族。",
    descriptionEn: "Operating-room consumable families not duplicated elsewhere in the existing catalog.",
    sortOrder: 71
  });

  const consumableProductIds = OPERATING_ROOM_CONSUMABLES.map((definition) => {
    const existing = findProductBySlug(definition.slug, database);
    return saveProduct(database, {
      ...(existing ? { id: Number(existing.id) } : {}),
      categoryId: consumablesCategoryId,
      slug: definition.slug,
      manufacturerZh: "供应商待确认",
      manufacturerEn: "Manufacturer information available on request",
      model: "Customizable",
      nameZh: definition.nameZh,
      nameEn: definition.nameEn,
      summaryZh: `${definition.applicationZh}，规格可按项目要求配置。`,
      summaryEn: `${definition.applicationEn}; available specifications can be configured to project requirements.`,
      applicationZh: definition.applicationZh,
      applicationEn: definition.applicationEn,
      specificationsZh: definition.specificationsZh.join("\n"),
      specificationsEn: definition.specificationsEn.join("\n"),
      packagingZh: "独立包装或按套包配置；无菌及装箱要求待确认。",
      packagingEn:
        "Individually packed or supplied as a procedure-pack component; sterility and carton configuration are available on request.",
      imageUrl: definition.imageUrl,
      featured: false,
      seoTitleZh: definition.nameZh,
      seoTitleEn: definition.nameEn,
      seoDescriptionZh: `了解${definition.nameZh}的可供规格及项目配置。`,
      seoDescriptionEn: `Review available specifications and project configurations for ${definition.nameEn}.`
    });
  });

  return { categoryId, productIds, consumablesCategoryId, consumableProductIds };
}
