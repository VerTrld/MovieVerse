import { AspectRatio, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

export default function index() {
  const { query } = useRouter();

  return (
    <>
      <Flex direction={"column"} justify={"center"}>
        <AspectRatio h={500}>
          <iframe
            src={`https://vidsrc.to/embed/movie/${query.id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      </Flex>
    </>
  );
}
