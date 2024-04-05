import { Flex, Grid, Image, Input, Title, Button, Text } from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  // Add other properties if needed
}

export default function Home() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const router = useRouter();

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
        setMovieList(data.results);
        console.log(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchTerm, page]);

  return (
    <>
      <Flex
        direction="column"
        bg={
          "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%)"
        }
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
            }}
          >
            CineVerse
            <Text size="12px" style={{ letterSpacing: "3px" }}>
              FREE
            </Text>
          </Title>

          <Input
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search movies..."
            style={{ width: 400 }}
          />
        </Flex>

        <Grid pt={50}>
          {movieList.map((movie, index) => (
            <Grid.Col span={{ base: 6, md: 2, lg: 2, xl: 2 }} key={index}>
              {movie.poster_path ? (
                <Flex
                  direction={"column"}
                  style={{ textAlign: "center", color: "white" }}
                >
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

                  <Title order={6}>
                    {movie.title} {new Date(movie.release_date).getFullYear()}
                  </Title>
                </Flex>
              ) : (
                <Text>No poster available</Text>
              )}
            </Grid.Col>
          ))}
        </Grid>
        <Flex direction={"row"} justify={"center"} gap={10} p={30}>
          <Button
            onClick={() => {
              setPage((prevPage) => prevPage - 1);
            }}
          >
            Prev
          </Button>
          <Button
            onClick={() => {
              setPage((prevPage) => prevPage + 1);
            }}
          >
            Next
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
