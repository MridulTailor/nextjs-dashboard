"use client";
import { Box, Card, Flex, HStack } from "@chakra-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [toShow, setToShow] = useState(true);
  useEffect(() => {
    console.log(pathname);
    if (pathname === "/signup" || pathname === "/login") {
      setToShow(false);
    }
  }, [pathname]);
  return (
    <Card
      display={toShow ? "flex" : "none"}
      w={"full"}
      height={100}
      bgColor={"teal"}
      rounded={"0"}
      boxShadow={15}
      color={"white"}
      as={HStack}
    >
      <Link href="/login">Login</Link>
      <Link href="/signup">Signup</Link>
    </Card>
  );
}
