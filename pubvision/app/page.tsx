import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-gray-100"> {/* Changé pour appliquer un fond gris à toute la page */} {/* Ajouté un en-tête avec un fond gris plus foncé et une ombre pour le contraste */}
        <div className="max-w-5xl mx-auto px-6 flex justify-center"> {/* Centrage du logo */}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-lg font-bold text-gray-700" 
          >

            {/* Si vous avez une image de logo, vous pouvez l'utiliser comme ceci */}
            <Image src="C:\Users\sebas\OneDrive\Bureau\PPE\Projet-PPE-3D-Publicis\pubvision\app\logo.png" alt="PubVision Logo" width={150} height={50} />
          </a>
        </div>

      {/* Contenu principal */}
      <div className="flex-grow flex items-center justify-center p-24">
        {/* Votre contenu ici */}
      </div>

      {/* Bouton au milieu bas du site */}
      <div className="flex justify-center pb-8">
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
          Cliquez ici
        </button>
      </div>
    </main>
  );
}
