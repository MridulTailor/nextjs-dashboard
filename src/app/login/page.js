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

export default function LoginPage() {
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
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [user, confirmPassword]);

  const onLogin = async (e) => {
    e.preventDefault();
    console.log(user);
    setLoading(true);
    if (!validateForm()) {
      setLoading(false);
      return;
    } else {
      try {
        const res = await axios.post("/api/users/login", JSON.stringify(user), {
          headers: {
            "Content-Type": "application/json",
          },
        });
        toast({
          variant: "left-accent",
          title: "Login done",
          status: "success",
        });
        router.push("/");
      } catch (error) {
        console.log("Login failed", error.message);
        toast({
          title: "Login failed",
          status: "error",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const validateForm = () => {
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
          Dont Have an account?{" "}
          <Link
            href="/signup"
            style={{
              textDecoration: "underline",
              color: "blue",
            }}
          >
            Signup
          </Link>
        </Text>
        <Text fontSize="5xl" fontWeight={"bold"}>
          Login
        </Text>
        <form onSubmit={onLogin} style={{ width: "100%" }}>
          <VStack spacing={9}>
            <Box w={"full"}>
              <Text>Email</Text>
              <Input
                type="email"
                value={user.email}
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </Box>

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
              <Button
                type="submit"
                isLoading={loading}
                variant={"solid"}
                colorScheme={"teal"}
                rounded={"full"}
                size={"lg"}
                w={"full"}
              >
                Sign IN
              </Button>
              <Flex mt={4} w={"full"} justifyContent={"flex-end"}>
                <Link
                  href="/forgot-password"
                  style={{
                    textDecoration: "underline",
                    color: "blue",
                  }}
                >
                  Forgot Password?
                </Link>
              </Flex>
            </Box>

            <Box w={"full"} position="relative" py={10}>
              <Divider color={"gray"} />
              <AbsoluteCenter bg="white" px="4">
                Or login with
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
          src="https://images.unsplash.com/photo-1698853983454-7e819026af6c?q=80&w=2160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Dan Abramov"
          objectFit={"cover"}
          objectPosition={"center"}
        />
      </Box>
    </Flex>
  );
}
