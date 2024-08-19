import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

type CardDemoProps = {
    title: string;
    description: string;
    imgsrc: string;
    imdb: string;
};



function CardDemo({ title, description, imgsrc, imdb }: CardDemoProps) {
    return (
        
        <Link href={{ pathname: '/Info', query: {title} }}>
        <div className="card cursor-pointer bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700 flex flex-col  w-[170px] md:w-80 h-full md:h-auto  shadow-md rounded-xl md:p-4 p-2 transform transition-transform duration-300 hover:scale-105 ">
            <img src={imgsrc} alt={title} className=" md:h-[350px] h-44 rounded-xl" />
            <h2 className="md:text-xl md:font-bold  font-semibold mt-3 ml-2"> # {title} </h2>
            <p className="md:font-semibold flex items-center mt-2 gap-3"> <FaStar className="fill-yellow-500 " /> IMDB Rating: {imdb}</p>
        </div>
        </Link>
    );
}

// HomePage component
export default function HomePage() {
    const [movies, setMovies] = useState<CardDemoProps[]>([]);
    const movieTitles =[
        "chandu champion",
        "Like Stars on Earth",
        "Bajrangi Bhaijaan",
        "Runway 34",
        "PK",
        "Farzi",
        "Kota factory",
        "The kashmir files",
        "Hum Aapke Hain Koun..!",
        "Panchayat",
        "Satyaprem Ki Katha",           
        "Zara Hatke Zara Bachke",       
        "Drishyam 2",                   
        "Jawan",                        
        "Gadar 2",                      
        "Pathaan",                      
        "Chandramukhi",                 
        "Ved",                          
        "Baipan Bhari Deva",            
        "Dagdi Chawl 2",                
        "Har Har Mahadev",              
        "Timepass 3",                   
        "Dharmaveer",                   
        "Circus",               
        "Sholay",
        "Dilwale Dulhania Le Jayenge",
        "3 Idiots",
        "Lagaan",
        "Mughal-e-Azam",
        "Kabhi Khushi Kabhie Gham",
        "Paan Singh Tomar",
        "Dangal",
        "Zindagi Na Milegi Dobara",
        "Dangal",
        "Gully Boy",
        "Queen",
        "Kuch Kuch Hota Hai",
        "Devdas",
        "Jab We Met",
        "Pakeezah",
        "Andaz Apna Apna",
        "Om Shanti Om",
        "Barfi!",
        "Guide"
      ]
      

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const fetchedMovies = await Promise.all(
                    movieTitles.map(async (title) => {
                        const response = await axios.get(`https://www.omdbapi.com/?apikey=${process.env.NEXT_PUBLIC_API_KEY}&t=${title}`);
                        const { Title, Plot, Poster, imdbRating } = response.data;
                        return {
                            title: Title,
                            description: Plot,
                            imgsrc: Poster,
                            imdb: imdbRating,
                        };
                    })
                );
                setMovies(fetchedMovies);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <>
            <div className="flex  flex-col  md:mb-5 mb-10 items-center min-h-screen">
                <div className="cards flex flex-wrap justify-center mt-4 gap-4 md:gap-8">
                    {movies.length > 0 ? (
                        movies.map((movie, index) => (
                            <CardDemo
                                key={index}
                                title={movie.title}
                                description={movie.description}
                                imgsrc={movie.imgsrc}
                                imdb={movie.imdb}
                            />
                        ))
                    ) : (
                        <p>Loading movies...</p>
                    )}
                </div>
            </div>
        </>
    );
}
