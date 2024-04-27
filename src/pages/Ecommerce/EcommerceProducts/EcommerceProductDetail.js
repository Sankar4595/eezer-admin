import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Tooltip,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";

//Simple bar
import SimpleBar from "simplebar-react";

import BreadCrumb from "../../../Components/Common/BreadCrumb";

import product1 from "../../../assets/images/products/img-1.png";
import product6 from "../../../assets/images/products/img-6.png";
import product8 from "../../../assets/images/products/img-8.png";

import { productDetailsWidgets, reviews } from "../../../common/data/ecommerce";
// Ecommerce > Product Details

import { FreeMode, Navigation, Thumbs } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import classnames from "classnames";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getProductById as onGetProductById } from "../../../slices/thunks";
import Loader from "../../../Components/Common/Loader";
SwiperCore.use([FreeMode, Navigation, Thumbs]);

function changeLabelDetailInPlace(array, productDetails) {
  array.forEach((item, index) => {
    switch (index) {
      case 0: //price
        item.labelDetail = productDetails
          ? productDetails.price + " / " + (productDetails.newPrice || "N/A")
          : "N/A";
        break;
      case 1: // No. of Orders :
        item.labelDetail = productDetails ? productDetails.ordersCount : "N/A"; // Kiểm tra productDetails trước khi truy cập thuộc tính ordersCount
        break;
      case 2: // Available Stocks :
        item.labelDetail = productDetails ? productDetails.stock : "N/A"; // Kiểm tra productDetails trước khi truy cập thuộc tính stock
        break;
      case 3: //Total Revenue :
        item.labelDetail = "New Value 3";
        break;
      default:
      // Không làm gì nếu index không khớp
    }
  });
}

