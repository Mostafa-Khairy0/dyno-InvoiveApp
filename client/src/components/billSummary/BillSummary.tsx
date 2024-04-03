import style from "./style.module.css";
import type { Bill } from "../../types/bills";
import { useAppSelector } from "../../store/index";
import { selectMode } from "../../store/modeSlice";
import type { Dispatch, SetStateAction } from "react";
const BillSummary = ({
  bill,
  setInvoice,
}: {
  bill: Bill;
  setInvoice: Dispatch<
    SetStateAction<{
      all: boolean;
      id: number;
    }>
  >;
}) => {
  const mode = useAppSelector(selectMode);
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
    <div
      className={style.billSummary}
      style={{
        backgroundColor: mode.color.secondary,
        color: mode.color.fontColor,
      }}
    >
      <div className={`${style.item} ${style.id}`}>#{bill.id}</div>
      <div className={`${style.item} ${style.box}`}>
        <div className={`${style.item} ${style.data}`}>
          {new Date(bill.date).toDateString()}
        </div>
        <div className={`${style.item} ${style.price}`}>
          {`$`}
          {bill.items?.reduce(
            (accumulator, { price, quantity }) =>
              accumulator + price * quantity,
            0
          )}
        </div>
      </div>
      <div className={`${style.item} ${style?.name}`}>{bill.to?.name}</div>
      <div
        className={`${style.item} ${style.status}`}
        style={{
          // @ts-expect-error for declare variable
          "--status": `var(${color})`,
          "--status-opacity": `var(${color}-opacity)`,
        }}
      >
        <p className={style.statusText}>{bill.status}</p>
      </div>
      <span
        className="material-symbols-rounded"
        onClick={() => setInvoice({ all: false, id: bill.id })}
      >
        chevron_right
      </span>
    </div>
  );
};

export default BillSummary;
