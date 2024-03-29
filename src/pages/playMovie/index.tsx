import { AspectRatio, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  const router = useRouter();
  const { id } = router.query; // Access 'id' from router.query

  return (
    <>
      <Flex direction={"column"} justify={"center"} p={40}>
        <AspectRatio>
          <iframe
            src={`https://vidsrc.to/embed/movie/${id}`}
            title="Movie"
            style={{ width: 720, height: 500, border: 0 }}
          />
        </AspectRatio>
      </Flex>
    </>
  );
}
