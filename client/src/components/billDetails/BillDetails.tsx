import { Dispatch, SetStateAction } from "react";
import style from "./style.module.css";
import { useAppSelector, useAppDispatch } from "../../store/index";
import { selectMode } from "../../store/modeSlice";
import { selectBills, removeBill, upsertBill } from "../../store/billsSlice";

const BillDetails = ({
  id,
  setInvoice,
  setShowForm,
}: {
  id: number;
  setInvoice: Dispatch<
    SetStateAction<{
      all: boolean;
      id: number;
    }>
  >;
  setShowForm: Dispatch<SetStateAction<{ show: boolean; id: number }>>;
}) => {
  const mode = useAppSelector(selectMode);
  const bills = useAppSelector(selectBills);
  const bill = bills.entities[id];
  const dispatch = useAppDispatch();
  let color = "";
  switch (bill.status) {
    case "Draft":
      color = "--muted-gray";
      break;
    case "Pending":
      color = "--vivid-orange";
      break;
    case "Paid":
      color = "--vibrant-green";
      break;
  }
  return (
    <div className={style.billDetails}>
      <div
        className={style.goback}
        onClick={() => {
          setInvoice({ all: true, id: -1 });
        }}
      >
        <span className="material-symbols-rounded">arrow_back_ios</span>
        Go Back
      </div>
      <div
        className={style.status}
        style={{
          backgroundColor: mode.color.secondary,
          color: mode.color.fontColor,
          // @ts-expect-error for declare variable
          "--status": `var(${color})`,
          "--status-opacity": `var(${color}-opacity)`,
        }}
      >
        <div className={style.text}>Status: </div>
        <div className={style.statusValue}>{bill.status}</div>
      </div>
      <div className={style.actions}>
        <div
          className={style.edit}
          style={{
            backgroundColor: mode.color.main,
            color: mode.color.fontColor,
          }}
          onClick={() => {
            setShowForm({ id, show: true });
          }}
        >
          Edit
        </div>
        <div
          className={style.delete}
          onClick={() => {
            dispatch(removeBill(id));
            setInvoice({ all: true, id: -1 });
          }}
        >
          Delete
        </div>
        {bill.status != "Paid" && (
          <div
            className={style.toPaid}
            onClick={() => {
              dispatch(upsertBill({ ...bill, status: "Paid" }));
            }}
          >
            Make It Paid
          </div>
        )}
      </div>
      <div
        className={style.bill}
        style={{
          backgroundColor: mode.color.secondary,
          color: mode.color.fontColor,
        }}
      >
        <div className={style.row}>
          <div className={style.box}>
            <div className={style.bold}>#{bill.id}</div>
            <div className={style.light}>Project Terms</div>
            <div className={style.bold}>{bill.terms}</div>
          </div>
          <div className={style.box}>
            <div className={style.light}>{bill.from.address.street}</div>
            <div className={style.light}>{bill.from.address.city}</div>
            <div className={style.light}>{bill.from.address.postCode}</div>
            <div className={style.light}>{bill.from.address.country}</div>
          </div>
        </div>
        <div className={style.row}>
          <div className={style.box}>
            <div className={style.light}>Invoice Date</div>
            <div className={style.bold}>
              {new Date(bill.date).toDateString()}
            </div>
            <div className={style.light}>Project Terms</div>
            <div className={style.bold}>{bill.terms}</div>
          </div>
          <div className={style.box}>
            <div className={style.light}>Bill To</div>
            <div className={style.bold}>{bill.to.name}</div>
            <div className={style.light}>{bill.to.address.street}</div>
            <div className={style.light}>{bill.to.address.city}</div>
            <div className={style.light}>{bill.to.address.postCode}</div>
            <div className={style.light}>{bill.to.address.country}</div>
          </div>
          <div className={style.box}>
            <div className={style.light}>Sent To</div>
            <div className={style.bold}>{bill.to.email}</div>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {bill.items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price}</td>
                <td>${item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3}>Invoice Cost</td>
              <td colSpan={1}>
                $
                {bill.items.reduce(
                  (prev, curr) => prev + curr.price * curr.quantity,
                  0
                )}
              </td>
            </tr>
          </tfoot>
        </table>
        <div className={style.items}>{}</div>
      </div>
    </div>
  );
};

export default BillDetails;
