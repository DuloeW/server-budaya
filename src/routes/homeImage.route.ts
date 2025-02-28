import { Hono } from "hono";
import { createAHomeImage, deleteAHomeImage, getAllHomeImages, updateAHomeImage } from "../controller/content/homeImage.controller.js";
import type { Context } from "hono";

const homeImageRoute = new Hono()

homeImageRoute.get("/get-all/home-images", (c: Context) => getAllHomeImages(c))
homeImageRoute.post("/create/home-image", (c: Context) => createAHomeImage(c))
homeImageRoute.delete("/delete/home-image", (c: Context) => deleteAHomeImage(c))
homeImageRoute.put("/update/home-image", (c: Context) => updateAHomeImage(c))

export default homeImageRoute