import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  Card,
  CardBody,
  Col,
  CardHeader,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
  Row,
  Alert,
} from "reactstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import {
  getCategories as onGetCategories,
  getSubCategory as onGetSubCategory,
  addNewSubCategory as onAddNewSubCategory,
  updateSubCategory as onUpdateSubCategory,
  deleteSubCategory as onDeleteSubCategory,
} from "../../../slices/thunks";
import { Select as AntSelect } from "antd";

const EcommerceSubCategory = (props) => {
  const { Option } = AntSelect;
  const [code, setCode] = useState("");
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showDangerAlert, setShowDangerAlert] = useState(false);
  const [isBottom, setIsBottom] = useState(false);

  const toggleBottomCanvas = () => {
    setIsBottom(!isBottom);
  };
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  const toggleSuccessAlert = () => setShowSuccessAlert(!showSuccessAlert);
  const toggleDangerAlert = () => setShowDangerAlert(!showDangerAlert);
  const handleAlert = (showAlert) => {
    if (showAlert) {
      setShowSuccessAlert(true);
      setShowDangerAlert(false);
      setTimeout(() => {
        setShowSuccessAlert(false);
      }, 1500);
    } else {
      setShowDangerAlert(true);
      setShowSuccessAlert(false);
      setTimeout(() => {
        setShowDangerAlert(false);
      }, 1500);
    }
  };

  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Ecommerce;
  const ecomCategoriesProperties = createSelector(
    selectLayoutState,
    (ecom) => ({
      subcategories: ecom.subcategories,
      error: ecom.error,
      categories: ecom.categories,
    })
  );
  // Inside your component
  const { subcategories, categories, error } = useSelector(
    ecomCategoriesProperties
  );
  const [name, setName] = useState("");
  const [actionTriggered, setActionTriggered] = useState(false);
  useEffect(() => {
    if (!subcategories || subcategories.length === 0) {
      dispatch(onGetSubCategory());
      dispatch(onGetCategories());
    }
  }, []);

  useEffect(() => {
    if (actionTriggered) {
      // Thực hiện các công việc cần thiết khi một trong ba hàm được gọi
      if (error === null) {
        handleAlert(true);
      } else if (error) {
        handleAlert(false);
      }
      // Đặt lại actionTriggered thành false sau khi hoàn thành
      setActionTriggered(false);
    }
  }, [actionTriggered]);

  const addCategory = async () => {
    if (name.trim() === "") {
      handleAlert(false);
      return;
    }
    const newCategory = {
      name: name,
      category: code,
    };
    await dispatch(onAddNewSubCategory(newCategory));
    await dispatch(onGetSubCategory());
    setName("");
    setActionTriggered(true);
    setCode("");
  };

  const handleDelete = async (row) => {
    if (!row) {
      return;
    }
    if (
      !window.confirm(`Are you sure you want to delete the row: ${row.name}?`)
    ) {
      return;
    }
    await dispatch(onDeleteSubCategory(row._id));
    setActionTriggered(true);
  };

  const handleEdit = async (row) => {
    await dispatch(onUpdateSubCategory(row));
    setEditing(null);
    setActionTriggered(true);
  };
  const handleEditDoubleClick = (e) => {
    setEditValue(e.target.value);
  };

  const handleDoubleClick = (row) => {
    setEditing(row._id);
    setEditValue(row.name);
  };

  const handleCancel = () => {
    setEditing(null);
  };
  const categoryOptions = Object.values(subcategories).map((row) => ({
    label: row.name,
    value: row._id,
  }));

  return (
    <div>
      {/* Bottom offcanvas danh mục*/}
      <Offcanvas
        isOpen={isBottom}
        direction="bottom"
        toggle={toggleBottomCanvas}
        id="offcanvasBottom"
        style={{
          minHeight: "46vh",
          width: "60%", // Điều chỉnh chiều rộng của Offcanvas
          margin: "0 auto", // Để căn giữa theo chiều ngang
          height: "60vh", // Điều chỉnh chiều cao Offcanvas
          transform: "translateY(-50%)",
        }}
      >
        <OffcanvasHeader
          toggle={toggleBottomCanvas}
          id="offcanvasBottomLabel"
          className="border-bottom"
        >
          Sub Category management
        </OffcanvasHeader>
        <OffcanvasBody>
          <Card>
            <CardHeader>
              <h4 className="card-title mb-0">Add, Delete, Edit</h4>
            </CardHeader>

            <CardBody>
              <div id="customerList">
                <Row className="g-4 mb-3">
                  <Col className="col-sm-auto">
                    <div>
                      <div
                        style={{ display: "flex", gap: "25px" }}
                        className="input-group mb-3"
                      >
                        <AntSelect
                          style={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "2px",
                          }}
                          placeholder="Add SubCategory Code"
                          value={code}
                          onChange={(e) => setCode(e)}
                        >
                          {categories?.map((val, idx) => (
                            <Option key={idx} value={val._id}>
                              {val.name}
                            </Option>
                          ))}
                        </AntSelect>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Add category..."
                          id="categoryNameInput"
                          value={name}
                          onBlur={props.handleCategoryBlur}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <button
                          className="btn btn-success"
                          onClick={addCategory}
                        >
                          + Add
                        </button>
                        <Alert
                          color="success"
                          isOpen={showSuccessAlert}
                          toggle={toggleSuccessAlert}
                        >
                          <strong>Successful manipulation!</strong>
                        </Alert>
                        <Alert
                          color="danger"
                          className="mb-0"
                          isOpen={showDangerAlert}
                          toggle={toggleDangerAlert}
                        >
                          <strong>An error occurred.</strong>
                        </Alert>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="table-responsive table-card mt-3 mb-1">
                  <table
                    className="table align-middle table-nowrap"
                    id="customerTable"
                  >
                    <thead className="table-light">
                      <tr>
                        <th scope="col" style={{ width: "50px" }}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="checkAll"
                              value="option"
                            />
                          </div>
                        </th>
                        <th className="sort" data-sort="category_name">
                          Name list
                        </th>
                        <th className="sort" data-sort="category_created_at">
                          Date created
                        </th>
                        <th className="sort" data-sort="category_updated_at">
                          Modification date
                        </th>
                        <th className="sort" data-sort="action">
                          Operation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list form-check-all">
                      {subcategories?.map((row) => (
                        <tr key={row._id}>
                          <th scope="row">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                name="chk_child"
                                value={row._id}
                              />
                            </div>
                          </th>
                          <td className="id" style={{ display: "none" }}>
                            <Link to="#" className="fw-medium link-primary">
                              {row.name}
                            </Link>
                          </td>
                          <td className="category_name">
                            {editing === row._id ? (
                              <input
                                type="text"
                                value={editValue}
                                onChange={handleEditDoubleClick}
                                autoFocus
                              />
                            ) : (
                              <span
                                onDoubleClick={() => handleDoubleClick(row)}
                                title="Double tap to edit"
                                style={{ cursor: "pointer" }}
                              >
                                {row.name}
                              </span>
                            )}
                          </td>
                          <td className="category_created_at">
                            {row.createDate}
                          </td>
                          <td className="category_updated_at">
                            {row.modifyDate}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <div className="edit">
                                {editing === row._id && (
                                  <button
                                    className="btn btn-sm btn-success edit-item-btn"
                                    data-bs-toggle="modal"
                                    data-bs-target="#showModal"
                                    onClick={() => {
                                      const updatedCategory = {
                                        ...row,
                                        name: editValue,
                                      }; // Tạo bản sao và chỉnh sửa 'name'
                                      handleEdit(updatedCategory);
                                    }}
                                  >
                                    Edit
                                  </button>
                                )}
                              </div>
                              <div className="remove">
                                <button
                                  className="btn btn-sm btn-danger remove-item-btn"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#deleteRecordModal"
                                  onClick={() => handleDelete(row)}
                                >
                                  Remove
                                </button>
                              </div>
                              <div className="cancle">
                                {editing === row._id && (
                                  <button
                                    className="btn btn-sm btn-warning"
                                    onClick={handleCancel}
                                  >
                                    Cancel
                                  </button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="noresult" style={{ display: "none" }}>
                    <div className="text-center">
                      <lord-icon
                        src="https://cdn.lordicon.com/msoeawqm.json"
                        trigger="loop"
                        colors="primary:#121331,secondary:#08a88a"
                        style={{ width: "75px", height: "75px" }}
                      ></lord-icon>
                      <h5 className="mt-2">Sorry! No Result Found</h5>
                      <p className="text-muted mb-0">
                        We've searched more than 150+ Orders We did not find any
                        orders for your search.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-end">
                  <div className="pagination-wrap hstack gap-2">
                    <Link className="page-item pagination-prev disabled" to="#">
                      Before
                    </Link>
                    <ul className="pagination listjs-pagination mb-0"></ul>
                    <Link className="page-item pagination-next" to="#">
                      Next
                    </Link>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </OffcanvasBody>
      </Offcanvas>
      {/*Quản lý danh mục */}
      <Card>
        <CardHeader>
          <h5 className="card-title mb-0">Product Sub Category</h5>
        </CardHeader>
        <CardBody>
          <p className="text-muted mb-2">
            {" "}
            <Link
              to="#"
              className="float-end text-decoration-underline"
              onClick={toggleBottomCanvas}
              //
            >
              Sub Category management
            </Link>
            Select product category
          </p>

          <Select
            name="type"
            isMulti
            options={categoryOptions}
            value={props.categoryId}
            onChange={(selectedOption) => {
              props.handleCategoryChange(selectedOption);
            }}
          />

          {props.blur && props.errors ? (
            <Alert color="danger">
              <strong>An error occurred!</strong>
              {props.errors}
            </Alert>
          ) : null}
        </CardBody>
      </Card>
    </div>
  );
};

export default EcommerceSubCategory;
