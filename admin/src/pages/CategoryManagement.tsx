import { useState } from "react";
import axios from "axios";
import {
  Pencil,
  Trash2,
  X,
  Plus,
  Info,
  FolderTree,
  Layers,
} from "lucide-react";
import { toast } from "react-toastify";
import TopHeader from "@/components/TopHeader";
import NavigationBar from "@/components/NavigationBar";
import {
  useCategories,
  useCategory,
  useCreateCategory,
  useDeleteCategory,
  useMenus,
  useUpdateCategory,
} from "@/services";
import { Category, Menu } from "@/types/interface";
import MultilSelect from "@/components/ui/MultiSelect";

const getErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.response?.data ||
      fallback
    );
  }
  return fallback;
};

export const createEmptyCategory = (): Category => ({
  id: "",
  name: "",
  description: "",
  menus: [],
});

const CategoryManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<Category>(createEmptyCategory());
  const [menus, setMenus] = useState<{ id: string; name: string }[]>([]);

  const { data: categories, isLoading, isError, error } = useCategories();
  const detailQuery = useCategory(detailId);
  const createMutation = useCreateCategory();
  const updateMutation = useUpdateCategory();
  const deleteMutation = useDeleteCategory();
  const menusResponse = useMenus();

  const rawRows = categories || [];
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  const openForm = (cat?: Category) => {
    setFormError("");
    setIsModalOpen(true);
    if (cat) {
      setFormState(cat);
      setDetailId(cat.id);
      setMenus(cat.menus || []);
    } else {
      setFormState(createEmptyCategory());
      setDetailId(null);
      setMenus([]);
    }
  };

  const resetForm = () => {
    setFormError("");
    setFormState(createEmptyCategory());
    setIsModalOpen(false);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formState.name.trim()) {
      setFormError("Vui lòng nhập tên danh mục.");
      return;
    }

    const payload = {
      name: formState.name,
      description: formState.description,
      menuIds: menus.map((m) => m.id),
    };

    try {
      if (detailId) {
        await updateMutation.mutateAsync({
          id: detailId,
          data: payload,
        });
        toast.success("Cập nhật danh mục thành công.");
      } else {
        await createMutation.mutateAsync(payload);
        toast.success("Tạo danh mục thành công.");
      }
      resetForm();
    } catch (error) {
      setFormError(getErrorMessage(error, "Không thể lưu danh mục."));
    }
  };

  const handleDelete = async (category: { id: string; name: string }) => {
    const shouldDelete = window.confirm(
      `Bạn có chắc muốn xóa danh mục "${category.name}"?`,
    );
    if (!shouldDelete) return;

    try {
      await deleteMutation.mutateAsync(category.id);
      toast.success("Xóa danh mục thành công.");
    } catch (error) {
      toast.error(getErrorMessage(error, "Không thể xóa danh mục."));
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <TopHeader />
      <NavigationBar />

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Quản lý danh mục
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Quản lý các nhóm danh mục và sản phẩm đi kèm trong hệ thống
            </p>
          </div>

          <button
            onClick={() => openForm()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm shadow-blue-200 font-medium text-sm"
          >
            <Plus className="h-4 w-4" />
            Thêm mới
          </button>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tổng số: {categories?.length ?? 0} danh mục
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600">
                  <th className="px-6 py-4 text-left font-semibold">
                    Tên danh mục
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Mô tả</th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Nhóm sản phẩm con
                  </th>
                  <th className="w-32 px-6 py-4 text-center font-semibold">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                        <span className="text-slate-500">
                          Đang tải dữ liệu...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-red-500"
                    >
                      {getErrorMessage(
                        error,
                        "Không thể tải danh sách danh mục.",
                      )}
                    </td>
                  </tr>
                ) : rawRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      Chưa có danh mục nào được tạo.
                    </td>
                  </tr>
                ) : (
                  rawRows.map((row) => (
                    <tr
                      key={row.id}
                      className="group hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {row.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500 max-w-xs truncate">
                        {row.description || (
                          <span className="text-slate-300">Không có mô tả</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {row.menus.length > 0 ? (
                            row.menus.map((menu) => (
                              <span
                                key={menu.id}
                                className="inline-flex items-center rounded-lg bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600 border border-slate-200"
                              >
                                {menu.name}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-300 italic text-xs">
                              Trống
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openForm(row)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => handleDelete(row)}
                            disabled={deleteMutation.isPending}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={resetForm}
          />

          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Layers className="h-4 w-4 text-blue-600" />
                </div>
                {detailId ? "Cập nhật danh mục" : "Tạo danh mục mới"}
              </h3>
              <button
                onClick={resetForm}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {detailId && detailQuery.isLoading && (
                <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-600 animate-pulse">
                  Đang tải thông tin chi tiết danh mục...
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
                  Tên danh mục <span className="text-red-500">*</span>
                </label>
                <input
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="VD: Cà phê, Trà sữa..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none"
                  disabled={isSubmitting || detailQuery.isLoading}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
                  <Info className="h-3.5 w-3.5 text-slate-400" /> Mô tả (Tùy
                  chọn)
                </label>
                <textarea
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Mô tả ngắn gọn về danh mục này..."
                  className="min-h-[100px] w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm transition-all focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none resize-none"
                  disabled={isSubmitting || detailQuery.isLoading}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
                  <FolderTree className="h-3.5 w-3.5 text-slate-400" /> Nhóm sản
                  phẩm con
                </label>
                <div className="min-h-[42px]">
                  <MultilSelect
                    items={menusResponse.data?.data || []}
                    value={menus}
                    onChange={(selected) =>
                      setMenus(selected as unknown as Menu[])
                    }
                    disabled={isSubmitting || detailQuery.isLoading}
                  />
                </div>
              </div>

              {formError && (
                <div className="rounded-xl bg-red-50 p-3 text-sm text-red-600 border border-red-100 flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-red-600" />
                  {formError}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={resetForm}
                  className="h-10 rounded-xl border border-slate-200 px-6 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || detailQuery.isLoading}
                  className="h-10 rounded-xl bg-blue-600 px-8 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting && (
                    <div className="h-3 w-3 animate-spin rounded-full border border-white border-t-transparent" />
                  )}
                  {isSubmitting
                    ? "Đang xử lý..."
                    : detailId
                      ? "Cập nhật"
                      : "Lưu danh mục"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryManagement;
