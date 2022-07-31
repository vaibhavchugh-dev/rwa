import http from "../http-common";
import IVistiorDto from "../types/visitor";


const getAll = () => {
  debugger;
    return http.get<Array<IVistiorDto>>("/visitor/GetvisitorList");
  };
  
 
  const create = (data: IVistiorDto) => {
    debugger;
    return http.post<IVistiorDto>("visitor/Savevisitor", data);
  };


  const update = (data: IVistiorDto) => {
 debugger;
    return http.post<IVistiorDto>("/visitor/Updatevisitor", data);
  }; 
  
  const remove = (id: any) => {
    return http.delete<any>(`/visitor/Deletevisitor/${id}`);
  };

  const vistiorService = {
    getAll,
    create, 
    update,
    remove
  };


  
  export default vistiorService;