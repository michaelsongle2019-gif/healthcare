import { getDatabase } from "../src/lib/db";
import { installSurgicalPackCatalog } from "../src/lib/surgical-pack-catalog";

const result = installSurgicalPackCatalog(getDatabase());

console.log(`Installed ${result.productIds.length} surgical packs.`);
