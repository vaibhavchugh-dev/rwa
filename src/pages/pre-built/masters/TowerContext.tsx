import React, { useState, createContext } from "react";
import { towerdata } from "./TowerData";
 

export const TowerContext = createContext(null);

export const TowerContextProvider = (props) => {
  const [data, setData] = useState(towerdata);

  return <TowerContext.Provider value={{ contextData: [data, setData] }}>{props.children}</TowerContext.Provider>;
};
