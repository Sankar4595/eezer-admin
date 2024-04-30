import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { createSelector } from "reselect";
import {
  getBrands as onGetBrands,
  addNewBrand as onAddNewBrand,
  updateBrand as onUpdateBrand,
  deleteBrand as onDeleteBrand,
} from "../../slices/thunks";
import { message } from "antd";
const BrandComponent = () => {
  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Ecommerce;
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");
  const ecomBrandsProperties = createSelector(selectLayoutState, (ecom) => ({
    brands: ecom.brands,
    error: ecom.error,
  }));
  const [selectAll, setSelectAll] = useState(false);
  // Inside your component
  const { brands, error } = useSelector(ecomBrandsProperties);
  useEffect(() => {
    if (!brands || brands.length === 0) {
      dispatch(onGetBrands());
    }
  }, []);

  const addBrand = async () => {
    if (name.trim() === "") {
      handleAlert(false);
      return;
    }
    const newBrand = {
      name: name,
    };
    let res = await dispatch(onAddNewBrand(newBrand));
    if (res?.payload?.status) {
      message.success("Brand Added");
    } else {
      message.error("Brand with the same name already exists.");
    }
    await dispatch(onGetBrands());
    setName("");
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
    await dispatch(onDeleteBrand(row._id));
  };

  const handleEdit = async (row) => {
    await dispatch(onUpdateBrand(row));
    setEditing(null);
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

  const toggleSelectAll = () => {
    // Step 2: Handler function to toggle selection status
    setSelectAll(!selectAll);
  };
  return (
    <div style={{ paddingTop: "80px" }}>
      <Card style={{ height: "75vh", overflow: "auto" }}>
        <CardHeader>
          <h4 className="card-title mb-0">New Brand</h4>
        </CardHeader>

        <CardBody>
          <div id="customerList">
            <Row className="g-4 mb-3">
              <Col className="col-sm-auto">
                <div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Add Brand..."
                      id="brandNameInput"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button className="btn btn-success" onClick={addBrand}>
                      + Add
                    </button>
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
                          checked={selectAll} // Step 3: Controlled checkbox
                          onChange={toggleSelectAll}
                        />
                      </div>
                    </th>
                    <th className="sort" data-sort="brand_name">
                      Brand name
                    </th>
                    <th className="sort" data-sort="brand_created_at">
                      Date created
                    </th>
                    <th className="sort" data-sort="brand_updated_at">
                      Modification date
                    </th>
                    <th className="sort" data-sort="action">
                      Operation
                    </th>
                  </tr>
                </thead>
                <tbody className="list form-check-all">
                  {brands.map((row) => (
                    <tr key={row._id}>
                      <th scope="row">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            name="chk_child"
                            value={row._id}
                            checked={selectAll}
                          />
                        </div>
                      </th>
                      <td className="id" style={{ display: "none" }}>
                        <Link to="#" className="fw-medium link-primary">
                          {row.name}
                        </Link>
                      </td>
                      <td className="brand_name">
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
                      <td className="brand_created_at">{row.createDate}</td>
                      <td className="brand_updated_at">{row.modifyDate}</td>
                      <td>
                        <div className="d-flex gap-2">
                          <div className="edit">
                            {editing === row._id && (
                              <button
                                className="btn btn-sm btn-success edit-item-btn"
                                data-bs-toggle="modal"
                                data-bs-target="#showModal"
                                onClick={() => {
                                  const updatedBrand = {
                                    ...row,
                                    name: editValue,
                                  }; // Tạo bản sao và chỉnh sửa 'name'
                                  handleEdit(updatedBrand);
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
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default BrandComponent;
