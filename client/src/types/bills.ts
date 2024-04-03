export type Status = "Paid" | "Pending" | "Draft";
export interface Address {
  street: string;
  city: string;
  postCode: number;
  country: string;
}

export interface Item {
  name: string;
  quantity: number;
  price: number;
}

export interface UserInfo {
  address: Address;
  name?: string;
  email?: string;
}

export interface Bill {
  id: number;
  from: UserInfo;
  to: Required<UserInfo>;
  date: string;
  terms: string;
  projectDescription: string;
  items: Item[];
  status: Status;
}
