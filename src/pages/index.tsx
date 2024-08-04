import {
  Flex,
  Grid,
  Image,
  Input,
  Title,
  Button,
  Text,
  Divider,
  Box,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Carousel } from "@mantine/carousel";
import { IconArrowRight, IconArrowLeft, IconFlame } from "@tabler/icons-react";
import Autoplay from "embla-carousel-autoplay";
import Head from "next/head";
import { useMediaQuery } from "@mantine/hooks";
import { match } from "assert";

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  release_date: string;
  // Add other properties if needed
}

interface ImdIDItem {
  imdb_id: string; // Assuming imdb_id is a string; adjust if needed
  // Add other properties if needed
}

interface ImdIDResult {
  result: {
    items: ImdIDItem[];
  };
}

export default function Home() {
  const [movieList, setMovieList] = useState<Movie[]>([]);
  const [trendingList, setTrendingList] = useState<Movie[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const autoplay = useRef(Autoplay({ delay: 3000 }));

  const router = useRouter();
  const matches = useMediaQuery("(min-width: 720px)");

  const [imdID, setImdID] = useState<ImdIDResult | null>(null);

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
        setTrendingList(data.results);
        console.log(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, [searchTerm, page]);

  useEffect(() => {
    const carousel = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/discover/movie?api_key=be7a1480a6d224eefbbe288a47523559&page=${page}`
        );
        const data = await response.json();
        setMovieList(data.results);
      } catch (error) {
        console.error("Error fetching carousel movies:", error);
      }
    };
    carousel();
  }, [page]);

  useEffect(() => {
    const vidsrc = async () => {
      try {
        const response = await fetch(`https://vidsrc.to/vapi/movie/new`);
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error("Error fetching Vidsrc data:", error);
      }
    };
    vidsrc();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const vidsrcResponse = await fetch("https://vidsrc.to/vapi/movie/new");
        const vidsrcData = await vidsrcResponse.json();
        console.log("Vidsrc Data:", vidsrcData);
        setImdID(vidsrcData);

        if (vidsrcData.result) {
          const filteredItems = vidsrcData.result.items.filter(
            (item: ImdIDItem) => item.imdb_id
          );

          const tmdbIds = filteredItems.map((item: ImdIDItem) => item.imdb_id);

          console.log("Filtered items with imdb_id:", filteredItems);
          console.log("TMDB IDs:", tmdbIds);

          const tmdbOptions = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTdhMTQ4MGE2ZDIyNGVlZmJiZTI4OGE0NzUyMzU1OSIsInN1YiI6IjY2MDY2MzFhZDRmZTA0MDE3YzI3NjgwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C-NYv1uqJPI-ozpzlYxYlegp_5MG55YAoZ1VngYhg9s",
            },
          };

          if (tmdbIds.length > 0) {
            const tmdbResponse = await fetch(
              `https://api.themoviedb.org/3/find/${tmdbIds[0]}?external_source=imdb_id`,
              tmdbOptions
            );
            const tmdbData = await tmdbResponse.json();
            console.log("TMDb Data:", tmdbData);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [imdID]);
  return (
    <>
      <Head>
        <title>
          CineVerse | Watch Movies Online Free on cineversefree.netlify.app
        </title>
        <meta
          name="description"
          content="The best place to watch movies online for free with HD quality. No registration is required!"
        />
      </Head>
      <meta property="og:image" content="/images.jpg" />
      <Flex
        direction="column"
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

          <Input
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1); // Reset page to 1 when performing a new search
            }}
            placeholder="Search movies..."
            style={{ width: 400 }}
          />
        </Flex>
        {!searchTerm.trim() && page === 1 ? (
          <Carousel
            // withIndicators
            plugins={[autoplay.current]}
            // onMouseEnter={autoplay.current.stop}
            // onMouseLeave={autoplay.current.reset}
            withIndicators={matches ? true : false}
            height={500}
            slideSize={matches ? "33.333333%" : undefined}
            slideGap="md"
            loop
            align="start"
            slidesToScroll={matches ? 3 : 1}
            pt={30}
            pb={50}
          >
            {movieList.map((m, i) => (
              <Carousel.Slide key={i}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${m.poster_path}`}
                  alt=""
                  width={50}
                  height={500}
                  style={{ objectFit: "contain" }}
                  // onClick={() => {
                  //   console.log(`https://vidsrc.to/embed/movie/${movie.id}`);
                  //   router.push({
                  //     pathname: "/playMovie",
                  //     query: {
                  //       id: movie.id,
                  //       page: page,
                  //       st: searchTerm,
                  //     },
                  //   });
                  // }}
                />
              </Carousel.Slide>
            ))}
          </Carousel>
        ) : null}

        <Flex
          direction={"column"}
          style={{
            backgroundColor: "rgb(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
          }}
        >
          {!searchTerm.trim() && page === 1 ? (
            <Title c={"white"} style={{ textAlign: "center", paddingTop: 50 }}>
              <IconFlame size={30} />
              Trending Now <IconFlame size={30} />
            </Title>
          ) : null}

          <Grid pt={50}>
            {trendingList.map((movie, index) => (
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
                        console.log(
                          `https://vidsrc.to/embed/movie/${movie.id}`
                        );
                        router.push({
                          pathname: "/playMovie",
                          query: {
                            id: movie.id,
                            page: page,
                            title: searchTerm,
                          },
                        });
                      }}
                    />

                    <Title order={6}>
                      {movie.title} {new Date(movie.release_date).getFullYear()}
                    </Title>
                  </Flex>
                ) : (
                  <Box bg={"white"} h={300}>
                    <Title ta={"center"} size={40}>
                      Not available
                    </Title>
                  </Box>
                )}
              </Grid.Col>
            ))}
          </Grid>
          <Flex direction={"row"} justify={"center"} gap={10} p={30}>
            {page === 1 ? (
              <Button disabled>Prev</Button>
            ) : (
              <Button
                onClick={() => {
                  const nextPage = page - 1;
                  setPage(nextPage);
                  router.push(`/?Page=${nextPage}`);
                }}
              >
                Prev
              </Button>
            )}

            <Button
              onClick={() => {
                const nextPage = page + 1;
                setPage(nextPage);
                router.push(`/?Page=${nextPage}`);
              }}
            >
              Next
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </>
  );
}
