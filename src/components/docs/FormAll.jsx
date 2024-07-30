import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
  Backdrop,
} from "@mui/material";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import CancelIcon from '@mui/icons-material/Cancel';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const FormAll = ({ handleClose, open }) => {
  const { userAccess } = useContext(UserContext);
  //creamos un estado para almacenar la url

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  //vamos a crear colecciones de la base de datos de firebase

  const onSubmit = handleSubmit(async (data) => {
    const nameTask = getValues("nameTask");
    const descriptionTask = getValues("descriptionTask");
    const fechaVencimiento = getValues("fechaVencimiento");
    const file = getValues("file")[0];
    try {
      //descargamos el archivo con url
      
      const addTask = await addDoc(collection(db, "tasksAll"), {
        nameTask,
        descriptionTask,
        userId: userAccess.uid,
        fechaVencimiento,
        file: file ? file.name: null,
      });
      if(file) {
        const storage = getStorage();
        const storageRef = ref(storage, `tasks/${addTask.id}/${file.name}`)
  
        await uploadBytes(storageRef, file)
        console.log('Archivo subido con éxito!');
        const downloadFile = await getDownloadURL(storageRef)
        // Actualizar el documento con la URL de descarga
        await updateDoc(doc(db, "tasksAll", addTask.id), {
          downloadFile
        });
      }
      
      console.log("Document written with ID: ", addTask.id);
      console.log(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Box sx={{ display: "block", mt: 5, bgcolor: 'cyan' }}>
      {userAccess && userAccess.email === "juanjaramillojl@gmail.com" ? (
      <Modal
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "50%",
          bgcolor: "#0009",
          border: "1px solid #000",
          boxShadow: 24,
          p: 4,
          height: "55%"
        }}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
      
        <Box
          component={"form"}
          onSubmit={onSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
        <Button startIcon={<CancelIcon/>} onClick={handleClose} sx={{width: 500, color:'white'}}>
          Cancel
        </Button>
          <TextField
            id="outlined-task"
            label="Task"
            type="text"
            autoComplete="off"
            
            name="nameTask"
            sx={{ mb: 1, width: "80%", bgcolor: 'white' }}
            {...register("nameTask", {
              required: {
                value: true,
                message: "Enter your new task name",
              },
            })}
          />
          <Typography fontSize={"small"} sx={{ color: "red" }}>
            {errors?.nameTask?.message}
          </Typography>

          <TextField
            id="outlined-description"
            label="Description"
            type="text"
            autoComplete="off"
            name="descriptionTask"
            sx={{ mb: 1, width: "80%", bgcolor: 'white'  }}
            {...register("descriptionTask", {
              required: {
                value: true,
                message: "Enter your descriptions",
              },
            })}
          />
          <Typography fontSize={"small"} sx={{ color: "red" }}>
            {errors?.descriptionTask?.message}
          </Typography>

          <TextField
            id="outlined-date"
            type="date"
            name="fechaVencimiento"
            sx={{ mb: 1, width: "80%", bgcolor: 'white'  }}
            {...register("fechaVencimiento", {
              required: {
                value: true,
                message: "Enter your Fecha de Vencimiento",
              },
            })}
          />
          <Typography fontSize={"small"} sx={{ color: "red" }}>
            {errors?.fechaVencimiento?.message}
          </Typography>

          <TextField
            id="outlined-date"
            type="file"
            name="file"
            sx={{ mb: 1, width: "80%", bgcolor: 'white'  }}
            {...register("file", {
              required: {
                value: false,
                message: "Enter your filre",
              },
            })}
            onChange={(e) => { console.log(e.target.files[0]) }}
          />
          <Typography fontSize={"small"} sx={{ color: "red" }}>
            {errors?.file?.message}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              sx={{ mt: 3 }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Modal>
      ): (
        null
      )}
        
    </Box>
  );
};

export default FormAll;

FormAll.propTypes = {
  handleClose: PropTypes.func,
  open: PropTypes.bool,
};
