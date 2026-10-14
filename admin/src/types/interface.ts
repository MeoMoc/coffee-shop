export type ProductSize = {
  size: string;
  price: number;
  note: string;
};

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  component: string;
  discountAmount: number;
  isBestSeller: boolean;
  sizes: ProductSize[];
}

export interface ProductCreateRequest {
  name: string;
  description: string;
  imageUrl: string;
  component: string;
  discountAmount: number;
  isBestSeller: boolean;
  sizes: ProductSize[];
}

export type Products = Product[];

export interface metaData {
  page: number;
  size: number;
  total: number;
  totalPage: number;
}

export interface Menu {
  id: string;
  name: string;
  description: string;
  products: Products;
}

export type Menus = Menu[];

export interface MenuRequest {
  name: string;
  description: string;
  productIds: string[]; // array of product IDs
}

export interface Category {
  id: string;
  name: string;
  description: string;
  menus: Menus;
}

export type Categories = Category[];

export interface CategoryRequest {
  name: string;
  description: string;
  menuIds: string[]; // array of menu IDs
}

export enum ReservationStatusE {
  "PENDING",
  "CONFIRMED",
  "CANCEL",
  "LATE",
}

export interface IReservation {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  guestNumber: number;
  scheduleTime: string;
  specialRequest: string;
  status: ReservationStatusE;
  contactBy: {
    id: string;
    username: string;
    password: string;
    role: string;
  };
}

export interface IReservationRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  guestNumber: number;
  scheduleTime: string;
  specialRequest: string;
  status: ReservationStatusE;
  contactBy?: {
    id?: string;
    username?: string;
    password?: string;
    role?: string;
  };
}
