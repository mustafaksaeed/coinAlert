const Koa = require("koa");
const cors = require("@koa/cors");
const app = new Koa();
const mongoose = require("mongoose");

// function to connect to db
await mongoose.connect(
  "mongodb://admin:password@localhost:27017/test?authSource=admin",
  { dbName: "test" } // Force the correct database
);

const kvSchema = new mongoose.Schema({
  key: String,
  value: String,
  timestamp: { type: Date, default: Date.now },
});
const kvModel = mongoose.model("KV", kvSchema);

// function to set value in db
async function setValue(key, value) {
  try {
    const kvItem = new KV({ key, value });
    await kvItem.save();
    console.log(`✅ Saved: ${key} = ${value}`);
  } catch (err) {
    console.error(`❌ Error saving ${key}:`, err.message);
  }
}

async function getValue(key) {
  const results = await kvModel.find({ key: key }).exec();
  return results;
}

async function testDb() {
  // connect to db
  const db = await connectDb();

  // set test value
  await setValue("rafi", "developer");

  // get value
  const val = await getValue("rafi");

  await setValue("mustafa", "developer");
  const val2 = await getValue("mustafa");
  console.log(val, val2);
}

mongoose.connection.on("connected", () => {
  console.log("🔗 Mongoose connected to MongoDB!");
});
mongoose.connection.on("error", (err) => {
  console.error("❌ Mongoose connection error:", err);
});

testDb();

app.use(cors());
app.use(async (ctx) => {
  ctx.body = "check app";
});

app.listen(3000);
