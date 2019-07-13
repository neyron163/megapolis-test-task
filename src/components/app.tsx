import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import { Items } from "./items/items";
import { url } from "../libs";
import { DataType, MatchType } from "../types";
import { Item } from "./item/item";
import { Popup } from "./popup/popup";
import loading from "./img/loader.gif";

import s from "./app.module.scss";

export const App: React.FC = (): JSX.Element => {
  const [items, setData] = useState<DataType>({ data: [], success: false });
  const [isVisible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        url
      });
      const { data, success } = result.data;

      setData({
        data,
        success
      });
    };
    fetchData();
  }, []);

  const { data, success } = items;

  if (!data.length && !success) {
    return (
      <div className={s.wrapper}>
        <img className={s.loading} src={loading} alt="loading" />
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      {isVisible && (
        <Popup items={data} setData={setData} setVisible={setVisible} />
      )}
      <Router>
        <Route
          exact
          path="/"
          component={({ history }: MatchType) => (
            <Items
              items={data}
              setVisible={setVisible}
              setData={setData}
              history={history}
            />
          )}
        />
        <Route
          path="/:id"
          component={({ match, history }: MatchType) => (
            <Item
              match={match}
              items={data}
              setData={setData}
              history={history}
            />
          )}
        />
      </Router>
    </div>
  );
};
