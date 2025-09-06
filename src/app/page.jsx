// pages/index.jsx
"use client";
import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import Navbar from "./components/navbar";
import { motion, AnimatePresence } from "framer-motion";

// Single-file Next.js page implementing a cinematic modern movie-ticket site
// Tailwind CSS assumed installed and configured in the project

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

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
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="space-y-4"
          >
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:flex justify-center"
          >
            <div className="w-64 h-96 rounded-xl shadow-2xl transform hover:scale-105 transition overflow-hidden bg-gradient-to-b from-[#2196F3]/20 to-[#0D47A1]/30">
              {/* <img src={movies[0].poster} alt="featured" className="w-full h-full object-cover"/> */}
            </div>
          </motion.div>
        </section>

        {/* Movies Grid */}
        <section id="movies">
          <h3 className="text-2xl font-bold mb-4">Now Showing</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <div key={movie.id}>
                {/* Normal Card */}
                <motion.article
                  layoutId={`card-${movie.id}`}
                  onClick={() => setSelected(movie)}
                  className="group bg-gradient-to-br from-gray-900/50 to-black/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/5 hover:border-[#2196F3]/30 hover:shadow-[0_20px_60px_rgba(33,150,243,0.15)] transition-all duration-500 cursor-pointer transform hover:scale-[1.02]"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                    
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <motion.div
                      className="absolute left-3 top-3 px-2.5 py-1 bg-black/70 backdrop-blur-md rounded-lg text-xs font-medium flex items-center gap-1"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="text-[#2196F3]">★</span> {movie.rating}
                    </motion.div>
                  </div>

                  <div className="p-5 space-y-3">
                    <motion.h4
                      className="font-bold text-xl bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      {movie.title}
                    </motion.h4>

                    <motion.p
                      className="text-sm text-gray-400 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {movie.synopsis}
                    </motion.p>

                    <div className="flex items-center justify-between pt-2">
                      <motion.div
                        className="text-sm text-gray-400 flex items-center gap-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-[#2196F3]/60">⏱</span>{" "}
                        {movie.length}
                      </motion.div>

                      <div className="flex gap-2 items-center">
                        {movie.showtimes.slice(0, 2).map((st, index) => (
                          <motion.button
                            key={st}
                            onClick={(e) => {
                              e.stopPropagation();
                              openBooking(movie, st);
                            }}
                            className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-[#2196F3]/20 hover:border-[#2196F3]/40 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                          >
                            {st}
                          </motion.button>
                        ))}

                        <motion.button
                          onClick={(e) => {
                            e.stopPropagation();
                            openBooking(movie);
                          }}
                          className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white text-sm font-semibold shadow-lg shadow-[#2196F3]/20 hover:shadow-[#2196F3]/40 transition-all duration-300"
                          whileHover={{
                            scale: 1.05,
                            boxShadow: "0 10px 25px rgba(33,150,243,0.3)",
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          จอง
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.article>

                {/* Fullscreen Modal */}
                <AnimatePresence mode="wait">
                  {selected && (
                    <>
                      {/* Background Blur with Smooth Fade */}
                      <motion.div
                        className="fixed inset-0 bg-gray/80 backdrop-blur-2xl z-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        onClick={() => setSelected(null)}
                      />

                      {/* Fullscreen Card with Spring Animation */}
                      <motion.div
                        layoutId={`card-${selected.id}`}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          duration: 0.4,
                        }}
                      >
                        <motion.div
                          className="bg-gradient-to-br from-gray-900 to-black rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-white/10"
                          initial={{ y: 50 }}
                          animate={{ y: 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                          }}
                        >
                          

                          {/* Image with Ken Burns Effect */}
                          <div onClick={() => setSelected(null)} className="relative h-96 md:h-[28rem] overflow-hidden">
                            <motion.img
                            
                              src={selected.poster}
                              alt={selected.title}
                              className="w-full h-full object-cover"
                              initial={{ scale: 1.1 }}
                              animate={{ scale: 1 }}
                              transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                          </div>

                          {/* Content */}
                          <motion.div
                            className="p-8 text-white -mt-20 relative z-10"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                          >
                            <motion.h2
                              className="text-4xl font-bold mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.3 }}
                            >
                              {selected.title}
                            </motion.h2>

                            <motion.p
                              className="text-gray-300 mb-6 text-base leading-relaxed"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.4 }}
                            >
                              {selected.synopsis}
                            </motion.p>

                            <motion.div
                              className="flex items-center gap-4 mb-6 text-sm text-gray-400"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.5 }}
                            >
                              <span className="flex items-center gap-1">
                                <span className="text-[#2196F3]">★</span>{" "}
                                {selected.rating}
                              </span>
                              <span>•</span>
                              <span>{selected.length}</span>
                            </motion.div>

                            <motion.div
                              className="flex flex-wrap gap-3"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.6 }}
                            >
                              {selected.showtimes.map((st, index) => (
                                <motion.button
                                  key={st}
                                  onClick={() => openBooking(selected, st)}
                                  className="px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[#2196F3]/30 hover:border-[#2196F3]/50 transition-all duration-300 font-medium"
                                  whileHover={{ scale: 1.05, y: -2 }}
                                  whileTap={{ scale: 0.95 }}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.7 + index * 0.05 }}
                                >
                                  {st}
                                </motion.button>
                              ))}

                              <motion.button
                                onClick={() => openBooking(selected)}
                                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2196F3] to-[#1976D2] text-white font-bold shadow-lg shadow-[#2196F3]/30 hover:shadow-[#2196F3]/50 transition-all duration-300"
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                              >
                                จองตั๋วทันที
                              </motion.button>
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
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
