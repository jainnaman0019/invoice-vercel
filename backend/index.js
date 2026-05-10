require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");

const authroutes = require("./routes/authroutes");
const productroutes = require("./routes/productroutes");
const invoiceroutes = require("./routes/invoiceroutes");
const CustomerRoutes = require("./routes/Customerroutes");
const reportroutes = require("./routes/reportroutes");
const invoicedetailroutes = require("./routes/invoicedetailroutes");

// ✅ CONNECT DB FIRST (IMPORTANT)
app.use(async (req, res, next) => {
  await connectDB();
  next();
});

// ✅ CORS FIX (IMPORTANT FOR VERCEL)
app.use(cors({
  origin: "*",
  credentials: true,
  methods: ["GET","POST","PUT","DELETE","PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(cookieParser());

// ✅ ROUTES
app.use("/api/auth", authroutes);
app.use("/api/products", productroutes);
app.use("/api/invoice", invoiceroutes);
app.use("/api/customers", CustomerRoutes);
app.use("/api/reports", reportroutes);
app.use("/api/details", invoicedetailroutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running...");
});

// ❌ NO app.listen here (VERCEL)
module.exports = app;