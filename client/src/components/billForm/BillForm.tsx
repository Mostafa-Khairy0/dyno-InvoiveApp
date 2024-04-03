import style from "./style.module.css";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { selectMode } from "../../store/modeSlice";
import { useState, SetStateAction, Dispatch } from "react";
import { addBill, selectBills, upsertBill } from "../../store/billsSlice";
import Item from "./Item";
import { Bill } from "../../types/bills";

const defaultBill: Bill = {
  id: -1,
  from: {
    address: {
      street: "",
      city: "",
      postCode: 0,
      country: "",
    },
  },
  to: {
    address: {
      street: "",
      city: "",
      postCode: 0,
      country: "",
    },
    name: "",
    email: "",
  },
  date: "",
  terms: "",
  projectDescription: "",
  items: [],
  status: "Pending",
};
const BillForm = ({
  show: { id },
  setShowForm,
}: {
  show: { id: number };
  setShowForm: Dispatch<SetStateAction<{ show: boolean; id: number }>>;
}) => {
  const mode = useAppSelector(selectMode);
  const bills = useAppSelector(selectBills);
  const currentBill = bills.entities[id];
  const dispatch = useAppDispatch();
  const [newBill, setNewBill] = useState<Bill>({
    ...(currentBill ?? defaultBill),
    id: id == -1 ? Math.max(...bills.ids) + 1 : id,
  });

  return (
    <div className={style.billFormContainter}>
      <form
        className={style.billForm}
        style={{
          backgroundColor: mode.color.main,
          color: mode.color.fontColor,
        }}
        onSubmit={(event) => {
          event.preventDefault();
          if (id === -1) dispatch(addBill(newBill));
          else dispatch(upsertBill(newBill));
          setShowForm({ show: false, id: -1 });
        }}
      >
        <div className={style.title}>Bill From</div>
        <div className={style.column}>
          <div className={style.inputBox}>
            <label htmlFor="street">Street Address</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  from: {
                    ...bill.from,
                    address: { ...bill.from.address, street: value },
                  },
                }))
              }
              defaultValue={currentBill?.from?.address?.street}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="street"
              type="text"
              required
            />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.inputBox}>
            <label htmlFor="city">City</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  from: {
                    ...bill.from,
                    address: { ...bill.from.address, city: value },
                  },
                }))
              }
              defaultValue={currentBill?.from?.address?.city}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="city"
              type="text"
              required
            />
          </div>
          <div className={style.inputBox}>
            <label htmlFor="post-code">Post Code</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  from: {
                    ...bill.from,
                    address: { ...bill.from.address, postCode: Number(value) },
                  },
                }))
              }
              defaultValue={currentBill?.from?.address?.postCode}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="post-code"
              type="number"
              required
            />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.inputBox}>
            <label htmlFor="country">Country</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  from: {
                    ...bill.from,
                    address: { ...bill.from.address, country: value },
                  },
                }))
              }
              defaultValue={currentBill?.from?.address?.country}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="country"
              type="text"
              required
            />
          </div>
        </div>
        <div className={style.title}>Bill To</div>{" "}
        <div className={style.column}>
          <div className={style.inputBox}>
            <label htmlFor="name">Name</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  to: {
                    ...bill.to,
                    name: value,
                  },
                }))
              }
              defaultValue={currentBill?.to?.name}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="name"
              type="text"
              required
            />
          </div>
          <div className={style.inputBox}>
            <label htmlFor="email">Email</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  to: {
                    ...bill.to,
                    email: value,
                  },
                }))
              }
              defaultValue={currentBill?.to?.email}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="email"
              type="email"
              required
            />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.inputBox}>
            <label htmlFor="to-street">Street Address</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  to: {
                    ...bill.to,
                    address: { ...bill.to.address, street: value },
                  },
                }))
              }
              defaultValue={currentBill?.to?.address?.street}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="to-street"
              type="text"
              required
            />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.inputBox}>
            <label htmlFor="to-city">City</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  to: {
                    ...bill.to,
                    address: { ...bill.to.address, city: value },
                  },
                }))
              }
              defaultValue={currentBill?.to?.address?.city}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="to-city"
              type="text"
              required
            />
          </div>
          <div className={style.inputBox}>
            <label htmlFor="to-post-code">Post Code</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  to: {
                    ...bill.to,
                    address: { ...bill.to.address, postCode: Number(value) },
                  },
                }))
              }
              defaultValue={currentBill?.to?.address?.postCode}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="to-post-code"
              type="number"
              required
            />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.inputBox}>
            <label htmlFor="to-country">Country</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  to: {
                    ...bill.to,
                    address: { ...bill.to.address, country: value },
                  },
                }))
              }
              defaultValue={currentBill?.to?.address?.country}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="to-country"
              type="text"
              required
            />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.inputBox}>
            <label htmlFor="date">Invoice Date</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  date: value,
                }))
              }
              defaultValue={currentBill?.date}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="date"
              type="date"
              required
            />
          </div>
          <div className={style.inputBox}>
            <label htmlFor="term">Payments Terms</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  terms: value,
                }))
              }
              defaultValue={currentBill?.terms}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="term"
              type="text"
              required
            />
          </div>
        </div>
        <div className={style.column}>
          <div className={style.inputBox}>
            <label htmlFor="description">Project Description</label>
            <input
              onChange={({ target: { value } }) =>
                setNewBill((bill) => ({
                  ...bill,
                  projectDescription: value,
                }))
              }
              defaultValue={currentBill?.projectDescription}
              style={{
                backgroundColor: mode.color.secondary,
                color: mode.color.fontColor,
              }}
              id="description"
              type="text"
              required
            />
          </div>
        </div>
        <div className={style.title}>Item List</div>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {newBill?.items?.map((item, index) => (
              <Item
                key={index}
                item={index}
                defaults={item}
                setNewBill={setNewBill}
              />
            ))}
          </tbody>
        </table>
        <div
          className={style.addItem}
          onClick={() => {
            const items = [
              ...newBill.items,
              { name: "", price: 0, quantity: 0 },
            ];
            setNewBill((bill) => ({ ...bill, items }));
          }}
        >
          <span className="material-symbols-rounded">add</span> Add New Item
        </div>
        <div className={style.btns}>
          <div
            className={style.btnCancle}
            onClick={() => setShowForm({ show: false, id: -1 })}
          >
            Cancle
          </div>
          <div className={style.btnSave}>
            <input type="submit" value="Save Changes" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default BillForm;
