"use client";

import { useLocalStorage } from '../components/LocalStorage/LocalStorage';

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

const FavPage = () => {
    const [favorites, setFavorites] = useLocalStorage('fav', []) as [Girl[], React.Dispatch<React.SetStateAction<Girl[]>>];

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-4 text-gray-500 dark:text-white">Favoritas</h1>
            <div className="min-h-screen flex flex-col">
                <main className="flex-grow p-4">
                    <div className="text-gray-600 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {favorites.map((girl: Girl) => (
                            <div key={girl.id} className="group-image p-4 rounded-lg">
                                <a href={`/girl/${girl.id}`}>
                                    <figure className="mb-4">
                                        <img
                                            src={girl.photo[0]}
                                            alt={girl.name}
                                            className="w-full h-auto rounded-lg w-[300px] sm:w-[450px] h-[200px] sm:h-[250px]"
                                        />
                                    </figure>
                                </a>
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{girl.name}</h2>
                                    <p className="text-lg mb-2">{girl.price}</p>
                                    <p className="text-sm">{girl.services.join(", ")}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FavPage;