import request from "supertest";
import app from "../app.js";
import server from "../server.js";
import Product from "../Models/productModel.js";
import Roles from "../Models/rolesModel.js";
import { initialProducts } from "./Helpers.js";

let auth = {};

beforeAll(async () => {
  await Roles.deleteMany({});

  await loginUser(auth);

  await createRolUser();
});

beforeEach(async () => {
  await Product.deleteMany({});

  for (const product of initialProducts) {
    const productObject = new Product(product);
    await productObject.save();
  }
});

describe("GET-POST-PUT-DELETE Api Products", () => {
  test("Should response with statuscode 200 of GET products all", async () => {
    const response = await request(app)
      .get("/api/products/all")
      .expect(201)
      .send();

    expect(response.statusCode).toBe(201);
  });

  test("Should response with statuscode 201 of GET product id", async () => {
    const productsAll = await request(app)
      .get("/api/products/all")
      .expect(201)
      .send();

    const response = await request(app)
      .get(`/api/products/${productsAll.body[0]._id}`)
      .expect(201)
      .send();
    expect(response.statusCode).toBe(201);
  });

  test("Should response with correct comparation of products number, POST product", async () => {
    const postProduct = {
      id_subcategory: "650e2b483b742e9bada8cdf6",
      id_brand: "650e2b483b742e9bada8cdf6",
      code: 19200057,
      name: "computer Asus 4 ssss",
      description: "RAM 512GB DISK 1TB",
      price: 200,
      stock_minimun: 5,
      discount: 5,
      image1: "image.png",
      image2: "image2.png",
      image3: "image3.png",
    };

    await request(app)
      .post("/api/products")
      .auth(auth.token, { type: "bearer" })
      .expect(201)
      .send(postProduct);

    const response = await request(app)
      .get("/api/products/all")
      .expect(201)
      .send();

    expect(response.body).toHaveLength(initialProducts.length + 1);
  });

  test("Should response with statuscode 200 of PUT product updt", async () => {
    const productsAll = await request(app)
      .get("/api/products/all")
      .expect(201)
      .send();

    const putProduct = {
      _id: productsAll.body[0]._id,
      name: "computer Asus 2 3",
      description: "RAM-512GB DISK-1TB 3 ",
    };

    const response = await request(app)
      .put("/api/products")
      .auth(auth.token, { type: "bearer" })
      .send(putProduct);

    expect(response.statusCode).toBe(200);
  });

  test("Should repsonse with 200 of DELETE product remove", async () => {
    const productsAll = await request(app)
      .get("/api/products/all")
      .expect(201)
      .send();

    await request(app)
      .delete(`/api/products/${productsAll.body[0]._id}`)
      .auth(auth.token, { type: "bearer" })
      .expect(200);
  });
});

afterAll(async () => {
  await new Promise((resolve) => {
    server.close((err) => {
      if (err) {
        console.error("Error mientras se cierra el server:", err);
      } else {
        console.log("Server cerrado exitosamente (successfully)");
      }
      resolve();
    });
  });
}, 5000); // Aumentar el tiempo de espera si es necesario

const loginUser = (auth) => {
  const loginUrl = "/api/user/login";
  const credentials = {
    email: "usuariox@gmail.com",
    password: "usuariox",
  };

  return request(app)
    .post(loginUrl)
    .send(credentials)
    .expect(200)
    .then((response) => {
      auth._id = response.body._id;
      auth.token = response.body.sesion_token;
    });
};

const createRolUser = async () => {
  const rolUser = {
    id_user: auth._id,
    name: "Administrador",
    description: "I don't know",
    image: "imagen.png",
  };

  return await request(app)
    .post("/api/roles")
    .set("Authorization", `Bearer ${auth.token}`) //1ra Forma
    .send(rolUser)
    .expect(201)
    .then((response) => {
      console.log("Rol de Usuario Creado: ", response.body.name);
    });
};
