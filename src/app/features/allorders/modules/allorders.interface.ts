export interface Allorders {
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  _id: string;
  user: User;
  cartItems: CartItem[];
  paidAt: Date;
  createdAt: Date;
  updatedAt: Date;
  id: number;
  __v: number;
}

export interface CartItem {
  count: number;
  _id: string;
  product: Product;
  price: number;
}

export interface Product {
  subcategory: Brand[];
  ratingsQuantity: number;
  _id: string;
  title: Title;
  imageCover: string;
  category: Brand;
  brand: Brand;
  ratingsAverage: number;
  id: string;
}

export interface Brand {
  _id: ID;
  name: Name;
  slug: Slug;
  image?: string;
  category?: ID;
}

export enum ID {
  The6407F1Bcb575D3B90Bf95797 = '6407f1bcb575d3b90bf95797',
  The64089Bbe24B25627A253158B = '64089bbe24b25627a253158b',
  The6439D58A0049Ad0B52B9003F = '6439d58a0049ad0b52b9003f',
}

export enum Name {
  DeFacto = 'DeFacto',
  WomenSClothing = "Women's Clothing",
  WomenSFashion = "Women's Fashion",
}

export enum Slug {
  Defacto = 'defacto',
  WomenSClothing = "women's-clothing",
  WomenSFashion = "women's-fashion",
}

export enum Title {
  WomanBordeauxLongSleeveBlouseBORDEAUX = 'Woman Bordeaux Long Sleeve Blouse BORDEAUX',
  WomanBrownLongSleeveTunicLTCAMEL = 'Woman Brown Long Sleeve Tunic LT.CAMEL',
  WomanShawl = 'Woman Shawl',
}

export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}
