const Koa = require("koa");
const Router = require("@koa/router");
const bodyParser = require("koa-bodyparser");
const cors = require("@koa/cors");
const mongoose = require("mongoose");

const app = new Koa();
const router = new Router();

// Connect to MongoDB
async function connectDb() {
  await mongoose.connect(
    "mongodb://admin:password@localhost:27017/test?authSource=admin",
    { dbName: "test" }
  );
  console.log("✅ MongoDB connected successfully!");
}
connectDb();

// Define Schema & Model
const emailSchema = new mongoose.Schema({
  email: { type: String, required: true },
  threshold: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});
const EmailThreshold = mongoose.model("EmailThreshold", emailSchema);

// Middleware
app.use(cors());
app.use(bodyParser());

// 👉 **POST: Store Email & Threshold**
router.post("/dashboard", async (ctx) => {
  const { email, threshold } = ctx.request.body;

  if (!email || !threshold) {
    ctx.status = 400;
    ctx.body = { error: "Email and threshold are required" };
    return;
  }

  try {
    const newEntry = new EmailThreshold({ email, threshold });
    await newEntry.save();
    ctx.body = { message: "Data saved!", data: newEntry };
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: "Failed to save data", details: err.message };
  }
});

// 👉 **GET: Retrieve All Entries**
router.get("/", async (ctx) => {
  const entries = await EmailThreshold.find();
  ctx.body = entries;
});

// Use Routes
app.use(router.routes()).use(router.allowedMethods());

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

console.log("Available Routes:");
router.stack.forEach((route) => console.log(route.path));
