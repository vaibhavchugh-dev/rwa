import http from "../http-common";
import ItowerDto from "../types/tower";


const getAll = () => {
  debugger;
    return http.get<Array<ItowerDto>>("/towers/Gettowers");
  };
  

  const create = (data: ItowerDto) => {
    return http.post<ItowerDto>("/towers/SaveTower", data);
  };


  const update = (data: ItowerDto) => {
 debugger;
    return http.post<ItowerDto>("/towers/UpdateTower", data);
  }; 
  
  const remove = (id: any) => {
    return http.delete<any>(`/towers/Deletetowers/${id}`);
  };

  const towerService = {
    getAll,
    create, 
    update,
    remove
  };


  
  export default towerService;