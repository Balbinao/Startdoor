import { PencilFilled, StarFilled } from '@assets/icons';
import { ReviewCard } from '@components/ui/ReviewCard';


export const Home = () => {


  return (
     <div className="flex w-full flex-col gap-6">
      <div className="flex w-full mb-4 h-20 rounded-xl items-center justify-center bg-(--grey-1100)">
        <h1 className="text-2xl font-semibold text-(--grey-300)">Home</h1>
      </div>
      <h1 className='text-5xl font-semibold text-(--purple-300)'>Conte como é trabalhar na sua empresa</h1>
      <span className="text-lg  text-(--grey-300)">
          Sua experiência pode ajudar milhares de profissionais.
        </span>

        <button className="flex w-fit items-center gap-2 rounded-lg border border-(--primary) px-4 py-2 text-sm text-(--purple-300) hover:bg-(--primary)/10 transition">
          <PencilFilled width={16} height={16} />
          Compartilhar experiência
        </button>
         <h2 className="text-2xl font-semibold text-white">
          Avaliações recentes
        </h2>
      </div>
      
    
  );
};
