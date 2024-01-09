"use client";

import React from "react";
import { Link, Card, Box } from "@chakra-ui/react";

export default function About() {
  return (
    <>
      <Card height={"200"}>
        <Link href="/about">Hello there</Link>
      </Card>
    </>
  );
}
