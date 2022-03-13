import { HomeScreen, Error404Screen } from "./screens";
import { Aside, Header, Pagination } from "./components";
import { parseRequestUrl, showLoading, hideLoading } from "./utils";
const routes = {
  "/": HomeScreen,
  // '/product/:id/edit': ProductEditScreen,
  // '/product/:id': ProductScreen,
  // '/order/:id': OrderScreen,
  // '/cart/:id': CartScreen,
  // '/cart': CartScreen,
  // '/signin': SigninScreen,
  // '/register': RegisterScreen,
  // '/profile': ProfileScreen,
  // '/shipping': ShippingScreen,
  // '/payment': PaymentScreen,
  // '/placeorder': PlaceOrderScreen,
  // '/dashboard': DashboardScreen,
  // '/productlist': ProductListScreen,
  // '/orderlist': OrderListScreen,
};

const router = async () => {
  showLoading();
  const { path, params } = parseRequestUrl();
  // const parseUrl = (request.resource ? `/${request.resource}` : "/") + (request.id ? "/:id" : "") + (request.verb ? `/${request.verb}` : "");
  // console.log({parseUrl});
  const screen = routes[path] ? routes[path] : Error404Screen;
  const header = document.getElementById("header-container");
  header.innerHTML = Header.render();
  Header.after_render();

  const aside = document.getElementById("list-categories");
  aside.innerHTML = await Aside.render();
  await Aside.after_render();

  const modal = document.getElementById("list-categories-modal");
  modal.innerHTML = await Aside.render();

  const main = document.getElementById("products__content");
  main.innerHTML = await screen.render();
  if (routes[path]) {
    const pagination = document.getElementById("products__pagination");
    pagination.innerHTML = await Pagination.render();
  }

  if (screen.after_render) await screen.after_render();
  hideLoading();
};
window.addEventListener("load", router);
window.addEventListener("hashchange", router);
console.log(parseRequestUrl());
