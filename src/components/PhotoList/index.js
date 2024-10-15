import React, { useEffect, useState, useCallback } from 'react';
import './style.css';
import { addPhotos, appendPhotos } from './util';
import { Atom } from 'react-loading-indicators';
import { useNavigate   } from 'react-router-dom';

const ACCESS_KEY = process.env.REACT_APP_ACCESS_KEY; // Replace with your Unsplash API key

const PhotoList = () => {
  const per_page = 10;
  const [column1, setColumn1] = useState([]);
  const [column2, setColumn2] = useState([]);
  const [column3, setColumn3] = useState([]);
  const [column4, setColumn4] = useState([]);
  const [page, setPage] = useState(1); // Tracks current page for pagination
  const [isLoading, setIsLoading] = useState(false); // Loading state for fetching
  const [fetchError, setFetchError] = useState(false); // Tracks if there is an error fetching photos
  const navigate = useNavigate();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); // Tracks screen width for responsive design
  const [rateLimitError, setRateLimitError] = useState(false); // Tracks if the rate limit has been exceeded

  // var columnCount = 3;
  // if(screenWidth < 480) {
  //   columnCount = 1;
  // } else if(screenWidth < 991) {
  //   columnCount = 2;
  // }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  useEffect( () => {
    async function fetchData() {
      const url = `https://api.unsplash.com/photos/?client_id=${ACCESS_KEY}&page=${page}&per_page=${per_page}`;
      try{
        setIsLoading(true);
        await sleep(500)
        const response = await fetch(url);
        const data = await response.json();
        const { newColumn1, newColumn2, newColumn3, newColumn4 } = addPhotos(column1, column2, column3, column4, data);
        setColumn1(newColumn1);
        setColumn2(newColumn2);
        setColumn3(newColumn3);
        setColumn4(newColumn4);
        console.log(column1, column2, column3, column4);
      }
      catch(error){
        setFetchError(true);
        console.error(error);
      }
      finally{
        setIsLoading(false);
      }
    }

    fetchData();
  }, [page]);

  function handleImageClick(item) {
     navigate(`/photos/${item.id}`);
  }

  //add event listener to window
  useEffect(() => {
    const handleScroll = () => {
      console.log('scrolling', isLoading, page);
      const scrollTop = window.scrollY; // Amount scrolled from the top
      const windowHeight = window.innerHeight; // Height of the viewport
      const documentHeight = document.documentElement.scrollHeight; // Total height of the document
  
      // Check if the user has scrolled to the bottom
      if (scrollTop + windowHeight >= documentHeight - 200) {
          console.log('Scrolled to the bottom of the page!');
          setPage(prevPage => {
              console.log('New page:', prevPage + 1); // This will now log the correct value
              return prevPage + 1;
          });
          console.log(page);
      }
    };

    if (!isLoading) {
        document.addEventListener('scroll', handleScroll);
    }

    // Cleanup function to remove the event listener
    return () => {
        document.removeEventListener('scroll', handleScroll);
    };
}, [isLoading]);

  return (
    <>
    
      <div className="row"> 
        <div className="column">
          {column1.map((item, index) => (
              <div onClick={()=>handleImageClick(item)} key={index} className="pics">
                <img src={item?.urls?.small} alt={item?.alt_description || item?.description} style={{ width: '100%' }} />
                <p className="author-name">{item?.user?.name || 'Unknown Author'}</p>
            </div>
            
          ))}
        </div>
        
        <div className="column">
          {column2?.map((item, index) => (
              <div onClick={()=>handleImageClick(item)} key={index} className="pics">
                <img src={item?.urls?.small} alt={item?.alt_description || item?.description} style={{ width: '100%' }} />
                <p className="author-name">{item?.user?.name || 'Unknown Author'}</p>
              </div>
          ))}
        </div> 
        
        <div className="column">
          {column3?.map((item, index) => (
              <div  onClick={()=>handleImageClick(item)} key={index} className="pics">
                <img src={item?.urls?.small} alt={item?.alt_description || item?.description} style={{ width: '100%' }} />
                <p className="author-name">{item?.user?.name || 'Unknown Author'}</p>
            </div>
          ))}
        </div>
        
        <div className="column">
          {column4?.map((item, index) => (
            <div onClick={()=>handleImageClick(item)} key={index} className="pics">
              <img src={item?.urls?.small} alt={item?.alt_description || item?.description} style={{ width: '100%' }} />
              <p className="author-name">{item?.user?.name || 'Unknown Author'}</p>
            </div>
          ))}
        </div>
      </div>

        
      
      {isLoading && 
        <div className="loading-indicator-container">
          <Atom className="loading-indicator" color="#32cd32" size="medium" text="" textColor="" />
        </div>
      } 
    </>
    
    
  );
};

export default PhotoList;
