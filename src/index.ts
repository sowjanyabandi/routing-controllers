import "reflect-metadata";
import { createKoaServer } from "routing-controllers";

import PagesController from "./pages/controller";
import setupDb from "./db";

const port = process.env.PORT || 4000;

const app = createKoaServer({
  controllers: [PagesController]
});

setupDb()
  .then(_ => app.listen(port, () => console.log(`Listening on port ${port}`)))
  .catch(err => console.error(err));
