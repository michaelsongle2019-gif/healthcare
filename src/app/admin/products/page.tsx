import { AdminPage } from "@/components/admin-page";
import { saveProductAction } from "@/app/admin/actions";
import {
  listCategories,
  listProducts,
  type CategoryRecord,
  type ProductRecord
} from "@/lib/repository";

function ProductForm({
  product,
  categories
}: {
  product?: ProductRecord;
  categories: CategoryRecord[];
}) {
  return (
    <form action={saveProductAction} className="admin-form">
      {product?.id ? (
        <input type="hidden" name="id" value={String(product.id)} />
      ) : null}
      <label>
        Slug
        <input name="slug" defaultValue={String(product?.slug ?? "")} />
      </label>
      <label>
        所属分类
        <select
          name="categoryId"
          defaultValue={String(product?.categoryId ?? categories[0]?.id ?? "")}
        >
          {categories.map((category) => (
            <option key={String(category.id)} value={String(category.id)}>
              {String(category.nameZh)}
            </option>
          ))}
        </select>
      </label>
      <label>
        厂家名称（中文）
        <input
          name="manufacturerZh"
          defaultValue={String(product?.manufacturerZh ?? "")}
        />
      </label>
      <label>
        厂家名称（英文）
        <input
          name="manufacturerEn"
          defaultValue={String(product?.manufacturerEn ?? "")}
        />
      </label>
      <label>
        产品型号
        <input name="model" defaultValue={String(product?.model ?? "")} />
      </label>
      <label>
        正式名称（中文）
        <input name="nameZh" defaultValue={String(product?.nameZh ?? "")} />
      </label>
      <label>
        正式名称（英文）
        <input name="nameEn" defaultValue={String(product?.nameEn ?? "")} />
      </label>
      <label>
        简介（中文）
        <textarea
          name="summaryZh"
          defaultValue={String(product?.summaryZh ?? "")}
        />
      </label>
      <label>
        简介（英文）
        <textarea
          name="summaryEn"
          defaultValue={String(product?.summaryEn ?? "")}
        />
      </label>
      <label>
        适用场景（中文）
        <textarea
          name="applicationZh"
          defaultValue={String(product?.applicationZh ?? "")}
        />
      </label>
      <label>
        适用场景（英文）
        <textarea
          name="applicationEn"
          defaultValue={String(product?.applicationEn ?? "")}
        />
      </label>
      <label>
        关键规格（中文）
        <textarea
          name="specificationsZh"
          defaultValue={String(product?.specificationsZh ?? "")}
        />
      </label>
      <label>
        关键规格（英文）
        <textarea
          name="specificationsEn"
          defaultValue={String(product?.specificationsEn ?? "")}
        />
      </label>
      <label>
        交付方式（中文）
        <textarea
          name="packagingZh"
          defaultValue={String(product?.packagingZh ?? "")}
        />
      </label>
      <label>
        交付方式（英文）
        <textarea
          name="packagingEn"
          defaultValue={String(product?.packagingEn ?? "")}
        />
      </label>
      <label>
        图片地址
        <input name="imageUrl" defaultValue={String(product?.imageUrl ?? "")} />
      </label>
      <label>
        或上传图片
        <input type="file" name="imageFile" accept="image/*" />
      </label>
      <label>
        <input
          type="checkbox"
          name="featured"
          defaultChecked={Boolean(product?.featured)}
        />{" "}
        首页推荐产品
      </label>
      <label>
        SEO 标题（中文）
        <input
          name="seoTitleZh"
          defaultValue={String(product?.seoTitleZh ?? "")}
        />
      </label>
      <label>
        SEO 标题（英文）
        <input
          name="seoTitleEn"
          defaultValue={String(product?.seoTitleEn ?? "")}
        />
      </label>
      <label>
        SEO 描述（中文）
        <textarea
          name="seoDescriptionZh"
          defaultValue={String(product?.seoDescriptionZh ?? "")}
        />
      </label>
      <label>
        SEO 描述（英文）
        <textarea
          name="seoDescriptionEn"
          defaultValue={String(product?.seoDescriptionEn ?? "")}
        />
      </label>
      <button type="submit">{product ? "保存产品" : "新增产品"}</button>
    </form>
  );
}

export default async function AdminProductsPage() {
  const categories = listCategories();
  const products = listProducts();

  return (
    <AdminPage>
      <section className="admin-panel">
        <div className="eyebrow">产品管理</div>
        <h1 className="page-title">双语产品目录</h1>
        <div className="admin-grid">
          {products.map((product) => (
            <ProductForm
              key={String(product.id)}
              product={product}
              categories={categories}
            />
          ))}
          <ProductForm categories={categories} />
        </div>
      </section>
    </AdminPage>
  );
}
