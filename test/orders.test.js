import request from "supertest";
import Order from "../Models/orderModel.js";
import Roles from "../Models/rolesModel.js";
import { initialOrders } from "./Helpers.js";
import app from "../app.js";
import server from "../server.js";

let auth = {};

beforeAll(async () => {

  await Roles.deleteMany({});

  await loginUser(auth);

  await createRolUser();
});

beforeEach(async () => {
  await Order.deleteMany({});

  for (const order of initialOrders) {
    const orderObject = new Order(order);
    await orderObject.save();
  }
});

describe("POST-GET-PUT-DELETE Api Order", () => {
  test("Should response with 200 status code of order-all", async () => {
    const response = await request(app)
      .get("/api/order/all")
      .auth(auth.token, { type: "bearer" }) // 2da forma
      .send();

    expect(response.statusCode).toBe(201);
  });

  test("Should response with 200 status code of order-post", async () => {
    const new_order = {
      id_user: "65138301bbe1f239759c8d5f",
      id_business: "652ec94b00d81cb726e3d1fd",
      id_address: "652ebac94b9d1240f3da48c9",
      state_order: "ENTREGADO",
      date_delivery: "2023-10-21",
      date_promised: "2023-10-21",
      total: 3000.3,
    };

    const response = await request(app)
      .post("/api/order")
      .auth(auth.token, { type: "bearer" })
      .send(new_order);

    expect(response.statusCode).toBe(201);
  });

  test("SHould response with correct comparation of orders number", async () => {
    await request(app)
      .post("/api/order")
      .auth(auth.token, { type: "bearer" })
      .expect(201)
      .send(initialOrders[4]);

    const response = await request(app)
      .get("/api/order/all")
      .auth(auth.token, { type: "bearer" })
      .expect(201)
      .send();

    expect(response.body).toHaveLength(initialOrders.length + 1);
  });

  test("Should response with 201 status code of Order Update", async () => {
    const orders = await request(app)
      .get("/api/order/all")
      .auth(auth.token, { type: "bearer" })
      .expect(201)
      .send();

    const changeStateOfOrder = {
      _id: orders.body[0]._id,
      state_order: "PAGADO",
    };

    const response = await request(app)
      .put("/api/order/state")
      .auth(auth.token, { type: "bearer" })
      .send(changeStateOfOrder);

    expect(response.statusCode).toBe(201);
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
