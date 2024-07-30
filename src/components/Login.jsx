import { Box, TextField, Button, Stack, Typography, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

//usmaos react-hook-form
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const { signIn, signInWithGoogle, resetPass } = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
    getValues,
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      console.log(data);
      const NewEmail = getValues("email");
      const NewPassword = getValues("password");

      await signIn(NewEmail, NewPassword);

      reset();
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/invalid-credential")
        setErrorMessage(
          "User is did not make created or password is incorrect"
        );
      console.log(error.code);
    }
  });

  //creamos una funcion para controlar el sigIn con google
  const handleGoogle = async()=>{
    try {
      await signInWithGoogle();
      navigate('/home')
    } catch (error) {
      console.log(error.message);
    }
  }

  //reset de password
  const resetPassword = async()=>{
    const email = getValues('email')
    if(!email) return setErrorMessage('Please add email address')

    try {
      await resetPass(email)
      setErrorMessage('we send you an email eith a link to reset password')
    } catch (error) {
      setErrorMessage(error.message)
    }
  }

  return (
    <Stack spacing={2} alignItems="center">
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
          })}
        />
        <Typography color="red" sx={{ fontSize: "13px" }}>
          {errors?.password?.message}
        </Typography>
        <Link
          component={"a"}
          color="primary"
          size="small"
          sx={{ position: "inherit" }}
          href="#"
          onClick={resetPassword}
        >
          Forgot password
        </Link>

        <Box
          sx={{ width: "50%", display: "flex", justifyContent: "space-evenly" }}
        >
          <Button
            type="submit"
            color="primary"
            sx={{ mt: 3, border: 1, width: "100px" }}
          >
            Submite
          </Button>
          <Button
            sx={{ mt: 3, border: 1, color: "#721", width: "100px" }}
            onClick={handleGoogle}
          >
            GOOGLE
          </Button>
        </Box>
        <p>{ errorMessage && errorMessage }</p>
      </Box>
    </Stack>
  );
};

export default Login;
