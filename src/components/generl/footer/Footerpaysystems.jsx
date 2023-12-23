import { dataFooterPaySystems } from "../../../data/dataFooterPaySystems/dataFooterPaySystems";

export default function FooterPaySystems() {
  return dataFooterPaySystems.map((el, index) => (
    <div className={`footer-pay-systems ${el}`} key={index}></div>
  ));
}
