<template>
  <div class="container my-4">
    <!-- Add New Order Form -->
    <div v-if="showAddForm" class="mb-5">
      <h2>Add New Order</h2>
      <div class="d-flex justify-content-end mb-3">
        <button type="submit" class="btn btn-primary me-2" @click="addOrder">
          Submit
        </button>
        <button type="button" class="btn btn-secondary" @click="toggleAddForm">
          Orders List
        </button>
      </div>

      <form @submit.prevent="addOrder">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="date" class="form-label">Date</label>
            <input
              v-model="newOrder.date"
              type="date"
              class="form-control"
              id="date"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="customer" class="form-label">Customer Name</label>
            <input
              v-model="newOrder.customerName"
              type="text"
              class="form-control"
              id="customer"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="address" class="form-label">Delivery Address</label>
            <input
              v-model="newOrder.deliveryAddress"
              type="text"
              class="form-control"
              id="address"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="trackNumber" class="form-label">Track Number</label>
            <input
              v-model="newOrder.trackNumber"
              type="text"
              class="form-control"
              id="trackNumber"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="status" class="form-label">Status</label>
            <select
              v-model="newOrder.status"
              class="form-select"
              id="status"
              required
            >
              <option disabled value="">Select Status</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <h5>Order Details</h5>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(detail, index) in newOrder.details" :key="index">
                <td>
                  <select v-model="detail.product" class="form-select" required>
                    <option disabled value="">Select Product</option>
                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.name"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                </td>
                <td>
                  <input
                    v-model.number="detail.quantity"
                    type="number"
                    class="form-control"
                    min="1"
                  />
                </td>
                <td>
                  <input
                    v-model.number="detail.price"
                    type="number"
                    class="form-control"
                    min="0"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="removeDetail(index)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="button" class="btn btn-success" @click="addNewDetail">
            Add New Detail
          </button>
        </div>
      </form>
    </div>

    <!-- Edit Order Form -->
    <div v-if="showEditForm" class="mb-5">
      <h2>Edit Order</h2>
      <div class="d-flex justify-content-end mb-3">
        <button type="submit" class="btn btn-primary me-2" @click="submitEdit">
          Submit
        </button>
        <button type="button" class="btn btn-secondary" @click="cancelEdit">
          Orders List
        </button>
      </div>

      <form @submit.prevent="submitEdit">
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="editDate" class="form-label">Date</label>
            <input
              v-model="selectedOrder.date"
              type="date"
              class="form-control"
              id="editDate"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="editCustomer" class="form-label">Customer Name</label>
            <input
              v-model="selectedOrder.customerName"
              type="text"
              class="form-control"
              id="editCustomer"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="editAddress" class="form-label">Delivery Address</label>
            <input
              v-model="selectedOrder.deliveryAddress"
              type="text"
              class="form-control"
              id="editAddress"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="editTrackNumber" class="form-label">Track Number</label>
            <input
              v-model="selectedOrder.trackNumber"
              type="text"
              class="form-control"
              id="editTrackNumber"
              required
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="editStatus" class="form-label">Status</label>
            <select
              v-model="selectedOrder.status"
              class="form-select"
              id="editStatus"
              required
            >
              <option disabled value="">Select Status</option>
              <option>Processing</option>
              <option>Shipped</option>
              <option>Delivered</option>
            </select>
          </div>
        </div>

        <div class="mb-3">
          <h5>Order Details</h5>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(detail, index) in selectedOrder.details" :key="index">
                <td>
                  <select v-model="detail.product" class="form-select">
                    <option disabled value="">Select Product</option>
                    <option
                      v-for="product in products"
                      :key="product.id"
                      :value="product.name"
                    >
                      {{ product.name }}
                    </option>
                  </select>
                </td>
                <td>
                  <input
                    v-model.number="detail.quantity"
                    type="number"
                    class="form-control"
                    min="1"
                  />
                </td>
                <td>
                  <input
                    v-model.number="detail.price"
                    type="number"
                    class="form-control"
                    min="0"
                  />
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger"
                    @click="removeDetailFromEdit(index)"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            class="btn btn-success"
            @click="addNewDetailToEdit"
          >
            Add New Detail
          </button>
        </div>
      </form>
    </div>

    <!-- List of Orders -->
    <div v-if="!showAddForm && !showEditForm && !showOrderDetails">
      <h1>List of Orders</h1>
      <div class="d-flex justify-content-end mb-3">
        <button class="btn btn-primary me-2" @click="toggleAddForm">
          Add Order
        </button>
      </div>
      <table class="table table-striped col-12">
        <thead>
          <tr>
            <th>Date</th>
            <th>Customer</th>
            <th>Delivery Address</th>
            <th>Track Number</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="orders.length === 0">
            <td colspan="6" class="text-center">No orders available.</td>
          </tr>
          <tr v-for="order in orders" :key="order.id">
            <td>{{ order.date }}</td>
            <td>{{ order.customerName }}</td>
            <td>{{ order.deliveryAddress }}</td>
            <td>{{ order.trackNumber }}</td>
            <td>{{ order.status }}</td>
            <td>
              <button
                class="btn btn-info btn-sm me-2"
                @click="viewOrderDetails(order)"
              >
                <i class="fas fa-eye"></i>
              </button>
              <button
                class="btn btn-warning btn-sm me-2"
                @click="editOrder(order)"
              >
                <i class="fas fa-edit"></i>
              </button>
              <button
                class="btn btn-danger btn-sm"
                @click="deleteOrder(order.id)"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Order Details -->
    <div v-if="showOrderDetails" class="mb-5">
      <h2>Order Details</h2>
      <div class="d-flex justify-content-end mb-3">
        <button
          type="button"
          class="btn btn-secondary"
          @click="hideOrderDetails"
        >
          Orders List
        </button>
      </div>

      <form>
        <div class="row">
          <div class="mb-3 col-md-6">
            <label for="viewDate" class="form-label">Date</label>
            <input
              v-model="selectedOrder.date"
              type="text"
              class="form-control"
              id="viewDate"
              readonly
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="viewCustomer" class="form-label">Customer Name</label>
            <input
              v-model="selectedOrder.customerName"
              type="text"
              class="form-control"
              id="viewCustomer"
              readonly
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="viewAddress" class="form-label">Delivery Address</label>
            <input
              v-model="selectedOrder.deliveryAddress"
              type="text"
              class="form-control"
              id="viewAddress"
              readonly
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="viewTrackNumber" class="form-label">Track Number</label>
            <input
              v-model="selectedOrder.trackNumber"
              type="text"
              class="form-control"
              id="viewTrackNumber"
              readonly
            />
          </div>
          <div class="mb-3 col-md-6">
            <label for="viewStatus" class="form-label">Status</label>
            <input
              v-model="selectedOrder.status"
              type="text"
              class="form-control"
              id="viewStatus"
              readonly
            />
          </div>
        </div>

        <div class="mb-3">
          <h5>Order Items</h5>
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(detail, index) in selectedOrder.details" :key="index">
                <td>{{ detail.product }}</td>
                <td>{{ detail.quantity }}</td>
                <td>{{ detail.price }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showAddForm: false,
      showEditForm: false,
      showOrderDetails: false,
      newOrder: {
        date: "",
        customerName: "",
        deliveryAddress: "",
        trackNumber: "",
        status: "",
        details: [{ product: "", quantity: 1, price: 0 }],
      },
      selectedOrder: {},
      orders: [
        {
          id: 1,
          date: "2024-09-01",
          customerName: "John Doe",
          deliveryAddress: "123 Main St",
          trackNumber: "TRACK123",
          status: "Shipped",
          details: [{ product: "Product 1", quantity: 2, price: 100 }],
        },
        {
          id: 2,
          date: "2024-09-02",
          customerName: "Jane Smith",
          deliveryAddress: "456 Elm St",
          trackNumber: "TRACK456",
          status: "Processing",
          details: [{ product: "Product 2", quantity: 1, price: 50 }],
        },
        {
          id: 3,
          date: "2024-09-03",
          customerName: "Alice Johnson",
          deliveryAddress: "789 Oak St",
          trackNumber: "TRACK789",
          status: "Delivered",
          details: [{ product: "Product 1", quantity: 3, price: 300 }],
        },
        {
          id: 4,
          date: "2024-09-04",
          customerName: "Bob Brown",
          deliveryAddress: "321 Pine St",
          trackNumber: "TRACK321",
          status: "Processing",
          details: [{ product: "Product 2", quantity: 2, price: 100 }],
        },
      ],
      products: [
        { id: 1, name: "Product 1" },
        { id: 2, name: "Product 2" },
        { id: 3, name: "Product 3" },
      ],
    };
  },
  methods: {
    toggleAddForm() {
      this.showAddForm = !this.showAddForm;
      this.showEditForm = false;
      this.showOrderDetails = false;
      this.newOrder = {
        date: "",
        customerName: "",
        deliveryAddress: "",
        trackNumber: "",
        status: "",
        details: [{ product: "", quantity: 1, price: 0 }],
      };
    },
    addOrder() {
      const newId = this.orders.length
        ? Math.max(this.orders.map((order) => order.id)) + 1
        : 1;
      this.orders.push({ ...this.newOrder, id: newId });
      this.toggleAddForm();
    },
    viewOrderDetails(order) {
      this.selectedOrder = order;
      this.showOrderDetails = true;
    },
    hideOrderDetails() {
      this.showOrderDetails = false;
    },
    editOrder(order) {
      this.selectedOrder = { ...order };
      this.showEditForm = true;
      this.showOrderDetails = false;
    },
    submitEdit() {
      const index = this.orders.findIndex(
        (order) => order.id === this.selectedOrder.id
      );
      if (index !== -1) {
        this.orders.splice(index, 1, this.selectedOrder);
      }
      this.showEditForm = false;
    },
    cancelEdit() {
      this.showEditForm = false;
    },
    deleteOrder(id) {
      if (window.confirm("Are you sure you want to delete this order?")) {
        this.orders = this.orders.filter((order) => order.id !== id);
      }
    },
    addNewDetailToEdit() {
      this.selectedOrder.details.push({ product: "", quantity: 1, price: 0 });
    },

    
    removeDetail(index) {
    if (this.newOrder.details.length > 1) {
      this.newOrder.details.splice(index, 1);
    } 
     else {
      alert("Cannot remove the last detail.");
    }
  },

    addNewDetailToEdit() {
      this.selectedOrder.details.push({ product: "", quantity: 1, price: 0 });
    },
    removeDetailFromEdit(index) {
    if (this.selectedOrder.details.length > 1) {
      this.selectedOrder.details.splice(index, 1);
    }
      else {
      alert("Cannot remove the last detail.");
    }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>
