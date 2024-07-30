import { Box, Button, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const FormAdd = () => {
  const { userAccess } = useContext(UserContext);
  //creamos un estado para almacenar los datos

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
      const addTask = await addDoc(collection(db, "tasks"), {
        nameTask,
        descriptionTask,
        userId: userAccess.uid,
        fechaVencimiento,
        file: file ? file.name : null, // Solo guarda el nombre si existe el archivo
      });
      //si el file existe se actualizar el archivo
      if (file) {
        const storage = getStorage();
        const storageRef = ref(storage, `tasks/${addTask.id}/${file.name}`);

        await uploadBytes(storageRef, file);
        console.log("Archivo subido con éxito!");
        const downloadFile = await getDownloadURL(storageRef);
        // Actualizar el documento con la URL de descarga
        await updateDoc(doc(db, "tasks", addTask.id), {
          downloadFile,
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
    <Box sx={{ display: "block", mt: 5 }}>
        <>
          <Typography variant="body1" color="primary" textAlign={"center"}>
            Add Tasks
          </Typography>
          <Box
            component={"form"}
            onSubmit={onSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <TextField
              id="outlined-task"
              label="Task"
              type="text"
              autoComplete="current"
              name="nameTask"
              sx={{ mb: 1, width: "80%" }}
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
              autoComplete="current"
              name="descriptionTask"
              sx={{ mb: 1, width: "80%" }}
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
              sx={{ mb: 1, width: "80%" }}
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
              sx={{ mb: 1, width: "80%", bgcolor: "white" }}
              {...register("file", {
                required: {
                  value: false,
                  message: "Enter your filre",
                },
              })}
              onChange={(e) => {
                console.log(e.target.files[0]);
              }}
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
        </>
    </Box>
  );
};

export default FormAdd;
