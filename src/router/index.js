import { createRouter, createWebHistory } from "vue-router";
import ListCustomers from "../components/customers/Customer.vue"; 
import ListProduct from "../components/products/Product.vue"; 
import Order from "../components/orders/Order.vue"; 

const routes = [
  { path: "/", redirect: "/customers" }, // Redirection vers la liste des clients
  { path: "/customers", component: ListCustomers },
  { path: "/products", component: ListProduct }, 
  { path: "/orders", component: Order }, 
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
