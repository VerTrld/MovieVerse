import {
  Autocomplete,
  Box,
  Button,
  Flex,
  Grid,
  Image,
  Input,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";

import { useEffect, useState } from "react";

export default function Home() {
  const [initialMovieList, setInitialMovieList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        let url;
        if (searchTerm.trim() === "") {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=be7a1480a6d224eefbbe288a47523559`;
        } else {
          url = `https://api.themoviedb.org/3/search/movie?api_key=be7a1480a6d224eefbbe288a47523559&query=${searchTerm}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setMovieList(data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <>
      <Flex direction="column" p={10}>
        <Title style={{ textAlign: "center", padding: 30 }}>MovieVerse</Title>
        <Input
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search movies..."
          h={100}
          style={{ height: "100px" }}
        />

        <Grid>
          {movieList.map((movie) => (
            <Grid.Col span={2}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
                width={50}
                style={{ cursor: "pointer" }} // Apply cursor style here
                onClick={() => {
                  console.log(`https://vidsrc.to/embed/movie/${movie.id}`);
                  router.push({
                    pathname: "/playMovie",
                    query: { id: movie.id },
                  });
                }}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Flex>
    </>
  );
}
