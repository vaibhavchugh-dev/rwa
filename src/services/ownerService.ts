import http from "../http-common";
import IownerDto from "../types/owners";


const getAll = () => {
  debugger;
    return http.get<Array<IownerDto>>("/owners/GetOwnerList");
  };
  
 
  const create = (data: IownerDto) => {
    debugger;
    return http.post<IownerDto>("owners/Saveowner", data);
  };


  const update = (data: IownerDto) => {
 debugger;
    return http.post<IownerDto>("/owners/Updateowners", data);
  }; 
  
  const remove = (id: any) => {
    return http.delete<any>(`/owners/Deletetowers/${id}`);
  };

  const ownerService = {
    getAll,
    create, 
    update,
    remove
  };


  
  export default ownerService;