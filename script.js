document.addEventListener("DOMContentLoaded", init);

const filterBtn = document.getElementById("filtrar");
const URL = `https://fakestoreapi.com/products`;
let productsDataGlobal = [];

function init() {
  getAll();
  searchProductEvent();

  filterBtn.addEventListener("click", () => {
    filter(productsDataGlobal);
  });
}

function filter(dataArray) {
  const minPrice = document.getElementById("min");
  const maxPrice = document.getElementById("max");

  let min = parseFloat(minPrice.value) || 0;
  let max = parseFloat(maxPrice.value) || Infinity;
  const filteredProducts = dataArray.filter(
    (productos) => productos.price >= min && productos.price <= max
  );
  showData(filteredProducts);
}

async function getAll() {
  const response = await fetch(URL);

  if (!response.ok) throw new Error("No se encontro la pagina");

  const data = await response.json();

  console.log(data);

  showData(data);
  productsDataGlobal = data;
}

function showData(dataArray) {
  const contenedor = document.getElementById("contenedor");

  // se inicializa con una cadena vacia para almacenar el html
  let template = "";

  for (let item of dataArray) {
    // extraemos la info expecifica de cada prenda
    const { title, price, description, image, category } = item;

    template += `
      <div class="col-12 col-sm-6 col-md-4 col-xl-3">
          <div class="card">
              <img class="card-img-top" width="200" src="${image}" height='300'  alt="Card image cap">
              <div class="card-body">
              <h5 class="card-title">${title}</h5>
              <div class="overflow-auto" style="height:120px;">
                <p class="card-text">${description}</p>
              </div>
                <br><p>Categoria: ${category}</p>
                <br> <p>Precio USD: ${price}</p>
                <a href="#" class="btn btn-primary">Comprar</a>
              </div>
          </div>
      </div>
      `;
  }

  return (contenedor.innerHTML = template);
}

function searchProductEvent() {
  const buscar = document.getElementById("BUSCAR");

  buscar.addEventListener("input", () => {
    if (buscar.value.length < 1) {
      showData(productsDataGlobal);
      return;
    }

    const filteredData = productsDataGlobal.filter((elem) => {
      const title = elem.title
        .toLowerCase()
        .includes(buscar.value.toLowerCase());
      const descripcion = elem.description
        .toLowerCase()
        .includes(buscar.value.toLowerCase());
      console.log(title);
      console.log(descripcion);
      return title || descripcion;
    });
    console.log(filteredData);
    showData(filteredData);
  });
}
