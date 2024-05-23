import React, { useEffect, useState, useMemo } from "react";

import {
  Container,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  Nav,
  NavItem,
  NavLink,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  Label,
  Input,
} from "reactstrap";
import classnames from "classnames";
import { FaClone } from "react-icons/fa";

// RangeSlider
import "nouislider/distribute/nouislider.css";
import DeleteModal from "../../../Components/Common/DeleteModal";

import BreadCrumb from "../../../Components/Common/BreadCrumb";
import TableContainer from "../../../Components/Common/TableContainer";
import { Published, Price, NewPrice } from "./EcommerceProductCol";
//Import data
//import { products } from "../../../common/data";

//Import actions
import {
  getProducts as onGetProducts,
  deleteProducts,
  getCategories as onGetCategories,
  getBrands as onGetBrands,
} from "../../../slices/thunks";
import { isEmpty } from "lodash";

//redux
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createSelector } from "reselect";
import { addNewCloneProduct as onAddNewProduct } from "../../../slices/thunks";

const SingleOptions = [
  { value: "Watches", label: "Watches" },
  { value: "Headset", label: "Headset" },
  { value: "Sweatshirt", label: "Sweatshirt" },
  { value: "20% off", label: "20% off" },
  { value: "4 star", label: "4 star" },
];

