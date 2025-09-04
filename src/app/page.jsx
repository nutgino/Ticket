// pages/index.jsx
"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "./components/navbar";

// Single-file Next.js page implementing a cinematic modern movie-ticket site
// Tailwind CSS assumed installed and configured in the project

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/movies/`
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
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  console.log(movies);

  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [isBookingOpen, setBookingOpen] = useState(false);
  const [step, setStep] = useState(1);

  function openBooking(movie, showtime = null) {
    setSelectedMovie(movie);
    setSelectedShowtime(showtime);
    setSelectedSeats([]);
    setStep(1);
    setBookingOpen(true);
  }

  function toggleSeat(seatId) {
    setSelectedSeats((prev) => {
      if (prev.includes(seatId)) return prev.filter((s) => s !== seatId);
      return [...prev, seatId];
    });
  }

  function nextStep() {
    setStep((s) => Math.min(4, s + 1));
  }

  function prevStep() {
    setStep((s) => Math.max(1, s - 1));
  }

  function completePayment() {
    // mock success
    alert(
      `Booking confirmed for ${
        selectedMovie.title
      } — ${selectedShowtime} — seats: ${selectedSeats.join(", ")}`
    );
    setBookingOpen(false);
  }
  // แทนที่ส่วน if (loading) ด้วยโค้ดนี้
  if (loading) {
    return (
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#121212] via-[#0D47A1] to-[#311B92] text-white relative overflow-hidden">
        <main className="max-w-6xl mx-auto p-6">
          {/* Hero Skeleton */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
            <div className="space-y-4">
              {/* Title Skeleton */}
              <div className="space-y-2">
                <div className="h-12 bg-white/10 rounded-lg animate-pulse backdrop-blur-sm"></div>
                <div className="h-12 bg-white/10 rounded-lg animate-pulse backdrop-blur-sm w-3/4"></div>
              </div>
              
              {/* Description Skeleton */}
              <div className="space-y-2">
                <div className="h-4 bg-white/5 rounded animate-pulse backdrop-blur-sm"></div>
                <div className="h-4 bg-white/5 rounded animate-pulse backdrop-blur-sm w-5/6"></div>
                <div className="h-4 bg-white/5 rounded animate-pulse backdrop-blur-sm w-4/6"></div>
              </div>

              {/* Buttons Skeleton */}
              <div className="flex gap-4 mt-4">
                <div className="w-32 h-12 bg-white/10 rounded-full animate-pulse backdrop-blur-sm"></div>
                <div className="w-36 h-12 bg-white/5 rounded-full animate-pulse backdrop-blur-sm"></div>
              </div>

              {/* Tags Skeleton */}
              <div className="mt-6 flex gap-3">
                <div className="w-16 h-8 bg-white/5 rounded animate-pulse backdrop-blur-sm"></div>
                <div className="w-16 h-8 bg-white/5 rounded animate-pulse backdrop-blur-sm"></div>
                <div className="w-16 h-8 bg-white/5 rounded animate-pulse backdrop-blur-sm"></div>
              </div>
            </div>

            {/* Featured Image Skeleton */}
            <div className="hidden md:flex justify-center">
              <div className="w-64 h-96 rounded-xl overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-white/5 animate-pulse backdrop-blur-sm"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/10 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </section>
          {/* Animated Loading Text */}
              <div className="flex justify-center mt-12">
                <p className="text-gray-300 text-sm tracking-widest relative">
                  <span className="animate-pulse">Loading</span>
                  <span className="dot-1">.</span>
                  <span className="dot-2">.</span>
                  <span className="dot-3">.</span>
                </p>
              </div>
          {/* Movies Grid Skeleton */}
          <section>
            <div className="h-8 w-36 bg-white/10 rounded animate-pulse backdrop-blur-sm mb-4"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <article
                  key={i}
                  className="bg-black/40 rounded-xl overflow-hidden backdrop-blur-sm"
                >
                  {/* Poster Skeleton */}
                  <div className="relative h-72 bg-gradient-to-b from-white/10 to-white/5 animate-pulse">
                    <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent animate-shimmer"></div>
                    <div className="absolute left-3 top-3 w-12 h-6 bg-black/40 rounded animate-pulse"></div>
                  </div>

                  {/* Content Skeleton */}
                  <div className="p-4 space-y-3">
                    {/* Title */}
                    <div className="h-6 bg-white/10 rounded animate-pulse backdrop-blur-sm w-3/4"></div>

                    {/* Synopsis */}
                    <div className="space-y-2">
                      <div className="h-3 bg-white/5 rounded animate-pulse backdrop-blur-sm"></div>
                      <div className="h-3 bg-white/5 rounded animate-pulse backdrop-blur-sm w-5/6"></div>
                    </div>

                    {/* Footer */}
                    <div className="mt-3 flex items-center justify-between">
                      <div className="w-20 h-4 bg-white/5 rounded animate-pulse backdrop-blur-sm"></div>

                      <div className="flex gap-2">
                        <div className="w-14 h-7 bg-white/5 rounded animate-pulse backdrop-blur-sm"></div>
                        <div className="w-14 h-7 bg-white/5 rounded animate-pulse backdrop-blur-sm"></div>
                        <div className="w-14 h-7 bg-white/5 rounded animate-pulse backdrop-blur-sm"></div>
                        <div className="w-20 h-7 bg-gradient-to-r from-white/10 to-white/5 rounded animate-pulse backdrop-blur-sm ml-2"></div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </main>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateY(100%);
            }
            100% {
              transform: translateY(-100%);
            }
          }
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }

          @keyframes bounceDot {
            0%,
            80%,
            100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
          .dot-1,
          .dot-2,
          .dot-3 {
            display: inline-block;
            margin-left: 2px;
            animation: bounceDot 1.4s infinite;
          }
          .dot-2 {
            animation-delay: 0.2s;
          }
          .dot-3 {
            animation-delay: 0.4s;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#121212] via-[#0D47A1] to-[#311B92] text-white">
      <main className="max-w-6xl mx-auto p-6">
        {/* Hero */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center mb-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Experience movies the cinematic way
            </h2>
            <p className="text-gray-300 max-w-xl">
              Browse current films, pick your favorite showtime, and choose your
              seat — all in a sleek, modern booking flow inspired by premium
              theaters.
            </p>
            {/* รอมาทำ */}
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => openBooking(movies[0], movies[0].showtimes[2])}
                className="rounded-full px-6 py-3 bg-[#2196F3] text-black font-semibold hover:scale-105 transition"
              >
                Book Ticket
              </button>
              <Link
                href="#movies"
                className="rounded-full px-6 py-3 border border-white/20 text-sm hover:border-[#FFC107]"
              >
                Browse Movies
              </Link>
            </div>
            <div className="mt-6 flex gap-3 items-center text-sm text-gray-300">
              <span className="px-3 py-1 bg-white/5 rounded">IMAX</span>
              <span className="px-3 py-1 bg-white/5 rounded">VIP</span>
              <span className="px-3 py-1 bg-white/5 rounded">3D</span>
            </div>
          </div>

          <div className="hidden md:flex justify-center">
            <div className="w-64 h-96 rounded-xl shadow-2xl transform hover:scale-105 transition overflow-hidden bg-gradient-to-b from-[#2196F3]/20 to-[#0D47A1]/30">
              {/* <img src={movies[0].poster} alt="featured" className="w-full h-full object-cover"/> */}
            </div>
          </div>
        </section>

        {/* Movies Grid */}
        <section id="movies">
          <h3 className="text-2xl font-bold mb-4">Now Showing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <article
                key={movie.id}
                className="bg-black/40 rounded-xl overflow-hidden hover:shadow-[0_10px_30px_rgba(33,150,243,0.12)] transition"
              >
                <div className="relative">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute left-3 top-3 px-2 py-1 bg-black/60 rounded text-xs">
                    {movie.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg">{movie.title}</h4>
                  <p className="text-sm text-gray-300 line-clamp-2">
                    {movie.synopsis}
                  </p>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-gray-300">{movie.length}</div>

                    {/* รอมาทำ */}
                    <div className="flex gap-2">
                      {movie.showtimes.slice(0, 3).map((st) => (
                        <button
                          key={st}
                          onClick={() => openBooking(movie, st)}
                          className="text-sm px-3 py-1 rounded bg-white/6 hover:bg-[#2196F3]/40"
                        >
                          {st}
                        </button>
                      ))}
                      <button
                        onClick={() => openBooking(movie)}
                        className="ml-2 px-3 py-1 rounded bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-black font-semibold"
                      >
                        Details
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Footer quick links */}
        <footer className="mt-12 text-gray-300 border-t border-white/10 pt-6 pb-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-6">
            <div>
              <h5 className="font-bold text-lg">MoTheater</h5>
              <p className="text-sm text-gray-400 max-w-sm">
                Premium ticket booking with modern UX. Designed to be fast and
                delightful.
              </p>
            </div>
            <div className="flex gap-8">
              <div>
                <h6 className="font-semibold">Company</h6>
                <ul className="text-sm mt-2 space-y-1">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Press</li>
                </ul>
              </div>
              <div>
                <h6 className="font-semibold">Support</h6>
                <ul className="text-sm mt-2 space-y-1">
                  <li>Help Center</li>
                  <li>Contact</li>
                  <li>Terms</li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
      </main>

      {/* Booking Modal (simple) */}
      {isBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setBookingOpen(false)}
          ></div>

          <div className="relative w-full max-w-3xl bg-[#0b1220] rounded-2xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h4 className="font-bold text-xl">{selectedMovie?.title}</h4>
                <div className="text-sm text-gray-300">
                  {selectedShowtime
                    ? `Showtime: ${selectedShowtime}`
                    : "Choose showtime"}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setBookingOpen(false)}
                  className="text-sm px-3 py-1 rounded bg-white/6"
                >
                  Close
                </button>
              </div>
            </div>

            {/* Steps */}
            <div className="mb-4">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <div
                  className={`px-3 py-1 rounded-full ${
                    step >= 1 ? "bg-[#2196F3]/40" : "bg-white/5"
                  }`}
                >
                  1. Showtime
                </div>
                <div
                  className={`px-3 py-1 rounded-full ${
                    step >= 2 ? "bg-[#2196F3]/40" : "bg-white/5"
                  }`}
                >
                  2. Seats
                </div>
                <div
                  className={`px-3 py-1 rounded-full ${
                    step >= 3 ? "bg-[#2196F3]/40" : "bg-white/5"
                  }`}
                >
                  3. Payment
                </div>
                <div
                  className={`px-3 py-1 rounded-full ${
                    step >= 4 ? "bg-[#2196F3]/40" : "bg-white/5"
                  }`}
                >
                  4. Confirm
                </div>
              </div>
            </div>

            <div className="min-h-[260px]">
              {step === 1 && (
                <div className="space-y-4">
                  <h5 className="font-semibold">Select Showtime</h5>
                  <div className="flex flex-wrap gap-3">
                    {(selectedMovie?.showtimes ?? []).map((s) => (
                      <button
                        key={s}
                        onClick={() => {
                          setSelectedShowtime(s);
                          nextStep();
                        }}
                        className={`px-4 py-2 rounded ${
                          selectedShowtime === s
                            ? "bg-[#FFC107] text-black"
                            : "bg-white/6"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h5 className="font-semibold mb-3">Choose Seats</h5>
                  <div className="bg-black/20 p-4 rounded-lg">
                    <div className="grid grid-cols-8 gap-2">
                      {Array.from({ length: 40 }).map((_, i) => {
                        const seatId = `R${Math.floor(i / 8) + 1}S${
                          (i % 8) + 1
                        }`;
                        const taken = false; // placeholder — integrate real seat availability
                        const selected = selectedSeats.includes(seatId);
                        return (
                          <button
                            key={seatId}
                            disabled={taken}
                            onClick={() => toggleSeat(seatId)}
                            className={`text-xs p-2 rounded ${
                              taken
                                ? "bg-red-900/60 cursor-not-allowed"
                                : selected
                                ? "bg-[#FFC107] text-black"
                                : "bg-white/6"
                            }`}
                          >
                            {seatId}
                          </button>
                        );
                      })}
                    </div>
                    <div className="text-sm text-gray-300 mt-3">
                      Selected: {selectedSeats.join(", ") || "—"}
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h5 className="font-semibold">Payment (Mock)</h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <input
                      placeholder="Cardholder name"
                      className="p-3 rounded bg-white/5"
                    />
                    <input
                      placeholder="Card number"
                      className="p-3 rounded bg-white/5"
                    />
                    <input
                      placeholder="MM/YY"
                      className="p-3 rounded bg-white/5"
                    />
                    <input
                      placeholder="CVC"
                      className="p-3 rounded bg-white/5"
                    />
                  </div>
                  <div className="text-sm text-gray-300">
                    Total:{" "}
                    <span className="font-semibold">
                      ฿{selectedSeats.length * 150}
                    </span>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h5 className="font-semibold">Confirm Booking</h5>
                  <p className="text-sm text-gray-300">
                    Movie: {selectedMovie?.title}
                  </p>
                  <p className="text-sm text-gray-300">
                    Showtime: {selectedShowtime}
                  </p>
                  <p className="text-sm text-gray-300">
                    Seats: {selectedSeats.join(", ") || "—"}
                  </p>
                  <p className="text-sm text-gray-300">
                    Amount: ฿{selectedSeats.length * 150}
                  </p>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-gray-300">Step {step} of 4</div>
              <div className="flex gap-3">
                {step > 1 && (
                  <button
                    onClick={prevStep}
                    className="px-4 py-2 rounded bg-white/6"
                  >
                    Back
                  </button>
                )}
                {step < 4 && (
                  <button
                    onClick={nextStep}
                    className="px-4 py-2 rounded bg-[#2196F3] text-black"
                  >
                    Next
                  </button>
                )}
                {step === 4 && (
                  <button
                    onClick={completePayment}
                    className="px-4 py-2 rounded bg-[#FFC107] text-black font-semibold"
                  >
                    Pay & Confirm
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
