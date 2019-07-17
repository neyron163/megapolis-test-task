import React, { ChangeEvent, useState } from "react";
import axios from "axios";
import { History } from "history";

import { onDelete, url } from "../../libs";
import { Button } from "../button/button";
import { Header } from "../header/header";
import { ItemsType, Match, DataType } from "../../types";

import s from "./item.module.scss";

interface PropsType {
  match: Match;
  history: History;
  items: Array<ItemsType>;
  setData: (data: DataType) => void;
}

export function Item({
  items,
  setData,
  match,
  history
}: PropsType): JSX.Element | null {
  const { id } = match.params;
  const [item] = useState<ItemsType | "">(
    items.find((element: ItemsType) => element.id === Number(id)) || ""
  );
  const [value, setValue] = useState<string>(item ? item.title : "");

  function onChange({ currentTarget }: ChangeEvent<HTMLInputElement>) {
    const { value } = currentTarget;
    setValue(value);
  }

  function onEdit() {
    const fetchData = async () => {
      try {
        const result = await axios({
          method: "post",
          url: `${url}${id}`,
          data: { title: value }
        });
        const { success } = result.data;

        if (success && item) {
          history.push("/");
          setData({
            data: items.map((element: ItemsType) =>
              element.title === item.title
                ? { id: element.id, title: value }
                : element
            ),
            success
          });
        }
      } catch (error) {
        // TODO need to fix
        console.log(error.message);
        window.location.href = "/";
      }
    };
    fetchData();
  }

  if (!item) return null;

  return (
    <div>
      <div key={item.id}>
        <Header>
          <div className={s.title}>Задача № {item.id}</div>
          <Button onClick={() => onDelete(setData, items, match, history)}>
            <span className={s.del}>Удалить</span>
            <i className="fas fa-trash-alt" />
          </Button>
        </Header>
        <div>Краткое описание</div>
        <input
          className={s.input}
          defaultValue={item.title}
          onChange={e => onChange(e)}
        />
        {item.title === value ? (
          <Button onClick={() => history.push(`/`)}>Вернуться к списку</Button>
        ) : (
          <Button onClick={() => onEdit()}>Сохранить</Button>
        )}
      </div>
    </div>
  );
}
