const Koa = require("koa");
const app = new Koa();

app.use(async (ctx) => {
  ctx.body = "server running";
});

app.listen(3000);
