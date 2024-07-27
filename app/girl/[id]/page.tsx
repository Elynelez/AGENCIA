"use client";

import { useState, useEffect } from 'react';
import { IoIosHeart, IoLogoWhatsapp, IoIosStar } from 'react-icons/io';
import { useLocalStorage } from '@/app/components/LocalStorage/LocalStorage';
import { ModalComments } from '@/app/components/Modal/Modal';

interface Comment {
  user: string;
  description: string;
  calification: number;
}

interface Girl {
  id: number;
  name: string;
  photo: string[];
  description: string;
  price: string;
  services: string[];
  comments: Comment[];
}

const ProductPage = ({ params }: { params: { id: string } }) => {
  const [girls, setGirls] = useState<Girl[]>([]);
  const [activeImg, setActiveImage] = useState<string>('');
  const [favIcon, setFavIcon] = useLocalStorage('fav', []) as [Girl[], React.Dispatch<React.SetStateAction<Girl[]>>];
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const fetchGirls = async () => {
      const res = await fetch('/api/sellers');
      const data = await res.json();
      setGirls(data);
    };

    fetchGirls();
  }, []);

  useEffect(() => {
    const girl = girls.find((obj) => obj.id.toString() === params.id);
    if (girl) {
      setActiveImage(girl.photo[0]);
    }
  }, [girls, params.id]);

  const data = girls.find((obj) => obj.id.toString() === params.id);

  if (!data) {
    return <div>perra no encontranda</div>;
  }

  const addGirlToFavorites = (girl: Girl) => {
    if (!favIcon.some((item) => item.id === girl.id)) {
      setFavIcon((prevFavIcon) => [...prevFavIcon, girl]);
    }
  };

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className='flex flex-col justify-between lg:flex-row gap-16 lg:items-center m-20'>
      <div className='flex flex-col gap-6 lg:w-2/4'>
        <img src={activeImg} alt="" className='w-50 h-full aspect-square object-cover rounded-xl' />
        <div className='image-group flex flex-row justify-between h-24'>
          {data.photo.map((img, index) => (
            <img src={img} key={index} alt="" className='w-24 h-24 rounded-md cursor-pointer' onClick={() => setActiveImage(img)} />
          ))}
        </div>
      </div>
      {/* ABOUT */}
      <div className='flex flex-col gap-4 lg:w-2/4'>
        <div>
          <span className=' text-violet-600 font-semibold'>{data.services.join(", ")}</span>
          <h1 className='text-3xl font-bold'>{data.name}</h1>
        </div>
        <p className='text-gray-700'>
          {data.description}
        </p>
        <h6 className='text-2xl font-semibold'>{data.price}<span>/hora</span></h6>
        <div className='flex flex-row items-center gap-10 button-group'>
          <button
            className='bg-violet-800 text-white font-semibold py-4 px-16 rounded-xl h-full'
            onClick={() => { addGirlToFavorites(data) }}
          >
            <IoIosHeart />
          </button>
          <a
            href={"https://api.whatsapp.com/send?phone=573207474085&text=" + "hola sapa perra"}
            target="_blank"
            className='w-full'
          >
            <button
              className='bg-green-800 text-white font-semibold py-4 px-16 rounded-xl h-full'
            >
              <IoLogoWhatsapp />
            </button>
          </a>
          <button
            className='bg-gray-800 text-white font-semibold py-4 px-16 rounded-xl h-full'
            onClick={openModal}
          >
            <IoIosStar />
          </button>
        </div>
      </div>
      <ModalComments
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        data={data}
      />
    </div>
  );
}

export default ProductPage;
