import React, { useContext, useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";


import OwnerDataService from  "../../services/ownerService";
import IownerData from "../../types/owners";
import IownerList from "../../types/ownerlist";

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
 

const OwnerPage = () => {


  const retrieveOwners = () => {
    debugger;
    OwnerDataService.getAll()
      .then((response: any) => {
        debugger;
        setData(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

 
  const [data, setData] =  useState<Array<IownerList>>([]) ;

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
  
    ownername: "",
    Ownerid: null,
    towerid:null,
    flatno: null,
    adderess: "",
    phone: "",
    noofmembers: null,
    profession: "",
    officeaddress: "",
    noofvechicles: null,
    isparkingspace: null,
    ownertowername:"",
    
  });
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const initialOwnerState = {
    ownerid:null,
    ownername: "",
    towerid: null,
  
    flatno: null,
    adderess: "",
    phone: "",
    noofmembers: null,
    profession: "",
    officeaddress: "",
    noofvechicles: null,
    isparkingspace: null,
    ownertowername:"",
  };
  const [Ownerssave, setOwnersave] = useState<IownerData>(initialOwnerState);

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.ownername.localeCompare(b.ownername));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.ownername.localeCompare(a.ownername));
      setData([...sortedData]);
    }
  };

  // unselects the data on mount
  useEffect(() => {
    retrieveOwners();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return (
          item.ownername.toLowerCase().includes(onSearchText.toLowerCase()) 
         
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
      ownername: "",
      Ownerid: null,
      towerid:null,
      flatno: null,
      adderess: "",
      phone: "",
      noofmembers: null,
      profession: "",
      officeaddress: "",
      noofvechicles: null,
      isparkingspace: null,
      ownertowername:"",
      
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
    const { Ownername,owneretowername, FlatNo,Address, Phone,NoofMembers,Profession,OfficeAddress,NoofVechicles,IsParkingSpace} = submitData;
    debugger;
    let submittedData = {
     
      ownername: Ownername,
      towerid:Number(value),
      
      ownertowername:owneretowername,
      flatno: FlatNo,
      adderess: Address,
      phone: Phone,
      noofmembers: NoofMembers,
      profession: Profession,
      officeaddress: OfficeAddress,
      noofvechicles: NoofVechicles,
      isparkingspace: IsParkingSpace,
    };

    
    setData([submittedData, ...data]);

    OwnerDataService.create(submittedData)
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
   
    const {  Ownername,Towerid,FlatNo,Address, Phone,NoofMembers,Profession,OfficeAddress,NoofVechicles,IsParkingSpace} = submitData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.ownerid === editId) {
        debugger;
        submittedData = {
          id: item.ownerid,
            ownername: Ownername,
           towerid: Towerid,
           flatno: FlatNo,
           adderess: Address,
           phone: Phone,
           noofmembers: NoofMembers,
           profession: Profession,
           officeaddress: OfficeAddress,
           noofvechicles: NoofVechicles,
           isparkingspace: IsParkingSpace,
        

        };


        
      }
    });
    let index = newitems.findIndex((item) => item.ownerid === editId);
    newitems[index] = submittedData;
    OwnerDataService.update(submittedData)
    .then((response: any) => {
      debugger;
      setOwnersave({
        
        ownername: submittedData.Ownername,
        towerid: submittedData.Towerid,
      
        flatno: submittedData.FlatNo,
        adderess: submittedData.Address,
        phone: submittedData.Phone,
        noofmembers: submittedData.NoofMembers,
        profession: submittedData.Profession,
        officeaddress: submittedData.OfficeAddress,
        noofvechicles: submittedData.NoofVechicles,
        isparkingspace: submittedData.IsParkingSpace,
     
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
      if (item.ownerid === id) {
        debugger;
        setFormData({
    
          ownername: item.ownername,
          Ownerid: item.ownerid,
          towerid:item.towerid,
          flatno: item.flatno,
          adderess: item.adderess,
          phone:item.phone,
          noofmembers: item.noofmembers,
          profession: item.profession,
          officeaddress:item.officeaddress,
          noofvechicles: item.noofvechicles,
          isparkingspace: item.isparkingspace,
          ownertowername:item.ownertowername,
        });
        setModal({ edit: true, add: false });
        setEditedId(id);

        
      }
    });
  };


  // function that loads the want to editted data
  const onDeleteClick = (id) => {
    debugger;
   
      
        OwnerDataService.remove(id)
        .then((response: any) => {
        
          console.log(response.data);
         
        })
        .catch((e: Error) => {
          console.log(e);
        });
        setModal({ edit: false, add: false });
        resetForm();
        retrieveOwners();  
     
    
    
     
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
                Owner Lists
              </BlockTitle>
              
            </BlockHeadContent>
            <BlockHeadContent className={undefined}>
              <div className="toggle-wrap nk-block-tools-toggle">
               
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <Button color="light" outline className="btn-white" size={undefined} disabled={undefined}>
                        <Icon name="download-cloud" id={undefined} className={undefined} style={undefined}></Icon>
                        <span>Export</span>
                      </Button>
                    </li>
                    <li>
                      <Button color="light" outline className="btn-white" size={undefined} disabled={undefined}>
                        <Icon name="upload-cloud" id={undefined} className={undefined} style={undefined}></Icon>
                        <span>Import</span>
                      </Button>
                    </li>
                    <li className="nk-block-tools-opt">
                      <Button color="primary" className="btn-icon" onClick={() => setModal({ edit :false, add: true })} size={undefined} outline={undefined} disabled={undefined}>
                        <Icon name="plus" id={undefined} className={undefined} style={undefined}></Icon>
                      </Button>
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
                  <span className="sub-text">Owner Name</span>
                </DataTableRow>
                <DataTableRow size="mb" className={undefined}>
                  <span className="sub-text">Tower</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">Flat No</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">Contact No</span>
                </DataTableRow>
               
              
              </DataTableHead>
              {/*Head*/}
              {currentItems.length > 0
                ? currentItems.map((item) => {
                    return (
                      <DataTableItem key={item.ownerid} className={undefined}>
                        <DataTableRow size="mb" className={undefined}>
                          <span>
                            {item.ownername}  
                          </span>
                        </DataTableRow>
                        
                        <DataTableRow size="mb" className={undefined}>
                          <span>
                            {item.ownertowername}  
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
                            <li className="nk-tb-action-hidden" onClick={() => onEditClick(item.ownerid)}>
                              <TooltipComponent
                                tag="a"
                                containerClassName="btn btn-trigger btn-icon"
                                id={"edit" + item.ownerid}
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
                                    <li onClick={() => onEditClick(item.ownerid)}>
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
                                    <li onClick={() => onDeleteClick(item.ownerid)}>
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
              <h5 className="title">Add Owner</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Owner Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Ownername"
                        defaultValue={formData.ownername}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
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
                      <label className="form-label">Address</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Address"
                        defaultValue={formData.adderess}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">No of Members</label>
                      <input
                        className="form-control"
                        type="number"
                        name="NoofMembers"
                        defaultValue={formData.noofmembers}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Profession</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Profession"
                        defaultValue={formData.profession}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Office Address</label>
                      <input
                        className="form-control"
                        type="text"
                        name="OfficeAddress"
                        defaultValue={formData.officeaddress}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">No of Vechicles</label>
                      <input
                        className="form-control"
                        type="number"
                        name="NoofVechicles"
                        defaultValue={formData.noofvechicles}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Is Parking Space</label>
                    
                      <input
                        className="form-control"
                        type="type"
                        name="IsParkingSpace"
                        defaultValue={formData.isparkingspace}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>
                  <Col size="12" sm={undefined} lg={undefined} md={undefined} xxl={undefined} className={undefined}>
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit" className={undefined} outline={undefined} disabled={undefined}>
                          Add Owner
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
                        defaultValue={formData.ownername}
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
                        defaultValue={Number(formData.adderess)}
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
export default OwnerPage;
