import { HomeScreen, Error404Screen } from "./screens";
import { Aside, Header, Pagination, ItemCart } from "./components";
import { parseRequestUrl, showLoading, hideLoading } from "./utils";
const routes = {
  "/": HomeScreen,
};

const router = async () => {
  showLoading();
  const { path, params } = parseRequestUrl();

  const screen = routes[path] ? routes[path] : Error404Screen;

  // RENDER HEADER
  const header = document.getElementById("header-container");
  header.innerHTML = Header.render();
  Header.after_render();

  // RENDER ASIDE CATEGORIES
  const aside = document.getElementById("list-categories");
  aside.innerHTML = await Aside.render();
  await Aside.after_render();

  // RENDER MODAL CATEGORIES
  const modal = document.getElementById("list-categories-modal");
  modal.innerHTML = await Aside.render();

  // RENDER PRODUCT LIST
  const main = document.getElementById("products__content");
  main.classList.remove("products__content-error");
  main.innerHTML = await screen.render();

  if (routes[path]) {
    const pagination = document.getElementById("products__pagination");
    pagination.innerHTML = await Pagination.render();
  }

  // RENDER SHOPPING CART
  const listCart = document.getElementById("list-cart");
  listCart.innerHTML = ItemCart.render();
  ItemCart.after_render();

  if (screen.after_render) await screen.after_render();

  hideLoading();
};

window.addEventListener("load", router);

window.addEventListener("hashchange", router);
