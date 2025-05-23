import { useState, useEffect } from "react";
import ImageCard from "./components/ImageCard";
import Search from "./components/Search";

function App() {
  const API_KEY = "18506864-7bd7882be814f02c370876429";
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");
  const apiKey = "18506864-7bd7882be814f02c370876429";

  useEffect(() => {
    async function fetchPhoto() {
      const res = await fetch(
        `https://pixabay.com/api/?key=${apiKey}&q=${term}&image_type=photo`
      );
      const data = await res.json();
      console.log(data);
      setImages(data.hits);
      setIsLoading(false);
    }
    fetchPhoto();
  }, [term]);

  return (
    <>
      <div className="container mx-auto">
        <Search searchText={(text) => setTerm(text)}/>


        {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>}

        {isLoading ? (
          <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-4 p place-items-center sm:place-items-start">
            {images.map((image) => (
              <ImageCard key={image.id} image={image} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
