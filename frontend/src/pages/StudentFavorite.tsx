import { Star } from '@assets/icons';
import { CompanyCard } from '@components/ui/CompanyCard';
import { ROUTES_CONST, USER_ROLES_CONST } from '@constants';
import { useStudentFavorite } from '@hooks/useStudentFavorite';
import { useAuth } from '@hooks/useAuth';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

const FavoriteCardList = observer(() => {
  const { favorites, isFavorite, toggleFavorite, loadFavorites } = useStudentFavorite();

  useEffect(() => {
    loadFavorites();
  }, [loadFavorites]);

  return (
    <>
      <div className="flex items-center justify-between">
        <span className="text-sm text-(--grey-400)">
          {favorites.length}{' '}
          {favorites.length === 1 ? 'empresa favorita' : 'empresas favoritas'}
        </span>
      </div>

      <div className="min-h-[200px] flex flex-col justify-center">
        {favorites.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <Star width={48} height={48} className="text-(--grey-500)" strokeWidth={1} />
            <p className="text-(--grey-400)">
              Nenhuma empresa favorita encontrada.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {favorites.map(company => (
              <CompanyCard
                key={company.id}
                item={company}
                isFavorite={isFavorite(company.id)}
                onFavoriteClick={() => toggleFavorite(company)}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
});

export const StudentFavorite = observer(() => {
  const { getUserRole } = useAuth();
  const { modalMessageError } = useModalMessageDefault();
  const navigate = useNavigate();
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    const role = getUserRole();
    if (role !== USER_ROLES_CONST.ESTUDANTE) {
      modalMessageError({
        message: 'Apenas estudantes podem acessar esta página.',
        status: 403,
      });
      navigate(ROUTES_CONST.SEARCH, { replace: true });
    }
    setIsFirstLoad(false);
  }, [getUserRole, modalMessageError, navigate]);

  if (isFirstLoad) {
    return (
      <div className="flex w-full flex-col gap-6">
        <div className="flex w-full mb-4 h-20 rounded-xl items-center justify-center bg-(--grey-1100)">
          <h1 className="text-2xl font-semibold text-(--grey-300)">Empresas Favoritas</h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <span className="text-(--grey-300)">Carregando...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex w-full mb-4 h-20 rounded-xl items-center justify-center bg-(--grey-1100)">
        <h1 className="text-2xl font-semibold text-(--grey-300)">Empresas Favoritas</h1>
      </div>

      <FavoriteCardList />
    </div>
  );
});