import NotFoundStyles from "./NotFound.module.css";
import { Link } from "react-router-dom";

import astronaut from "../../images/astronaut.png";
import loading from "../../images/loading.svg";

function NotFound() {
  return (
    <div className={NotFoundStyles.notFound}>
      <h1 className={NotFoundStyles.title}>404</h1>
      <p className={NotFoundStyles.text}>Страница не найдена :(</p>
      <Link to="/" className={NotFoundStyles.link}>
        На главную
      </Link>
      <img src={astronaut} alt="astronaut" className={NotFoundStyles.img} />
      <img src={loading} alt="loading" className={NotFoundStyles.imgLoading} />
    </div>
  );
}

export default NotFound;
