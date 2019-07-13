import React from "react";
import classNames from "classnames";
import { History } from "history";

import { Button } from "../button/button";
import { Header } from "../header/header";
import { onDelete } from "../../libs";
import { DataType } from "../../types";

import s from "./items.module.scss";

interface PropsType {
  items: Array<{ id: number; title: string }>;
  setVisible: (isVisible: boolean) => void;
  setData: (data: DataType) => void;
  history: History;
}

export const Items = ({
  items,
  setVisible,
  setData,
  history
}: PropsType): JSX.Element => {
  return (
    <div className={s.items}>
      <Header>
          <div className={s.title}>Список задач</div>
          <button onClick={() => setVisible(true)}>Добавить</button>
      </Header>
      {items.map(({ id, title }) => (
        <div className={s.row} key={id}>
          <div className={classNames(s.id, s.column)}>{id}</div>
          <div className={s.description}>{title}</div>
          <div className={classNames(s.link, s.column, s.buttons)}>
            <Button color onClick={() => history.push(`${id}`)}>
              <i className="fas fa-pencil-alt" />
            </Button>
            <Button
              name="red"
              color
              onClick={() => onDelete(setData, items, id)}
            >
              <i className="fas fa-trash-alt" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
