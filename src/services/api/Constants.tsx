// update this flag for testing and prod server
const isProd = false;

export const TEST_HOST = "http://localhost:3030";
export const PROD_HOST = "https://4498-103-247-54-188.ngrok-free.app";

export let HOST = isProd ? PROD_HOST : TEST_HOST;

const ENDPOINT_PATH = "/api/";

export const BASE_URL = HOST + ENDPOINT_PATH;

export const IMAGE_BASE_URL = "http://localhost:3030/";

export const ENDPOINTS = {
  getRecipes: "recipes",
  getRecipe: "recipe",
  signup: "user/signup",
  login: "user/login",
  myProfile: "user/myProfile",
};

export const DEFAULT = "default";
export const LOADING = "loading";
export const SUCCESS = "success";
export const ERROR = "error";

export const STATUS_FOLLOW = "follow";
export const STATUS_UN_FOLLOW = "unFollow";

export const SOCIAL_FEED_PAGE_LIMIT = 20;
