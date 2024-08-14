'use client'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CardDemo } from '@/components/Card/card';
import HomePage from '@/components/HomePage/homePage';
import Navbar from '@/components/Navbar/Navbar';
import { FiSearch } from 'react-icons/fi';

async function fetchMovie(movie: string) {
  let response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&t=${movie}`);
  let data = await response.data;
  return data;
}

interface MovieData {
  Title: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

export default function Home() {
  const [data, setData] = useState<MovieData | null>(null);
  const [movie, setMovie] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    setDisabled(movie.trim().length === 0);
  }, [movie]);

  const handleClick = async () => {
    setLoading(true);
    try {
      const movieData = await fetchMovie(movie);
      setData(movieData);
    } catch (error) {
      console.error("Error fetching movie data", error);
    } finally {
      setLoading(false);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center min-h-screen">
        <main className="flex mt-10 gap-11">
          <input
            type="text"
            className="w-[40vw] p-3 border-black dark:border-white border-x-2 border-y-2 rounded-xl"
            placeholder="Enter movie name"
            value={movie}
            onChange={(e) => setMovie(e.target.value)}
          />
          <button
            type="submit"
            onClick={handleClick}
            disabled={disabled}
            className="bg-black flex gap-2 items-center font-bold text-xl text-white dark:bg-slate-50 dark:text-black py-3 rounded-xl px-5"
          >
            <FiSearch /> Search
          </button>
        </main>
        <div className="cards flex flex-wrap justify-center mt-4 gap-6">
          <HomePage />
        </div>
        {showModal && data && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleCloseModal}
          >
            <div
              className="rounded-xl p-6 max-w-sm mx-auto"
              onClick={(e) => e.stopPropagation()} // Prevent closing modal when clicking inside it
            >
              <button
                className="absolute top-4 text-4xl right-20 dark:text-white dark:hover:text-white"
                onClick={handleCloseModal}
              >
                &times;
              </button>
              <CardDemo
                className="card cursor-pointer p-1 border text-white bg-slate-400 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 flex flex-col w-[350px] shadow-md rounded-xl"
                title={data.Title}
                description={data.Plot}
                imgsrc={data.Poster}
                imdb={data.imdbRating}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
