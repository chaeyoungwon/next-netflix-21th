"use client";

import { useEffect, useState } from "react";

import { getMoviePopular } from "@/apis/tmdb";

import MovieSwiper from "@/components/home/MovieSwiper";
import SkeletonCard from "@/components/skeleton/SkeletonCard";

import { Movie } from "@/types/tmdb";

const Preview = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await getMoviePopular();
        setMovies(response.data.results);
      } catch (error) {
        console.error("영화 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return (
      <SkeletonCard
        title="Previews"
        itemWidth="102px"
        itemHeight="102px"
        shape="circle"
      />
    );
  }

  return (
    <MovieSwiper
      title="Previews"
      items={movies}
      itemWidth="102px"
      itemHeight="102px"
      shape="circle"
    />
  );
};

export default Preview;
