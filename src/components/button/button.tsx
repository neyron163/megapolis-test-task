import React from "react";
import classNames from "classnames";

import s from "./button.module.scss";

interface PropsType {
  children: JSX.Element[] | JSX.Element | string | number;
  onClick?: () => void;
  name?: string;
  color?: boolean;
}

export const Button = ({
  children,
  onClick,
  name,
  color
}: PropsType): JSX.Element => (
  <button
    className={classNames(name && s[name], s.btn, { [s.color]: color })}
    onClick={onClick}
  >
    {children}
  </button>
);
