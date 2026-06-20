import { saveDocumentAction } from "@/app/admin/actions";
import { listDocuments, listProducts } from "@/lib/repository";
import { AdminPage } from "@/components/admin-page";

function DocumentForm({
  document,
  products
}: {
  document?: Record<string, unknown>;
  products: ReturnType<typeof listProducts>;
}) {
  return (
    <form action={saveDocumentAction} className="admin-form">
      {document?.id ? (
        <input type="hidden" name="id" value={String(document.id)} />
      ) : null}
      <input
        type="hidden"
        name="storagePath"
        value={String(document?.storagePath ?? "")}
      />
      <label>
        关联产品
        <select name="productId" defaultValue={String(document?.productId ?? "")}>
          <option value="">独立资料</option>
          {products.map((product) => (
            <option key={String(product.id)} value={String(product.id)}>
              {String(product.nameZh)}
            </option>
          ))}
        </select>
      </label>
      <label>
        资料标题（中文）
        <input name="titleZh" defaultValue={String(document?.titleZh ?? "")} />
      </label>
      <label>
        资料标题（英文）
        <input name="titleEn" defaultValue={String(document?.titleEn ?? "")} />
      </label>
      <label>
        资料说明（中文）
        <textarea
          name="descriptionZh"
          defaultValue={String(document?.descriptionZh ?? "")}
        />
      </label>
      <label>
        资料说明（英文）
        <textarea
          name="descriptionEn"
          defaultValue={String(document?.descriptionEn ?? "")}
        />
      </label>
      <label>
        访问权限
        <select
          name="accessLevel"
          defaultValue={String(document?.accessLevel ?? "public")}
        >
          <option value="public">公开下载</option>
          <option value="request">申请后获取</option>
        </select>
      </label>
      <label>
        公开文件地址
        <input name="filePath" defaultValue={String(document?.filePath ?? "")} />
      </label>
      <label>
        上传资料文件
        <input
          type="file"
          name="documentFile"
          accept=".pdf,.doc,.docx,.ppt,.pptx"
        />
      </label>
      <label>
        排序
        <input
          name="sortOrder"
          type="number"
          defaultValue={String(document?.sortOrder ?? 0)}
        />
      </label>
      <button type="submit">{document ? "保存资料" : "新增资料"}</button>
    </form>
  );
}

export default async function AdminDocumentsPage() {
  const products = listProducts();
  const documents = listDocuments();

  return (
    <AdminPage>
      <section className="admin-panel">
        <div className="eyebrow">资料管理</div>
        <h1 className="page-title">公开与受控资料</h1>
        <div className="admin-grid">
          {documents.map((document) => (
            <DocumentForm
              key={String(document.id)}
              document={document as Record<string, unknown>}
              products={products}
            />
          ))}
          <DocumentForm products={products} />
        </div>
      </section>
    </AdminPage>
  );
}
