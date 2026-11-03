const app = require("./app");
require("dotenv").config();
require("./configs/db");

app.listen(process.env.PORT, () => {
  console.log(`server runnig on port ${process.env.PORT}`);
});
