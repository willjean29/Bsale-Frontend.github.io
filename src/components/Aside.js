import { getCategories } from "../api";
const Aside = {
  render: async () => {
    const {
      data: { categories },
      message,
    } = await getCategories();
    return `
      <h5>Categories</h5>
    ${categories
      .map(
        (category) => `
        <li class="list-group-item category-name">
          <a href="/#/?category/${category.name}">${category.name}</a>
        </li>
      `
      )
      .join("\n")}
    `;
  },
  after_render: async () => {},
};

export default Aside;