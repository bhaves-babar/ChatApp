import React from "react";
import {
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  useToast,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Login = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const toast = useToast();
  const navigate = useNavigate(); // Initialize navigate

  const LoginHandler = async (values) => {
    try {
      const response = await fetch("/bb/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Invalid email or password.");
      }

      const data = await response.json();
      console.log("Login successful:", data);

      // Store login data in localStorage (assuming data contains a token or user info)
      localStorage.setItem("userData", JSON.stringify(data));

      // Show success toast
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirect to /home
      navigate("/");

    } catch (error) {
      console.error("There was a problem with the login request:", error);

      // Show error toast
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Center h="100vh">
      <Card width={"40%"} alignSelf={"center"} marginTop={"1rem"}>
        <CardBody>
          <form onSubmit={handleSubmit(LoginHandler)}>
            <FormControl isInvalid={errors.email} isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                type="email"
                {...register("email", { required: "Email is required" })}
              />
              <FormErrorMessage>
                {errors.email && errors.email.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={errors.password} isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                {...register("password", { required: "Password is required" })}
              />
              <FormErrorMessage>
                {errors.password && errors.password.message}
              </FormErrorMessage>
            </FormControl>
            <Button
              marginTop={5}
              type="submit"
              width={"100%"}
              bg="blue.400"
              color="white"
              _hover={{ bg: "blue.500" }}
            >
              Login
            </Button>
          </form>
          <VStack mt={4}>
            <Text>If you are a new user, please sign up first.</Text>
            <Button
              colorScheme="teal"
              onClick={() => navigate("/signup")}
              width={"100%"}
              bg="green.400"
              color="white"
              _hover={{ bg: "green.500" }}
            >
              Sign Up
            </Button>
          </VStack>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Login;
