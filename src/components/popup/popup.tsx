import React, { ChangeEvent, useState } from "react";
import axios from "axios";

import { url } from "../../libs";
import { ItemsType, DataType } from "../../types";
import { Button } from "../button/button";

import s from "./popup.module.scss";

interface PropsType {
  setData: (data: DataType) => void;
  items: Array<ItemsType>;
  setVisible: (isVisible: boolean) => void;
}

export const Popup = ({
  setData,
  items,
  setVisible
}: PropsType): JSX.Element => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  function onChange({ currentTarget }: ChangeEvent<HTMLInputElement>) {
    setValue(currentTarget.value);
  }

  function onAddClick() {
    if (!value) return setError("Заголовок не может быть пустым.");

    const fetchData = async () => {
      const result = await axios({
        headers: {
          "Content-Type": "application/json"
        },
        method: "post",
        url,
        data: { title: value }
      });
      const { success, id } = result.data;
      if (success) {
        setData({
          data: items.concat([{ title: value, id }]),
          success
        });
        setVisible(false);
      }
    };
    fetchData();
  }
  return (
    <div className={s.popup}>
      <div className={s.container}>
        <div className={s.close} onClick={() => setVisible(false)} />
        <div className={s.content}>
          <div className={s.title}>Краткое описание</div>
          <input className={s.input} onChange={e => onChange(e)} />
          <div className={s.error}>{error}</div>
          <Button onClick={() => onAddClick()}>Создать</Button>
        </div>
      </div>
    </div>
  );
};
