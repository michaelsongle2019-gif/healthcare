import { saveSettingsAction } from "@/app/admin/actions";
import { getSiteSettings } from "@/lib/repository";
import { AdminPage } from "@/components/admin-page";

export default async function AdminSettingsPage() {
  const settings = getSiteSettings();

  return (
    <AdminPage>
      <section className="admin-panel">
        <div className="eyebrow">站点设置</div>
        <h1 className="page-title">双语站点信息</h1>
        <form action={saveSettingsAction} className="admin-form">
          <div className="form-grid">
            <label>
              公司名称（中文）
              <input name="companyNameZh" defaultValue={settings.companyNameZh} />
            </label>
            <label>
              公司名称（英文）
              <input name="companyNameEn" defaultValue={settings.companyNameEn} />
            </label>
            <label>
              品牌副标题（中文）
              <input name="taglineZh" defaultValue={settings.taglineZh} />
            </label>
            <label>
              品牌副标题（英文）
              <input name="taglineEn" defaultValue={settings.taglineEn} />
            </label>
            <label>
              地址（中文）
              <textarea name="addressZh" defaultValue={settings.addressZh} />
            </label>
            <label>
              地址（英文）
              <textarea name="addressEn" defaultValue={settings.addressEn} />
            </label>
            <label>
              联系电话
              <input name="phone" defaultValue={settings.phone} />
            </label>
            <label>
              邮箱
              <input name="email" defaultValue={settings.email} />
            </label>
            <label>
              首页主标题（中文）
              <input name="heroTitleZh" defaultValue={settings.heroTitleZh} />
            </label>
            <label>
              首页主标题（英文）
              <input name="heroTitleEn" defaultValue={settings.heroTitleEn} />
            </label>
            <label>
              首页简介（中文）
              <textarea name="heroBodyZh" defaultValue={settings.heroBodyZh} />
            </label>
            <label>
              首页简介（英文）
              <textarea name="heroBodyEn" defaultValue={settings.heroBodyEn} />
            </label>
            <label>
              SEO 描述（中文）
              <textarea
                name="seoDescriptionZh"
                defaultValue={settings.seoDescriptionZh}
              />
            </label>
            <label>
              SEO 描述（英文）
              <textarea
                name="seoDescriptionEn"
                defaultValue={settings.seoDescriptionEn}
              />
            </label>
          </div>
          <button type="submit">保存设置</button>
        </form>
      </section>
    </AdminPage>
  );
}
