import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Alert, Card, CardBody, CardHeader, Col, Row } from "reactstrap";
import { createSelector } from "reselect";
import {
  getCategories as onGetCategories,
  addNewCategory as onAddNewCategory,
  updateCategory as onUpdateCategory,
  deleteCategory as onDeleteCategory,
} from "../../slices/thunks";
import { message } from "antd";
const CategoriesComponent = () => {
  const [editing, setEditing] = useState(null);
  const [editValue, setEditValue] = useState("");

  const dispatch = useDispatch();
  const selectLayoutState = (state) => state.Ecommerce;
  const ecomCategoriesProperties = createSelector(
    selectLayoutState,
    (ecom) => ({
      categories: ecom.categories,
      error: ecom.error,
    })
  );
  // Inside your component
  const { categories, error } = useSelector(ecomCategoriesProperties);
  const [name, setName] = useState("");
  useEffect(() => {
    if (!categories || categories.length === 0) {
      dispatch(onGetCategories());
    }
  }, []);

  const addCategory = async () => {
    const newCategory = {
      name: name,
    };
    let res = await dispatch(onAddNewCategory(newCategory));
    if (res?.payload?.status) {
      message.success("Category Added");
    } else {
      message.error("Category with the same name already exists.");
    }
    await dispatch(onGetCategories());
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
    await dispatch(onDeleteCategory(row._id));
  };

  const handleEdit = async (row) => {
    await dispatch(onUpdateCategory(row));
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

  return (
    <div style={{ paddingTop: "80px" }}>
      <Card style={{ height: "75vh", overflow: "auto" }}>
        <CardHeader>
          <h4 className="card-title mb-0">New Categories</h4>
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
                      placeholder="Add category..."
                      id="categoryNameInput"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <button className="btn btn-success" onClick={addCategory}>
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
                  {categories.map((row) => (
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
                      <td className="category_created_at">{row.createDate}</td>
                      <td className="category_updated_at">{row.modifyDate}</td>
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
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default CategoriesComponent;
