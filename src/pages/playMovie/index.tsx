import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Image,
  Text,
  Title,
} from "@mantine/core";

import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

interface Movie {
  id: number;
  overview: string;
  popularity: string;
  poster_path: string;
  vote_count: string;
  title: string;
  release_date: string;
  vote_average: string;
  // Add other properties if needed
}

export default function Index() {
  const router = useRouter();
  const { id, index, page } = router.query;
  const [movieOverview, setMovieOverview] = useState<Movie[]>([]);
  const [idMovie, setIdMovie] = useState(id);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setIdMovie(id);
  }, [id]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url;
        if (searchTerm.trim() === "") {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=be7a1480a6d224eefbbe288a47523559&page=${page}`;
        } else {
          url = `https://api.themoviedb.org/3/search/movie?api_key=be7a1480a6d224eefbbe288a47523559&query=${searchTerm}&page=${page}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        console.log("Data Results:", data.results);
        console.log("data result: ", data);
        const filteredMovies = data.results.filter(
          (movie: any) => movie.id == idMovie
        );
        console.log("idMovie:", idMovie);
        console.log("Filtered Movie:", filteredMovies);
        setMovieOverview(filteredMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    if (idMovie && page) {
      fetchMovies();
    }
  }, [idMovie, page]);
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
        <Flex direction={"row"} justify={"end"} p={10}>
          <Button
            w={200}
            onClick={() => {
              router.push("/");
            }}
          >
            Back
          </Button>
        </Flex>
        {movieOverview.length === 0 ? (
          <Title size={"md"} pl={20}>
            No Info found
          </Title>
        ) : (
          movieOverview.map((movie, index) => (
            <Flex direction={"column"} key={index}>
              <Flex direction={"row"}>
                <Flex direction={"column"}>
                  <Image
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    alt=""
                    style={{ width: "200px" }}
                  />
                  <Title size={"sm"} ta={"center"}>
                    {movie.vote_average}
                  </Title>
                </Flex>

                <Box w={500} p={10}>
                  <Title size={"sm"}>{movie.title}</Title>
                  <Text>{movie.overview}</Text>
                  <Text>Genre:</Text>
                  <Text>Date Release: {movie.release_date}</Text>
                  <Text>Popular: {movie.popularity}</Text>
                  <Text>Vote Count: {movie.vote_count}</Text>
                </Box>
              </Flex>
            </Flex>
          ))
        )}
      </Flex>
    </>
  );
}
