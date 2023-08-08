import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import avatarImg from "../../../assets/images/users/profile.jpg";
import avatarImg1 from "../../../assets/images/users/natasa_stankovic.jpg";
import avatarImg2 from "../../../assets/images/users/mirjana_saric.png";

const data = {
  users: [
    {
      id: 1,
      avatar: avatarImg,
      fullName: "Tatjana Stanojevic",
      company: "Yotz PVT LTD",
      role: "Editor",
      username: "gslixby0",
      country: "El Salvador",
      contact: "(479) 232-9151",
      email: "tatjana.stanojevic@msa-iplaw.com",
      currentPlan: "enterprise",
      status: "active",
      informationText: "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi.",
      aboutText: "1 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi. Suspendisse velit mi, pretium non euismod vitae Suspendisse velit mi, pretium non euismod vitae",
    },
    {
      id: 2,
      avatar: avatarImg1,
      fullName: "Natasa Stankovic",
      company: "Skinder PVT LTD",
      role: "Editor",
      username: "hredmore1",
      country: "Albania",
      contact: "(472) 607-9137",
      email: "natasa.stankovic@msa-iplaw.com",
      currentPlan: "team",
      status: "active",
      informationText: "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi.",
      aboutText: "2 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi. Suspendisse velit mi, pretium non euismod vitae Suspendisse velit mi, pretium non euismod vitae",
    },
    {
      id: 3,
      avatar: avatarImg2,
      fullName: "Mirjana Saric",
      company: "Oozz PVT LTD",
      role: "Editor",
      username: "msicely2",
      country: "Russia",
      contact: "(321) 264-4599",
      email: "mirjana.saric@msa-iplaw.com",
      currentPlan: "enterprise",
      status: "active",
      informationText: "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi.",
      aboutText: "3 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sodales sit amet nunc et vehicula. Mauris sed lectus nisi. Suspendisse velit mi, pretium non euismod vitae Suspendisse velit mi, pretium non euismod vitae",
    }
  ],
};

let instance = axios.create({
  baseURL: "https://localhost:3000/",
  timeout: 1000,
  headers: {
    "X-Custom-Header": "foobar",
  },
});
let mock = new MockAdapter(instance);

// Get All Data
mock.onGet("/api/users/list/all-data").reply(200, data.users);

// Add New User
mock.onPost("/apps/users/add-user").reply((config) => {
  const user = JSON.parse(config.data);

  const { length } = data.users;
  let lastIndex = 0;
  if (length) {
    lastIndex = data.users[length - 1].id;
  }
  user.id = lastIndex + 1;

  data.users.unshift(user);

  return [201, { user }];
});

// Get Filter Data
mock.onGet("/api/users/list/data").reply((config) => {
  const {
    q = "",
  } = config;

  const queryLowered = q.toLowerCase();
  const filteredData = data.users.filter(
    (user) =>
      (user.username.toLowerCase().includes(queryLowered) || user.fullName.toLowerCase().includes(queryLowered))
  );

  return [
    200,
    {
      users: filteredData,
    },
  ];
});

// Get User
mock.onGet("/api/users/user").reply((config) => {
  const { id } = config;
  const user = data.users.find((i) => i.id === id);
  return [200, { user }];
});

// Delete User
mock.onDelete("/apps/users/delete").reply((config) => {
  let userId = config.id;
  userId = Number(userId);

  const userIndex = data.users.findIndex((t) => t.id === userId);
  data.users.splice(userIndex, 1);

  return [200];
});

export default instance;