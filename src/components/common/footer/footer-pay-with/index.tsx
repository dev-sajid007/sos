import Image from "next/image";
import style from "./footer-pay-with.module.css";
import { ICON } from "@/lib/img";

function PayWith() {
  return (
    <div className={style.footerBottom}>
      <p className={style.footerBottom__payTxt}>Pay With</p>
      <hr className={style.footerBottom__hr} />
      <Image className={style.footerBottom__allIcon} alt="" src={ICON.allPay} />
      <hr className={style.footerBottom__hr} />
      <div className={style.footerBottom__verifiedBox}>
        <p className={style.footerBottom__verTxt}> Verified by</p>
        <Image
          className={style.footerBottom__amrPay}
          alt=""
          src={ICON.amrPay}
        />
      </div>
    </div>
  );
}

export default PayWith;
