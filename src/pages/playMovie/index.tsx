import { AspectRatio, Flex } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

// Capitalize the component name
export default function Index() {
  // Now we're using the useRouter hook within a React functional component
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <Flex direction={"column"} justify={"center"}>
        <AspectRatio h={500}>
          <iframe
            src={`https://vidsrc.to/embed/movie/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>
      </Flex>
    </>
  );
}
