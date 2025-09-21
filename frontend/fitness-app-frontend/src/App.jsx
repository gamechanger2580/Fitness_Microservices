import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import ShuffleHero from "./components/ShuffleHero";

const PrivateRoute = ({ children, token }) => {
  return token ? children : <Navigate to="/" replace />;
};

const ActivitiesPage = () => {
  return (
    <Box component={"section"} sx={{ p: 2, border: "1px dashed grey" }}>
      {" "}
      <ActivityForm onActivityAdded={() => window.location.reload()} />
      <ActivityList />
    </Box>
  );
};

const NeuButton = () => {
  return (
    <div className="bg-white min-h-[200px] flex items-center justify-center">
      <button className="px-6 py-2 font-medium bg-indigo-500 text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]">
        Hover me
      </button>
    </div>
  );
};

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } =
    useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    if (token) {
      dispatch(setCredentials({ token, user: tokenData }));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
        <Button variant="contained" color="#dc004e" onClick={() => logIn()}>
          Login
        </Button>
      ) : (
        <Box component={"section"} sx={{ p: 2, border: "1px dashed grey" }}>
          <Button variant="contained" color="secondary" onClick={logOut}>
            <p>LogOut</p>
          </Button>
          <Routes>
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/activities/:id" element={<ActivityDetail />} />
            <Route
              path="/"
              element={
                token ? (
                  <Navigate to="/activities" replace />
                ) : (
                  <div>Welcome! Please Login</div>
                )
              }
            />
          </Routes>
        </Box>
      )}
    </Router>
  );
}

export default App;
