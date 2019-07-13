import React from "react";

import s from "./header.module.scss";

interface PropsType {
  children: JSX.Element[] | JSX.Element;
}

export const Header = ({ children }: PropsType): JSX.Element => (
  <header className={s.header}>{children}</header>
);
