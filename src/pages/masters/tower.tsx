import React, { useContext, useEffect, useState } from "react";
import Content from "../../layout/content/Content";
import Head from "../../layout/head/Head";


import TowerDataService from  "../../services/towerService";
import ItowerData from "../../types/tower";

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
 

const TowerPage = () => {


  const retrieveTowers = () => {
    debugger;
    TowerDataService.getAll()
      .then((response: any) => {
        debugger;
        setData(response.data);
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };

 
  const [data, setData] =  useState<Array<ItowerData>>([]) ;

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
    name: "",
    towerno: null,
    noflats: null,
    phone: null,
    nofloors: null,
  });
  const [actionText, setActionText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerPage, setItemPerPage] = useState(10);
  const [sort, setSortState] = useState("");
  const initialTowerState = {
 

    id: null,
     name: "",
   
    towerno: null,
    phone:null,
    noflats: null,
    nofloors: null,

  };
  const [towerssave, setTowersave] = useState<ItowerData>(initialTowerState);

  // Sorting data
  const sortFunc = (params) => {
    let defaultData = data;
    if (params === "asc") {
      let sortedData = defaultData.sort((a, b) => a.name.localeCompare(b.name));
      setData([...sortedData]);
    } else if (params === "dsc") {
      let sortedData = defaultData.sort((a, b) => b.name.localeCompare(a.name));
      setData([...sortedData]);
    }
  };

  // unselects the data on mount
  useEffect(() => {
    retrieveTowers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Changing state value when searching name
  useEffect(() => {
    if (onSearchText !== "") {
      const filteredObject = data.filter((item) => {
        return (
          item.name.toLowerCase().includes(onSearchText.toLowerCase()) 
         
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
      name: "",
      towerno:null,
      nofloors: null,
      phone: null,
      noflats: null,
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
    const { Name,Towerno,Phone,Noflats, Nofloors} = submitData;
    let submittedData = {
      name: Name,
      towerno: Towerno,
      phone: Phone,
      noflats: Noflats,
      nofloors: Nofloors,
    };

    
    setData([submittedData, ...data]);

    TowerDataService.create(submittedData)
    .then((response: any) => {
      debugger;
      setTowersave({
        
        name: submittedData.name,
        towerno: submittedData.towerno,
        phone:submittedData.phone,
        noflats: submittedData.noflats,
        nofloors: submittedData.nofloors,
      });
      
      
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
   
    const { name, towerno, phone ,nofloors,noflats} = submitData;
    let submittedData;
    let newitems = data;
    newitems.forEach((item) => {
      if (item.id === editId) {
        debugger;
        submittedData = {
          id: item.id,
           name: name,
           towerno: towerno,
           phone:    phone,
           noflats:noflats,
           nofloors: nofloors,
        

        };


        
      }
    });
    let index = newitems.findIndex((item) => item.id === editId);
    newitems[index] = submittedData;
    TowerDataService.update(submittedData)
    .then((response: any) => {
      debugger;
      setTowersave({
        
        name: submittedData.name,
        towerno: submittedData.towerno,
        phone:submittedData.phone,
        noflats: submittedData.noflats,
        nofloors: submittedData.nofloors,
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
      name: item.name,
      towerno: item.towerno,
      phone: item.phone,
      noflats: item.noflats,
      nofloors:  item.nofloors,
        });
        setModal({ edit: true, add: false });
        setEditedId(id);

        
      }
    });
  };

  // function that loads the want to editted data
  const onDeleteClick = (id) => {
    debugger;
   
      
        TowerDataService.remove(id)
        .then((response: any) => {
        
          console.log(response.data);
         
        })
        .catch((e: Error) => {
          console.log(e);
        });
        setModal({ edit: false, add: false });
        resetForm();
        retrieveTowers();  
     
    
    
     
  };
  

  // function to toggle the search option
  const toggle = () => setonSearch(!onSearch);

  // Get current list, pagination
  const indexOfLastItem = currentPage * itemPerPage;
  const indexOfFirstItem = indexOfLastItem - itemPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change Page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const { errors, register, handleSubmit } = useForm();

  return (
    <React.Fragment>
      <Head title="Towers List"></Head>
      <Content>
        <BlockHead size="sm" className={undefined} wide={undefined}>
          <BlockBetween className={undefined}>
            <BlockHeadContent className={undefined}>
              <BlockTitle tag="h3" page className={undefined}>
                Tower Lists
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
                  <span className="sub-text">Tower Name</span>
                </DataTableRow>
                <DataTableRow size="mb" className={undefined}>
                  <span className="sub-text">Tower No.</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">Contact No</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">No of Flats</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text">No of Floors</span>
                </DataTableRow>
                <DataTableRow size="md" className={undefined}>
                  <span className="sub-text"></span>
                </DataTableRow>
              
              </DataTableHead>
              {/*Head*/}
              {currentItems.length > 0
                ? currentItems.map((item) => {
                    return (
                      <DataTableItem key={item.id} className={undefined}>
                        <DataTableRow size="mb" className={undefined}>
                          <span>
                            {item.name}  
                          </span>
                        </DataTableRow>
                        
                        <DataTableRow size="mb" className={undefined}>
                          <span>
                            {item.towerno}  
                          </span>
                        </DataTableRow>
                        <DataTableRow size="md" className={undefined}>
                          <span>{item.phone}</span>
                        </DataTableRow>
                        <DataTableRow size="md" className={undefined}>
                          <span>{item.noflats}</span>
                        </DataTableRow>
                        <DataTableRow size="md" className={undefined}>
                          <span>{item.nofloors}</span>
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
                                <DropdownToggle tag="a" className="dropdown-toggle btn btn-icon btn-trigger">
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
              <h5 className="title">Add Tower</h5>
              <div className="mt-4">
                <Form className="row gy-4" noValidate onSubmit={handleSubmit(onFormSubmit)}>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Tower Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="Name"
                        defaultValue={formData.name}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                  <FormGroup>
                      <label className="form-label">Tower No</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Towerno"
                        defaultValue={formData.towerno}
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.phone && <span className="invalid">{errors.phone.message}</span>}
                      
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
                      <label className="form-label">No of Flats</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Noflats"
                        defaultValue={formData.noflats}
                        ref={register({ required: "This field is required" })}
                      />
                       
                    </FormGroup>
                  </Col>

                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">No of Floors</label>
                      <input
                        className="form-control"
                        type="number"
                        name="Nofloors"
                        defaultValue={formData.nofloors}
                        ref={register({ required: "This field is required" })}
                      />
                      
                    </FormGroup>
                  </Col>

                  
                  <Col size="12" sm={undefined} lg={undefined} md={undefined} xxl={undefined} className={undefined}>
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit" className={undefined} outline={undefined} disabled={undefined}>
                          Add Tower
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
              <h5 className="title">Update Tower</h5>
              <div className="mt-4">
                <Form className="row gy-4" onSubmit={handleSubmit(onEditSubmit)}>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Name</label>
                      <input
                        className="form-control"
                        type="text"
                        name="name"
                        defaultValue={formData.name}
                        placeholder="Enter name"
                        ref={register({ required: "This field is required" })}
                      />
                      {errors.name && <span className="invalid">{errors.name.message}</span>}
                    </FormGroup>
                  </Col>
                  <Col md="6" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                      <label className="form-label">Tower No</label>
                      <input
                        className="form-control"
                        type="number"
                        name="towerno"
                        defaultValue={Number(formData.towerno)}
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
                    <label className="form-label">No of Flats</label>
                      <input
                        className="form-control"
                        type="number"
                        name="noflats"
                        defaultValue={Number(formData.noflats)}
                        ref={register({ required: "This field is required" })}
                      />
                    
                    </FormGroup>
                  </Col>
                  <Col md="12" sm={undefined} lg={undefined} xxl={undefined} size={undefined} className={undefined}>
                    <FormGroup>
                    <label className="form-label">No of Floors</label>
                      <input
                        className="form-control"
                        type="number"
                        name="nofloors"
                        defaultValue={Number(formData.nofloors)}
                        ref={register({ required: "This field is required" })}
                      />
                    
                    </FormGroup>
                  </Col>
                  <Col size="12" sm={undefined} lg={undefined} md={undefined} xxl={undefined} className={undefined}>
                    <ul className="align-center flex-wrap flex-sm-nowrap gx-4 gy-2">
                      <li>
                        <Button color="primary" size="md" type="submit" className={undefined} outline={undefined} disabled={undefined}>
                          Update Tower
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
export default TowerPage;
