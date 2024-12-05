import React from "react";
import "./App.css";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "./services/redux";
import { Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import GenerateRecipeScreen from "./pages/GenerateRecipeScreen";
import RecipeHistoryScreen from "./pages/RecipeHistoryScreen";
import RecipeList from "./pages/RecipeHistoryScreen/RecipeList";
import { RecipeDetails } from "./pages/RecipeHistoryScreen/RecipeDetails";
import AuthenticationScreen from "./pages/authentication/AuthenticationScreen";
import { getToken } from "./utils/util";
import { DashBoardScreen } from "./pages/DashBoardScreen";

function App() {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-backgroundColor">
          <div className="flex-grow">
            <Routes>
              <Route index path="/" element={<AuthenticationScreen />} />
              <Route
                path="/authentication"
                element={<AuthenticationScreen />}
              />
              <Route path="dashboard" element={<DashBoardScreen />}>
                <Route index element={<GenerateRecipeScreen />} />
              </Route>
              <Route path="history" element={<RecipeHistoryScreen />}>
                <Route index element={<RecipeList />} />
                <Route path="recipes" element={<RecipeList />} />
                <Route path="details/:id" element={<RecipeDetails />} />
              </Route>
            </Routes>
          </div>
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
