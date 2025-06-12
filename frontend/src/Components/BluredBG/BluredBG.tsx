import React from "react";
import "./BluredBG.css";

type Props = {
  isLoading: boolean;
};

const BluredBG = ({ isLoading = true }: Props) => {
  return <div id="blurred" className={isLoading ? "active" : ""} />;
};

export default BluredBG;
