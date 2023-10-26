const initialOrders = [
  {
    id_user: "65138301bbe1f239759c8d5f",
    id_business: "65138301bbe1f239759c8d5f",
    id_address: "65138301bbe1f239759c8d5f",
    state_order: "ENTREGADO",
    date_delivery: "2023-09-19",
    date_promised: "2023-09-20",
    total: 3000.3,
  },
  {
    id_user: "6513844bbbe1f239759c8d64",
    id_business: "6513844bbbe1f239759c8d64",
    id_address: "6513844bbbe1f239759c8d64",
    state_order: "ENTREGADO",
    date_delivery: "2023-09-19",
    date_promised: "2023-09-20",
    total: 3000.3,
  },
  {
    id_user: "651383c6bbe1f239759c8d61",
    id_business: "651383c6bbe1f239759c8d61",
    id_address: "651383c6bbe1f239759c8d61",
    state_order: "ENTREGADO",
    date_delivery: "2023-09-19",
    date_promised: "2023-09-20",
    total: 3000.3,
  },
];

const initialsUsers = [
  {
    email: "usuariox@gmail.com",
    password: "usuariox",
    name: "usuariox",
  },
  {
    email: "usuario10@gmail.com",
    password: "usuario10",
    name: "usuario10",
  },
  {
    email: "usuario11@gmail.com",
    password: "usuario11",
    name: "usuario11",
  },
  {
    email: "usuario12@gmail.com",
    password: "usuario12",
    name: "usuario12",
  },
  
];

const initialProducts = [
  {
    _id: "6513780ebbe1f239759c8d5b",
    id_subcategory: "651458cf2650bede48deb0f9",
    id_brand: "65137ea3bbe1f239759c8d5d",
    code: 19200056,
    name: "computer Asus 2 3",
    description: "RAM-512GB DISK-1TB 3 ",
    price: 3300.3,
    stock_minimun: 5,
    discount: 5,
    image1: "image1.png",
    image2: "image2.png",
    image3: "image.png",
  },
  {
    _id: "65145d9d2650bede48deb103",
    id_subcategory: "651455d22650bede48deb0e9",
    id_brand: "651458cf2650bede48deb0f9",
    code: 1920007,
    name: "Computadora HP Intel Core i3 ",
    description: "Detalles",
    price: 3000,
    stock_minimun: 5,
    image1: "https://cdn-icons-png.flaticon.com/512/2301/2301898.png",
    image2: "https://cdn-icons-png.flaticon.com/512/2301/2301898.png",
    image3: "https://cdn-icons-png.flaticon.com/512/2301/2301898.png",
  },
  {
    _id: "65145d9d2650bede48deb105",
    id_subcategory: "651455d22650bede48deb0e9",
    id_brand: "651458cf2650bede48deb0f9",
    code: 1920009,
    name: "Computadora HP Elite Pro 4000 core 2 duo ",
    description: "Detalles",
    price: 3000,
    stock_minimun: 5,
    image1: "https://cdn-icons-png.flaticon.com/512/2301/2301898.png",
    image2: "https://cdn-icons-png.flaticon.com/512/2301/2301898.png",
    image3: "https://cdn-icons-png.flaticon.com/512/2301/2301898.png",
  },
];

export { initialOrders, initialsUsers, initialProducts };
