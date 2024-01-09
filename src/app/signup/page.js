"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  Image,
  Stack,
  VStack,
  Box,
  Flex,
  Input,
  Button,
  Text,
  Divider,
  AbsoluteCenter,
  HStack,
  IconButton,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default function SignupPage() {
  const router = useRouter();
  const toast = useToast(
    {
      position: "top",
      duration: 3000,
      isClosable: true,
    },
    []
  );

  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0 &&
      confirmPassword.length > 0
    ) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user, confirmPassword]);

  const onSignup = async (e) => {
    e.preventDefault();
    console.log("onSignup");
    console.log(user);
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    } else {
      try {
        const res = await axios.post("/api/users/signup", user);
        console.log("Signup done", res.data);
        toast({
          variant: "left-accent",
          title: "Signup done",
          status: "success",
        });
        router.push("/login");
      } catch (error) {
        console.log("Signup failed", error.message);
        toast({
          title: "Signup failed",
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
    if (user.name.length === 0) {
      toast({
        title: "Name cannot be empty",
        status: "error",
      });
      return false;
    }
    if (user.email.length === 0) {
      toast({
        title: "Email cannot be empty",
        status: "error",
      });
      return false;
    }
    if (user.password.length === 0) {
      toast({
        title: "Password cannot be empty",
        status: "error",
      });
      return false;
    }
    if (confirmPassword.length === 0) {
      toast({
        title: "Confirm Password cannot be empty",
        status: "error",
      });
      return false;
    }
    if (
      user.password.length > 0 &&
      confirmPassword.length > 0 &&
      user.password !== confirmPassword
    ) {
      toast({
        title: "Password does not match",
        status: "error",
      });
      return false;
    }
    user.username = user.name;
    return true;
  };

  return (
    <Flex
      h={"100vh"}
      direction={{
        base: "column",
        md: "row",
      }}
    >
      <VStack
        p={{
          base: "5",
          md: "10",
        }}
        spacing={10}
        flex={1}
        align={"start"}
        justify={"center"}
        w={"full"}
        h={"full"}
      >
        <Text>
          Have an account?{" "}
          <Link
            href="/login"
            style={{
              textDecoration: "underline",
              color: "blue",
            }}
          >
            Login
          </Link>
        </Text>
        <Text fontSize="5xl" fontWeight={"bold"}>
          Sign Up
        </Text>
        <form onSubmit={onSignup} style={{ width: "100%" }}>
          <VStack spacing={9}>
            <HStack w={"full"}>
              <Box flex={1}>
                <Text>Name</Text>
                <Input
                  type="text"
                  value={user.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                />
              </Box>
              <Box flex={1}>
                <Text>Email</Text>
                <Input
                  type="email"
                  value={user.email}
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </Box>
            </HStack>

            <Box w={"full"}>
              <Text>Password</Text>
              <Input
                type="password"
                value={user.password}
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </Box>
            <Box w={"full"}>
              <Text>Confirm Password</Text>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </Box>
            <Box w={"full"}>
              <Button
                type="submit"
                isLoading={loading}
                variant={"solid"}
                colorScheme={"teal"}
                rounded={"full"}
                size={"lg"}
                w={"full"}
              >
                Sign Up
              </Button>
            </Box>
            <Box w={"full"} position="relative" py={10}>
              <Divider color={"gray"} />
              <AbsoluteCenter bg="white" px="4">
                Or sign up with
              </AbsoluteCenter>
            </Box>
            <HStack>
              <Button variant="outline" size="lg" w={32} onClick={() => {}}>
                <FaGoogle />
              </Button>
            </HStack>
          </VStack>
        </form>
      </VStack>
      <Box
        flex={1}
        display={{
          base: "none",
          md: "block",
        }}
      >
        <Image
          w={"full"}
          height={"100vh"}
          src="https://images.unsplash.com/photo-1704278921589-ac35120085dd?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dan Abramov"
          objectFit={"cover"}
        />
      </Box>
    </Flex>
  );
}
