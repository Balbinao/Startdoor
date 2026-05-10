import { CompanyRecommendationCard } from '@components/ui/CompanyRecommendationCard';
import { PageTitle } from '@components/ui/PageTitle';
import { MESSAGES_LOADING } from '@constants';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudentFavorite } from '@hooks/useStudentFavorite';
import type { ICompanyRecommendation } from '@models/statisticsRecommendation.types';
import { useEffect, useState } from 'react';

export const CompanyRecommendation = () => {
  const { getFavorites, toggleFavorite } = useStudentFavorite();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const [initialLoading, setInitialLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [favorites, setFavorites] = useState<{ id: number }[]>([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
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

    fetchFavorites();
  }, []);

  const companyRecommendationsMock: ICompanyRecommendation[] = [
    {
      id: 1,
      nomeFantasia: 'TechNova Solutions',
      estadoSede: 'SP',
      dataFundacao: '2015-03-20',
      biografia:
        'Empresa focada em soluções inovadoras de tecnologia e transformação digital.',
      mediaGeral: 4.5,
      porcentagemCompatibilidade: 92,
    },
    {
      id: 2,
      nomeFantasia: 'GreenFuture Energia',
      estadoSede: 'MG',
      dataFundacao: '2010-08-12',
      biografia: 'Especializada em energia renovável e sustentabilidade.',
      mediaGeral: 4.2,
      porcentagemCompatibilidade: 85,
    },
    {
      id: 3,
      nomeFantasia: 'HealthPlus Clínica',
      estadoSede: 'RJ',
      dataFundacao: null,
      biografia: 'Rede de clínicas voltadas ao bem-estar e saúde preventiva.',
      mediaGeral: 4.0,
      porcentagemCompatibilidade: 78,
    },
    {
      id: 9,
      nomeFantasia: 'EduTech Brasil',
      estadoSede: 'PR',
      dataFundacao: '2018-01-05',
      biografia:
        'Plataforma educacional com foco em ensino digital e acessível.',
      mediaGeral: 4.7,
      porcentagemCompatibilidade: 95,
    },
  ];

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
    <div className="flex flex-col gap-12 text-(--grey-200)">
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

      <div className="flex flex-col gap-8">
        {companyRecommendationsMock.map(item => {
          return (
            <CompanyRecommendationCard
              key={item.id}
              recommendation={item}
              isFavorite={favorites.some(favorite => favorite.id === item.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          );
        })}
      </div>
    </div>
  );
};
