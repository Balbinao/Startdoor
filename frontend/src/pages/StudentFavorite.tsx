import { Star } from '@assets/icons';
import { CompanyCard } from '@components/ui/CompanyCard';
import { PageTitle } from '@components/ui/PageTitle';
import {
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  USER_ROLES_CONST,
} from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudentFavorite } from '@hooks/useStudentFavorite';
import type { ICompanySearchItem } from '@models/companySearchData.types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const StudentFavorite = () => {
  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError, modalMessageSafe } = useModalMessageDefault();

  const { getUserRole } = useAuth();
  const { getFavorites, toggleFavorite } = useStudentFavorite();

  const [favorites, setFavorites] = useState<ICompanySearchItem[]>([]);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const isCompany = getUserRole() === USER_ROLES_CONST.EMPRESA;

  useEffect(() => {
    if (isCompany) {
      setIsError(true);
      const handleAccessDenied = async () => {
        await modalMessageSafe({
          type: 'success',
          message: MESSAGES_RESPONSE.ERROR.NO_ACCESS,
          shouldBlockProcess: false,
        });
        navigate('/');
      };

      handleAccessDenied();
    }
  }, [isCompany, navigate, modalMessageSafe]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const favorites = await modalLoadingAuto(
          () => getFavorites(),
          MESSAGES_LOADING.GET,
        );
        setFavorites(favorites);
      } catch (error) {
        setIsError(true);
        await modalMessageError(error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetch();
  }, []);

  const isFavorite = (companyId: number) => {
    return favorites.some(item => item.id === companyId);
  };

  const handleToggleFavorite = async (companyId: number) => {
    try {
      await modalLoadingAuto(
        () => toggleFavorite(companyId),
        MESSAGES_LOADING.UPDATE,
      );
      const favorites = await modalLoadingAuto(
        () => getFavorites(),
        MESSAGES_LOADING.GET,
      );
      setFavorites(favorites);
    } catch (error) {
      await modalMessageError(error);
    }
  };

  if (initialLoading) return null;
  if (isError) return null;

  return (
    <div className="flex min-h-full w-full flex-col gap-6">
      <PageTitle title="Empresas Favoritas" />

      <div className="flex flex-1 flex-col gap-4">
        <span className="text-sm text-(--grey-400)">
          {favorites.length}{' '}
          {favorites.length === 1 ? 'empresa favorita' : 'empresas favoritas'}
        </span>
        <div className="flex flex-1 flex-col justify-center">
          {favorites.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-4">
              <Star
                width={48}
                height={48}
                className="text-(--grey-500)"
                strokeWidth={1}
              />
              <p className="text-(--grey-400)">
                Nenhuma empresa favorita encontrada.
              </p>
            </div>
          ) : (
            <div className="flex flex-1 flex-col gap-4">
              {favorites.map(company => (
                <CompanyCard
                  key={company.id}
                  item={company}
                  isFavorite={isFavorite(company.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
