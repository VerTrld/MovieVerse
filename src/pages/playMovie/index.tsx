import {
  AspectRatio,
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Text,
  Title,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

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
  genre_ids: number[];
  // Add other properties if needed
}

export default function Index() {
  const router = useRouter();
  const { id, title, page } = router.query;
  const [movieOverview, setMovieOverview] = useState<Movie[]>([]);
  const [idMovie, setIdMovie] = useState(id);
  const [searchTerm, setSearchTerm] = useState(String(title));
  // const [page, setPage] = useState(1);
  const matches = useMediaQuery("(min-width: 720px)");

  useEffect(() => {
    setIdMovie(id);
  }, [id]);

  console.log("page:", page);
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
  }, [idMovie, page, searchTerm]);
  return (
    <>
      <Flex
        direction={"column"}
        bg={
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
        }
        style={{ minHeight: "100vh" }}
      >
        <Flex
          direction={"row"}
          style={{
            padding: 20,
            color: "white",
          }}
          justify={"space-between"}
          align={"center"}
        >
          <Title
            style={{
              display: "flex",
              flexDirection: "row",

              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              window.location.href = "/";
            }}
          >
            CineVerse
            <Text size="12px" style={{ letterSpacing: "3px" }}>
              FREE
            </Text>
          </Title>

          {!searchTerm ||
            (!id && (
              <Input
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  // setPage(1);
                }}
                placeholder="Search movies..."
                style={{ width: 400 }}
                hidden={false}
              />
            ))}
        </Flex>
        <AspectRatio ratio={1080 / (matches ? 400 : 900)} bg={"black"}>
          <iframe
            src={`https://vidsrc.to/embed/movie/${id}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </AspectRatio>

        <Flex direction={"row"} justify={"space-between"}>
          {movieOverview.length === 0 ? (
            <Title size={"md"} pl={4}>
              No Info found
            </Title>
          ) : (
            movieOverview.map((movie, index) => (
              <Box p={20}>
                <Grid key={index} c={"white"}>
                  <Grid.Col span={{ base: 5.5, md: 2.5, lg: 2.5 }}>
                    <Image
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt=""
                      style={{ width: "200px" }}
                    />
                    <Title size={"sm"} c={"yellow"} ta={"center"}>
                      {movie.vote_average}
                    </Title>
                  </Grid.Col>
                  <Grid.Col span={{ base: 10, md: 8, lg: 8 }}>
                    <Title>{movie.title}</Title>
                    <Text>{movie.overview}</Text>
                    <Flex direction={"row"}>
                      Genre:
                      {movie.genre_ids.map((v) => {
                        let genreName;
                        switch (v) {
                          case 28:
                            genreName = "Action";
                            break;
                          case 12:
                            genreName = "Adventure";
                            break;
                          case 16:
                            genreName = "Animation";
                            break;
                          case 35:
                            genreName = "Comedy";
                            break;
                          case 80:
                            genreName = "Crime";
                            break;
                          case 99:
                            genreName = "Documentary";
                            break;
                          case 18:
                            genreName = "Drama";
                            break;
                          case 10751:
                            genreName = "Family";
                            break;
                          case 14:
                            genreName = "Fantasy";
                            break;
                          case 36:
                            genreName = "History";
                            break;
                          case 27:
                            genreName = "Horror";
                            break;
                          case 10402:
                            genreName = "Music";
                            break;
                          case 9648:
                            genreName = "Mystery";
                            break;
                          case 10749:
                            genreName = "Romance";
                            break;
                          case 878:
                            genreName = "Science Fiction";
                            break;
                          case 10770:
                            genreName = "TV Movie";
                            break;
                          case 53:
                            genreName = "Thriller";
                            break;
                          case 10752:
                            genreName = "War";
                            break;
                          case 37:
                            genreName = "Western";
                            break;
                          default:
                            genreName = ""; // Handle unknown genre IDs
                        }
                        return <Text key={v}>{genreName}</Text>;
                      })}
                    </Flex>
                    <Text>Date Release: {movie.release_date}</Text>
                    <Text>Popular: {movie.popularity}</Text>
                    <Text>Vote Count: {movie.vote_count}</Text>
                  </Grid.Col>
                </Grid>
              </Box>
            ))
          )}
        </Flex>
      </Flex>
    </>
  );
}

{
  /* <Flex direction={"row"} justify={"space-between"} p={10}>
          {movieOverview.length === 0 ? (
            <Title size={"md"} pl={4}>
              No Info found
            </Title>
          ) : (
            movieOverview.map((movie, index) => (
          
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

                  <Flex direction={"column"}>
                    <Title size={"sm"}>{movie.title}</Title>
                    <Text>{movie.overview}</Text>
                    <Flex direction={"row"}>
                      Genre:
                      {movie.genre_ids.map((v) => {
                        let genreName;
                        switch (v) {
                          case 28:
                            genreName = "Action";
                            break;
                          case 12:
                            genreName = "Adventure";
                            break;
                          case 16:
                            genreName = "Animation";
                            break;
                          case 35:
                            genreName = "Comedy";
                            break;
                          case 80:
                            genreName = "Crime";
                            break;
                          case 99:
                            genreName = "Documentary";
                            break;
                          case 18:
                            genreName = "Drama";
                            break;
                          case 10751:
                            genreName = "Family";
                            break;
                          case 14:
                            genreName = "Fantasy";
                            break;
                          case 36:
                            genreName = "History";
                            break;
                          case 27:
                            genreName = "Horror";
                            break;
                          case 10402:
                            genreName = "Music";
                            break;
                          case 9648:
                            genreName = "Mystery";
                            break;
                          case 10749:
                            genreName = "Romance";
                            break;
                          case 878:
                            genreName = "Science Fiction";
                            break;
                          case 10770:
                            genreName = "TV Movie";
                            break;
                          case 53:
                            genreName = "Thriller";
                            break;
                          case 10752:
                            genreName = "War";
                            break;
                          case 37:
                            genreName = "Western";
                            break;
                          default:
                            genreName = ""; // Handle unknown genre IDs
                        }
                        return <Text key={v}>{genreName + ", "}</Text>;
                      })}
                    </Flex>
                    <Text>Date Release: {movie.release_date}</Text>
                    <Text>Popular: {movie.popularity}</Text>
                    <Text>Vote Count: {movie.vote_count}</Text>
                  </Flex>
                </Flex>
           
            ))
          )}
          <Button
            w={200}
            onClick={() => {
              router.push("/");
            }}
          >
            Back
          </Button>
        </Flex> */
}
