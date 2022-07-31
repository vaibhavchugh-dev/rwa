import React from "react";
import ItowerData from "../../types/tower";
import http from "../../http-common";

import TowerDataService from  "../../services/towerService";

function CharacterDropDown() {
  const [loading, setLoading] = React.useState(true);
  const [items, setItems] = React. useState<Array<ItowerData>>([])
  const [value, setValue] = React.useState("R2-D2");
  React.useEffect(() => {
    let unmounted = false;
    async function getCharacters() {
   
      if (!unmounted) {
        TowerDataService.getAll()
          .then((response: any) => {
             setItems(response.data);
            console.log(response.data);
          })
          .catch((e: Error) => {
            console.log(e);
          });
     
        setLoading(false);
      }
    }
    getCharacters();
    return () => {
      unmounted = true;
    };
  }, []);

  

  return (
    <select
      disabled={loading}
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
    >
      {items.map(({ name, id }) => (
        <option value={id}>
          {name}
        </option>
      ))}
    </select>
  );
}

export default function App() {
  return (
    <div className="App">
      <CharacterDropDown  />
    </div>
  );
}
