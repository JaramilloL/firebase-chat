import { Stack, Box, TextField, Button, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('')

  const { registerUser } = useContext(UserContext)

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async(data) => {
    try {
      console.log(data);
      const NewEmail = getValues("email");
      const NewPassword = getValues("password");
      await registerUser(NewEmail, NewPassword)

      reset();
      navigate("/home");
    } catch (error) {
      if(error.code === "auth/email-already-in-use") setErrorMessage('Email is already in use');
      if(error.code === "auth/invalid-email") setErrorMessage('Email is not valid');
    }
  });

  return (
    <Stack
      spacing={2}
      alignItems="center"
    >
      <Box
        component="form"
        onSubmit={onSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <TextField
          id="outlined-basicc"
          label="User Name"
          variant="outlined"
          color={"primary"}
          type="text"
          autoComplete="off"
          sx={{
            width: "50%",
            mb: 2,
          }}
          name="username"
          {...register("username", {
            required: {
              value: true,
              message: "Please enter your username",
            },
          })}
        />
        <Typography color="red" sx={{ fontSize: "13px" }}>
          {errors?.username?.message}
        </Typography>

        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          color={"primary"}
          type="email"
          autoComplete="off"
          sx={{
            width: "50%",
            mb: 2,
          }}
          name="email"
          {...register("email", {
            required: {
              value: true,
              message: "please enter valid emial",
            },
          })}
        />
        <Typography color="red" sx={{ fontSize: "13px" }}>
          {errors?.email?.message}
        </Typography>

        <TextField
          id="outlined-basic2"
          label="Password"
          variant="outlined"
          color={"primary"}
          type="password"
          autoComplete="off"
          sx={{
            width: "50%",
            mb: 2,
          }}
          name="password"
          {...register("password", {
            required: {
              value: true,
              message: "please enter valid password",
            },
            minLength: {
              value: 5,
              message: "Password must be at least 5 characters long",
            },
            maxLength: {
              value: 15,
              message: "Password must not exceed 15 characters",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).{5,15}$/,
              message:
                "Password must contain at least one uppercase letter and one number",
            },
          })}
        />
        <Typography color="red" sx={{ fontSize: "13px" }}>
          {errors?.password?.message}
        </Typography>

        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <Button type="submit" color="secondary" sx={{ mt: 3 }}>
            Submite
          </Button>
        </Box>
        {errorMessage && errorMessage}
      </Box>
    </Stack>
  );
};

export default Register;
