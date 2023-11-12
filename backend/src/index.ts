import express from "express";
import cors from "cors";
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import * as RecipeAPI from './recipe-api';
import { getFavoriteRecipesByIds } from "./recipe-api";

const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());
app.use(cors());

 app.get("/api/recipes/search", async (req, res) => {
    const searchTerm = req.query.searchTerm as string
    const page = parseInt(req.query.page as string)

    const results = await RecipeAPI.searchRecipes(searchTerm,page)
    return res.json(results)
    
});


app.get("/api/recipes/:recipeId/summary", async (req, res) => {
  const recipeId = req.params.recipeId;
  const result = await RecipeAPI.getRecipeSummary(recipeId);
  res.json(result);
});


app.post("/api/recipes/favorite", async (req, res) => {
  const { recipeId } = req.body;
  try {
    // Check if the record already exists
    const existingFavorite = await prismaClient.favoriteRecipe.findUnique({
      where: { recipeId },
    });

    if (existingFavorite) {
      // If it exists, return a conflict response (HTTP 409)
      return res.status(409).json({ error: "Recipe is already a favorite." });
    }

    // If it doesn't exist, create a new favorite recipe
    const favoriteRecipe = await prismaClient.favoriteRecipe.create({
      data: { recipeId },
    });

    res.status(201).json(favoriteRecipe);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});


app.get("/api/recipes/favorite", async (req, res) => {
  try {
    const favoriteRecipes = await prismaClient.favoriteRecipe.findMany();
    const recipeIds = favoriteRecipes.map((recipe) =>
      recipe.recipeId.toString()
    );
    const favorites = await getFavoriteRecipesByIds(recipeIds);
    res.json(favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});

app.delete("/api/recipes/favorite", async (req, res) => {
  const { recipeId } = req.body;
  try {
    await prismaClient.favoriteRecipe.delete({
      where: { recipeId },
    });
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Oops, something went wrong." });
  }
});

app.listen(5000, () => {
  console.log("server running on localhost:5000");
});
