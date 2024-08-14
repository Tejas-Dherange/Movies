'use client'
import Navbar from '@/components/Navbar/Navbar';
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

interface MovieData {
  Title: string;
  Plot: string;
  Poster: string;
  Year: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Language: string;
  Country: string;
  Awards: string;
  imdbVotes: string;
  Type: string;
  BoxOffice: string;
  imdbRating: string;
}

async function fetchMovie(movie: string): Promise<MovieData> {
  const response = await axios.get(`http://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&t=${movie}`);
  return response.data;
}

const Page = () => {
  const [data, setData] = useState<MovieData | null>(null);
  const [boxOffice, setBoxOffice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const title = searchParams.get('title');

  useEffect(() => {
    if (title) {
      setLoading(true);
      fetchMovie(title).then((data) => {
        setData(data);
        setLoading(false);
        // Handle BoxOffice if it exists
        if (data.BoxOffice) {
          setBoxOffice(parseInt(data.BoxOffice.replaceAll(",", "").substring(1)));
        }
      }).catch(() => {
        setLoading(false);
        // Handle errors here
      });
    }
  }, [title]);

  return (
    <>
      <Navbar />
      <div className='p-4'>
        <h1 className=' flex justify-center items-center p-4 mt-4 mb-4 text-5xl m-auto  font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-900 to-pink-500'>
          {title ? `# ${title}` : "No Title Provided"}
        </h1>
        {loading ? (
          <p className='flex justify-center '>Info Loading...</p>
        ) : (
          data && (
            <div className='md:flex justify-center border md:p-1 md:px-11 p-10 items-center gap-9 bg-gray-100 dark:bg-black'>
              <img className=' transform transition-transform duration-300 hover:scale-105 cursor-pointer' src={data.Poster} alt={data.Title} />
              <div className="content text-xl font-mono mt-5 flex-col gap-7">
              <h2> # Title : {data.Title}</h2>
                <p># Plot : {data.Plot}</p>
                <p># Year : {data.Year}</p>
                <p># Released Date : {data.Released}</p>
                <p># Runtime : {data.Runtime}</p>
                <p># Genre : {data.Genre}</p>
                <p># Director : {data.Director}</p>
                <p># Writer : {data.Writer}</p>
                <p># Actors : {data.Actors}</p>
                <p># Language : {data.Language}</p>
                <p># Country : {data.Country}</p>
                <p># Awards : {data.Awards}</p>
                <p># IMDB Votes : {data.imdbVotes}</p>
                <p># Type : {data.Type}</p>
                <p># BoxOffice Collection : ₹ {boxOffice?(boxOffice * 83.95 / 1000000).toFixed(2):"N/A"} Cr INR.</p>
                <p># IMDB Rating: {data.imdbRating}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}

export default Page;
