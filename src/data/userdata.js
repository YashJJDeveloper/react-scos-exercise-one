const usersData = [
  {
    email: "a@scos.com",
    password: "123",
    institutes: [],
  },
  {
    email: "b@scos.com",
    password: "123",
    institutes: [
      {
        name: "Bhartiya Vidya Bhawan's",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyBETr-OlpAf9eO4HSZiUdosOV1mEpDZsoA&s",
        roles: [
          {
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
        ],
      },
    ],
  },
  {
    email: "c@scos.com",
    password: "123",
    institutes: [
      {
        name: "Bhartiya Vidya Bhawan's",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyBETr-OlpAf9eO4HSZiUdosOV1mEpDZsoA&s",
        roles: [
          {
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
          {
            name: "Teacher",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
        ],
      }
    ],
  },
  {
    email: "d@scos.com",
    password: "123",
    institutes: [
      {
        name: "Bhartiya Vidya Bhawan's",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyBETr-OlpAf9eO4HSZiUdosOV1mEpDZsoA&s",
        roles: [
          {
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
          {
            name: "Teacher",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
        ],
      },
      {
        name: "Sandipani School",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyBETr-OlpAf9eO4HSZiUdosOV1mEpDZsoA&s",
        roles: [
          {
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
          {
            name: "Teacher",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
        ],
      },

      {
        name: "Delhi Public School",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTh8EPDpakbwGppWaZqiBlQsYLb2kBFlVqxw&s",
        roles: [
          {
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
          {
            name: "Teacher",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
        ],
      },
      {
        name: "BITS Pilani",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRC_1PCT_Obv_scKSLDI_ROvMILsJG6gotXQw&s",
        roles: [
          {
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
          {
            name: "Teacher",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
        ],
      },
      {
        name: "Sandipani School",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyBETr-OlpAf9eO4HSZiUdosOV1mEpDZsoA&s",
        roles: [
          {
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
          {
            name: "Teacher",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
        ],
      },
      {
        name: "Sandipani School",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyBETr-OlpAf9eO4HSZiUdosOV1mEpDZsoA&s",
        roles: [
          {
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
          {
            name: "Teacher",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },
        ],
      },
    ],
  },
  {
    email: "e@scos.com",
    password: "123",
    institutes: [
      {
        name: "Kendriya Vidyalaya",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyBETr-OlpAf9eO4HSZiUdosOV1mEpDZsoA&s",
        roles: [{
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },],
      },
      {
        name: "Bhartiya Vidya Bhavan's",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyBETr-OlpAf9eO4HSZiUdosOV1mEpDZsoA&s",
        roles: [{
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },],
      },
      {
        name: "DAV RAO School",
        instLogo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIyBETr-OlpAf9eO4HSZiUdosOV1mEpDZsoA&s",
        roles: [{
            name: "Admin",
            img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUlhcu_STBOT_K8mQj4vpGgyljrXCO2G2DJw&s",
          },],
      },
    ],
  },
];
export default usersData;
