import { createSlice } from "@reduxjs/toolkit";
import {
  getProducts,
  getProductById,
  addNewProduct,
  updateProduct,
  deleteProducts,
  getOrders,
  getOrderById,
  addNewOrder,
  updateOrder,
  deleteOrder,
  getCustomers,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getSellers,
  getCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
  getBrands,
  addNewBrand,
  updateBrand,
  deleteBrand,
  getSubCategory,
  addNewSubCategory,
  updateSubCategory,
  deleteSubCategory,
  addNewColors,
  getColors,
  updateColors,
  deleteColors,
  addNewAttribute,
  getAttribute,
  updateAttribute,
  deleteAttribute,
} from "./thunk";
export const initialState = {
  products: [],
  productDetails: [],
  orders: [],
  orderDetails: [],
  sellers: [],
  customers: [],
  categories: [],
  brands: [],
  Colors: [],
  Attribute: [],
  error: null,
  subcategories: [],
};

const EcommerceSlice = createSlice({
  name: "EcommerceSlice",
  initialState,
  reducer: {},
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload.data;
      state.error = null;
    });

    builder.addCase(getProducts.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.productDetails = action.payload.data; // Thay đổi state tương ứng
      state.isProductByIdSuccess = true; // Thêm trạng thái tương ứng
      state.error = null;
    });

    builder.addCase(getProductById.rejected, (state, action) => {
      state.error = action.error;
      state.isProductByIdSuccess = false; // Thêm trạng thái tương ứng
    });

    builder.addCase(addNewProduct.fulfilled, (state, action) => {
      state.products.push(action.payload.data.product);
      state.error = null;
    });

    builder.addCase(addNewProduct.rejected, (state, action) => {
      state.error = action.error ? action.error.message : null;
    });

    builder.addCase(updateProduct.fulfilled, (state, action) => {
      console.log(state.products);
      state.products = state.products.map((product) =>
        product._id.toString() === action.payload.data._id.toString()
          ? { ...product, ...action.payload.data.product }
          : product
      );
      state.error = null;
    });

    builder.addCase(updateProduct.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(deleteProducts.fulfilled, (state, action) => {
      state.products = (state.products || []).filter(
        (product) =>
          product._id.toString() !== action.payload.product.toString()
      );
      state.error = null;
    });

    builder.addCase(deleteProducts.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(getOrders.fulfilled, (state, action) => {
      state.orders = action.payload.data;
      state.isOrderCreated = false;
      state.isOrderSuccess = true;
      state.error = null;
    });

    builder.addCase(getOrders.rejected, (state, action) => {
      state.error = action.error;
      state.isOrderCreated = false;
      state.isOrderSuccess = false;
    });

    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.orderDetails = action.payload.data; // Thay đổi state tương ứng
      state.isOrderByIdSuccess = true; // Thêm trạng thái tương ứng
      state.error = null;
    });

    builder.addCase(getOrderById.rejected, (state, action) => {
      state.error = action.error;
      state.isOrderByIdSuccess = false; // Thêm trạng thái tương ứng
    });

    builder.addCase(addNewOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload.data);
      state.isOrderCreated = true;
      state.error = null;
    });

    builder.addCase(addNewOrder.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.orders = state.orders.map((order) =>
        order._id.toString() === action.payload.data._id.toString()
          ? { ...order, ...action.payload.data }
          : order
      );
      state.error = null;
    });

    builder.addCase(updateOrder.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(deleteOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id.toString() !== action.payload.order.toString()
      );
      state.error = null;
    });

    builder.addCase(deleteOrder.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(getSellers.fulfilled, (state, action) => {
      state.sellers = action.payload;
      state.error = null;
    });

    builder.addCase(getSellers.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(getCustomers.fulfilled, (state, action) => {
      state.customers = action.payload.data;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = true;
      state.error = null;
    });

    builder.addCase(getCustomers.rejected, (state, action) => {
      state.error = action.error;
      state.isCustomerCreated = false;
      state.isCustomerSuccess = false;
    });

    builder.addCase(addNewCustomer.fulfilled, (state, action) => {
      state.customers.push(action.payload.data);
      state.isCustomerCreated = true;
      state.error = null;
    });
    builder.addCase(addNewCustomer.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(updateCustomer.fulfilled, (state, action) => {
      state.customers = state.customers.map((customer) =>
        customer._id.toString() === action.payload.data._id.toString()
          ? { ...customer, ...action.payload.data }
          : customer
      );
      state.error = null;
    });
    builder.addCase(updateCustomer.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      state.customers = state.customers.filter(
        (customer) =>
          customer._id.toString() !== action.payload.customer.toString()
      );
      state.error = null;
    });
    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.error = action.error;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload.data; // Gán danh sách danh mục từ payload vào state
      state.error = null;
    });

    builder.addCase(getCategories.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể lấy danh sách danh mục
    });
    builder.addCase(addNewCategory.fulfilled, (state, action) => {
      state.categories.push(action.payload.data); // Thêm danh mục mới vào danh sách danh mục
      state.isCategoryCreated = true; // Đặt cờ để cho biết danh mục đã được tạo thành công
      state.error = null;
    });

    builder.addCase(addNewCategory.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể thêm mới danh mục
    });
    builder.addCase(updateCategory.fulfilled, (state, action) => {
      state.categories = state.categories.map((category) =>
        category._id.toString() === action.payload.data._id.toString()
          ? { ...category, ...action.payload.data }
          : category
      ); // Cập nhật thông tin danh mục trong danh sách danh mục
      state.error = null;
    });

    builder.addCase(updateCategory.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể cập nhật danh mục
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      state.categories = state.categories.filter(
        (category) =>
          category._id.toString() !== action.payload.category.toString()
      ); // Xóa danh mục khỏi danh sách danh mục
      state.error = null;
    });

    builder.addCase(deleteCategory.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể xóa danh mục
    });

    // Reducers for brand
    builder.addCase(getBrands.fulfilled, (state, action) => {
      state.brands = action.payload.data; // Gán danh sách thương hiệu từ payload vào state
      state.error = null;
    });

    builder.addCase(getBrands.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể lấy danh sách thương hiệu
    });

    builder.addCase(addNewBrand.fulfilled, (state, action) => {
      state.brands.push(action.payload.data); // Thêm thương hiệu mới vào danh sách thương hiệu
      state.isBrandCreated = true; // Đặt cờ để cho biết thương hiệu đã được tạo thành công
      state.error = null;
    });

    builder.addCase(addNewBrand.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể thêm mới thương hiệu
    });

    builder.addCase(updateBrand.fulfilled, (state, action) => {
      state.brands = state.brands.map((brand) =>
        brand._id.toString() === action.payload.data._id.toString()
          ? { ...brand, ...action.payload.data }
          : brand
      ); // Cập nhật thông tin thương hiệu trong danh sách thương hiệu
      state.error = null;
    });

    builder.addCase(updateBrand.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể cập nhật thương hiệu
    });

    builder.addCase(deleteBrand.fulfilled, (state, action) => {
      state.brands = state.brands.filter(
        (brand) => brand._id.toString() !== action.payload.brand.toString()
      ); // Xóa thương hiệu khỏi danh sách thương hiệu
      state.error = null;
    });

    builder.addCase(deleteBrand.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể xóa thương hiệu
    });

    // Reducers for Color
    builder.addCase(getColors.fulfilled, (state, action) => {
      state.Colors = action.payload.data; // Gán danh sách thương hiệu từ payload vào state
      state.error = null;
    });

    builder.addCase(getColors.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể lấy danh sách thương hiệu
    });

    builder.addCase(addNewColors.fulfilled, (state, action) => {
      state.Colors.push(action.payload.data); // Thêm thương hiệu mới vào danh sách thương hiệu
      state.isBrandCreated = true; // Đặt cờ để cho biết thương hiệu đã được tạo thành công
      state.error = null;
    });

    builder.addCase(addNewColors.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể thêm mới thương hiệu
    });

    builder.addCase(updateColors.fulfilled, (state, action) => {
      state.Colors = state.Colors.map((Color) =>
        brand._id.toString() === action.payload.data._id.toString()
          ? { ...Color, ...action.payload.data }
          : Color
      ); // Cập nhật thông tin thương hiệu trong danh sách thương hiệu
      state.error = null;
    });

    builder.addCase(updateColors.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể cập nhật thương hiệu
    });

    builder.addCase(deleteColors.fulfilled, (state, action) => {
      state.Colors = state.Colors.filter(
        (Color) => Color._id.toString() !== action.payload.Colors.toString()
      ); // Xóa thương hiệu khỏi danh sách thương hiệu
      state.error = null;
    });

    builder.addCase(deleteColors.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể xóa thương hiệu
    });

    // Reducers for Attribute
    builder.addCase(getAttribute.fulfilled, (state, action) => {
      state.Attribute = action.payload.data; // Gán danh sách thương hiệu từ payload vào state
      state.error = null;
    });

    builder.addCase(getAttribute.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể lấy danh sách thương hiệu
    });

    builder.addCase(addNewAttribute.fulfilled, (state, action) => {
      state.Attribute.push(action.payload.data); // Thêm thương hiệu mới vào danh sách thương hiệu
      state.isBrandCreated = true; // Đặt cờ để cho biết thương hiệu đã được tạo thành công
      state.error = null;
    });

    builder.addCase(addNewAttribute.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể thêm mới thương hiệu
    });

    builder.addCase(updateAttribute.fulfilled, (state, action) => {
      state.Attribute = state.Attribute.map((Attribute) =>
        Attribute._id.toString() === action.payload.data._id.toString()
          ? { ...Attribute, ...action.payload.data }
          : Attribute
      ); // Cập nhật thông tin thương hiệu trong danh sách thương hiệu
      state.error = null;
    });

    builder.addCase(updateAttribute.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể cập nhật thương hiệu
    });

    builder.addCase(deleteAttribute.fulfilled, (state, action) => {
      state.Attribute = state.Attribute.filter(
        (Attribute) =>
          Attribute._id.toString() !== action.payload.Attribute.toString()
      ); // Xóa thương hiệu khỏi danh sách thương hiệu
      state.error = null;
    });

    builder.addCase(deleteAttribute.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể xóa thương hiệu
    });

    // Reducers for SubCategory
    builder.addCase(getSubCategory.fulfilled, (state, action) => {
      state.subcategories = action.payload.data; // Gán danh sách thương hiệu từ payload vào state
      state.error = null;
    });

    builder.addCase(getSubCategory.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể lấy danh sách thương hiệu
    });

    builder.addCase(addNewSubCategory.fulfilled, (state, action) => {
      state.subcategories.push(action.payload.data); // Thêm thương hiệu mới vào danh sách thương hiệu
      state.isSubCategory = true; // Đặt cờ để cho biết thương hiệu đã được tạo thành công
      state.error = null;
    });

    builder.addCase(addNewSubCategory.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể thêm mới thương hiệu
    });

    builder.addCase(updateSubCategory.fulfilled, (state, action) => {
      state.subcategories = state.subcategories.map((brand) =>
        brand._id.toString() === action.payload.data._id.toString()
          ? { ...brand, ...action.payload.data }
          : brand
      ); // Cập nhật thông tin thương hiệu trong danh sách thương hiệu
      state.error = null;
    });

    builder.addCase(updateSubCategory.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể cập nhật thương hiệu
    });

    builder.addCase(deleteSubCategory.fulfilled, (state, action) => {
      state.subcategories = state.subcategories.filter(
        (brand) => brand._id.toString() !== action.payload.brand.toString()
      ); // Xóa thương hiệu khỏi danh sách thương hiệu
      state.error = null;
    });

    builder.addCase(deleteSubCategory.rejected, (state, action) => {
      state.error = action.error; // Xử lý lỗi khi không thể xóa thương hiệu
    });
  },
});

export default EcommerceSlice.reducer;
