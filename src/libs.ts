import axios from "axios";

import { DataType, ItemsType } from "./types";
import { History } from "history";

export const url = "https://test.megapolis-it.ru/api/list/";

export function onDelete(
  setData: (data: DataType) => void,
  items: Array<ItemsType>,
  match?: any,
  history?: History
) {
  let id: string = history ? match.params.id : match;
  const fetchData = async () => {
    try {
      const result = await axios({
        method: "delete",
        url: `${url}${id}`
      });
      const { success } = result.data;
      if (success && history) history.push("/");

      setData({
        data: items.filter((element: ItemsType) => element.id !== Number(id)),
        success
      });
    } catch (error) {
      console.log(error.message);
      window.location.href = "/";
    }
  };
  fetchData();
}
