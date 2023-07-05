/* eslint-disable react/prop-types */

import { useContext } from "react";
import {
  fetchImages,
  nextPage,
  prevPage,
  selectImg,
  toggleModal,
} from "../redux/actions/imageActions";
import { useDispatch, useSelector } from "react-redux";
import { Ctx } from "../context/DispatchCtx";

const Input = () => {
  const dispatch = useDispatch();
  const handleChange = useContext(Ctx);
  const search = useSelector((state) => state.allImages.query);

  return (
    <div className="input-box">
      <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Enter search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
        <input
          type="search"
          value={search}
          name="search"
          onChange={handleChange}
          className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none"
          placeholder="Search for images..."
          required
        />
        <button
          type="submit"
          className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => {
            dispatch(fetchImages(search, 2));
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
};

const PhotoComp = ({ photo }) => {
  const {
    src: { medium },
    alt,
    photographer,
    photographer_url,
    photographer_id,
    width,
    height,
  } = photo;

  const dispatch = useDispatch();

  return (
    <>
      <button
        className="rounded border-4 border-stone-500 flex flex-col gap-5 items-center"
        onClick={() => {
          dispatch(toggleModal());
          dispatch(
            selectImg({
              photographer,
              photographer_url,
              photographer_id,
              width,
              height,
            })
          );
        }}
      >
        <img
          src={medium}
          alt={alt}
          className="shadow-lg rounded object-cover h-48 w-full"
        />
      </button>

      <div
        id="defaultModal"
        tabIndex="-1"
        aria-hidden="true"
        className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <h1>Hello</h1>
          </div>
        </div>
      </div>
    </>
  );
};

const ModalContent = ({ type, value }) => {
  return (
    <div className="flex gap-2">
      <h4 className="font-bold text-xs">{type}:</h4>
      <h4 className="text-stone-500 text-xs">{value}</h4>
    </div>
  );
};

const Modal = () => {
  const dispatch = useDispatch();
  const selectedImg = useSelector((state) => state.allImages.selectedImg);
  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-3xl">
          {/*content*/}
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/*body*/}
            <div className="relative p-6 flex-auto">
              <ModalContent
                type="photographer_id"
                value={selectedImg?.photographer_id}
              />
              <ModalContent
                type="photographer"
                value={selectedImg?.photographer}
              />
              <ModalContent
                type="photographer_url"
                value={selectedImg?.photographer_url}
              />
              <ModalContent type="width" value={selectedImg?.width} />
              <ModalContent type="height" value={selectedImg?.height} />
            </div>
            {/*footer*/}
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => dispatch(toggleModal())}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

const ImageContainer = () => {
  const cols = useSelector((state) => state.allImages.cols);
  const allImgs = useSelector((state) => state.allImages.images);

  switch (cols) {
    case 2:
      return (
        <div
          className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-2
        "
        >
          {allImgs?.photos?.map((photo) => (
            <PhotoComp key={photo.id} photo={photo} />
          ))}
        </div>
      );

    case 3:
      return (
        <div
          className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3
        "
        >
          {allImgs?.photos?.map((photo) => (
            <PhotoComp key={photo.id} photo={photo} />
          ))}
        </div>
      );

    case 4:
      return (
        <div
          className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4
        "
        >
          {allImgs?.photos?.map((photo) => (
            <PhotoComp key={photo.id} photo={photo} />
          ))}
        </div>
      );

    case 5:
    default:
      return (
        <div
          className="mt-5 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5
        "
        >
          {allImgs?.photos?.map((photo) => (
            <PhotoComp key={photo.id} photo={photo} />
          ))}
        </div>
      );
  }
};

const ImageGallery = () => {
  const showModal = useSelector((state) => state.allImages.showModal);
  const search = useSelector((state) => state.allImages.query);
  const cols = useSelector((state) => state.allImages.cols);
  const handleChange = useContext(Ctx);
  const page = useSelector((state) => state.allImages.page);
  const allImgs = useSelector((state) => state.allImages.images);
  const dispatch = useDispatch();

  return (
    <>
      <Input />

      <select
        name="cols"
        className="mt-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={cols}
        onChange={handleChange}
      >
        <option value={2}>2</option>
        <option value={3}>3</option>
        <option value={4}>4</option>
        <option value={5}>5</option>
      </select>

      <ImageContainer />

      {allImgs?.photos?.length > 0 && (
        <>
          <button
            type="button"
            className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              if (page > 1) {
                dispatch(prevPage());
                dispatch(fetchImages(search, page));
              }
            }}
          >
            <svg
              fill="#000000"
              height="50px"
              width="50px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xmlSpace="preserve"
            >
              <path
                id="XMLID_6_"
                d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M205.606,234.394
c5.858,5.857,5.858,15.355,0,21.213C202.678,258.535,198.839,260,195,260s-7.678-1.464-10.606-4.394l-80-79.998
c-2.813-2.813-4.394-6.628-4.394-10.606c0-3.978,1.58-7.794,4.394-10.607l80-80.002c5.857-5.858,15.355-5.858,21.213,0
c5.858,5.857,5.858,15.355,0,21.213l-69.393,69.396L205.606,234.394z"
              />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={() => {
              dispatch(nextPage());
              dispatch(fetchImages(search, page));
            }}
          >
            <svg
              fill="#000000"
              height="50px"
              width="50px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 330 330"
              xmlSpace="preserve"
            >
              <path
                id="XMLID_2_"
                d="M165,0C74.019,0,0,74.019,0,165s74.019,165,165,165s165-74.019,165-165S255.981,0,165,0z M225.606,175.605
l-80,80.002C142.678,258.535,138.839,260,135,260s-7.678-1.464-10.606-4.394c-5.858-5.857-5.858-15.355,0-21.213l69.393-69.396
l-69.393-69.392c-5.858-5.857-5.858-15.355,0-21.213c5.857-5.858,15.355-5.858,21.213,0l80,79.998
c2.814,2.813,4.394,6.628,4.394,10.606C230,168.976,228.42,172.792,225.606,175.605z"
              />
            </svg>
            <span className="sr-only">Icon description</span>
          </button>
        </>
      )}

      {showModal ? <Modal /> : null}
    </>
  );
};

export default ImageGallery;
