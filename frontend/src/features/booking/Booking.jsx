import { useState } from "react";
import { Form, Input, DatePicker } from "antd";
import dayjs from "dayjs";
import { CheckCircle } from "lucide-react";
import Layout from "../../components/layout/Layout";
import useTitle from "../../hooks/useTitle";
import { useCreateReservation } from "../../services/index";
import "./booking.styled.scss";

const Booking = () => {
  const { TextArea } = Input;
  const [form] = Form.useForm();
  const [submitted, setSubmitted] = useState(false);

  const { mutate, isPending } = useCreateReservation();

  useTitle("Đặt bàn");

  const onFinish = (values) => {
    const payload = {
      customerName: values.customerName,
      phone: values.phone,
      email: values.email,
      guestNumber: Number(values.guestNumber),
      scheduleTime: values.scheduleTime.toISOString(),
      specialRequest: values.specialRequest || "",
      status: "PENDING",
    };

    mutate(payload, {
      onSuccess: () => {
        form.resetFields();
        setSubmitted(true);
      },
      onError: (err) => {
        console.error("Booking error:", err);
      },
    });
  };

  return (
    <Layout>
      <div className="booking-page">
        {/* Hero */}
        <section
          className="booking-hero"
          style={{ backgroundImage: "url('/images/booking-hero.webp')" }}
        />

        {/* Form area */}
        <section className="booking-body">
          <div className="booking-card">
            {submitted ? (
              <div className="booking-success">
                <CheckCircle size={56} strokeWidth={1.5} />
                <h2>Đặt bàn thành công!</h2>
                <p>Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ xác nhận sớm nhất.</p>
                <button className="booking-btn" onClick={() => setSubmitted(false)}>
                  Đặt bàn khác
                </button>
              </div>
            ) : (
              <>
                <div className="booking-card__header">
                  <h2>Thông tin đặt bàn</h2>
                  <p>Vui lòng điền đầy đủ thông tin bên dưới</p>
                </div>

                <Form
                  layout="vertical"
                  form={form}
                  onFinish={onFinish}
                  className="booking-form"
                >
                  <div className="booking-form__grid">
                    <Form.Item
                      label="Tên khách hàng"
                      name="customerName"
                      rules={[{ required: true, message: "Vui lòng nhập tên" }]}
                    >
                      <Input placeholder="Nguyễn Văn A" />
                    </Form.Item>

                    <Form.Item
                      label="Số điện thoại"
                      name="phone"
                      rules={[
                        { required: true, message: "Vui lòng nhập số điện thoại" },
                        { pattern: /^0\d{9}$/, message: "Phải 10 số, bắt đầu bằng 0" },
                      ]}
                    >
                      <Input placeholder="0xxxxxxxxx" />
                    </Form.Item>

                    <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                        { required: true, message: "Vui lòng nhập email" },
                        { type: "email", message: "Email không hợp lệ" },
                      ]}
                    >
                      <Input placeholder="example@email.com" />
                    </Form.Item>

                    <Form.Item
                      label="Số lượng khách"
                      name="guestNumber"
                      rules={[
                        { required: true, message: "Vui lòng nhập số khách" },
                        { pattern: /^[1-9]\d*$/, message: "Phải là số nguyên dương" },
                      ]}
                    >
                      <Input placeholder="2" type="number" min={1} />
                    </Form.Item>
                  </div>

                  <Form.Item
                    label="Thời gian đặt bàn"
                    name="scheduleTime"
                    rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
                  >
                    <DatePicker
                      showTime
                      style={{ width: "100%" }}
                      placeholder="Chọn ngày & giờ"
                      disabledDate={(current) =>
                        current && current < dayjs().startOf("day")
                      }
                      disabledTime={(current) => {
                        const min = 7, max = 21;
                        const now = dayjs();
                        const baseHours = Array.from({ length: 24 }, (_, i) => i)
                          .filter((i) => i < min || i > max);
                        if (current?.isSame(now, "day")) {
                          return {
                            disabledHours: () => [...new Set([...baseHours, ...Array.from({ length: now.hour() }, (_, i) => i)])],
                            disabledMinutes: (h) =>
                              h === now.hour() ? Array.from({ length: now.minute() }, (_, i) => i) : [],
                          };
                        }
                        return { disabledHours: () => baseHours };
                      }}
                    />
                  </Form.Item>

                  <Form.Item label="Yêu cầu đặc biệt" name="specialRequest">
                    <TextArea placeholder="Ví dụ: bàn gần cửa sổ, không hút thuốc, sinh nhật..." rows={3} />
                  </Form.Item>

                  <Form.Item>
                    <button
                      type="submit"
                      className="booking-btn"
                      disabled={isPending}
                    >
                      {isPending ? "Đang gửi..." : "Xác nhận đặt bàn"}
                    </button>
                  </Form.Item>
                </Form>
              </>
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Booking;
