import { FormEvent } from "react";
import { Bill } from "../../types/bills";

const getValue = <T extends HTMLInputElement>(input: T) => {
  return input.value;
};

const submitHandler = (event: any, id: number): Bill => {
  event.preventDefault();
  /**
   *  0  input#street
      1  input#city
      2  input#post-code
      3  input#country
      4  input#name
      5  input#email
      6  input#to-street
      7  input#to-city
      8  input#to-post-code
      9  input#to-country
      10 input#date
      11 input#term 
      12 input#description
      13 input#0-name
      14 input#0-qty
      15 input#0-price
      1 input#0-total
      1 input#1-name
      1 input#1-qty
      1 input#1-price
      1 input#1-total
  */
  const bill: Bill = {
    id,
    from: {
      address: {
        street: event?.street,
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
  console.log(event, id);
  return bill;
};
export default submitHandler;
