"use client";

import { useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Button from "../../components/common/Button";
import { useFilePicker } from "use-file-picker";
import {
  FileAmountLimitValidator,
  FileTypeValidator,
  FileSizeValidator,
} from "use-file-picker/validators";
import { ApiCall } from "../../services/api/call";
import Markdown from "react-markdown";
import Loader from "../../components/common/Loader";

type RecipeData = {
  recipeName: string;
  recipe: string;
};
const GenerateRecipeScreen: React.FC = () => {
  const [isLoading, setLoading] = useState(false);
  const [recipeData, setRecipeData] = useState<RecipeData | undefined>(
    undefined
  );
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );

  const { openFilePicker, filesContent, errors } = useFilePicker({
    readAs: "DataURL",
    accept: "image/*",
    multiple: false,
    validators: [
      new FileAmountLimitValidator({ max: 1 }),
      // new FileTypeValidator(["jpg", "jpeg"]),
      new FileSizeValidator({ maxFileSize: 20 * 1024 * 1024 /* 20 MB */ }),
    ],
    onFilesSelected: ({ plainFiles, filesContent, errors }) => {
      // this callback is always called, even if there are errors
      console.log("onFilesSelected", { plainFiles, filesContent, errors });

      var url = filesContent[0].content;

      setSelectedImage(url);
      fetch(url)
        .then((res) => res.blob())
        .then((blob) => {
          console.log("blob", blob);
          callGenerateRecipeApi(blob);
        });
    },
  });

  const callGenerateRecipeApi = async (blob: Blob) => {
    // const url = URL.createObjectURL(blob);

    const formData = new FormData();

    formData.append("image", blob, Date.now() + "-food.jpeg"); // "audioFile" is the form field name
    formData.append("size", blob.size.toString());

    console.log("formData: ", formData);
    try {
      setLoading(true);
      console.log("formData: ", formData);
      const response = await ApiCall.callIdentifyFoodAndGenerateRecipe(
        formData
      );
      console.log("🚀 ~ addAudioElement ~ response:", response);

      if (response.data) {
        setRecipeData(response.data);
      }
    } catch (error) {
      console.log("error", error);
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center p-10 bg-backgroundColor flex-col">
      <p className="font-extrabold text-2xl">Identify Your Food</p>

      <p>
        Upload an image of your food, and we'll identify it and generate a
        delicious recipe for you!
      </p>

      <div className="mt-5 h-52 bg-whiteColor border-dashed border-2 w-full sm:w-1/2 lg:w-1/3 flex items-center justify-center">
        {selectedImage ? (
          <img
            className="overflow-hidden h-full w-full sm:w-1/2 lg:w-1/3"
            src={selectedImage}
            alt="image description"
          />
        ) : (
          <MdOutlineAddPhotoAlternate size={24} />
        )}
      </div>

      <Button
        label="Upload food image"
        className="mt-4"
        onClick={openFilePicker}
      />

      {/* <p className="my-3">Or</p>

      <div className="w-full sm:w-1/2 lg:w-1/3">
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Enter the food image URL
        </label>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-full"
          placeholder="Food image URL"
          required
        />
      </div> */}
      {recipeData ? (
        <div>
          <p className="font-bold text-xl mt-5">Identified Food</p>
          <p>{recipeData?.recipeName}</p>
          <p className="font-bold text-xl mt-5">Generated Recipe</p>
          {/* <p>{recipeData?.recipe}</p> */}
          <Markdown>{recipeData?.recipe}</Markdown>
        </div>
      ) : undefined}
      {isLoading ? <Loader /> : undefined}
    </div>
  );
};

export default GenerateRecipeScreen;
