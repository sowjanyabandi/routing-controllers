import {
  JsonController,
  Get,
  Param,
  Put,
  Body,
  Post,
  HttpCode,
  NotFoundError
} from "routing-controllers";
//import pagesById, { Page } from "./data";
import Page from "./entity";
type PageList = { pages: Page[] };

@JsonController()
export default class PageController {
  @Get("/pages/:id")
  async getPage(@Param("id") id: number) {
    return await Page.findOne(id);
  }

  @Get("/pages")
  async getAllPage(): Promise<PageList> {
    const pages = await Page.find();
    return {
      pages: pages
    };
  }

  @Get("/hello")
  async getHello(): Promise<string> {
    console.log("a");
    const message = await new Promise<string>(resolve => {
      setTimeout(() => resolve("hello"), 1000);
    });
    console.log("b");
    return message;
  }

  @Post("/pages")
  @HttpCode(201)
  createPage(@Body() page: Page) {
    return page.save();
  }
  // @Post("/pages")
  // @HttpCode(201)
  // createPage(@Body() body: Page): Page {
  //   console.log(`Incoming POST body param:`, body);
  //   return body;
  // }
  @Put("/pages/:id")
  async updatePage(@Param("id") id: number, @Body() update: Partial<Page>) {
    const page = await Page.findOne(id);
    //console.log(page);
    if (!page) throw new NotFoundError("Cannot find page");

    return Page.merge(page, update).save();
  }
}
