import { useState } from "react";
import TopHeader from "@/components/TopHeader";
import NavigationBar from "@/components/NavigationBar";
import {
  X,
  Trash,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
  Pencil,
  Trash2,
  Package,
  Plus,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import {
  useProducts,
  useCreateProduct,
  useUpdateProduct,
  useDeleteProduct,
} from "@/services/product";
import { Product, ProductSize } from "@/types/interface";

type ColumnId =
  | "imageUrl"
  | "name"
  | "description"
  | "discountAmount"
  | "isBestSeller"
  | "actions";

const COLUMN_OPTIONS: Array<{ id: ColumnId; label: string }> = [
  { id: "imageUrl", label: "Ảnh" },
  { id: "name", label: "Tên sản phẩm" },
  { id: "description", label: "Mô tả" },
  { id: "discountAmount", label: "Giảm giá" },
  { id: "isBestSeller", label: "Bán chạy" },
  { id: "actions", label: "Thao tác" },
];

export const createEmptyProduct = (): Product => ({
  id: "",
  name: "",
  description: "",
  imageUrl: "",
  component: "",
  discountAmount: 0,
  isBestSeller: false,
  sizes: [],
});

const ALL_SIZES = ["small", "medium", "large"];

const ProductList = () => {
  const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
  const [formState, setFormState] = useState<Product>(createEmptyProduct());
  const [sizes, setSizes] = useState<ProductSize[]>([]);
  const [formError, setFormError] = useState("");
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;

  const { data: productsResponse, isLoading } = useProducts(page, PAGE_SIZE);
  const products = productsResponse?.data || [];
  const createMutation = useCreateProduct();
  const updateMutation = useUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const openCreateModal = (product?: Product) => {
    setIsOpenCreateModal(true);
    setFormError("");
    if (product) {
      setFormState(product);
      setSizes(product.sizes || []);
      setEditingProductId(product.id);
    } else {
      setFormState(createEmptyProduct());
      setSizes([]);
      setEditingProductId(null);
    }
  };

  const closeCreateModal = () => {
    setIsOpenCreateModal(false);
    setFormError("");
  };

  const updateField = <K extends keyof Product>(key: K, value: Product[K]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
  };

  const saveNewProduct = async () => {
    if (!formState.name.trim()) {
      setFormError("Vui lòng nhập tên sản phẩm.");
      return;
    }

    if (sizes.length === 0) {
      setFormError("Vui lòng thêm ít nhất 1 size.");
      return;
    }

    for (let i = 0; i < sizes.length; i++) {
      const item = sizes[i];
      if (!item.size || item.price === 0 || item.price === null) {
        setFormError(`Vui lòng điền đầy đủ Size và Giá cho mục thứ ${i + 1}.`);
        return;
      }
    }

    const payload = {
      name: formState.name,
      description: formState.description,
      imageUrl: formState.imageUrl,
      component: formState.component,
      discountAmount: formState.discountAmount ?? 0,
      isBestSeller: formState.isBestSeller,
      sizes,
    };

    try {
      if (editingProductId) {
        await updateMutation.mutateAsync({
          id: editingProductId,
          data: payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
      closeCreateModal();
    } catch {
      setFormError("Có lỗi xảy ra khi lưu sản phẩm");
    }
  };

  const handleAddSize = () => {
    setSizes([...sizes, { size: "", price: 0, note: "" }]);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const updateSize = <K extends keyof ProductSize>(
    index: number,
    field: K,
    value: ProductSize[K],
  ) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);
  };

  const getAvailableSizes = (currentSize: string) => {
    return ALL_SIZES.filter(
      (s) => s === currentSize || !sizes.map((i) => i.size).includes(s),
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <TopHeader />
      <NavigationBar />

      <div className="mx-auto w-full max-w-[1400px] px-6 pb-10 pt-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Quản lý sản phẩm
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Danh sách tất cả các món ăn, đồ uống và cấu hình giá theo kích
              thước
            </p>
          </div>
          <button
            onClick={() => openCreateModal()}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm shadow-blue-200 font-medium text-sm"
          >
            <Plus className="h-4 w-4" />
            Thêm mới
          </button>
        </div>

        <main className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Tổng số: {productsResponse?.meta?.total || 0} sản phẩm
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600">
                  {COLUMN_OPTIONS.map((column) => (
                    <th
                      key={column.id}
                      className={`px-6 py-4 font-semibold ${
                        column.id === "discountAmount"
                          ? "text-right"
                          : column.id === "isBestSeller" ||
                              column.id === "actions" ||
                              column.id === "imageUrl"
                            ? "text-center"
                            : "text-left"
                      }`}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-slate-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
                        <span>Đang tải dữ liệu...</span>
                      </div>
                    </td>
                  </tr>
                ) : (
                  products?.map((product) => (
                    <tr
                      key={product.id}
                      className="group hover:bg-blue-50/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="h-12 w-12 mx-auto overflow-hidden rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shadow-sm">
                          {product.imageUrl ? (
                            <img
                              src={product.imageUrl}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <ImageIcon className="h-5 w-5 text-slate-300" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-slate-700">
                        {product.name}
                      </td>
                      <td className="px-6 py-4 text-slate-500 max-w-[300px] truncate">
                        {product.description || "-"}
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-blue-600">
                        {product.discountAmount
                          ? `${product.discountAmount}%`
                          : "0%"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {product.isBestSeller ? (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-1 text-[10px] font-bold text-amber-600 border border-amber-100">
                            BEST SELLER
                          </span>
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => openCreateModal(product)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                window.confirm(
                                  "Bạn có chắc muốn xóa sản phẩm này?",
                                )
                              ) {
                                deleteMutation.mutate(product.id);
                              }
                            }}
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

          {/* Pagination */}
          {productsResponse?.meta && (
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs font-medium text-slate-500 bg-slate-50/30">
              <span>
                Trang {page + 1} / {productsResponse.meta?.totalPage}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 0}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="px-3 py-1 bg-blue-600 text-white rounded-lg mx-1">
                  {page + 1}
                </div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= productsResponse.meta.totalPage - 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage(productsResponse.meta.totalPage - 1)}
                  disabled={page >= productsResponse.meta.totalPage - 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal Chỉnh sửa/Tạo mới */}
      {isOpenCreateModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={closeCreateModal}
          />

          <div className="relative w-full max-w-5xl rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-white sticky top-0 z-10">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                  <Package className="h-5 w-5" />
                </div>
                {editingProductId ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
              </h3>
              <button
                onClick={closeCreateModal}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="overflow-y-auto p-6 space-y-6">
              {/* Thông tin cơ bản */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">
                    Tên sản phẩm <span className="text-red-500">*</span>
                  </label>
                  <input
                    value={formState.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    placeholder="VD: Cà phê Muối"
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
                    <ImageIcon className="h-3.5 w-3.5" /> URL Hình ảnh
                  </label>
                  <input
                    value={formState.imageUrl}
                    onChange={(e) => updateField("imageUrl", e.target.value)}
                    placeholder="https://..."
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <div className="space-y-1.5">
                  <label className="text-[13px] font-semibold text-slate-700">
                    Giảm giá (%)
                  </label>
                  <input
                    type="number"
                    value={formState.discountAmount}
                    onChange={(e) =>
                      updateField(
                        "discountAmount",
                        parseFloat(e.target.value) || 0,
                      )
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm focus:border-blue-500 outline-none transition-all"
                  />
                </div>
                <div className="md:col-span-2 pt-8">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div
                      className={`relative flex h-6 w-11 items-center rounded-full transition-colors ${formState.isBestSeller ? "bg-blue-600" : "bg-slate-200"}`}
                    >
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={formState.isBestSeller}
                        onChange={(e) =>
                          updateField("isBestSeller", e.target.checked)
                        }
                      />
                      <div
                        className={`h-4 w-4 rounded-full bg-white transition-transform ${formState.isBestSeller ? "translate-x-6" : "translate-x-1"}`}
                      />
                    </div>
                    <span className="text-sm font-medium text-slate-700">
                      Sản phẩm bán chạy (Best Seller)
                    </span>
                  </label>
                </div>
              </div>

              {/* Sizes Section */}
              <div className="rounded-2xl border border-slate-200 p-5 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-[15px] font-bold text-slate-800">
                    Cấu hình Sizes & Giá
                  </h4>
                  <button
                    disabled={sizes.length >= ALL_SIZES.length}
                    onClick={handleAddSize}
                    className="h-8 px-4 rounded-lg bg-white border border-blue-200 text-blue-600 text-xs font-bold hover:bg-blue-600 hover:text-white transition-all disabled:opacity-50"
                  >
                    + Thêm Size
                  </button>
                </div>

                <div className="space-y-3">
                  {sizes.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-10 gap-3 bg-white p-4 rounded-xl border border-slate-100 shadow-sm items-end"
                    >
                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[11px] font-bold uppercase text-slate-400">
                          Kích thước
                        </label>
                        <select
                          value={item.size}
                          onChange={(e) =>
                            updateSize(index, "size", e.target.value)
                          }
                          className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-blue-500 outline-none"
                        >
                          <option value="">Chọn</option>
                          {getAvailableSizes(item.size).map((s) => (
                            <option key={s} value={s}>
                              {s.charAt(0).toUpperCase() + s.slice(1)}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-2 space-y-1">
                        <label className="text-[11px] font-bold uppercase text-slate-400">
                          Giá bán (đ)
                        </label>
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) =>
                            updateSize(
                              index,
                              "price",
                              parseFloat(e.target.value) || 0,
                            )
                          }
                          className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div className="md:col-span-5 space-y-1">
                        <label className="text-[11px] font-bold uppercase text-slate-400">
                          Ghi chú
                        </label>
                        <input
                          value={item.note}
                          onChange={(e) =>
                            updateSize(index, "note", e.target.value)
                          }
                          placeholder="VD: Không đá, ít đường..."
                          className="h-10 w-full rounded-lg border border-slate-200 px-3 text-sm focus:border-blue-500 outline-none"
                        />
                      </div>

                      <div className="md:col-span-1">
                        <button
                          onClick={() => removeSize(index)}
                          className="h-10 w-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors"
                        >
                          <Trash className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                  {sizes.length === 0 && (
                    <div className="text-center py-4 text-slate-400 text-sm border-2 border-dashed border-slate-200 rounded-xl">
                      Chưa có size nào. Vui lòng bấm "Thêm Size" để bắt đầu.
                    </div>
                  )}
                </div>
              </div>

              {/* Mô tả */}
              <div className="space-y-1.5">
                <label className="text-[13px] font-semibold text-slate-700">
                  Mô tả sản phẩm
                </label>
                <textarea
                  value={formState.description}
                  onChange={(e) => updateField("description", e.target.value)}
                  placeholder="Nhập thông tin giới thiệu về món ăn/đồ uống này..."
                  className="h-32 w-full rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm focus:bg-white focus:border-blue-500 outline-none transition-all resize-none"
                />
              </div>

              {formError && (
                <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600 border border-red-100 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  {formError}
                </div>
              )}
            </div>

            <div className="border-t border-slate-100 px-6 py-4 flex items-center justify-end gap-3 bg-slate-50/50">
              <button
                onClick={closeCreateModal}
                className="h-10 px-6 rounded-xl border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:bg-slate-100 transition-all"
              >
                Bỏ qua
              </button>
              <button
                onClick={saveNewProduct}
                className="h-10 px-10 rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all"
              >
                {editingProductId ? "Cập nhật sản phẩm" : "Lưu sản phẩm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