const EcommerceProducts = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectDashboardData = createSelector(
    (state) => state.Ecommerce.products,
    (products) => products
  );

  const selectCategorysData = createSelector(
    (state) => state.Ecommerce.categories,
    (categories) => categories
  );

  const selectBrandsData = createSelector(
    (state) => state.Ecommerce.brands,
    (brands) => brands
  );

  // Inside your component
  const products = useSelector(selectDashboardData);
  const categories = useSelector(selectCategorysData);
  const brands = useSelector(selectBrandsData);
  const [modal, setModal] = useState(false);
  const [prdNew, setPrdNew] = useState();
  const [name, setName] = useState("");

  function removeUpdatedAt(obj) {
    const { updatedAt, __v, name_slug, _id, ...remainingProperties } = obj;
    return remainingProperties;
  }

  const toggle = (e) => {
    let res = removeUpdatedAt(e);
    setPrdNew(res);
    setModal(!modal);
  };

  const handleOnOkay = async () => {
    let newProduct = {
      ...prdNew,
      name: name,
    };
    try {
      await dispatch(onAddNewProduct(newProduct));
      setModal(false);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const [productList, setProductList] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [selectedMulti, setselectedMulti] = useState(null);
  const [product, setProduct] = useState(null);
  function handleMulti(selectedMulti) {
    setselectedMulti(selectedMulti);
  }
  const [minProductPrice, setMinProductPrice] = useState(0);
  const [maxProductPrice, setMaxProductPrice] = useState(1);
  const [loadCount, setLoadCount] = useState(0);
  useEffect(() => {
    if (loadCount < 3) {
      if (!products || products.length === 0) {
        dispatch(onGetProducts());
      }
      if (!categories || categories.length === 0) {
        dispatch(onGetCategories());
      }
      if (!brands || brands.length === 0) {
        dispatch(onGetBrands());
      }
      setLoadCount(loadCount + 1);
    }
    if (products && products.length > 1) {
      const newMinPrice = Math.min(...products.map((product) => product.price));
      const newMaxPrice = Math.max(...products.map((product) => product.price));
      if (newMinPrice < newMaxPrice) {
        setMinProductPrice(newMinPrice);
        setMaxProductPrice(newMaxPrice);
      }
    }
    //lọc sản phẩm theo giá
  }, [dispatch, products, categories, brands, loadCount]);

  useEffect(() => {
    if (productList.length == 0 && activeTab == 1) setProductList(products);
  }, [products, productList]);

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products);
  }, [products]);

  const toggleTab = (tab, type) => {
    let filteredProducts = products;
    if (activeTab !== tab) {
      setActiveTab(tab);
      if (type !== "all" && type === true) {
        filteredProducts = products.filter(
          (product) => product.isPublish === type
        );
      }
      if (type !== "all" && type === false) {
        filteredProducts = products.filter(
          (product) => product.isPublish === type
        );
      }
    }
    setProductList(filteredProducts);
  };

  const [cate, setCate] = useState("all");

  const getProductsByCategory = (category) => {
    let filteredProducts = products;
    if (category !== "all") {
      filteredProducts = products.filter(
        (product) => product.category.name === category
      );
    }
    setProductList(filteredProducts);
    setCate(category);
  };
  const getProductsByBrand = async (brand) => {
    let filteredProducts = products;
    if (brand !== "all") {
      filteredProducts = products.filter(
        (product) => product.brand.name === brand.name
      );
    }
    await setProductList(filteredProducts);
  };

  const [sliderValues, setSliderValues] = useState([
    minProductPrice,
    maxProductPrice,
  ]);
  useEffect(() => {
    const slider = document.getElementById("product-price-range");
    if (slider) {
      slider.noUiSlider.on("update", (values, handle) => {
        // Chuyển đổi các giá trị trong values thành số nguyên
        const intValues = values.map((value) => parseInt(value));
        setSliderValues(intValues);
      });
    }
  }, [sliderValues[0], sliderValues[1]]);

  useEffect(() => {
    onPriceChange([minProductPrice, maxProductPrice]);
  }, []);
  const handleMinCostChange = (e) => {
    const newValue = parseInt(e.target.value); // Chuyển đổi giá trị thành số nguyên
    setSliderValues([newValue, sliderValues[1]]);
    onPriceChange([newValue, sliderValues[1]]);
  };

  const handleMaxCostChange = (e) => {
    const newValue = parseInt(e.target.value); // Chuyển đổi giá trị thành số nguyên
    setSliderValues([sliderValues[0], newValue]);
    onPriceChange([sliderValues[0], newValue]);
  };
  const onPriceChange = (value) => {
    // Lấy giá trị min và max từ value
    value = value.map((value) => parseInt(value));
    const minCost = value[0];
    const maxCost = value[1];

    // Gán giá trị min và max cho các phần tử DOM
    // document.getElementById("minCost").value = minCost;
    // document.getElementById("maxCost").value = maxCost;

    // Sử dụng giá trị min và max để lọc danh sách sản phẩm
    const filteredProducts = products.filter(
      (product) => product.price >= minCost && product.price <= maxCost
    );

    // Cập nhật danh sách sản phẩm
    setProductList(filteredProducts);
  };

  /*
  on change rating checkbox method
  */

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);

  const onClickDelete = async (product) => {
    setProduct(product);
    setDeleteModal(true);
    //await dispatch(deleteProducts(product.row.original._id));
    await dispatch(onGetProducts());
  };

  const handleDeleteProduct = async () => {
    if (product) {
      await dispatch(deleteProducts(product._id));
      setDeleteModal(false);
    }
  };

  const [dele, setDele] = useState(0);

  // Displat Delete Button
  const displayDelete = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element");
    setDele(ele.length);
    if (ele.length === 0) {
      del.style.display = "none";
    } else {
      del.style.display = "block";
    }
  };

  // Delete Multiple
  const deleteMultiple = () => {
    const ele = document.querySelectorAll(".productCheckBox:checked");
    const del = document.getElementById("selection-element");
    ele.forEach((element) => {
      dispatch(deleteProducts(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
      del.style.display = "none";
    });
  };
  function handleNavigation(url) {
    // Điều hướng đến URL được truyền vào
    // navigate(url);
    // window.location.reload();
    window.location.href = url;
  }
  const columns = useMemo(
    () => [
      {
        Header: "#",
        accessor: "_id",
        Cell: (cell) => {
          return (
            <input
              type="checkbox"
              className="productCheckBox form-check-input"
              value={cell.row.original._id}
              onClick={() => displayDelete()}
            />
          );
        },
      },
      {
        Header: "Product",
        accessor: "name",
        Cell: (product) => {
          return (
            <>
              <div className="d-flex align-items-center">
                <div className="flex-shrink-0 me-3">
                  <div className="avatar-sm bg-light rounded p-1">
                    {product.row.original.images[0] && (
                      <img
                        src={product.row.original.images[0]}
                        alt=""
                        className="img-fluid d-block"
                      />
                    )}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <h5 className="fs-14 mb-1">
                    <Link
                      to={`/apps-ecommerce-product-details/${product.row.original._id}`}
                      className="text-body"
                    >
                      {" "}
                      {product.row.original.name}
                    </Link>
                  </h5>
                  <p className="text-muted mb-0">
                    Category:{" "}
                    <span className="fw-medium">
                      {product.row.original.category
                        ? product.row.original.category.map((val) => {
                            return val.label;
                          })
                        : "No categories"}
                    </span>{" "}
                    | Brand:{" "}
                    <span className="fw-medium">
                      {product.row.original.brand
                        ? product.row.original.brand.map((val) => {
                            return val.label;
                          })
                        : "Unbranded"}
                    </span>
                  </p>
                </div>
              </div>
            </>
          );
        },
      },
      {
        Header: "Quantity",
        accessor: "stock",
        filterable: true,
        Cell: (product) => {
          return <p>{product.row.original.quantity}</p>;
        },
      },
      {
        Header: "Old price",
        accessor: "price",
        filterable: true,
        Cell: (cellProps) => {
          return <Price {...cellProps} />;
        },
      },
      {
        Header: "Discount",
        accessor: "discount",
        filterable: true,
        Cell: (cellProps) => {
          if (cellProps.value !== null && cellProps.value !== undefined) {
            return `${cellProps.value}%`;
          } else {
            return "N/A";
          }
        },
      },
      {
        Header: "New price",
        accessor: "newPrice",
        filterable: true,
        Cell: (cellProps) => {
          return <NewPrice {...cellProps} />;
        },
      },
      {
        Header: "Order number",
        accessor: "ordersCount",
        filterable: true,
      },
      {
        Header: "discount end date",
        accessor: "publishedDate",
        filterable: true,
        Cell: (product) => {
          return <p>{product.row.original.discountenddate}</p>;
        },
      },
      {
        Header: "Status",
        accessor: "isPublish",
        filterable: true,
        Cell: (cellProps) => {
          return <Published {...cellProps} />;
        },
      },
      {
        Header: "Action",
        Cell: (cellProps) => {
          return (
            <UncontrolledDropdown>
              <DropdownToggle
                href="#"
                className="btn btn-soft-secondary btn-sm"
                tag="button"
              >
                <i className="ri-more-fill" />
              </DropdownToggle>
              <DropdownMenu className="dropdown-menu-end">
                <DropdownItem
                  tag={Link}
                  to={`/apps-ecommerce-product-details/${cellProps.row.original._id}`}
                  className="text-body"
                >
                  {" "}
                  <i className="ri-eye-fill align-bottom me-2 text-muted"></i>{" "}
                  See
                </DropdownItem>

                <DropdownItem
                  tag={Link}
                  to={`/apps-ecommerce-add-product/${cellProps.row.original._id}`}
                  className="text-body"
                >
                  <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                  Edit
                </DropdownItem>

                <DropdownItem divider />

                <DropdownItem
                  href="#"
                  onClick={() => {
                    const productData = cellProps.row.original;
                    onClickDelete(productData);
                  }}
                >
                  <i className="ri-delete-bin-fill align-bottom me-2 text-muted"></i>{" "}
                  Erase
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          );
        },
      },
      {
        Header: "Clone",
        Cell: (cellProps) => {
          return (
            <>
              <div onClick={() => toggle(cellProps.row.original)}>
                <FaClone style={{ color: "#FF7F5D", cursor: "pointer" }} />
              </div>
            </>
          );
        },
      },
    ],
    []
  );
  document.title = "Products | Eezer - React Admin & Dashboard Template";

  const customStyles = {
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: "#3762ea",
      };
    },
    multiValueLabel: (styles, { data }) => ({
      ...styles,
      backgroundColor: "#687cfe",
      color: "white",
    }),
    multiValueRemove: (styles, { data }) => ({
      ...styles,
      color: "white",
      backgroundColor: "#687cfe",
      ":hover": {
        backgroundColor: "#687cfe",
        color: "white",
      },
    }),
  };

  return (
    <div className="page-content">
      <ToastContainer closeButton={false} limit={1} />

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteProduct}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />
      <Container fluid>
        <BreadCrumb title="Product" pageTitle="E-commerce" />

        <Row>
          <div style={{ width: "100%" }} className="col-xl-9 col-lg-8">
            <div>
              <div className="card">
                <div className="card-header border-0">
                  <div className="row align-items-center">
                    <div className="col">
                      <Nav
                        className="nav-tabs-custom card-header-tabs border-bottom-0"
                        role="tablist"
                      >
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "1" },
                              "fw-semibold"
                            )}
                            onClick={() => {
                              toggleTab("1", "all");
                            }}
                            href="#"
                          >
                            All{" "}
                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                              {products.length}
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "2" },
                              "fw-semibold"
                            )}
                            onClick={() => {
                              toggleTab("2", true);
                            }}
                            href="#"
                          >
                            Display{" "}
                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                              {
                                products.filter(
                                  (product) => product.isPublish === true
                                ).length
                              }
                            </span>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames(
                              { active: activeTab === "3" },
                              "fw-semibold"
                            )}
                            onClick={() => {
                              toggleTab("3", false);
                            }}
                            href="#"
                          >
                            Hidden{" "}
                            <span className="badge bg-danger-subtle text-danger align-middle rounded-pill ms-1">
                              {
                                products.filter(
                                  (product) => product.isPublish === false
                                ).length
                              }
                            </span>
                          </NavLink>
                        </NavItem>
                      </Nav>
                    </div>
                    <div className="col-auto">
                      <div id="selection-element">
                        <div className="my-n1 d-flex align-items-center text-muted">
                          Select{" "}
                          <div
                            id="select-content"
                            className="text-body fw-semibold px-1"
                          >
                            {dele}
                          </div>{" "}
                          Result{" "}
                          <button
                            type="button"
                            className="btn btn-link link-danger p-0 ms-3"
                            onClick={() => setDeleteModalMulti(true)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="card-body pt-0">
                  {productList && productList.length > 0 ? (
                    <TableContainer
                      columns={columns}
                      data={productList || []}
                      isGlobalFilter={true}
                      isAddUserList={false}
                      customPageSize={5}
                      divClass="table-responsive mb-1"
                      tableClass="mb-0 align-middle table-borderless"
                      theadClass="table-light text-muted"
                      isProductsFilter={true}
                      SearchPlaceholder="Search product"
                    />
                  ) : (
                    <div className="py-4 text-center">
                      <div>
                        <lord-icon
                          src="https://cdn.lordicon.com/msoeawqm.json"
                          trigger="loop"
                          colors="primary:#405189,secondary:#0ab39c"
                          style={{ width: "72px", height: "72px" }}
                        ></lord-icon>
                      </div>

                      <div className="mt-4">
                        <h5>No products found</h5>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Row>
      </Container>
      <Modal isOpen={modal}>
        <ModalHeader>Clone Product</ModalHeader>
        <ModalBody>
          <Form>
            <Label for="newName">New Product Name</Label>
            <Input
              id="newPrdName"
              name="prdName"
              placeholder="with a placeholder"
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={() => handleOnOkay()}>
            Ok
          </Button>{" "}
          <Button color="secondary" onClick={() => setModal(false)}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EcommerceProducts;
