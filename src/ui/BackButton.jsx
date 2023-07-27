import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCreditCard,
  faGear,
  faBolt,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function BackButton(props) {
  return (
    <>
      <Link to={props.to}>
        <FontAwesomeIcon
          icon={faArrowLeft}
          style={{ color: "var(--red)", height: "35px", marginBottom: "15px" }}
        />
      </Link>
    </>
  );
}
