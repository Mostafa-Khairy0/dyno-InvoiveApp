import style from "./style.module.css";
import { useAppSelector } from "../../store/index";
import { selectMode } from "../../store/modeSlice";
import type { Dispatch, SetStateAction } from "react";
const Filter = ({
  InvoiceCount,
  setShowForm,
}: {
  InvoiceCount: number;
  setShowForm: Dispatch<SetStateAction<{ show: boolean; id: number }>>;
}) => {
  const mode = useAppSelector(selectMode);
  return (
    <div
      className={style.filter}
      style={{
        color: mode.color.fontColor,
      }}
    >
      <div className={style.name}>
        <div className={style.title}>Invoice</div>
        <div className={style.total}>
          <span className={style.disable}>there are </span>
          {InvoiceCount} <span className={style.disable}>total</span> invoices
        </div>
      </div>
      <div className={style.filters}>
        <div
          className={style.addInvoice}
          onClick={() => setShowForm({ show: true, id: -1 })}
        >
          <div className={style.icon}>
            <span className="material-symbols-rounded">add</span>
          </div>
          <div className={style.text}>
            New <span className={style.disable}>Invoice</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
