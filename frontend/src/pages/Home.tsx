import { Building, Pencil, PencilFilled } from '@assets/icons';
import { ButtonSquare } from '@components/ui/ButtonSquare';
import { CompanyCard } from '@components/ui/CompanyCard';
import { PageTitle } from '@components/ui/PageTitle';
import { ReviewCard } from '@components/ui/ReviewCard';
import { MESSAGES_LOADING, ROUTES_CONST, USER_ROLES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useReview } from '@hooks/useReview';
import { useStudentFavorite } from '@hooks/useStudentFavorite';
import type { ICompanyTopRated } from '@models/companyData.types';
import type { IReview } from '@models/review.types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const { getUserId, getUserRole } = useAuth();
  const { getCompanyTopRated } = useCompany();
  const { getReviewsLatest } = useReview();
  const { getFavorites, toggleFavorite } = useStudentFavorite();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const [initialLoading, setInitialLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [companies, setCompanies] = useState<ICompanyTopRated[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [favorites, setFavorites] = useState<{ id: number }[]>([]);

  const id = getUserId();
  const isCompany = getUserRole() === USER_ROLES_CONST.EMPRESA;

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const companiesTopRated = await modalLoadingAuto(
          () => getCompanyTopRated(),
          MESSAGES_LOADING.GET,
        );
        setCompanies(companiesTopRated);

        const reviewsLatest = await modalLoadingAuto(
          () => getReviewsLatest(),
          MESSAGES_LOADING.GET,
        );
        setReviews(reviewsLatest);

        if (!isCompany) {
          const favorites = await modalLoadingAuto(
            () => getFavorites(),
            MESSAGES_LOADING.GET,
          );
          setFavorites(favorites.map(item => ({ id: item.id })));
        }
      } catch (error) {
        setIsError(true);
        await modalMessageError(error);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitial();
  }, []);

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

  if (initialLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex min-h-full w-full flex-col gap-16">
      <PageTitle title="Home" />

      {!isCompany && (
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl font-bold text-(--purple-300)">
            Conte como é trabalhar na sua empresa
          </h1>
          <span className="text-lg text-(--grey-300)">
            Sua experiência pode ajudar milhares de profissionais.
          </span>

          <ButtonSquare
            text="Compartilhar Experiência"
            iconLeft={<PencilFilled />}
            onClick={() => {
              if (!id) return;
              navigate(ROUTES_CONST.REVIEW.REVIEW_CREATE(Number(id)));
            }}
          />
        </div>
      )}

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-normal text-white">Avaliações recentes</h2>
        <div className="flex flex-1 flex-col gap-6">
          {reviews.map(item => (
            <ReviewCard key={item.id} item={item} source="EMPRESA" />
          ))}

          {reviews.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10">
              <Pencil
                width={48}
                height={48}
                className="text-(--grey-800)"
                strokeWidth={1}
              />
              <p className="text-(--grey-500)">
                Nenhuma avaliação feita recentemente.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-normal text-white">Melhores empresas</h2>
        <div className="flex flex-1 flex-col gap-6">
          {companies.map(company => (
            <CompanyCard
              key={company.id}
              item={company}
              isFavorite={favorites.some(item => item.id === company.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}

          {companies.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 py-10">
              <Building
                width={48}
                height={48}
                className="text-(--grey-800)"
                strokeWidth={1}
              />
              <p className="text-(--grey-500)">
                Nenhuma empresa com nota média encontrada.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
