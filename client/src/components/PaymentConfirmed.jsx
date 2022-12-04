import React from "react";
import styles from "../style";
import { payment_confirmed, yellow_battery } from "../assets";

const PaymentConfirmed = () => {
  return (
    <div>
      <div className={`${styles.flexCenter} ${styles.paddingX} flex-col`}>
        <div className="mt-6 wrapper">
          {" "}
          <svg
            class="checkmark"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 52 52"
          >
            {" "}
            <circle
              class="checkmark__circle"
              cx="26"
              cy="26"
              r="25"
              fill="none"
            />{" "}
            <path
              class="checkmark__check"
              fill="none"
              d="M14.1 27.2l7.1 7.2 16.7-16.8"
            />
          </svg>
        </div>
        {/* <img
          src={payment_confirmed}
          alt="payment-confirmed"
          
        /> */}
      </div>

      <div className="flex flex-col md:mx-[8rem] mx-6 my-10">
        <div className="flex flex-col justify-center items-center text-white space-y-4">
          <div className="flex flex-col justify-center items-center">
            <p className="text-gradient font-bold">Payment Confirmed!</p>
            <p className="text-white font-bold font-poppins text-xl">
              Thanks for using ChargeSwap for your transactions
            </p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-dimWhite font-bold font-poppins text-xl">
              You can now safely eject the batteries
            </p>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center text-white md:mx-[8rem] mx-6 my-10 space-x-20">
          <div className="flex flex-col justify-center items-center">
            <p className="text-white font-bold font-poppins">
              Your current battery 1:
            </p>
            <img
              src={yellow_battery}
              alt="payment-confirmed"
              className="mt-3 w-[7rem]"
            />
            <p className="font-light">Battery #13C</p>
            <p className="font-light">98%</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="font-bold">Your current battery 2:</p>
            <img
              src={yellow_battery}
              alt="payment-confirmed"
              className="mt-3 w-[7rem]"
            />
            <p className="font-light">Battery #12A</p>
            <p className="font-light">100%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmed;
