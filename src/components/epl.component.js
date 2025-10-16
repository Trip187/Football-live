import { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./epl.styles.module.css";

const eplComponent = () => {
  return (
    <Fragment>
      <ul>
        <li>
          <Link className={classes["link-list"]}>Fixtures</Link>
        </li>
        <li>
          <Link className={classes["link-list"]}>Results</Link>
        </li>
        <li>
          <Link className={classes["link-list"]}>Standings</Link>
        </li>
        <li>
          <Link className={classes["link-list"]}>Top Scorers</Link>
        </li>
      </ul>
    </Fragment>
  );
};
export default eplComponent;
