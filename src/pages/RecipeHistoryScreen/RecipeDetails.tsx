import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ApiCall } from "../../services/api/call";
import { AppApiException } from "../../services/api/error/AppApiException";
import { IRecipeData } from "../../services/api/entities/IRecipe";
import Markdown from "react-markdown";
import Loader from "../../components/common/Loader";
import { IMAGE_BASE_URL } from "../../services/api/Constants";

export const RecipeDetails = () => {
  const { id } = useParams();

  console.log("id:: " + id);

  const [recipeData, setRecipeData] = useState<IRecipeData | undefined>(
    undefined
  );
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function getRecipeDetails() {
      if (id) {
        const result = await ApiCall.callGetRecipeDetails(id);

        if (!(result instanceof AppApiException)) {
          setRecipeData(result);
        }
      }
    }
    getRecipeDetails();
  }, []);

  return (
    <div className="min-h-screen w-full flex items-center py-8 px-4 bg-backgroundColor flex-col">
      {recipeData && (
        <>
          <p className="font-extrabold text-2xl mb-2">Recipe</p>

          <img
            className="overflow-hidden h-50 w-full sm:w-1/2 lg:w-1/3 rounded-sm"
            src={`${IMAGE_BASE_URL}${recipeData?.imagePath}`}
            alt="image"
          />
          <div>
            <p className="font-bold text-xl mt-5">Dish</p>
            <p>{recipeData?.recipeName}</p>
            <p className="font-bold text-xl mt-5">Recipe</p>
            {/* <p>{recipeData?.recipe}</p> */}
            <Markdown>{recipeData?.recipeDetails}</Markdown>
          </div>
        </>
      )}

      {isLoading ? <Loader /> : undefined}
    </div>
  );
};
