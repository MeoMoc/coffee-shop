import { useState } from "react";
import axios from "axios";
import { Pencil, Trash2, X, ListTree, Info, Plus } from "lucide-react";
import { toast } from "react-toastify";
import TopHeader from "@/components/TopHeader";
import NavigationBar from "@/components/NavigationBar";
import {
  useMenus,
  useMenu,
  useCreateMenu,
  useUpdateMenu,
  useDeleteMenu,
} from "@/services/menu";
import { Menu, Product, Products } from "@/types/interface";
import MultilSelect from "@/components/ui/MultiSelect";
import { useProducts } from "@/services/product";

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

export const createEmptyMenu = (): Menu => ({
  id: "",
  name: "",
  description: "",
  products: [],
});

const MenuManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrandId, setEditingBrandId] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [formState, setFormState] = useState<Menu>(createEmptyMenu());
  const [products, setProducts] = useState<Products>([]);

  const { data: menusResponse, isLoading, isError, error } = useMenus();
  const menus = menusResponse?.data || [];
  const menuDetailQuery = useMenu(editingBrandId ?? undefined);
  const createBrandMutation = useCreateMenu();
  const updateBrandMutation = useUpdateMenu();
  const deleteBrandMutation = useDeleteMenu();
  const productsResponse = useProducts();

  const isSubmitting =
    createBrandMutation.isPending || updateBrandMutation.isPending;

  const resetForm = () => {
    setFormError("");
    setEditingBrandId(null);
    setIsModalOpen(false);
  };

  const openForm = (menu?: Menu) => {
    setFormError("");
    setIsModalOpen(true);
    if (menu) {
      setFormState(menu);
      setEditingBrandId(menu.id);
      setProducts(menu.products);
    } else {
      setFormState(createEmptyMenu());
      setEditingBrandId(null);
      setProducts([]);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formState.name.trim()) {
      setFormError("Vui lòng nhập tên nhóm sản phẩm.");
      return;
    }

    const payload = {
      name: formState.name,
      description: formState.description,
      productIds: products.map((p) => p.id),
    };

    try {
      if (editingBrandId) {
        await updateBrandMutation.mutateAsync({
          id: editingBrandId,
          data: payload,
        });
        toast.success("Cập nhật nhóm sản phẩm thành công.");
      } else {
        await createBrandMutation.mutateAsync(payload);
        toast.success("Tạo nhóm sản phẩm thành công.");
      }
      resetForm();
    } catch (error) {
      setFormError(getErrorMessage(error, "Không thể lưu nhóm sản phẩm."));
    }
  };

  const handleDelete = async (menu: Menu) => {
    const shouldDelete = window.confirm(
      `Bạn có chắc muốn xóa nhóm sản phẩm "${menu.name}"?`,
    );
    if (!shouldDelete) return;

    try {
      await deleteBrandMutation.mutateAsync(menu.id);
      toast.success("Xóa nhóm sản phẩm thành công.");
    } catch (error) {
      toast.error(
        getErrorMessage(
          error,
          "Không thể xóa nhóm sản phẩm. Có thể vẫn còn sản phẩm thuộc nhóm sản phẩm này.",
        ),
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50">
      <TopHeader />
      <NavigationBar />

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Quản lý nhóm sản phẩm
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Quản lý danh mục và phân nhóm các sản phẩm trong hệ thống
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
              Tổng số: {menusResponse?.meta?.total || 0} nhóm sản phẩm
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-slate-50 text-slate-600">
                  <th className="px-6 py-4 font-semibold text-slate-700">
                    Tên nhóm
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-700">
                    Mô tả
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-700">
                    Sản phẩm con
                  </th>
                  <th className="px-6 py-4 font-semibold text-slate-700 text-center">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-slate-400"
                    >
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
                        "Không thể tải danh sách nhóm sản phẩm.",
                      )}
                    </td>
                  </tr>
                ) : menus.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-6 py-12 text-center text-slate-400"
                    >
                      Chưa có nhóm sản phẩm nào được tạo.
                    </td>
                  </tr>
                ) : (
                  menus.map((menu) => (
                    <tr
                      key={menu.id}
                      className="hover:bg-slate-50/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="font-semibold text-slate-900">
                          {menu.name}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                        {menu.description || (
                          <span className="text-slate-300 italic">
                            Chưa có mô tả
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {menu.products.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {menu.products.slice(0, 3).map((item) => (
                              <span
                                key={item.id}
                                className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[11px] font-medium"
                              >
                                {item.name}
                              </span>
                            ))}
                            {menu.products.length > 3 && (
                              <span className="text-[11px] text-slate-400 font-medium ml-1">
                                +{menu.products.length - 3} sản phẩm khác
                              </span>
                            )}
                          </div>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openForm(menu)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Chỉnh sửa"
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(menu)}
                            disabled={deleteBrandMutation.isPending}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4" />
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

      {/* Modal Form */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                {editingBrandId
                  ? "Cập nhật nhóm sản phẩm"
                  : "Tạo nhóm sản phẩm mới"}
              </h3>
              <button
                onClick={resetForm}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-full transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {editingBrandId && menuDetailQuery.isLoading && (
                <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                  <div className="h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  Đang tải thông tin chi tiết...
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Tên nhóm sản phẩm
                </label>
                <input
                  value={formState.name}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="Ví dụ: Đồ uống, Món khai vị..."
                  className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm"
                  disabled={isSubmitting || menuDetailQuery.isLoading}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700">
                  Mô tả
                </label>
                <textarea
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Nhập mô tả ngắn gọn về nhóm này..."
                  className="w-full min-h-[100px] p-4 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all text-sm resize-none"
                  disabled={isSubmitting || menuDetailQuery.isLoading}
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-slate-700">
                    Danh sách sản phẩm
                  </label>
                  <span className="text-[11px] text-slate-400 font-normal">
                    Chọn nhiều sản phẩm
                  </span>
                </div>
                <div className="min-h-[42px]">
                  <MultilSelect
                    items={productsResponse.data?.data || []}
                    value={products}
                    onChange={(selected) =>
                      setProducts(selected as unknown as Product[])
                    }
                    disabled={isSubmitting || menuDetailQuery.isLoading}
                  />
                </div>
              </div>

              {formError && (
                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 text-red-600 text-xs font-medium">
                  <Info className="h-4 w-4" />
                  {formError}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || menuDetailQuery.isLoading}
                  className="px-8 py-2.5 rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50 disabled:shadow-none"
                >
                  {isSubmitting ? "Đang xử lý..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuManagement;
