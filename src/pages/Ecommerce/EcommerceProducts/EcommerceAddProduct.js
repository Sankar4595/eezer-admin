import React, { useRef, useState, useEffect } from "react";
import { format } from "date-fns";
import BreadCrumb from "../../../Components/Common/BreadCrumb";
import {
  Card,
  CardBody,
  Col,
  Container,
  CardHeader,
  Input,
  Label,
  FormFeedback,
  Form,
  Row,
  Alert,
  Table,
} from "reactstrap";

// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  getProducts as onGetProducts,
  addNewProduct as onAddNewProduct,
  updateProduct as onUpdateProduct,
} from "../../../slices/thunks";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Dropzone from "react-dropzone";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createSelector } from "reselect";
//formik
import { useFormik } from "formik";
import * as Yup from "yup";

// Import React FilePond
import { registerPlugin } from "react-filepond";
import Select from "react-select";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import ProductVariant from "./ProductVariant";
import EcommerceCategory from "./EcommerceCategory";
import EcommerceBrand from "./EcommerceBrand";
import EcommerceColor from "./EcommerceColor";
import EcommerceAttributes from "./EcommerceAttributes";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const EcommerceAddProduct = (props) => {
  document.title = "Add product | Eezer - React Admin & Dashboard Template";

  const history = useNavigate();
  const productId = useParams();
  const [isEditMode, setIsEditMode] = useState(false);
  const [attributeData, setAttributeData] = useState([]);
  console.log("attributeData: ", attributeData);

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };

  const dispatch = useDispatch();
  const selectDashboardData = createSelector(
    (state) => state.Ecommerce.products,
    (products) => products
  );
  const products = useSelector(selectDashboardData);
  useEffect(() => {
    if (!products || products.length === 0) {
      dispatch(onGetProducts());
    }
  }, [dispatch, products]);
  const editorDesRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const editorSpecRef = useRef(null);

  useEffect(() => {
    // Tạo một async hàm bên trong useEffect
    const fetchData = async () => {
      const foundProduct = products.find(
        (product) => product._id === productId._id
      );
      // Cập nhật giá trị của selectedProduct khi tìm thấy sản phẩm
      if (foundProduct) {
        await setSelectedProduct(foundProduct);
        // Sau khi setSelectedProduct hoàn thành, bạn có thể thực hiện các bước tiếp theo ở đây
        setIsEditMode(true);
        validation.setFieldValue("name", foundProduct.name);
        validation.setFieldValue("description", foundProduct.description);
        validation.setFieldValue("specification", foundProduct.specification);
        validation.setFieldValue("price", foundProduct.price);
        validation.setFieldValue("stock", foundProduct.stock);
        validation.setFieldValue("discount", foundProduct.discount);
        const isPublishOption = IsPublishOptions[0].options.find(
          (option) => option.value === foundProduct.isPublish
        );
        validation.setFieldValue("isPublish", isPublishOption);
        validation.setFieldValue("brandId", {
          value: foundProduct.brand._id,
          label: foundProduct.brand.name,
        });
        validation.setFieldValue("colorId", {
          value: foundProduct.brand._id,
          label: foundProduct.brand.name,
        });
        validation.setFieldValue("attributes", {
          value: foundProduct.attribute._id,
          label: foundProduct.attribute.name,
        });
        validation.setFieldValue("categoryId", {
          value: foundProduct.category._id,
          label: foundProduct.category.name,
        });
        await setselectedFiles(foundProduct.images);
        validation.setFieldValue("images", selectedFiles);
      }
    };

    // Gọi async hàm
    fetchData();
  }, [productId, products, isEditMode]);

  const [isHovered, setIsHovered] = useState(false);

  const handleCardMouseEnter = () => {
    setIsHovered(true);
  };

  const handleCardMouseLeave = () => {
    setIsHovered(false);
  };
  const [selectedFiles, setselectedFiles] = useState([]);
  function handleAcceptedFiles(files, fromClipboard = false) {
    const processedFiles = files.map((file) => {
      const randomFileName = generateRandomString(10);
      const newFile = new File([file], `${randomFileName}.png`, {
        type: file.type,
      });

      return Object.assign(newFile, {
        preview: URL.createObjectURL(file),
        formattedSize: formatBytes(file.size),
      });
    });

    if (fromClipboard) {
      // Nếu từ clipboard, chỉ thêm file đầu tiên trong mảng processedFiles
      setselectedFiles((prevFiles) => [...prevFiles, processedFiles[0]]);
    } else {
      // Logic cho việc thêm file thủ công
      if (selectedFiles.length === 0) {
        setselectedFiles(processedFiles);
      } else if (selectedFiles.length === 1) {
        const newFiles = processedFiles.slice(0, 2);
        setselectedFiles([...selectedFiles, ...newFiles]);
      } else {
        setselectedFiles([...selectedFiles, ...processedFiles]);
      }
    }
  }

  function handleRemoveImage(index) {
    // Tạo một bản sao của danh sách ảnh đã chọn
    const updatedFiles = [...selectedFiles];
    // Loại bỏ ảnh tại chỉ mục index
    updatedFiles.splice(index, 1);
    // Cập nhật danh sách ảnh
    setselectedFiles(updatedFiles);
    // Cập nhật trường images trong Formik với danh sách ảnh mới
    validation.setFieldValue("images", updatedFiles);
  }
  function generateRandomString(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersLength);
      result += characters.charAt(randomIndex);
    }

    return result;
  }
  useEffect(() => {
    const handlePaste = (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const items = clipboardData.items || [];

      // Lặp từ cuối lên đầu
      for (let i = items.length - 1; i >= 0; i--) {
        const item = items[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          const randomFileName = generateRandomString(10); // Độ dài tên file mong muốn
          const file = new File([blob], `${randomFileName}.png`, {
            type: blob.type,
          });
          handleAcceptedFiles([file, ...selectedFiles], true);
          break; // Dừng sau khi xử lý ảnh đầu tiên (gần nhất)
        }
      }
    };
    document.addEventListener("paste", handlePaste);
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [selectedFiles]);
  useEffect(() => {
    validation.setFieldValue("images", selectedFiles);
  }, [selectedFiles]);

  function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  const IsPublishOptions = [
    {
      options: [
        { label: "Hidden", value: false },
        { label: "Show", value: true },
      ],
    },
  ];
  const handleCategoryChange = (categoryId) => {
    validation.setFieldValue("categoryId", categoryId);
  };
  const handleCategoryBlur = () => {
    validation.handleBlur;
  };
  const handleBrandChange = (brandId) => {
    validation.setFieldValue("brandId", brandId);
  };
  const handleColorChange = (colorId) => {
    validation.setFieldValue("colorId", colorId);
  };
  const handleattributeChange = (attributeId) => {
    validation.setFieldValue("attributeId", attributeId);
  };
  const handleBrandBlur = () => {
    validation.handleBlur;
  };
  const handleColorBlur = () => {
    validation.handleBlur;
  };
  const handleattributeBlur = () => {
    validation.handleBlur;
  };
  //json gửi đi
  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      stock: "",
      price: "",
      newPrice: "",
      categoryId: null,
      brandId: null,
      colorId: [],
      attributeId: [],
      specification: "",
      description: "",
      linkrv: "",
      discount: 0,
      isPublish: null,
      images: [],
    },
    validationSchema: Yup.object({
      name: Yup.string() //check biến isEditMode == true thì không cần test unique
        .required("Please enter product name")
        .max(500, "Please do not enter more than 500 characters")
        .test("is-unique", "Product name already exists", function (value) {
          // Chuẩn bị tên sản phẩm để kiểm tra
          if (isEditMode === true) {
            return true;
          }
          const trimmedLowerCaseValue = value.trim().toLowerCase();
          // Kiểm tra xem tên sản phẩm đã tồn tại trong danh sách products hay không
          return !products.some((product) => {
            const productLowerCaseName = product.name.trim().toLowerCase();
            return productLowerCaseName === trimmedLowerCaseValue;
          });
        }),
      price: Yup.number().required("Please enter product price"),
      stock: Yup.number().required("Please enter stock quantity"),
      isPublish: Yup.object()
        .nullable(false)
        .required("Please select display status"),
      categoryId: Yup.object()
        .nullable(false)
        .required("Please select a category"),
      brandId: Yup.object().nullable(false).required("Please select a brand"),
      colorId: Yup.array().nullable(false).required("Please select a color"),
      attributeId: Yup.array()
        .nullable(false)
        .required("Please select a attribute"),
      description: Yup.string()
        .required("Please enter product description")
        .max(3000, "Cannot exceed 3000 characters"),
      specification: Yup.string()
        .required("Please enter product specifications")
        .max(3000, "Cannot exceed 3000 characters"),
      images: Yup.array().test(
        "images-validation",
        "Please add at least 1 photo",
        function (value) {
          // Nếu isEditMode là true, trả về true và bỏ qua kiểm tra
          if (isEditMode === true) {
            return true;
          }
          // Kiểm tra số lượng ảnh khi isEditMode là false
          return value && value.length >= 1;
        }
      ),
    }),
    onSubmit: async (values) => {
      // Xử lý dữ liệu khác
      const newProduct = new FormData();
      // Thêm dữ liệu sản phẩm
      newProduct.append("name", values.name);
      newProduct.append("price", values.price);
      newProduct.append("stock", values.stock);
      newProduct.append("discount", values.discount);
      newProduct.append("categoryId", values.categoryId.value);
      newProduct.append("brandId", values.brandId.value);
      newProduct.append("isPublish", values.isPublish.value);
      newProduct.append("description", values.description);
      newProduct.append("specification", values.specification);
      if (isEditMode !== true) {
        values.images.forEach((file) => {
          newProduct.append("images", file);
        });
        values.colorId.forEach((file) => {
          newProduct.append("colorId", file);
        });
        values.attributeId.forEach((file) => {
          newProduct.append("attributes", file);
        });
        await dispatch(onAddNewProduct(newProduct));
        await dispatch(onGetProducts());
        history("/apps-ecommerce-products");
        validation.resetForm();
      } else {
        newProduct.append("id", productId._id);
        // for (const [key, value] of newProduct.entries()) {
        //   console.log(`Key: ${key}, Value: ${value}`);
        // }
        await dispatch(onUpdateProduct(newProduct));
        await dispatch(onGetProducts());
        history("/apps-ecommerce-products");
        validation.resetForm();
      }
    },
  });
  // Sử dụng state để quản lý dữ liệu CKEditor
  const [editorDesData, setEditorDesData] = useState(
    validation.values.description
  );
  const [editorSpecData, setEditorSpecData] = useState(
    validation.values.description
  );
  useEffect(() => {
    setEditorDesData(validation.values.description);
    setEditorSpecData(validation.values.specification);
  }, [
    validation.values.description,
    validation.values.specification,
    validation.values.colorId,
  ]);
  console.log("validation.values.colorId: ", validation.values.colorId);

  const handleAttributeDataChange = (e, value) => {
    setAttributeData((prev) => {
      const index = prev.findIndex((item) => item.value === value.value);
      if (index !== -1) {
        const updatedData = [...prev];
        updatedData[index].data = e;
        return updatedData;
      } else {
        return [...prev, { ...value, data: e }];
      }
    });
  };

  const generateCombinations = (
    data,
    currentCombination = [],
    index = 0,
    combinations = []
  ) => {
    if (index === data?.length) {
      combinations?.push([...currentCombination]);
      return;
    }

    const category = data[index];
    category?.data?.forEach((variation) => {
      currentCombination.push(variation);
      generateCombinations(data, currentCombination, index + 1, combinations);
      currentCombination.pop();
    });

    return combinations;
  };

  // Function to render table rows
  let resultColor = {
    label: "color",
    value: "color",
    data: validation.values.colorId,
  };
  const renderRows = () => {
    const combinations = generateCombinations([...attributeData, resultColor]);
    return combinations?.map((combination, rowIndex) => (
      <tr key={`row-${rowIndex}`}>
        {combination.map((variation, colIndex) => (
          <React.Fragment key={`col-${colIndex}`}>
            <td>{variation.label}</td>
            {colIndex === combination.length - 1 && (
              <>
                <td>
                  <Input type="text" placeholder="SKU" />
                </td>
                <td>
                  <Input type="number" placeholder="Qty" />
                </td>
                <td>
                  <Input type="file" />
                </td>
              </>
            )}
          </React.Fragment>
        ))}
      </tr>
    ));
  };

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Create Product" pageTitle="Ecommerce" />
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
        >
          <Row>
            <Col lg={8}>
              <Card>
                <CardBody>
                  <div className="mb-3">
                    <Label className="form-label" htmlFor="product-title-input">
                      Product's name
                    </Label>
                    <Input
                      type="text"
                      className="form-control"
                      id="product-title-input"
                      placeholder="Enter product name"
                      name="name"
                      value={validation.values.name || ""}
                      onBlur={validation.handleBlur}
                      onChange={validation.handleChange}
                      invalid={
                        validation.errors.name && validation.touched.name
                          ? true
                          : false
                      }
                    />
                    {validation.errors.name && validation.touched.name ? (
                      <FormFeedback type="invalid">
                        {validation.errors.name}
                      </FormFeedback>
                    ) : null}
                  </div>
                  <div>
                    <Label>Product Description</Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorDesData} // Sử dụng state để cung cấp dữ liệu cho CKEditor
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorDesData(data); // Cập nhật state khi dữ liệu thay đổi
                        validation.setFieldValue("description", data);
                      }}
                    />
                    {validation.errors.description && (
                      <Alert color="danger">
                        <strong>An error occurred! </strong>
                        {validation.errors.description}
                      </Alert>
                    )}
                    <Label>Detailed parameters</Label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorSpecData} // Sử dụng state để cung cấp dữ liệu cho CKEditor
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        setEditorSpecData(data); // Cập nhật state khi dữ liệu thay đổi
                        validation.setFieldValue("specification", data);
                      }}
                    />
                    {validation.errors.specification && (
                      <Alert color="danger">
                        <strong>An error occurred! </strong>
                        {validation.errors.specification}
                      </Alert>
                    )}
                  </div>
                </CardBody>
              </Card>
              <div>
                <ProductVariant
                  customActiveTab={customActiveTab}
                  toggleCustom={toggleCustom}
                  validation={validation}
                />
                {/* other components */}
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">
                      Product Variation + Price
                    </h5>{" "}
                  </CardHeader>
                  <CardBody>
                    <Table bordered>
                      <thead>
                        <tr>
                          {[...attributeData, resultColor].map((category) => (
                            <th key={`header-${category.label}`}>
                              {category.label}
                            </th>
                          ))}
                          <th>SKU</th>
                          <th>Qty</th>
                          <th>Image Upload</th>
                        </tr>
                      </thead>
                      <tbody>{renderRows()}</tbody>
                    </Table>
                  </CardBody>
                </Card>
              </div>

              <div className="text-end mb-3">
                {isEditMode ? (
                  <button type="submit" className="btn btn-primary w-sm">
                    Save edits
                  </button>
                ) : (
                  <button type="submit" className="btn btn-primary w-sm">
                    Add products
                  </button>
                )}
              </div>
            </Col>
            <Col lg={4}>
              <Card>
                <CardHeader>
                  <h5 className="card-title mb-0">Status</h5>{" "}
                </CardHeader>
                <CardBody>
                  <div>
                    <Label
                      htmlFor="choices-publish-visibility-input"
                      className="form-label"
                    >
                      Hide/Show
                    </Label>

                    <Select
                      name="isPublish"
                      options={IsPublishOptions}
                      value={validation.values.isPublish}
                      onBlur={validation.handleBlur}
                      onChange={(selectedOption) => {
                        validation.setFieldValue("isPublish", selectedOption);
                      }}
                    />
                    {validation.touched.isPublish &&
                    validation.errors.isPublish ? (
                      <Alert color="danger">
                        <strong>An error occurred! </strong>
                        {validation.errors.isPublish}
                      </Alert>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
              <EcommerceCategory
                categoryId={validation.values.categoryId}
                errors={validation.errors.categoryId}
                blur={validation.touched.categoryId}
                handleCategoryBlur={handleCategoryBlur}
                handleCategoryChange={handleCategoryChange}
              />

              <EcommerceBrand
                brandId={validation.values.brandId}
                errors={validation.errors.brandId}
                blur={validation.touched.brandId}
                handleBrandBlur={handleBrandBlur}
                handleBrandChange={handleBrandChange}
              />

              <EcommerceColor
                ColorId={validation.values.colorId}
                errors={validation.errors.colorId}
                blur={validation.touched.colorId}
                handleColorBlur={handleColorBlur}
                handleColorChange={handleColorChange}
              />

              <EcommerceAttributes
                AttributeId={validation.values.attributeId}
                errors={validation.errors.attributeId}
                blur={validation.touched.attributeId}
                handleAttributeBlur={handleattributeBlur}
                handleAttributeChange={handleattributeChange}
              />

              {validation?.values?.attributeId?.length > 0 && (
                <Card>
                  <CardHeader>
                    <h5 className="card-title mb-0">
                      Choose the attributes of this product and then input
                      values of each attribute
                    </h5>
                  </CardHeader>
                  <CardBody>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                        flexWrap: "wrap",
                      }}
                    >
                      {validation?.values?.attributeId?.length > 0 &&
                        validation?.values?.attributeId.map((val, i) => {
                          return (
                            <Select
                              key={i}
                              name={val.label}
                              isMulti
                              options={val.data}
                              onChange={(e) => {
                                handleAttributeDataChange(e, val);
                              }}
                            />
                          );
                        })}
                    </div>
                  </CardBody>
                </Card>
              )}

              <Card
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
                className={`mb-3 ${isHovered ? "active" : ""}`}
              >
                <CardHeader>
                  <h5 className="card-title mb-0">Product image</h5>
                </CardHeader>
                <CardBody>
                  <div>
                    <h5 className="fs-14 mb-1">Some other photos</h5>
                    <p className="text-muted">Add product photo</p>

                    <Dropzone
                      onDrop={(acceptedFiles) => {
                        const newFiles = acceptedFiles;
                        handleAcceptedFiles(newFiles);
                      }}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div className="dropzone dz-clickable">
                          <div
                            className="dz-message needsclick mt-4"
                            {...getRootProps()}
                          >
                            <div className="mb-3">
                              <i className="display-4 text-muted ri-upload-cloud-2-fill" />
                            </div>
                            <h5>
                              Drag and drop or click to post photos (minimum 1
                              image)
                            </h5>
                          </div>
                        </div>
                      )}
                    </Dropzone>

                    <div className="list-unstyled mb-0" id="file-previews">
                      {selectedFiles.map((f, i) => {
                        return (
                          <Card
                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                            key={i + "-file"}
                          >
                            <div className="p-2">
                              <Row className="align-items-center">
                                <Col className="col-auto">
                                  <img
                                    data-dz-thumbnail=""
                                    height="80"
                                    className="avatar-sm rounded bg-light"
                                    alt={f.name}
                                    src={f.preview || f.url}
                                  />
                                </Col>
                                <Col>
                                  <Link
                                    to="#"
                                    className="text-muted font-weight-bold"
                                  >
                                    {f.name}
                                  </Link>
                                  <p className="mb-0">
                                    <strong>{f.formattedSize}</strong>
                                  </p>
                                </Col>

                                <div className="col-xl-3 col-lg-4 col-sm-6">
                                  <button
                                    type="button"
                                    className="btn btn-danger"
                                    onBlur={validation.handleBlur}
                                    onClick={() => handleRemoveImage(i)} // Truyền chỉ mục i vào hàm xử lý
                                  >
                                    <i className="mdi mdi-archive-cancel"></i>{" "}
                                    Erase
                                  </button>
                                </div>
                              </Row>
                            </div>
                          </Card>
                        );
                      })}
                    </div>
                    {isHovered && (
                      <Alert color="primary" className="border-0">
                        <strong> Notifications </strong> Tips:{" "}
                        <b>Ctrl + V to paste the image.</b>{" "}
                      </Alert>
                    )}
                    {validation.errors.images && validation.touched.images ? (
                      <Alert color="danger">
                        <strong>An error occurred! </strong>
                        {validation.errors.images}
                      </Alert>
                    ) : null}
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default EcommerceAddProduct;
