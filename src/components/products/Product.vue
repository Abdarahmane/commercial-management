<template>
  <div class="container my-4">
    <h1>List of Products</h1>
    <div class="mb-3 d-flex justify-content-end">
      <button class="btn btn-primary" @click="openModal('add')">
        Add Product
      </button>
    </div>

    <table class="table table-striped col-12">
      <thead>
        <tr>
          <th>Product Name</th>
          <th>Description</th>
          <th>Price</th>
          <th>Stock</th>
          <th>Category</th>
          <th>Barcode</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>\${{ product.price.toFixed(2) }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
          <td>{{ product.barcode }}</td>
          <td>{{ product.status }}</td>
          <td>
            <button class="btn btn-info btn-sm me-2" @click="openModal('view', product)">
              <i class="fa fa-eye"></i>
            </button>
            <button class="btn btn-warning btn-sm me-2" @click="openModal('edit', product)">
              <i class="fa fa-pencil"></i>
            </button>
            <button class="btn btn-danger btn-sm" @click="confirmDelete(product.id)">
              <i class="fa fa-trash"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Product Modal -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-labelledby="productModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="productModalLabel">{{ modalTitle }}</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="modalAction === 'edit' ? submitEdit() : addProduct()">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="name" class="form-label">Product Name</label>
                  <input
                    v-model="currentProduct.name"
                    type="text"
                    class="form-control"
                    id="name"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="category" class="form-label">Category</label>
                  <input
                    v-model="currentProduct.category"
                    type="text"
                    class="form-control"
                    id="category"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="price" class="form-label">Price</label>
                  <input
                    v-model="currentProduct.price"
                    type="number"
                    step="0.01"
                    class="form-control"
                    id="price"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="stock" class="form-label">Stock Quantity</label>
                  <input
                    v-model="currentProduct.stock"
                    type="number"
                    class="form-control"
                    id="stock"
                    required
                  />
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="barcode" class="form-label">Barcode</label>
                  <input
                    v-model="currentProduct.barcode"
                    type="text"
                    class="form-control"
                    id="barcode"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label for="status" class="form-label">Status</label>
                  <select
                    v-model="currentProduct.status"
                    class="form-select"
                    id="status"
                    required
                  >
                    <option value="Available">Available</option>
                    <option value="Out of Stock">Out of Stock</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea
                  v-model="currentProduct.description"
                  class="form-control"
                  id="description"
                ></textarea>
              </div>
              <div class="d-flex justify-content-end">
                <button type="submit" class="btn btn-primary me-2">Confirm</button>
                <button type="button" class="btn btn-secondary" @click="closeModal">Close</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Product 1",
          description: "Description for Product 1",
          price: 10.0,
          stock: 100,
          category: "Category 1",
          barcode: "1234567890123",
          status: "Available",
        },
        // Add more product objects here...
      ],
      currentProduct: {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        barcode: "",
        status: "Available",
      },
      modalAction: null,
      modalTitle: "",
    };
  },
  methods: {
    addProduct() {
      const newProduct = {
        id: this.generateUniqueId(),
        ...this.currentProduct,
      };
      this.products.push(newProduct);
      this.resetCurrentProduct();
      this.closeModal();
    },

    confirmDelete(productId) {
  if (confirm("Are you sure you want to delete this product?")) {
    this.products = this.products.filter((p) => p.id !== productId);
  }
},

    resetCurrentProduct() {
      this.currentProduct = {
        name: "",
        description: "",
        price: 0,
        stock: 0,
        category: "",
        barcode: "",
        status: "Available",
      };
    },

    generateUniqueId() {
      return this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1;
    },

    openModal(action, product = null) {
      this.modalAction = action;
      this.modalTitle = action === 'edit' ? 'Edit Product' : (action === 'view' ? 'View Product' : 'Add Product');
      if (action === 'edit') {
        this.currentProduct = { ...product };
      } else if (action === 'view') {
        this.currentProduct = product; // Keep reference for view mode
      } else {
        this.resetCurrentProduct(); // Reset for add mode
      }
      const modal = new bootstrap.Modal(document.getElementById('productModal'));
      modal.show();
    },

    closeModal() {
      const modal = bootstrap.Modal.getInstance(document.getElementById('productModal'));
      modal.hide();
    },

    submitEdit() {
      const index = this.products.findIndex(p => p.id === this.currentProduct.id);
      if (index !== -1) {
        this.products[index] = { ...this.currentProduct };
      }
      this.closeModal();
    },
  },
};
</script>

<style>
/* Add any additional styles here */
</style>
