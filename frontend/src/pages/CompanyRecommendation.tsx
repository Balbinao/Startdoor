import { CompanyRecommendationCard } from '@components/ui/CompanyRecommendationCard';
import { PageTitle } from '@components/ui/PageTitle';
import { MESSAGES_LOADING, MESSAGES_RESPONSE } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStatisticRecommendation } from '@hooks/useStatisticRecommendation';
import { useStudent } from '@hooks/useStudent';
import { useStudentFavorite } from '@hooks/useStudentFavorite';
import type { ICompanyRecommendation } from '@models/statisticRecommendation.types';
import { useEffect, useState } from 'react';

export const CompanyRecommendation = () => {
  const { getCompanyRecommendations } = useStatisticRecommendation();
  const { getFavorites, toggleFavorite } = useStudentFavorite();
  const { conditinalScore, getConditionalScore } = useStudent();

  const { getUserId } = useAuth();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const [initialLoading, setInitialLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [recommendedCompanies, setRecommendedCompanies] = useState<
    ICompanyRecommendation[]
  >([]);
  const [favorites, setFavorites] = useState<{ id: number }[]>([]);

  const userId = getUserId();

  const canLoadRecommendedCompanies =
    conditinalScore &&
    Object.values(conditinalScore).every(
      value => value !== 0 && value !== undefined && value !== null,
    );

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!userId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }

        await modalLoadingAuto(
          () => getConditionalScore(Number(userId)),
          MESSAGES_LOADING.GET,
        );

        const favorites = await modalLoadingAuto(
          () => getFavorites(),
          MESSAGES_LOADING.GET,
        );
        setFavorites(favorites.map(item => ({ id: item.id })));
      } catch (error) {
        setIsError(true);
        await modalMessageError(error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!canLoadRecommendedCompanies) return;

        const response = await modalLoadingAuto(
          () => getCompanyRecommendations(),
          MESSAGES_LOADING.GET,
        );
        setRecommendedCompanies(response);
      } catch (error) {
        await modalMessageError(error);
      }
    };

    fetch();
  }, [canLoadRecommendedCompanies]);

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

  const modalMessage = (
    <div className="flex flex-col gap-12 leading-8 text-(--grey-200)">
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-medium">Sistema de recomendação</h1>
        <p>
          O sistema sugere{' '}
          <span className="font-medium text-(--purple-100)">
            empresas compatíveis
          </span>{' '}
          com base no que você valoriza em um estágio.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Como funciona</h2>
        <p>
          Cada empresa tem notas em critérios como{' '}
          <span className="font-medium text-(--purple-100)">
            remuneração, benefícios e aprendizado
          </span>
          . Você define o nível mínimo esperado para cada critério.
        </p>
        <p>
          A compatibilidade é calculada comparando sua expectativa com a nota da
          empresa:{' '}
          <span className="font-medium text-(--purple-100)">
            Nota da empresa ÷ sua expectativa
          </span>
          .
        </p>
        <p>
          Exemplo: se você quer 10 e a empresa tem 8, o resultado é 80%. Se
          igualar ou superar, conta como 100%.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Compatibilidade geral</h2>
        <p>
          O sistema faz a{' '}
          <span className="font-medium text-(--purple-100)">
            média dos percentuais
          </span>{' '}
          de todos os critérios para gerar um score final.
        </p>
        <p>
          Exemplo:{' '}
          <span className="font-medium text-(--purple-100)">
            (80% + 70% + 90%) ÷ 3 = 80%
          </span>
          .
        </p>
      </div>
    </div>
  );

  if (initialLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex min-h-full flex-1 flex-col gap-22">
      <PageTitle title="Recomendação de Empresas" modalMessage={modalMessage} />

      <div className="flex flex-1 flex-col gap-8">
        {!canLoadRecommendedCompanies && (
          <div className="mb-32 flex flex-1 items-center justify-center">
            <span className="block w-96 text-center font-normal text-(--grey-500)">
              Para visualizar as recomendações, por favor defina todas as notas
              condicionais em seu perfil...
            </span>
          </div>
        )}

        {userId &&
          canLoadRecommendedCompanies &&
          recommendedCompanies.map(item => {
            return (
              <CompanyRecommendationCard
                key={item.id}
                recommendation={item}
                studentId={userId}
                isFavorite={favorites.some(favorite => favorite.id === item.id)}
                onToggleFavorite={handleToggleFavorite}
              />
            );
          })}
      </div>
    </div>
  );
};
