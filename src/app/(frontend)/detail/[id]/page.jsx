"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function DetailPage({ params }) {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      const { id } = await params;
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/${id}`
        );

        // ตรวจสอบ response status
        if (!res.ok) {
          setMovie(null);
          return;
        }

        const data = await res.json();
        // ตรวจสอบว่ามีข้อมูลจริงๆ หรือไม่
        if (!data || Object.keys(data).length === 0) {
          setMovie(null);
          return;
        }

        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [params]);
  console.log(movie);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="min-h-screen bg-black">
      {movie ? (
        <div className="container mx-auto px-4 py-8 text-white">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="mb-2">
            <strong>Genre:</strong> {movie.genre}
          </p>
          <p className="mb-2">
            <strong>Release Year:</strong> {movie.release_year}
          </p>
          <p className="mb-4">
            <strong>Description:</strong> {movie.description}
          </p>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-8 text-white">
          <p>Movie not found.</p>
        </div>
      )}
    </div>
  );
}
