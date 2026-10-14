import { useState } from "react";
import TopHeader from "@/components/TopHeader";
import NavigationBar from "@/components/NavigationBar";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronsLeft,
  Pencil,
  Users,
  Calendar,
  Mail,
  Phone,
  X,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useReservations, useUpdateReservation } from "@/services"; // Đảm bảo export này tồn tại
import { toast } from "react-toastify";

const StatusBadge = ({ status }: { status: string }) => {
  const styles: Record<string, string> = {
    PENDING: "bg-yellow-50 text-yellow-600 border-yellow-100",
    CONFIRMED: "bg-green-50 text-green-600 border-green-100",
    CANCELLED: "bg-red-50 text-red-600 border-red-100",
    COMPLETED: "bg-blue-50 text-blue-600 border-blue-100",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider border ${styles[status] || "bg-gray-50 text-gray-600 border-gray-100"}`}
    >
      {status}
    </span>
  );
};

const formatDateTime = (dateString: string) => {
  if (!dateString) return "---";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

const Bookings = () => {
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 10;
  const { data, isLoading } = useReservations(page, PAGE_SIZE);

  // States cho Popup sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReservation, setEditingReservation] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const updateMutation = useUpdateReservation();

  // State quản lý dữ liệu form
  const [formData, setFormData] = useState({
    status: "",
    scheduleTime: "",
    guestNumber: 0,
    specialRequest: "",
    phone: "",
    email: "",
  });

  const handleEditClick = (item: any) => {
    setEditingReservation(item);
    setFormData({
      status: item.status,
      scheduleTime: item.scheduleTime ? item.scheduleTime.substring(0, 16) : "",
      guestNumber: item.guestNumber,
      specialRequest: item.specialRequest || "",
      phone: item.phone || "",
      email: item.email || "",
    });
    setIsModalOpen(true);
  };

  const handleUpdateReservation = async () => {
    try {
      await updateMutation.mutateAsync({
        id: editingReservation.id,
        data: formData as any, // Gửi toàn bộ object đã sửa
      });
      toast.success("Cập nhật thông tin thành công");
      setIsModalOpen(false);
    } catch (error) {
      toast.error("Không thể cập nhật thông tin");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <TopHeader />
      <NavigationBar />

      <div className="mx-auto w-full max-w-[1440px] px-8 pb-10 pt-6">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Quản lý đặt bàn
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              Xem và quản lý các yêu cầu đặt bàn từ khách hàng theo thời gian
              thực.
            </p>
          </div>

          <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5">
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Tổng lượt đặt
              </p>
              <p className="text-2xl font-black text-blue-600 leading-tight">
                {data?.meta?.total || 0}
              </p>
            </div>
            <div className="h-10 w-[1px] bg-slate-100"></div>
            <div className="bg-blue-50 p-2 rounded-xl">
              <Users className="text-blue-600 h-6 w-6" />
            </div>
          </div>
        </div>

        <main className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50 text-slate-600">
                  <th className="px-6 py-4 text-left font-semibold">
                    Khách hàng
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Liên hệ</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Số khách
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Thời gian
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Yêu cầu</th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Trạng thái
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">
                    Phụ trách
                  </th>
                  <th className="px-6 py-4 text-center font-semibold">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="h-8 w-8 animate-spin rounded-full border-3 border-blue-600 border-t-transparent"></div>
                        <p className="text-slate-500 font-medium animate-pulse">
                          Đang tải dữ liệu...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  data?.data?.map((item: any) => (
                    <tr
                      key={item.id}
                      className="group transition-colors hover:bg-blue-50/30"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {item.customerName}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-slate-600 font-medium">
                            <Phone className="h-3 w-3 text-slate-400" />{" "}
                            {item.phone}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                            <Mail className="h-3 w-3" /> {item.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center justify-center text-slate-700 font-bold">
                          {item.guestNumber}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center text-slate-700">
                          <span>{formatDateTime(item.scheduleTime)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p
                          className="max-w-[180px] truncate text-slate-500 italic text-xs px-2 py-1"
                          title={item.specialRequest}
                        >
                          {item.specialRequest || "Không có yêu cầu"}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <StatusBadge status={item.status} />
                      </td>
                      <td className="px-6 py-4">
                        {item.contactBy?.username ? (
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-sm">
                              {item.contactBy.username[0].toUpperCase()}
                            </div>
                            <span className="text-slate-700 font-medium text-xs">
                              {item.contactBy.username}
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-300 text-xs italic">
                            Chưa tiếp nhận
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {data?.meta && (
            <div className="flex items-center justify-between border-t border-slate-100 px-6 py-4 text-xs font-medium text-slate-500 bg-slate-50/30">
              <span>
                Trang {page + 1} / {data.meta.totalPage}
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage((p) => p - 1)}
                  disabled={page === 0}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div className="px-3.5 py-1 bg-blue-600 text-white rounded-lg mx-1 shadow-sm font-bold">
                  {page + 1}
                </div>
                <button
                  onClick={() => setPage((p) => p + 1)}
                  disabled={page >= data.meta.totalPage - 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setPage(data.meta.totalPage - 1)}
                  disabled={page >= data.meta.totalPage - 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 transition-all"
                >
                  <ChevronsRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Popup sửa trạng thái */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl animate-in fade-in zoom-in duration-200 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-900">
                Chi tiết đặt bàn
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-full p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-600 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Tên khách hàng - Read Only */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                  Khách hàng (Không thể sửa)
                </p>
                <h4 className="font-bold text-slate-700 text-lg">
                  {editingReservation?.customerName}
                </h4>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Thời gian */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">
                    Thời gian đến
                  </label>
                  <input
                    type="datetime-local"
                    value={formData.scheduleTime}
                    onChange={(e) =>
                      setFormData({ ...formData, scheduleTime: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                  />
                </div>
                {/* Số khách */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">
                    Số lượng khách
                  </label>
                  <input
                    type="number"
                    value={formData.guestNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        guestNumber: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Liên hệ */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">
                    Số điện thoại
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 ml-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Yêu cầu đặc biệt */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 ml-1">
                  Yêu cầu đặc biệt
                </label>
                <textarea
                  rows={2}
                  value={formData.specialRequest}
                  onChange={(e) =>
                    setFormData({ ...formData, specialRequest: e.target.value })
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none transition-all resize-none"
                  placeholder="Ghi chú thêm..."
                />
              </div>

              {/* Trạng thái */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-700 ml-1">
                  Trạng thái đơn hàng
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {["PENDING", "CONFIRMED", "COMPLETED", "CANCELLED"].map(
                    (status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setFormData({ ...formData, status })}
                        className={`py-2 rounded-lg border-2 text-[10px] font-black transition-all ${
                          formData.status === status
                            ? "border-blue-600 bg-blue-50 text-blue-700 shadow-sm"
                            : "border-slate-100 bg-white text-slate-400 hover:border-slate-200"
                        }`}
                      >
                        {status}
                      </button>
                    ),
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-50">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleUpdateReservation}
                  disabled={updateMutation.isPending}
                  className="px-8 py-2.5 rounded-xl bg-blue-600 text-sm font-bold text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Đang lưu..." : "Cập nhật đơn"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
