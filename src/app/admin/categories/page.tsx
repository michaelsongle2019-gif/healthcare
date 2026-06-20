import { saveCategoryAction } from "@/app/admin/actions";
import { listCategories } from "@/lib/repository";
import { AdminPage } from "@/components/admin-page";

export default async function AdminCategoriesPage() {
  const categories = listCategories();

  return (
    <AdminPage>
      <section className="admin-panel">
        <div className="eyebrow">产品分类</div>
        <h1 className="page-title">分类结构</h1>
        <div className="admin-grid">
          {categories.map((category) => (
            <form
              key={String(category.id)}
              action={saveCategoryAction}
              className="admin-form"
            >
              <input type="hidden" name="id" value={String(category.id)} />
              <label>
                Slug
                <input name="slug" defaultValue={String(category.slug)} />
              </label>
              <label>
                中文名称
                <input name="nameZh" defaultValue={String(category.nameZh)} />
              </label>
              <label>
                英文名称
                <input name="nameEn" defaultValue={String(category.nameEn)} />
              </label>
              <label>
                中文说明
                <textarea
                  name="descriptionZh"
                  defaultValue={String(category.descriptionZh)}
                />
              </label>
              <label>
                英文说明
                <textarea
                  name="descriptionEn"
                  defaultValue={String(category.descriptionEn)}
                />
              </label>
              <label>
                排序
                <input
                  name="sortOrder"
                  type="number"
                  defaultValue={String(category.sortOrder)}
                />
              </label>
              <button type="submit">保存分类</button>
            </form>
          ))}
          <form action={saveCategoryAction} className="admin-form">
            <h3>新增分类</h3>
            <label>
              Slug
              <input name="slug" />
            </label>
            <label>
              中文名称
              <input name="nameZh" />
            </label>
            <label>
              英文名称
              <input name="nameEn" />
            </label>
            <label>
              中文说明
              <textarea name="descriptionZh" />
            </label>
            <label>
              英文说明
              <textarea name="descriptionEn" />
            </label>
            <label>
              排序
              <input name="sortOrder" type="number" defaultValue="0" />
            </label>
            <button type="submit">创建分类</button>
          </form>
        </div>
      </section>
    </AdminPage>
  );
}
