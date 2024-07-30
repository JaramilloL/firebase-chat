import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
// import { UserContext } from "../../context/UserContext";
import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { v4 as uuid } from "uuid";
import CommentIcon from "@mui/icons-material/Comment";
import { UserContext } from "../../context/UserContext";
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import CryptoJS from "crypto-js"; // CryptoJS para la encriptacion de los mensajes


const ChatGeneral = () => {
  const { userAccess } = useContext(UserContext)
  //creamos la conexion del backen
  const socket = io(import.meta.env.VITE_BACKEN_URL);

  //creamos un estado para gardar los mensajes
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "",
      body: "",
      user: "",
    },
  ]);
//   const [nameUser, setNameUser] = useState("user");

  //cramos una funcion para la carga de mensajes de firestore
  const loadMessage = async () => {
    const querySnapshot = await getDocs(collection(db, "messages"));
    const loadedMessage = querySnapshot.docs.map((document) => ({
      id: document.id,
      ...document.data(),
    }));
    setMessages(loadedMessage);
  };

  useEffect(() => {
    loadMessage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    socket.emit("message", message);
    // const encriptMessages = CryptoJS.AES.encrypt(message, "secretkey").toString(); //encriptamos
    const newMessage = {
      id: uuid(),
      body: message,
      user: userAccess.email,
    };
    await addDoc(collection(db, "messages"), newMessage);
    // Guarda el mensaje en Firestore
    socket.emit("message", newMessage);
    setMessages([newMessage, ...messages]); //prevMessages => [message, ...prevMessages]
    setMessage("");
  };

  //creamos un euseEffect para atrapar todos los mensajes cuando secarge la pagina
  useEffect(() => {
    const resivedMessage = (message) => {
        // //desencriptamos
        // const byte = CryptoJS.AES.decrypt(message.body, "secretkey");
        // const desencripMessage = byte.toString(CryptoJS.enc.Utf8);
      setMessages([message, ...messages]);
      console.log(message.body);
    };
    socket.on("message", resivedMessage); //enviamos el mensaje al front

    return () => {
      socket.off("message", resivedMessage); //desuscibimos la accion
    };
  }, [messages]);

  return (
    <Box
      component={"div"}
      display={"flex"}
      justifyContent={"center"}
      alignContent={"flex-start"}
      alignItems={"flex-start"}
    >
      <Button variant="contained" size="small" sx={{ mr:2 }}>
        <Link to="/home"><KeyboardDoubleArrowLeftIcon/></Link>
      </Button>
      <Grid>
        <Grid
          item
          xs={12}
          md={6}
          sm={12}
          lg={6}
          xl={6}
          component={"div"}
          lay="flex"
          justifyContent="center"
        >
          <Box component={"form"} sx={{ width: "100%" }}>
            <Divider />

            <TextField
              label="message"
              id="outlined-date"
              type="text"
              name="message"
              required
              autoComplete="current-message"
              
              sx={{ mb: 1, width: "80%" }}
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
            <Box display="flex" justifyContent="center">
              <Button
                color="primary"
                variant="outlined"
                type="submit"
                onClick={handleSubmit}
              >
                Send
              </Button>
            </Box>
          </Box>
          <Grid item xs={12} md={6} sm={12} lg={6} xl={6}>
            {messages &&
              messages.map((mess) => (
                <Box
                  key={mess.id}
                  width={"70vw"}
                  sx={{ display: "flex", justifyContent: "right" }}
                >
                  <Button
                    startIcon={<CommentIcon color="primary" />}
                    sx={{
                      textTransform: "none", // Esto mantiene el texto en su forma original
                      justifyContent: "flex-start", // Asegura que el contenido del botón (icono + texto) esté alineado a la izquierda
                      alignItems: "center", // Centra verticalmente el contenido del botón
                    }}
                  >
                    <Typography
                      variant="body2"
                      textAlign="center"
                      textTransform={"capitalize"}
                      border={1}
                      borderColor={"black"}
                      borderRadius={"100px"}
                      p={1}
                      
                      bgcolor={""}
                      sx={{
                        overflow: "hidden",
                        whiteSpace: "wrap",
                      }}
                    >
                      <Typography variant="body2" component={'strong'} color={'black'}>{mess.user}:</Typography> {mess.body}
                    </Typography>
                  </Button>
                </Box>
              ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChatGeneral;
