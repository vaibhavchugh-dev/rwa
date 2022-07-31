import React, { useContext, useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";


import VisitorDataService from  "../../services/vistiorService";
import IVisitorData from "../../types/visitor";
import IVisitorList from "../../types/visitorlist";

 
import ItowerData from "../../types/tower";

  
  
import TowerDataService from  "../../services/towerService";


import {
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  UncontrolledDropdown,
  Modal,
  ModalBody,
  DropdownItem,
  Form,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockDes,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Icon,
  Row,
  Col,
  UserAvatar,
  PaginationComponent,
  Button,
  DataTable,
  DataTableBody,
  DataTableHead,
  DataTableRow,
  DataTableItem,
  TooltipComponent,
  RSelect,
} from "../../components/Component";
 
import { bulkActionOptions, findUpper } from "../../utils/Utils";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
 

const VisitorPage = () => {


  const retrieveVisitor = () => {
    debugger;
    VisitorDataService.getAll()
      .then((response: any) => {
        debugger;
        setData(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

 
  const [data, setData] =  useState<Array<IVisitorList>>([]) ;

  const [sm, updateSm] = useState(false);
  const [tablesm, updateTableSm] = useState(false);
  const [onSearch, setonSearch] = useState(true);
  const [onSearchText, setSearchText] = useState("");
  const [modal, setModal] = useState({
    edit: false,
    add: false,
  });
  const [editId, setEditedId] = useState();
  const [formData, setFormData] = useState({
  
   
 
date :null,
visitorname: "",
address: "",
phone: "",
vehicleNo: "",
vehicleType: "",
purpose: "",
flatno: "",
towerid: "",
inTime: "",
outTime: "",
isRoutine: "",
    
  });
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const initialVisitorState = {
    

    id:  null,
    date :null,
    visitorname: "",
    address: "",
    phone: "",
    vehicleNo: "",
    vehicleType: "",
    purpose: "",
    flatno: "",
    towerid: "",
    inTime: "",
    outTime: "",
    isRoutine: "" 
    
  };
  const [Visitorsave, setVisitorsave] = useState<IVisitorData>(initialVisitorState);

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.visitorname.localeCompare(b.visitorname));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.visitorname.localeCompare(a.visitorname));
      setData([...sortedData]);
    }
  };

  // unselects the data on mount
  useEffect(() => {
    retrieveVisitor();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return (
          item.visitorname.toLowerCase().includes(onSearchText.toLowerCase()) 
         
        );
      });
      setData([...filteredObject]);
    } else {
      setData([...data]);
    }
  }, [onSearchText, setData]);

  // function to set the action to be taken in table header
  const onActionText = (e) => {
    setActionText(e.value);
  };

  // onChange function for searching name
  const onFilterChange = (e) => {
    setSearchText(e.target.value);
  };

  

  // function to reset the form
  const resetForm = () => {
    setFormData({
      
 
date :null,
visitorname: "",
address: "",
phone: "",
vehicleNo: "",
vehicleType: "",
purpose: "",
flatno: "",
towerid: "",
inTime: "",
outTime: "",
isRoutine: "",
      
    });
  };

  // function to close the form modal
  const onFormCancel = () => {
    setModal({ edit: false, add: false });
    resetForm();
  };

  // submit function to add a new item
  const onFormSubmit = (submitData) => {
    debugger;
    const { gdate,gvisitorname, gaddress,gphone, gvehicleNo,gvehicleType,gpurpose,gflatno,gtowerid,ginTime,goutTime,gisRoutine,gtowername,gowner} = submitData;
    debugger;
    let submittedData = {
     
    
 
date :gdate,
visitorname: gvisitorname,
address: gaddress,
phone: gphone,
vehicleNo: gvehicleNo,
vehicleType: gvehicleType,
purpose: gpurpose,
flatno: gflatno,
towerid:gtowerid,
inTime:ginTime,
outTime: goutTime,
isRoutine: gisRoutine,
towername:gtowername,
owner :gowner
    };

    
    setData([submittedData, ...data]);

    VisitorDataService.create(submittedData)
    .then((response: any) => {
           
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
    resetForm();
    setModal({ edit: false, add: false });
  };

  // submit function to update a new item
  const onEditSubmit = (submitData) => {
   
    const { gdate,gvisitorname, gaddress,gphone, gvehicleNo,gvehicleType,gpurpose,gflatno,gtowerid,ginTime,goutTime,gisRoutine} = submitData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        debugger;
        submittedData = {
          id: item.id,
          date :gdate,
          visitorname: gvisitorname,
          address: gaddress,
          phone: gphone,
          vehicleNo: gvehicleNo,
          vehicleType: gvehicleType,
          purpose: gpurpose,
          flatno: gflatno,
          towerid:gtowerid,
          inTime:ginTime,
          outTime: goutTime,
          isRoutine: gisRoutine,
        

        };


        
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    VisitorDataService.update(submittedData)
    .then((response: any) => {
      debugger;
      setVisitorsave({
        
       
        date :submittedData.date,
        visitorname:submittedData.visitorname,
        address: submittedData.address,
        phone: submittedData.phone,
        vehicleNo: submittedData.vehicleNo,
        vehicleType: submittedData.vehicleType,
        purpose: submittedData.purpose,
        flatno: submittedData.flatno,
        towerid:submittedData.towerid,
        inTime:submittedData.inTime,
        outTime: submittedData.outTime,
        isRoutine: submittedData.isRoutine,

     
      });
      
      
      console.log(response.data);
    })
    .catch((e: Error) => {
      console.log(e);
    });
    setModal({ edit: false, add: false });
    resetForm();
  };

  // function that loads the want to editted data
  const onEditClick = (id) => {
    debugger;
    data.forEach((item) => {
      if (item.id === id) {
        debugger;
        setFormData({
     
          date :item.date,
          visitorname:item.visitorname,
          address: item.address,
          phone: item.phone,
          vehicleNo: item.vehicleNo,
          vehicleType: item.vehicleType,
          purpose: item.purpose,
          flatno: item.flatno,
          towerid:item.towerid,
          inTime:item.inTime,
          outTime: item.outTime,
          isRoutine: item.isRoutine,
        });
        setModal({ edit: true, add: false });
        setEditedId(id);

        
      }
    });
  };


  // function that loads the want to editted data
  const onDeleteClick = (id) => {
    debugger;
   
      
        VisitorDataService.remove(id)
        .then((response: any) => {
        
          console.log(response.data);
         
        })
        .catch((e: Error) => {
          console.log(e);
        });
        setModal({ edit: false, add: false });
        resetForm();
        retrieveVisitor();  
     
    
    
     
  };
  

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);
debugger;
  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

 
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
    <React.Fragment>
      <Head title="Owners List"></Head>
      <Content>
        
        <BlockHead size="sm" className={undefined} wide={undefined}>
          <BlockBetween className={undefined}>
            <BlockHeadContent className={undefined}>
              <BlockTitle tag="h3" page className={undefined}>
                Visitor Register
              </BlockTitle>
              
            </BlockHeadContent>

            
            <BlockHeadContent className={undefined}>
            <div className="toggle-wrap nk-block-tools-toggle">
              
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                     
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <Icon className="d-none d-sm-inline" name="calender-date" id={undefined} style={undefined} />
                          <span>
                            <span className="d-none d-md-inline">Last</span> 30 Days
                          </span>
                          <Icon className="dd-indc" name="chevron-right" id={undefined} style={undefined} />
                        </DropdownToggle>
                        <DropdownMenu>
                          <ul className="link-list-opt no-bdr">
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#!"
                              >
                                <span>Last 30 days</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 6 months</span>
                              </DropdownItem>
                            </li>
                            <li>
                              <DropdownItem
                                tag="a"
                                onClick={(ev) => {
                                  ev.preventDefault();
                                }}
                                href="#dropdownitem"
                              >
                                <span>Last 3 weeks</span>
                              </DropdownItem>
                            </li>
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                      
                      <div  style={{ marginLeft: "5%"  }}>
                      <Button color="primary" className="btn-icon" onClick={() => setModal({ edit :false, add: true })} size={undefined} outline={undefined} disabled={undefined}>
                        <Icon name="plus" id={undefined} className={undefined} style={undefined}></Icon>
                      </Button></div>
                    </li>
                    
                  </ul>
                </div>
              </div>
             
            </BlockHeadContent>
          </BlockBetween>
        </BlockHead>

        <Block className={undefined} size={undefined}>
          <DataTable className="card-stretch" bodyClassName={undefined} title={undefined}>
         
            <DataTableBody compact={undefined} className={undefined} bodyclass={undefined}>
              <DataTableHead>
             
                <DataTableRow className={undefined} size={undefined}>
                  <span className="sub-text">Vistior Name</span>
                </DataTableRow>
                <DataTableRow size="mb" className={undefined}>
                  <span className="sub-text">Phone</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">Flat No</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">Tower</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">Date</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">In Time</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">Out Time</span>
                </DataTableRow>
              </DataTableHead>
              {/*Head*/}
              {currentItems.length > 0
                ? currentItems.map((item) => {
                    return (
                      <DataTableItem key={item.id} className={undefined}>
                        <DataTableRow size="mb" className={undefined}>
                          <span>
                            {item.visitorname}  
                          </span>
                        </DataTableRow>
                        
                        <DataTableRow size="mb" className={undefined}>
                          <span>
                            {item.phone}  
                          </span>
                        </DataTableRow>
                        <DataTableRow size="md" className={undefined}>
                          <span>{item.flatno}</span>
                        </DataTableRow>
                        <DataTableRow size="md" className={undefined}>
                          <span>{item.phone}</span>
                        </DataTableRow>
                        
                     
                        <DataTableRow className="nk-tb-col-tools" size={undefined}>
                          <ul className="nk-tb-actions gx-1">
                            <li className="nk-tb-action-hidden" onClick={() => onEditClick(item.id)}>
                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={"edit" + item.id}
                                icon="edit-alt-fill"
                                direction="top"
                                text="Edit" iconClass={undefined}                              />
                            </li>
                        
                            <li>
                              <UncontrolledDropdown>
                                <DropdownToggle tag="a" className={undefined}>
                                  <Icon name="more-h" id={undefined} className={undefined} style={undefined}></Icon>
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <ul className="link-list-opt no-bdr">
                                    <li onClick={() => onEditClick(item.id)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#edit"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="edit" id={undefined} className={undefined} style={undefined}></Icon>
                                        <span>Edit</span>
                                      </DropdownItem>
                                    </li>
                                    <li onClick={() => onDeleteClick(item.id)}>
                                      <DropdownItem
                                        tag="a"
                                        href="#edit"
                                        onClick={(ev) => {
                                          ev.preventDefault();
                                        }}
                                      >
                                        <Icon name="delete" id={undefined} className={undefined} style={undefined}></Icon>
                                        <span>Delete</span>
                                      </DropdownItem>
                                    </li>
                                    
                                  </ul>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </li>
                          </ul>
                        </DataTableRow>
                      </DataTableItem>
                    );
                  })
                : null}
            </DataTableBody>
            <div className="card-inner">
              {currentItems.length > 0 ? (
                <PaginationComponent
                  itemPerPage={itemPerPage}
                  totalItems={data.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              ) : (
                <div className="text-center">
                  <span className="text-silent">No data found</span>
                </div>
              )}
            </div>
          </DataTable>
        </Block>
        <Modal isOpen={modal.add} toggle={() => setModal({ edit:true, add: false })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#close"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm" id={undefined} className={undefined} style={undefined}></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Add Visitor</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Visitor Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Ownername"
                        defaultValue={formData.visitorname}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
               
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Contact No</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Phone"
                        defaultValue={formData.phone}
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                      
                    </FormGroup>
                  </Col>
                 
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Address</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Address"
                        defaultValue={formData.address}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Visit Type</label>
                      <input
                        className="form-control"
                        type="number"
                        name="NoofMembers"
                        defaultValue={formData.flatno}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>

                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Vechicle No</label>
                      <input
                        className="form-control"
                        type="number"
                        name="NoofVechicles"
                        defaultValue={formData.vehicleType}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Vehicle Type</label>
                    
                      <input
                        className="form-control"
                        type="type"
                        name="IsParkingSpace"
                        defaultValue={formData.inTime}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>

                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                  <FormGroup>
                      <label className="form-label">Tower</label>

<br></br>
<select  name="Towerid"
      disabled={loading}
      
      onChange={(e) => setValue(e.currentTarget.value)
   
      }
      defaultValue={formData.towerid}
    >
      {items.map(({ name, id }) => (
        <option value={id} >
          {name}
        </option>
      ))}
    </select>

                      
                      
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Flat No</label>
                      <input
                        className="form-control"
                        type="text"
                        name="FlatNo"
                        defaultValue={formData.flatno}
                        ref={register({ required: "This field is required" })}
                      />
                       
                    </FormGroup>
                  </Col>

                
                  
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Owner Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Profession"
                        defaultValue={formData.purpose}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Owner Contact</label>
                      <input
                        className="form-control"
                        type="text"
                        name="OfficeAddress"
                        defaultValue={formData.vehicleNo}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
               
                  <Col size="12" sm={undefined} lg={undefined} md={undefined} xxl={undefined} className={undefined}>
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit" className={undefined} outline={undefined} disabled={undefined}>
                          Add Visitor
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>

        <Modal isOpen={modal.edit} toggle={() => setModal({ edit: false,add:true })} className="modal-dialog-centered" size="lg">
          <ModalBody>
            <a
              href="#cancel"
              onClick={(ev) => {
                ev.preventDefault();
                onFormCancel();
              }}
              className="close"
            >
              <Icon name="cross-sm" id={undefined} className={undefined} style={undefined}></Icon>
            </a>
            <div className="p-2">
              <h5 className="title">Update Owner</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Owner Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="OwnerName1"
                        defaultValue={formData.visitorname}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Tower</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Towerno1"
                        defaultValue={Number(formData.towerid)}
                        placeholder="No"
                        ref={register({
                          required: "This field is required",
                          
                        })}
                      />
                     
                    </FormGroup>
                  </Col>
             
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Phone</label>
                      <input
                        className="form-control"
                        type="number"
                        name="phone"
                        defaultValue={Number(formData.phone)}
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="12" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                    <label className="form-label">Flat No</label>
                      <input
                        className="form-control"
                        type="number"
                        name="FlatNo1"
                        defaultValue={Number(formData.flatno)}
                        ref={register({ required: "This field is required" })}
                      />
                    
                    </FormGroup>
                  </Col>
                  <Col md="12" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                    <label className="form-label">Address</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Adderess1"
                        defaultValue={Number(formData.address)}
                        ref={register({ required: "This field is required" })}
                      />
                    
                    </FormGroup>
                  </Col>
                  <Col size="12" sm={undefined} lg={undefined} md={undefined} xxl={undefined} className={undefined}>
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit" className={undefined} outline={undefined} disabled={undefined}>
                          Update Owner
                        </Button>
                      </li>
                      <li>
                        <a
                          href="#cancel"
                          onClick={(ev) => {
                            ev.preventDefault();
                            onFormCancel();
                          }}
                          className="link link-light"
                        >
                          Cancel
                        </a>
                      </li>
                    </ul>
                  </Col>
                </Form>
              </div>
            </div>
          </ModalBody>
        </Modal>
      </Content>
    </React.Fragment>
  );
};
export default VisitorPage;
