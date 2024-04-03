import style from "./app.module.css";
import Header from "./components/header/Header";
import { useAppSelector, useAppDispatch } from "./store/index";
import { selectMode } from "./store/modeSlice";
import { getBills, selectBills } from "./store/billsSlice";
import { useEffect, useState } from "react";
import Filter from "./components/filter/Filter";
import BillSummary from "./components/billSummary/BillSummary";
import BillForm from "./components/billForm/BillForm";
import BillDetails from "./components/billDetails/BillDetails";

function App() {
  const mode = useAppSelector(selectMode);
  const { entities: bills, ids } = useAppSelector(selectBills);
  const dispatch = useAppDispatch();
  const [invoice, setInvoice] = useState({ all: true, id: -1 });
  const [showForm, setShowForm] = useState({ show: false, id: -1 });

  useEffect(() => {
    dispatch(getBills());
  }, [dispatch]);
  return (
    <div
      className={style.page}
      style={{
        backgroundColor: mode.color.main,
        color: mode.color.fontColor,
      }}
    >
      {invoice.all ? (
        <div className={style.invoicesContainer}>
          <Filter InvoiceCount={ids.length} setShowForm={setShowForm} />
          <div className={style.invoices}>
            {ids.map((id, index) => {
              return (
                <BillSummary
                  bill={bills[id]}
                  setInvoice={setInvoice}
                  key={index}
                />
              );
            })}
            {!ids.length && <div className={style.text}>No Bill Found</div>}
          </div>
        </div>
      ) : (
        <BillDetails
          id={invoice.id}
          setInvoice={setInvoice}
          setShowForm={setShowForm}
        />
      )}
      <Header />
      {showForm.show && <BillForm show={showForm} setShowForm={setShowForm} />}
    </div>
  );
}

export default App;
