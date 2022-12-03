import styles from "../style";
import Button from "./Button";
import { BsFillLightningChargeFill } from "react-icons/bs";

const CTA = () => (
  <section id="get-started" className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-black-gradient-2 rounded-[20px] box-shadow`}>
    <div className="flex-1 flex flex-col">
      <h2 className={styles.heading2}>Let's try our service now!</h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
        The most secure and advanced ecosystem, to power your EVs on the go.
      </p>
    </div>

    <div className={`${styles.flexCenter} sm:ml-10 ml-0 sm:mt-0 mt-10`}>
      <Button text="Get Started" icon={BsFillLightningChargeFill}/>
    </div>
  </section>
);

export default CTA;