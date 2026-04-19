import {
  Building,
  Category,
  Flag,
  Focus,
  Hourglass,
  Pin,
  Plus,
} from '@assets/icons';
import { FormField } from '@components/layout/FormField/FormField';
import { AcademicExperienceCard } from '@components/ui/AcademicExperienceCard';
import { ButtonSquare } from '@components/ui/ButtonSquare';
import { ProfessionalExperienceCard } from '@components/ui/ProfessionalExperienceCard';
import { ReviewCard } from '@components/ui/ReviewCard';
import { UserAttribute } from '@components/ui/UserAttribute/UserAttribute';
import { UserBanner } from '@components/ui/UserBanner';
import {
  DROPDOWN_VALUES_CONST,
  MESSAGES_LOADING,
  MESSAGES_RESPONSE,
  ROUTES_CONST,
} from '@constants';
import { useCompany } from '@hooks/useCompany';
import { useExperience } from '@hooks/useExperience';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useReview } from '@hooks/useReview';
import { useSector } from '@hooks/useSector';
import { useStudent } from '@hooks/useStudent';
import type { IStudent } from '@models/studentData.types';
import { formatDateWithAge } from '@utils/formatData';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const ICON_SIZE = 44;
const STROKE_WIDTH = 1.5;

export const StudentProfile = () => {
  const { id: urlUserId } = useParams<{ id: string }>();

  const navigate = useNavigate();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const {
    academicExperienceCards,
    professionalExperienceCards,
    getAcademicExperienceCards,
    getProfessionalExperienceCards,
  } = useExperience();

  const { sectorsItems, getSectors } = useSector();
  const { reviewCards, getReviewCardsStudent } = useReview();
  const { getCompanies } = useCompany();
  const { getStudent } = useStudent();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const [searchedStudent, setSearchedStudent] = useState<IStudent | null>(null);

  const hasStudentInfo =
    searchedStudent &&
    (searchedStudent.paisOrigem ||
      searchedStudent.dataNascimento ||
      searchedStudent.modeloTrabalho ||
      searchedStudent.estadoAtuacao ||
      searchedStudent.setorInteresse ||
      searchedStudent.habilidadesPrincipais);

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        if (!urlUserId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }

        await modalLoadingAuto(
          async () => setSearchedStudent(await getStudent(Number(urlUserId))),
          MESSAGES_LOADING.GET,
        );
        await modalLoadingAuto(
          () => getAcademicExperienceCards(Number(urlUserId)),
          MESSAGES_LOADING.GET,
        );
        await modalLoadingAuto(
          () => getProfessionalExperienceCards(Number(urlUserId)),
          MESSAGES_LOADING.GET,
        );
        await modalLoadingAuto(() => getCompanies(), MESSAGES_LOADING.GET);
        await modalLoadingAuto(() => getSectors(), MESSAGES_LOADING.GET);
        await modalLoadingAuto(
          () => getReviewCardsStudent(Number(urlUserId)),
          MESSAGES_LOADING.GET,
        );
        setIsError(false);
      } catch (error: unknown) {
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetch();
  }, []);

  if (isLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex h-full flex-col items-center gap-32">
      <UserBanner type="ESTUDANTE" id={Number(urlUserId)} />
      {hasStudentInfo && (
        <div className="flex w-full max-w-3xl flex-col gap-8">
          {searchedStudent.biografia && (
            <span className="line-clamp-6 leading-7 text-(--grey-200)">
              {searchedStudent.biografia}
            </span>
          )}

          <div className="flex flex-col gap-3">
            <div className="flex w-full flex-col gap-3 sm:flex-row">
              {searchedStudent?.paisOrigem && (
                <UserAttribute
                  icon={
                    <Flag
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      strokeWidth={STROKE_WIDTH}
                    />
                  }
                  title="Pais de Origem"
                  value={searchedStudent.paisOrigem}
                />
              )}

              {searchedStudent?.estadoAtuacao && (
                <UserAttribute
                  icon={
                    <Pin
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      strokeWidth={STROKE_WIDTH}
                    />
                  }
                  title="Estado de Atuação"
                  value={searchedStudent.estadoAtuacao}
                />
              )}
            </div>

            <div className="flex w-full flex-col gap-3 sm:flex-row">
              {searchedStudent?.dataNascimento && (
                <UserAttribute
                  icon={
                    <Hourglass
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      strokeWidth={STROKE_WIDTH}
                    />
                  }
                  title="Data de Nascimento"
                  value={formatDateWithAge(searchedStudent.dataNascimento)}
                />
              )}

              {searchedStudent?.modeloTrabalho && (
                <UserAttribute
                  icon={
                    <Building
                      width={ICON_SIZE}
                      height={ICON_SIZE}
                      strokeWidth={STROKE_WIDTH}
                    />
                  }
                  title="Modelo de Trabalho"
                  value={searchedStudent.modeloTrabalho}
                />
              )}
            </div>

            {searchedStudent?.setorInteresse && (
              <UserAttribute
                icon={
                  <Focus
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    strokeWidth={STROKE_WIDTH}
                  />
                }
                title="Setor de Interesse"
                value={
                  sectorsItems.find(
                    item =>
                      item.value === Number(searchedStudent.setorInteresse),
                  )?.label ?? ''
                }
              />
            )}

            {searchedStudent?.habilidadesPrincipais && (
              <UserAttribute
                icon={
                  <Category
                    width={ICON_SIZE}
                    height={ICON_SIZE}
                    strokeWidth={STROKE_WIDTH}
                  />
                }
                title="Habilidades Principais"
                value={searchedStudent.habilidadesPrincipais}
              />
            )}
          </div>
        </div>
      )}
      {academicExperienceCards.length > 0 && (
        <div className="flex w-full justify-center">
          <div className="flex w-full flex-col gap-6">
            <h2 className="text-2xl font-semibold">Experiência Acadêmica</h2>
            {academicExperienceCards.map(item => (
              <AcademicExperienceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      {professionalExperienceCards.length > 0 && (
        <div className="flex w-full justify-center">
          <div className="flex w-full flex-col gap-6">
            <h2 className="text-2xl font-semibold">Experiência Profissional</h2>
            {professionalExperienceCards.map(item => (
              <ProfessionalExperienceCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      )}

      <div className="flex w-full flex-col gap-8">
        <div className="flex items-center gap-8">
          <span className="text-lg font-semibold whitespace-nowrap">
            4 Reviews
          </span>

          <div className="flex flex-1 gap-4">
            <span className="flex-1">
              <FormField
                type="select"
                name="sortSetor"
                options={sectorsItems}
              />
            </span>
            <span className="w-56">
              <FormField
                type="select"
                name="sortOrder"
                options={DROPDOWN_VALUES_CONST.REVIEWS_SORT.map(option => ({
                  ...option,
                }))}
                onChange={(selectedValue: string | number) =>
                  console.log(selectedValue)
                }
              />
            </span>
          </div>
        </div>

        <ButtonSquare
          text="CRAR NOVA AVALIAÇÃO"
          iconLeft={<Plus />}
          className="w-full"
          onClick={() => {
            if (!urlUserId) return;
            navigate(ROUTES_CONST.REVIEW.REVIEW_CREATE(Number(urlUserId)));
          }}
        />

        <div className="flex flex-col gap-6">
          {reviewCards.map((item, index) => (
            <ReviewCard key={index} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
