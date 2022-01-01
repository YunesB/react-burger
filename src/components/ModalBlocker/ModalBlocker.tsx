import ModalBlockerStyles from './ModalBlocker.module.css';
import astronaut from "../../images/astronaut.png";

const ModalBlocker = () => {
  return (
    <div className={ModalBlockerStyles.container}>
      <p className={ModalBlockerStyles.text}>
        К сожалению, сайт не адаптирован под ваше устройство, пожалуйста, попробуйте зайти с ПК, либо с ноутбука.
      </p>
      <p className={ModalBlockerStyles.text}>
        Либо можете заценить <a href="https://github.com/YunesB/react-burger" className={ModalBlockerStyles.link}>код по этой ссылке</a>, он не менее клёвый!
      </p>
      <img src={astronaut} alt="astronaut" 
        className={ModalBlockerStyles.img}
      />
    </div>
  )
};

export default ModalBlocker;
