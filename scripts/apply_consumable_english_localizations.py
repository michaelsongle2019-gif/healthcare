import json
import sqlite3
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATABASE_PATH = ROOT / "data" / "healthcare.db"
LOCALIZATION_PATH = ROOT / "data" / "consumable-english-localizations.json"


def main():
    localizations = json.loads(LOCALIZATION_PATH.read_text(encoding="utf-8"))
    connection = sqlite3.connect(DATABASE_PATH)

    try:
        connection.execute("BEGIN")
        updated = 0

        for name_zh, values in localizations.items():
            cursor = connection.execute(
                """
                UPDATE products
                SET name_en = ?,
                    summary_en = ?,
                    application_en = ?,
                    specifications_en = ?,
                    packaging_en = ?,
                    manufacturer_en = ?,
                    seo_title_en = ?,
                    seo_description_en = ?
                WHERE name_zh = ? AND slug LIKE 'excel-consumable-%'
                """,
                (
                    values["nameEn"],
                    values["summaryEn"],
                    values["applicationEn"],
                    values["specificationsEn"],
                    values["packagingEn"],
                    values["manufacturerEn"],
                    values["nameEn"],
                    values["summaryEn"],
                    name_zh,
                ),
            )
            updated += cursor.rowcount

        if updated != len(localizations):
            raise RuntimeError(
                f"Expected to update {len(localizations)} products, updated {updated}."
            )

        connection.commit()
        print(f"Updated {updated} consumable products with professional English content.")
    except Exception:
        connection.rollback()
        raise
    finally:
        connection.close()


if __name__ == "__main__":
    main()
