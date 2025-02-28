import { Hono } from "hono";
import { createAHomeImage, deleteAHomeImage, getAllHomeImages, updateAHomeImage } from "../controller/content/homeImage.controller.js";

const homeImageRoute = new Hono()

homeImageRoute.get("/get-all/home-images", (c) => getAllHomeImages(c))
homeImageRoute.post("/create/home-image", (c) => createAHomeImage(c))
homeImageRoute.delete("/delete/home-image", (c) => deleteAHomeImage(c))
homeImageRoute.put("/update/home-image", (c) => updateAHomeImage(c))

export default homeImageRoute