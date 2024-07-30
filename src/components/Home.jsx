import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Box, Button } from "@mui/material";
import { Link, Navigate, useNavigate } from "react-router-dom";
import AvatarUser from "./user/AvatarUser";

const Home = () => {
  const { userAccess, logOut, loading } = useContext(UserContext);

  const navigate = useNavigate();

  const handleClick = async () => {
    await logOut();
    navigate("/");
  };
  if (loading) return <h1>loading.....</h1>;
  if (!userAccess) return <Navigate to="/" />; // Redirige a la página de inicio de sesión si userAccess es nulo

  return (
    <Box display="flex" flexDirection="column" justifyContent="space-between">
      <Box position={"sticky"} top={-10} zIndex={999999}>
        <Button
          variant="contained"
          sx={{ margin: 2, width: 30, minWidth: 70, maxWidth: 150 }}
        >
          <Link to="/chat" style={{color: 'white', textDecoration: 'none'}}>Chat</Link>
        </Button>
        <Button variant="contained" onClick={handleClick} sx={{ margin: 2 }}>
          LogOut
        </Button>
      </Box>
      <Box>
        <AvatarUser userAccess={userAccess} />
      </Box>
    </Box>
  );
};

export default Home;
