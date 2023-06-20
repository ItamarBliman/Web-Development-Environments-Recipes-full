import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import Search from "./pages/SearchPage";
import About from "./pages/AboutPage";
import RecipeView from "./pages/RecipeViewPage";
import MyFavorites from "./pages/MyFavoritesPage";
import MyRecipes from "./pages/MyRecipesPage";
import MyFamilyRecipes from "./pages/MyFamilyRecipesPage";


const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/search",
    name: "search",
    component: Search,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/myFavorites",
    name: "myFavorites",
    component: MyFavorites,
  },
  {
    path: "/myRecipes",
    name: "myRecipes",
    component: MyRecipes,
  },
  {
    path: "/myFamilyRecipes",
    name: "myFamilyRecipes",
    component: MyFamilyRecipes,
  },
  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: RecipeView,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
