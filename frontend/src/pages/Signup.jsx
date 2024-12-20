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
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const toast = useToast();
  const navigate = useNavigate();

  const SignupHandler = async (values) => {
    try {
      const response = await fetch("http://localhost:5000/bb/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Signup failed. Please try again.");
      }

      const data = await response.json();
      console.log("Signup successful:", data);

      // Store signup data in localStorage
      localStorage.setItem("userData", JSON.stringify(data));

      // Show success toast
      toast({
        title: "Signup Successful",
        description: "You have successfully signed up.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("There was a problem with the signup request:", error);

      // Show error toast
      toast({
        title: "Signup Failed",
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
          <form onSubmit={handleSubmit(SignupHandler)}>
            <FormControl isInvalid={errors.name} isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                {...register("name", { required: "Name is required" })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>
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
              bg="green.400"
              color="white"
              _hover={{ bg: "green.500" }}
            >
              Sign Up
            </Button>
          </form>
        </CardBody>
      </Card>
    </Center>
  );
};

export default Signup;
