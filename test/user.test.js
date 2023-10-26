import request from "supertest";
import User from "../Models/userModel.js";
import Roles from "../Models/rolesModel.js";
import server from "../server.js";
import app from "../app.js";
import { initialsUsers } from "./Helpers.js";

let auth = {};

beforeAll(async () => {
  const UserToLogin=new User(initialsUsers[0]);
  await UserToLogin.save();

  await Roles.deleteMany({});

  await loginUser(auth);

  await createRolUser();
});

beforeEach(async () => {
  await User.deleteMany({});

  for (const user of initialsUsers) {
    const userObject = new User(user);
    await userObject.save();
  }
});

describe("POST-GET-PUT-DELETE Api User", () => {
  test("Should response with statuscode 201 of POST user register", async () => {
    const new_user = {
      email: "user15@gmail.com",
      password: "user15",
      name: "user15",
    };

    await request(app)
      .post("/api/user/register")
      .auth(auth.token, { type: "bearer" })
      .expect(201)
      .send(new_user);

    const response = await request(app)
      .get("/api/user/")
      .auth(auth.token, { type: "bearer" })
      .send();
    expect(response.body).toHaveLength(initialsUsers.length + 1);
  });

  test("Should response with statuscode 200 of PUT user profile ", async () => {
    const updateUser = {
      name: "usuariox2",
      email: "usuariox@gmail.com",
      lastname: "lastnamex2",
      phone: "910139973",
      image: "image.png",
    };

    const response = await request(app)
      .put("/api/user/profile")
      .auth(auth.token, { type: "bearer" })
      .send(updateUser);
    expect(response.statusCode).toBe(200);
  });

  test("Should response with statuscode 200 of GET user all", async () => {
    const response = await request(app)
      .get("/api/user/profile")
      .auth(auth.token, { type: "bearer" })
      .send();

    expect(response.statusCode).toBe(200);
  });

  test("Shpuld response with statuscode 200 of GET users", async () => {
    const response = await request(app)
      .get("/api/user/")
      .auth(auth.token, { type: "bearer" })
      .send();

    expect(response.statusCode).toBe(200);
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
