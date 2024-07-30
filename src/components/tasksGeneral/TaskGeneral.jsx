import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link, Navigate } from "react-router-dom";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Box,
  Button,
  ImageListItem,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { db } from "../../firebase/config";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormAll from "../docs/FormAll";
import { LazyLoadImage } from 'react-lazy-load-image-component'
import icon from '../../assets/loading.jpeg'
import 'react-lazy-load-image-component/src/effects/blur.css';

const TaskGeneral = () => {
  const { userAccess, loading } = useContext(UserContext);
  //modal action
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //creamos dos estads uno para el manejo de el snackbar para la fecha y la alerta
  const [openSnacBar, setOpenSnacBar] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleCloseSnackbar = () => {
    setOpenSnacBar(false);
  };

  //vamos a leer los datos que existen de la base de datos
  //creamos un estado parra lamacenar los datos
  const [data, setData] = useState([]);

  //cramos un estado para avlitar la edicion y otro para avilitar el update\
  const [isEditing, setisEditing] = useState(null);
  const [updateTask, setUpdateTask] = useState({
    nameTask: "",
    descriptionTask: "",
    fechaVencimiento: "",
  });

  useEffect(() => {
    // Función para manejar los datos en tiempo real
    const unsubscribe = onSnapshot(collection(db, "tasksAll"), (snapshot) => {
      const taskData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Task Data:", taskData);

      //verificamos la fecha de vencimiento

      taskData.forEach((item) => {
        const deadLine = new Date(item.fechaVencimiento);
        const now = new Date();
        const timeDiff = deadLine - now;
        const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

        if (daysDiff == 1) {
          setAlertMessage(
            `Task "${item.nameTask}" is due in ${daysDiff} day(s).`
          );
          setOpenSnacBar(true);
        }
      });
      // Almacenamos los datos en el estado
      setData(taskData);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, [userAccess]);

  //eleiminamods los datos
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "tasksAll", id));
      console.log("succefully");
    } catch (error) {
      console.log(error);
    }
  };

  //evaluamos si el uausrio desea editar
  const handleEdit = (item) => {
    setisEditing(item.id);
    setUpdateTask({
      nameTask: item.nameTask,
      descriptionTask: item.descriptionTask,
      fechaVencimiento: item.fechaVencimiento,
    });
  };

  //creamos la funcion de actualizar datos
  const handleUpdateTask = async (id) => {
    try {
      const task = doc(db, "tasksAll", id);

      await updateDoc(task, updateTask);
      console.log("Document successfully updated!");
      null;
      setisEditing(null);
      setUpdateTask({
        nameTask: "",
        descriptionTask: "",
        fechaVencimiento: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) return <h1>loading.....</h1>;
  if (!userAccess) return <Navigate to="/" />; // Redirige a la página de inicio de sesión si userAccess es nulo

  return (
    <Box
      margin={"0 auto "}
      sx={{
        width: "70%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-evenly", mb: 2 }}>
        <Button variant="contained" color="secondary" size="small">
          <Link to={"/home"}>Back</Link>
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          size="small"
        >
          Form
        </Button>
        <FormAll handleClose={handleClose} open={open} />
      </Box>
      <Typography variant="body1" textAlign="center">
        Tasks all
      </Typography>
      {data &&
        data.map((item) => {
          const isDueDate =
            new Date(item.fechaVencimiento).toLocaleDateString() ===
            new Date().toLocaleDateString();

          return (
            <Accordion defaultExpanded key={item.id}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel3-content"
                id="panel3-header"
                sx={{
                  bgcolor: isDueDate ? "darkgray" : "#1239",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Typography variant="body1">Task: {item.nameTask}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Created:{" "}
                    {new Date(item.fechaVencimiento).toLocaleDateString()}
                  </Typography>
                </Box>
              </AccordionSummary>

              <AccordionDetails>
                <Typography size="small" color="secondary">
                  Name:{" "}
                </Typography>
                {isEditing === item.id ? (
                  <TextField
                    label="Name Task"
                    required
                    value={updateTask.nameTask}
                    onChange={(e) =>
                      setUpdateTask({ ...updateTask, nameTask: e.target.value })
                    }
                  />
                ) : (
                  item.nameTask || "don't have tasks"
                )}
              </AccordionDetails>
              <AccordionDetails>
                <Typography size="small" color="secondary">
                  Description:{" "}
                </Typography>
                {isEditing === item.id ? (
                  <TextField
                    label="Description Task"
                    required
                    value={updateTask.descriptionTask}
                    onChange={(e) =>
                      setUpdateTask({
                        ...updateTask,
                        descriptionTask: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.descriptionTask || "don't have description"
                )}
              </AccordionDetails>
              <AccordionDetails>
                <Typography size="small" color="secondary">
                  Due Date:{" "}
                </Typography>
                {isEditing === item.id ? (
                  <TextField
                    id="outlined-date"
                    type="date"
                    name="fechaVencimiento"
                    value={updateTask.fechaVencimiento}
                    onChange={(e) =>
                      setUpdateTask({
                        ...updateTask,
                        fechaVencimiento: e.target.value,
                      })
                    }
                  />
                ) : (
                  item.fechaVencimiento || "don't have date"
                )}
              </AccordionDetails>
              <AccordionDetails>
                <Typography size="small" color="secondary">
                  Image:{" "}
                </Typography>
                {item.downloadFile ? (
                  <ImageListItem key={item.id}
                    sx={{ maxWidth: 500, maxHeight: 300 }}
                  >
                    <LazyLoadImage
                    effect="blur"
                    placeholderSrc={icon}
                      src={item.downloadFile}
                      alt={item.file}
                      loading="lazy"
                      style={{ 
                        maxWidth: '100%', 
                        maxHeight: '100%', 
                        objectFit: 'cover' 
                      }}
                    />
                  </ImageListItem>
                ) : (
                  "No image available"
                )}
              </AccordionDetails>
              <AccordionActions>
                {isEditing === item.id ? (
                  <Button
                    type="submit"
                    onClick={() => handleUpdateTask(item.id)}
                  >
                    Save
                  </Button>
                ) : (
                  <Button type="submit" onClick={() => handleEdit(item)}>
                    Edit
                  </Button>
                )}
                <Button onClick={() => handleDelete(item.id)}>Delete</Button>
              </AccordionActions>
            </Accordion>
          );
        })}
      <Snackbar
        open={openSnacBar}
        autoHideDuration={10000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          color="secondary"
          onClose={handleCloseSnackbar}
          severity="info"
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskGeneral;
