import { NavLink, useLocation } from "react-router-dom";

const navItems: Array<{ label: string; to?: string }> = [
  { label: "Sản phẩm", to: "/products" },
  { label: "Nhóm sản phẩm", to: "/menus" },
  { label: "Danh mục", to: "/categories" },
  { label: "Danh sách đặt bàn", to: "/bookings" },
];

const NavigationBar = () => {
  return (
    <nav className="relative z-40 bg-primary">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-6">
        <div className="flex items-center">
          {navItems.map((item) => {
            if (item.to) {
              return (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end
                  className={({ isActive }) =>
                    `my-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                      isActive
                        ? "bg-primary-dark/95 text-primary-foreground"
                        : "text-primary-foreground/85 hover:bg-primary-dark/60 hover:text-primary-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              );
            }

            return (
              <button
                key={item.label}
                className="my-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-foreground/85 transition-colors hover:bg-primary-dark/60 hover:text-primary-foreground"
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavigationBar;
