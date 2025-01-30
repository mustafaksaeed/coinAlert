const Koa = require("koa");
const cors = require("@koa/cors");
const app = new Koa();
const mongoose = require("mongoose");

// function to connect to db
async function connectDb() {
  const db = await mongoose.connect("mongodb://127.0.0.1:27017/test");

  return db;
}

const kvSchema = new mongoose.Schema({
  key: String,
  value: String,
  timestamp: { type: Date, default: Date.now },
});
const kvModel = mongoose.model("KV", kvSchema);

// function to set value in db
function setValue(key, value) {
  const kvItem = new kvModel({ key: key, value: value, timestamp: new Date() });

  return kvItem.save();
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

testDb();

app.use(cors());
app.use(async (ctx) => {
  ctx.body = "check app";
});

app.listen(3000);
