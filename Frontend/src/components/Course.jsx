import { Link } from "react-router-dom";
// import list from "../../public/list.json";
import Cards from "./Cards";
import axios from 'axios'
import { useEffect, useState } from "react";

function Course() {
  const [book,setBook]=useState([]);
  useEffect(()=>{
    const getBook=async ()=>{
      try {
        const res=await axios.get("http://localhost:4001/book");
      console.log(res.data);
      setBook(res.data);
      } catch (error) {
        console.log(error);
      }
      
    };
    getBook();
  },[]);
  return (
    <>
      <div className="max w-screen-2x1 container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl font-semibold md:text-4xl">
            We are delighted to have you{" "}
            <span className="text-pink-500"> Here! :)</span>
          </h1>
          <p className="mt-12">
            Explore a vibrant world of literature on our book website, where
            stories come to life with diverse genres and insightful reviews.
            From timeless classics to contemporary bestsellers, discover your
            next favorite read through curated lists and personalized
            recommendations. Join a community of book lovers sharing their
            passion for literature, and delve into author interviews and
            literary discussions that enrich your reading experience. Embark on
            a journey of imagination and knowledge with us today!
          </p>
          <Link to="/">
            <button className="bg-pink-500 text-white px-4 mt-6 px-4 py-2 rounded-md hover:bg-pink-700 duration 300">
              Back
            </button>
          </Link>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3">
          {book.map((item) => (               //ab to data mil gya hai isliye ab book se map karenge na ki list se
            <Cards key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}

export default Course;
