import { Toaster, toast } from 'react-hot-toast';

import { useEffect, useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { fetchImages } from './Services/FetchImages';
import { Button } from './Button/Button';

import { ThreeDots } from 'react-loader-spinner';
import Modal from './Modal/Modal';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isActiveBtn, setIsActiveBtn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImage, setLargeImage] = useState('');
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    const getImages = async () => {
      // setIsActiveBtn(false);
      setIsLoading(true);

      try {
        const { hits, totalHits } = await fetchImages(searchQuery, page);

        setImages(images => [...images, ...hits]);

        setIsActiveBtn(true);
        setTotalHits(totalHits);

        // this.setState(({ page, images }) => ({
        //   images: [...images, ...hits],
        //   page: page + 1,
        //   isActiveBtn: true,
        //   totalHits,
        // }));

        if (hits.length === 0) {
          setIsActiveBtn(false);

          return toast.error(
            'Sorry, there are no images matching your request. Please try again.'
          );
        }
        return toast.success(
          `Success! Here are the pictures on your ${searchQuery} request`
        );
      } catch (error) {
        setError(error.message);
        setIsActiveBtn(false);
        return toast.error('Something went wrong. Please try again!');
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [searchQuery, page]);
  //  const  componentDidUpdate(_, prevState) =>{
  //     if (prevState.searchQuery !== this.state.searchQuery) {
  //       this.getImages();
  //     }
  //   }

  // const getImages = async () => {
  //   setIsActiveBtn(false);
  //   setIsLoading(true);

  //   try {
  //     const { hits, totalHits } = await fetchImages(searchQuery, page);

  //     setImages(images => [...images, hits]);
  //     setPage(page + 1);
  //     setIsActiveBtn(true);
  //     setTotalHits();

  //     // this.setState(({ page, images }) => ({
  //     //   images: [...images, ...hits],
  //     //   page: page + 1,
  //     //   isActiveBtn: true,
  //     //   totalHits,
  //     // }));

  //     if (hits.length === 0) {
  //       setIsActiveBtn(false);

  //       return toast.error(
  //         'Sorry, there are no images matching your request. Please try again.'
  //       );
  //     }
  //     return toast.success(
  //       `Success! Here are the pictures on your ${searchQuery} request`
  //     );
  //   } catch (error) {
  //     setError(error.message);
  //     setIsActiveBtn(false);
  //     return toast.error('Something went wrong. Please try again!');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const incrementPage = () => {
    setPage(page => page + 1);
  };

  const getLargeImage = largeImage => {
    setLargeImage(largeImage);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleFormSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    setPage(1);
    setImages([]);
  };

  const errorStyle = {
    textAlign: 'center',
    fontSize: '25px',
    fontWeight: '600',
  };

  return (
    <div>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery images={images} onGetImages={getLargeImage} />
      <Toaster position="top-right" reverseOrder={false} />
      {error && <div style={errorStyle}>{error}</div>}
      {isLoading && (
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#3f51b5"
          ariaLabel="three-dots-loading"
          wrapperStyle={{
            display: 'flex',
            justifyContent: 'center',
          }}
          wrapperClassName=""
          visible={true}
        />
      )}
      {isActiveBtn && images && totalHits > 1 && images.length < totalHits && (
        <Button onLoadMore={incrementPage} />
      )}
      {showModal && <Modal largeimage={largeImage} onClick={toggleModal} />}
    </div>
  );
}
