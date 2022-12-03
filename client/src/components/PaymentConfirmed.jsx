import React from "react";
import styles from "../style";
import { payment_confirmed, yellow_battery } from "../assets";

const PaymentConfirmed = () => {
    return (
        <div>
            <div className={`${styles.flexCenter} ${styles.paddingX} flex-col`}>
                <img src={payment_confirmed} alt="payment-confirmed" className="mt-6 w-[200px] h-[200px]" />
            </div>

            <div className="flex flex-col md:mx-[8rem] mx-6 my-10">
                <div className="flex flex-col justify-center items-center text-white space-y-4">
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold">Payment Confirmed!</p>
                        <p className="font-light">Thanks for using ChargeSwap for your transactions</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-light">You can now swap the batteries</p>
                    </div>
                </div>
                <div className="flex flex-row justify-center items-center text-white md:mx-[8rem] mx-6 my-10 space-x-20">
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold">Your current battery 1:</p>
                        <img src={yellow_battery} alt="payment-confirmed" className="mt-3 w-[7rem]" />
                        <p className="font-light">Battery #13C</p>
                        <p className="font-light">98%</p>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <p className="font-bold">Your current battery 2:</p>
                        <img src={yellow_battery} alt="payment-confirmed" className="mt-3 w-[7rem]" />
                        <p className="font-light">Battery #12A</p>
                        <p className="font-light">100%</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmed;
