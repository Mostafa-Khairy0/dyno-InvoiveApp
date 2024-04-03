import axios from "axios";
import type { Bill } from "../types/bills";

export const jsonServer = axios.create({
  baseURL: "https://dyno-invoiveapp.onrender.com",
});

export const getAllBills = async (): Promise<Bill[]> | never => {
  try {
    const res = await jsonServer.get("bills");
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const setBill = async (bill: Bill): Promise<void> | never => {
  try {
    await jsonServer.post(`bills`, bill);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBill = async (
  id: number,
  bill: Bill
): Promise<void> | never => {
  try {
    console.log({ bill });
    await jsonServer.put(`bills/${id}`, bill);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteBill = async (id: number): Promise<void> | never => {
  try {
    await jsonServer.delete(`bills/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
