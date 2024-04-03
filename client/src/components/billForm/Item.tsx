import { useAppSelector } from "../../store/index";
import { selectMode } from "../../store/modeSlice";
import { SetStateAction, Dispatch, useEffect } from "react";
import type { Item } from "../../types/bills";
import { useState } from "react";
import { Bill } from "../../types/bills";

const Item = ({
  item: key,
  defaults = {
    name: "",
    quantity: 0,
    price: 0,
  },
  setNewBill,
}: {
  item: number;
  defaults?: Item;
  setNewBill: Dispatch<SetStateAction<Bill>>;
}) => {
  const mode = useAppSelector(selectMode);
  const [price, setPrice] = useState(defaults?.price ?? 0);
  const [qty, setQty] = useState(defaults?.quantity ?? 0);

  useEffect(() => {
    setNewBill((bill) => ({
      ...bill,
      items: bill.items.map((oneItem, index) =>
        index == key ? { ...oneItem, price, quantity: qty } : oneItem
      ),
    }));
  }, [key, price, qty, setNewBill]);

  return (
    <tr>
      <td>
        <input
          onChange={({ target: { value } }) =>
            setNewBill((bill) => ({
              ...bill,
              items: bill.items.map((oneItem, index) =>
                index == key ? { ...oneItem, name: value } : oneItem
              ),
            }))
          }
          defaultValue={defaults?.name}
          style={{
            backgroundColor: mode.color.secondary,
            color: mode.color.fontColor,
          }}
          id={`${key}-name`}
          type="text"
          minLength={4}
          required
        />
      </td>
      <td>
        <input
          style={{
            backgroundColor: mode.color.secondary,
            color: mode.color.fontColor,
          }}
          id={`${key}-qty`}
          value={qty}
          onChange={({ target: { value } }) => setQty(Number(value))}
          min={0}
          type="number"
          step={1}
          required
        />
      </td>
      <td>
        <input
          style={{
            backgroundColor: mode.color.secondary,
            color: mode.color.fontColor,
          }}
          id={`${key}-price`}
          value={price}
          onChange={({ target: { value } }) => setPrice(Number(value))}
          min={0}
          type="number"
          step={0.01}
          required
        />
      </td>
      <td>
        <input
          style={{
            backgroundColor: mode.color.secondary,
            color: mode.color.fontColor,
          }}
          id={`${key}-total`}
          type="number"
          step={0.01}
          value={price * qty}
          readOnly
          required
        />
      </td>
      <td>
        <span
          className="material-symbols-rounded"
          onClick={() => {
            setNewBill((bill) => ({
              ...bill,
              items: bill.items.filter((_, index) => index != key),
            }));
          }}
        >
          delete
        </span>
      </td>
    </tr>
  );
};
export default Item;
