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

interface Movie {
  id: number;
  poster_path: string;
  // Add other properties if needed
}

export default function Home() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
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
        console.log(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchTerm]);

  return (
    <>
      <Flex direction="column">
        <Flex
          direction={"row"}
          style={{
            padding: 20,
            color: "white",
            background:
              "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)",
          }}
          justify={"space-between"}
          align={"center"}
        >
          <Title>MovieVerse</Title>
          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search movies..."
            style={{ width: 400 }}
          />
        </Flex>

        <Grid pt={50}>
          {movieList.map((movie, index) => (
            <Grid.Col span={{ base: 6, md: 6, lg: 2 }} key={index}>
              <Image
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt=""
                width={50}
                height={300}
                style={{ cursor: "pointer", borderRadius: 10 }} // Apply cursor style here
                onClick={() => {
                  console.log(`https://vidsrc.to/embed/movie/${movie.id}`);
                  router.push({
                    pathname: "/playMovie",
                    query: {
                      id: movie.id,
                    },
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
