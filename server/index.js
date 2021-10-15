// libraries
import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";

//config
// import googleAuthConfig from "./config/google.config";
import routeConfig from "./config/route.config";

//importing env variable
require("dotenv").config();

// micro services route
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import Image from "./API/Images";
import Order from "./API/orders";
import Reviews from "./API/reviews";
import User from "./API/User";
import Menu from "./API/Menu";
import MailService from "./API/Mail";
import Payments from "./API/Payments";

// Database connection
import ConnectDB from "./database/connection";
const zomato = express();

//application middle wares
zomato.use(express.json());
zomato.use(express.urlencoded({ extended: false }));
zomato.use(helmet());
zomato.use(cors());
zomato.use(passport.initialize());
zomato.use(passport.session());

//passport configuration
googleAuthConfig(passport);
routeConfig(passport);

//Application routes
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/image", Image);
zomato.use("/order", Order);
zomato.use("/reviews", Reviews);
zomato.use("/user", User);
zomato.use("/menu", Menu);
zomato.use("/mail", MailService);
zomato.use("/payments", Payments);

zomato.get("/", (req, res) => res.json({ message: "Setup success" }));

const port = process.env.port || 4000;

zomato.listen(port, () =>
  ConnectDB()
    .then(console.log("Server is running 😎"))
    .catch(() => console.log("Server is running but DB is failed!!"))
);
