"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  return (
    <div className="backdrop-blur-sm bg-black/30 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2196F3] to-[#0D47A1] flex items-center justify-center text-xl font-bold">F</div>
            <div>
              <h1 className="font-bold text-lg">FS Theater</h1>
              <p className="text-xs text-gray-300">Cinematic modern ticketing</p>
            </div>
          </div>

          <nav className="flex gap-6 items-center">
            <Link href="/movies" className="text-sm hover:text-[#FFC107]">Movies</Link>
            <Link href="/about" className="text-sm hover:text-[#FFC107]">About</Link>
            <Link href="/contact" className="text-sm hover:text-[#FFC107]">Contact</Link>
            <button onClick={()=>window.scrollTo({top:document.body.scrollHeight, behavior:'smooth'})} className="ml-3 rounded-lg px-3 py-2 bg-gradient-to-r from-[#2196F3] to-[#0D47A1] text-black font-semibold hover:brightness-105">Sign In</button>
          </nav>
        </div>
      </div>
  );
}