const ProductReview = (props) => {
  const reviewData = props.review;
  return (
    <React.Fragment>
      <li className="py-2">
        <div className="border border-dashed rounded p-3">
          <div className="d-flex align-items-start mb-3">
            <div className="hstack gap-3">
              <div className="badge rounded-pill bg-success mb-0">
                <i className="mdi mdi-star"></i> {props.review.rating}
              </div>
              <div className="vr"></div>
              <div className="flex-grow-1">
                <p className="text-muted mb-0">{props.review.comment}</p>
              </div>
            </div>
          </div>
          {props.review.subitem && (
            <React.Fragment>
              <div className="d-flex flex-grow-1 gap-2 mb-3">
                {props.review.subitem.map((subItem, key) => (
                  <React.Fragment key={key}>
                    <Link to="#" className="d-block">
                      <img
                        src={subItem.img}
                        alt=""
                        className="avatar-sm rounded object-fit-cover"
                      />
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          )}

          <div className="d-flex align-items-end">
            <div className="flex-grow-1">
              <h5 className="fs-14 mb-0">{props.review.name}</h5>
            </div>

            <div className="flex-shrink-0">
              <p className="text-muted fs-13 mb-0">{props.review.date}</p>
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

const PricingWidgetList = (props) => {
  return (
    <React.Fragment>
      <Col lg={3} sm={6}>
        <div className="p-2 border border-dashed rounded">
          <div className="d-flex align-items-center">
            <div className="avatar-sm me-2">
              <div className="avatar-title rounded bg-transparent text-secondary fs-24">
                <i className={props.pricingDetails.icon}></i>
              </div>
            </div>
            <div className="flex-grow-1">
              <p className="text-muted mb-1">{props.pricingDetails.label} :</p>
              <h5 className="mb-0">{props.pricingDetails.labelDetail}</h5>
            </div>
          </div>
        </div>
      </Col>
    </React.Fragment>
  );
};

function EcommerceProductDetail(props) {
  const idObject = useParams();
  const idProduct = idObject._id;

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.Ecommerce.productDetails);
  useEffect(() => {
    if (productDetails && !productDetails.length) {
      dispatch(onGetProductById(idProduct));
    }
  }, [idProduct, dispatch]);
  changeLabelDetailInPlace(productDetailsWidgets, productDetails);

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [ttop, setttop] = useState(false);

  const [ssize, setssize] = useState(false);
  const [msize, setmsize] = useState(false);
  const [lsize, setlsize] = useState(false);
  const [xlsize, setxlsize] = useState(false);
  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  document.title = "Product Details | Eezer - React Admin & Dashboard Template";
  if (productDetails.length === 0) {
    return <Loader />; // Hoặc bất kỳ thông báo nào bạn muốn
  }
  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Product details" pageTitle="E-commerce" />
        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row className="gx-lg-5">
                  <Col xl={4} md={8} className="mx-auto">
                    <div className="product-img-slider sticky-side-div">
                      <Swiper
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="swiper product-thumbnail-slider p-2 rounded bg-light"
                      >
                        <div className="swiper-wrapper">
                          {productDetails.images.map((image, index) => (
                            <SwiperSlide key={index}>
                              <img
                                src={image.url}
                                alt=""
                                className="img-fluid d-block"
                              />
                            </SwiperSlide>
                          ))}
                        </div>
                      </Swiper>

                      {productDetails.images.length > 0 && (
                        <div className="product-nav-slider mt-2">
                          <Swiper
                            onSwiper={setThumbsSwiper}
                            slidesPerView={productDetails.images.length}
                            freeMode={true}
                            watchSlidesProgress={true}
                            spaceBetween={10}
                            className="swiper product-nav-slider mt-2 overflow-hidden"
                          >
                            <div className="swiper-wrapper">
                              {productDetails.images.map((image, index) => (
                                <SwiperSlide key={index} className="rounded">
                                  <div className="nav-slide-item">
                                    <img
                                      src={image.url}
                                      alt=""
                                      className="img-fluid d-block rounded"
                                    />
                                  </div>
                                </SwiperSlide>
                              ))}
                            </div>
                          </Swiper>
                        </div>
                      )}
                    </div>
                  </Col>

                  <Col xl={8}>
                    <div className="mt-xl-0 mt-5">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <h5>{productDetails.name}</h5>
                          <div className="hstack gap-3 flex-wrap">
                            <div>
                              <Link to="#" className="text-primary d-block">
                                {JSON.parse(productDetails.brandArr).map(
                                  (val) => {
                                    return val.label;
                                  }
                                )}
                              </Link>
                            </div>
                            {/* <div className="vr"></div>
                            <div className="text-muted">
                              Seller :{" "}
                              <span className="text-body fw-medium">
                                Zoetic Fashion
                              </span>
                            </div> */}
                            <div className="vr"></div>
                            <div className="text-muted">
                              Add :{" "}
                              <span className="text-body fw-medium">
                                {productDetails.publishedDate}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <div>
                            <Tooltip
                              placement="top"
                              isOpen={ttop}
                              target="TooltipTop"
                              toggle={() => {
                                setttop(!ttop);
                              }}
                            >
                              Edit
                            </Tooltip>
                            <Link
                              id="TooltipTop"
                              to={`/apps-ecommerce-add-product/${productDetails._id}`}
                              className="text-body"
                            >
                              <i className="ri-pencil-fill align-bottom me-2 text-muted"></i>{" "}
                              Edit
                            </Link>
                          </div>
                        </div>
                      </div>

                      {/*<div className="d-flex flex-wrap gap-2 align-items-center mt-3">
                        <div className="text-muted fs-16">
                          <span className="mdi mdi-star text-warning"></span>
                          <span className="mdi mdi-star text-warning"></span>
                          <span className="mdi mdi-star text-warning"></span>
                          <span className="mdi mdi-star text-warning"></span>
                          <span className="mdi mdi-star text-warning"></span>
                        </div>
                        <div className="text-muted">
                          ( 5.50k Customer Review )
                        </div>
                            </div> sao đánh giá và số lượt review              */}

                      <Row className="mt-4">
                        {productDetailsWidgets.map((pricingDetails, key) => (
                          <PricingWidgetList
                            pricingDetails={pricingDetails}
                            key={key}
                          />
                        ))}
                      </Row>

                      {/*<Row>
                        <Col xl={6}>
                          <div className=" mt-4">
                            <h5 className="fs-14">Variation 1 :</h5>
                            <div className="d-flex flex-wrap gap-2">
                              <Tooltip
                                placement="top"
                                isOpen={ssize}
                                target="TooltipSSize"
                                toggle={() => {
                                  setssize(!ssize);
                                }}
                              >
                                Out of Stock
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={msize}
                                target="TooltipMSize"
                                toggle={() => {
                                  setmsize(!msize);
                                }}
                              >
                                04 Items Available
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={lsize}
                                target="TooltipLSize"
                                toggle={() => {
                                  setlsize(!lsize);
                                }}
                              >
                                06 Items Available
                              </Tooltip>
                              <Tooltip
                                placement="top"
                                isOpen={xlsize}
                                target="TooltipXlSize"
                                toggle={() => {
                                  setxlsize(!xlsize);
                                }}
                              >
                                Out of Stock
                              </Tooltip>

                              <Input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                              />
                              <Label
                                className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                id="TooltipSSize"
                              >
                                S
                              </Label>

                              <Input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                              />
                              <Label
                                className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                id="TooltipMSize"
                              >
                                M
                              </Label>

                              <Input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                              />
                              <Label
                                className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                id="TooltipLSize"
                              >
                                L
                              </Label>

                              <Input
                                type="radio"
                                className="btn-check"
                                name="productsize-radio"
                              />
                              <Label
                                className="btn btn-soft-primary avatar-xs rounded-circle p-0 d-flex justify-content-center align-items-center"
                                id="TooltipXlSize"
                              >
                                XL
                              </Label>
                            </div>
                          </div>
                        </Col>

                        <Col xl={6}>
                          <div className=" mt-4">
                            <h5 className="fs-14">Variation 2:</h5>
                            <div className="d-flex flex-wrap gap-2">
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="Out of Stock"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-primary"
                                  disabled
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="03 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-secondary"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="03 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-success"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="02 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-info"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="01 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-warning"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="04 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-danger"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="03 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-light"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                              <div
                                data-bs-toggle="tooltip"
                                data-bs-trigger="hover"
                                data-bs-placement="top"
                                title="04 Items Available"
                              >
                                <button
                                  type="button"
                                  className="btn avatar-xs p-0 d-flex align-items-center justify-content-center border rounded-circle fs-20 text-body"
                                >
                                  <i className="ri-checkbox-blank-circle-fill"></i>
                                </button>
                              </div>
                            </div>
                          </div>
                        </Col>
                              </Row>*/}

                      <div className="mt-4 text-muted">
                        <h5 className="fs-14">Describe :</h5>
                        <div
                          dangerouslySetInnerHTML={{
                            __html: productDetails.description,
                          }}
                        />
                      </div>

                      {/*<Row>
                        <Col sm={6}>
                          <div className="mt-3">
                            <h5 className="fs-14">Features :</h5>
                            <ul className="list-unstyled">
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Full Sleeve
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Cotton
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                All Sizes available
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                4 Different Color
                              </li>
                            </ul>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mt-3">
                            <h5 className="fs-14">Services :</h5>
                            <ul className="list-unstyled product-desc-list">
                              <li className="py-1">10 Days Replacement</li>
                              <li className="py-1">
                                Cash on Delivery available
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row> đặc điểm và dịch vụ tronng chi tiết sản phẩm*/}

                      <div className="product-content mt-5">
                        <h5 className="fs-14 mb-3">Product information :</h5>
                        <Nav tabs className="nav-tabs-custom nav-success">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "1",
                              })}
                              onClick={() => {
                                toggleCustom("1");
                              }}
                            >
                              Product details
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "2",
                              })}
                              onClick={() => {
                                toggleCustom("2");
                              }}
                            >
                              Product Description
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent
                          activeTab={customActiveTab}
                          className="border border-top-0 p-4"
                          id="nav-tabContent"
                        >
                          <TabPane id="nav-speci" tabId="1">
                            <div className="table-responsive">
                              <table className="table mb-0">
                                <tbody>
                                  <tr>
                                    <th scope="row" style={{ width: "200px" }}>
                                      Category
                                    </th>
                                    <td>
                                      {JSON.parse(
                                        productDetails.categoryArr
                                      ).map((val) => {
                                        return val.label;
                                      })}
                                    </td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Brand</th>
                                    <td>
                                      {JSON.parse(productDetails.brandArr).map(
                                        (val) => {
                                          return val.label;
                                        }
                                      )}
                                    </td>
                                  </tr>
                                  {/*<tr>
                                    <th scope="row">Color</th>
                                    <td>Blue</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Material</th>
                                    <td>Cotton</td>
                                  </tr>
                                  <tr>
                                    <th scope="row">Weight</th>
                                    <td>140 Gram</td>
                            </tr>*/}
                                </tbody>
                              </table>
                            </div>
                          </TabPane>
                          <TabPane id="nav-detail" tabId="2">
                            <div className="table-responsive">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: productDetails.specification,
                                }}
                              />
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>

                      {/*<div className="mt-5">
                        <div>
                          <h5 className="fs-14 mb-3">Ratings & Reviews</h5>
                        </div>
                        <Row className="gy-4 gx-0">
                          <Col lg={4}>
                            <div>
                              <div className="pb-3">
                                <div className="bg-light px-3 py-2 rounded-2 mb-2">
                                  <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                      <div className="fs-16 align-middle text-warning">
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-half-fill"></i>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <h6 className="mb-0">4.5 out of 5</h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-muted">
                                    Total{" "}
                                    <span className="fw-medium">5.50k</span>{" "}
                                    reviews
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3">
                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">5 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-success"
                                          role="progressbar"
                                          style={{ width: "50.16%" }}
                                          aria-valuenow="50.16"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">2758</h6>
                                    </div>
                                  </div>
                                </Row>

                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">4 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-primary"
                                          role="progressbar"
                                          style={{ width: "19.32%" }}
                                          aria-valuenow="19.32"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">1063</h6>
                                    </div>
                                  </div>
                                </Row>

                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">3 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-success"
                                          role="progressbar"
                                          style={{ width: "18.12%" }}
                                          aria-valuenow="18.12"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">997</h6>
                                    </div>
                                  </div>
                                </Row>

                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">2 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-warning"
                                          role="progressbar"
                                          style={{ width: "7.42%" }}
                                          aria-valuenow="7.42"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>

                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">408</h6>
                                    </div>
                                  </div>
                                </Row>

                                <Row className="align-items-center g-2">
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0">1 star</h6>
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="p-2">
                                      <div className="progress animated-progess progress-sm">
                                        <div
                                          className="progress-bar bg-danger"
                                          role="progressbar"
                                          style={{ width: "4.98%" }}
                                          aria-valuenow="4.98"
                                          aria-valuemin="0"
                                          aria-valuemax="100"
                                        ></div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-auto">
                                    <div className="p-2">
                                      <h6 className="mb-0 text-muted">274</h6>
                                    </div>
                                  </div>
                                </Row>
                              </div>
                            </div>
                          </Col>

                          <Col lg={8}>
                            <div className="ps-lg-4">
                              <div className="d-flex flex-wrap align-items-start gap-3">
                                <h5 className="fs-14">Reviews: </h5>
                              </div>

                              <SimpleBar
                                className="me-lg-n3 pe-lg-4"
                                style={{ maxHeight: "225px" }}
                              >
                                <ul className="list-unstyled mb-0">
                                  {reviews.map((review, key) => (
                                    <React.Fragment key={key}>
                                      <ProductReview review={review} />
                                    </React.Fragment>
                                  ))}
                                </ul>
                              </SimpleBar>
                            </div>
                          </Col>
                        </Row>
                                  </div>*/}
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default EcommerceProductDetail;
