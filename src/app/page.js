import { Link, Card, Box } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Box maxW="container.lg" m="auto" py="8">
        <Card height={"200"}>
          <Link href="/about">About</Link>
        </Card>
      </Box>
    </>
  );
}
