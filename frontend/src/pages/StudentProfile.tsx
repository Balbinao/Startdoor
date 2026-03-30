import {
  Building,
  Category,
  Flag,
  Focus,
  Hourglass,
  Pin,
  Star,
} from '@assets/icons';
import { AcademicExperienceCard } from '@components/ui/AcademicExperienceCard';
import { UserAttribute } from '@components/ui/UserAttribute/UserAttribute';
import { UserBanner } from '@components/ui/UserBanner';
import { MESSAGES_LOADING, MESSAGES_RESPONSE } from '@constants';
import { useExperience } from '@hooks/useExperience';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudentRegistrations } from '@hooks/useStudentRegistration';
import type { IStudent } from '@models/studentData.types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ICON_SIZE = 44;
const STROKE_WIDTH = 1.5;

export const StudentProfile = () => {
  const { id: userId } = useParams<{ id: string }>();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const { academicExperienceCards, getAcademicExperienceCards } =
    useExperience();

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(true);

  const [searchedStudent, setSearchedStudent] = useState<IStudent | null>(null);

  const { getStudent } = useStudentRegistrations();

  useEffect(() => {
    const fetch = async () => {
      try {
        setIsLoading(true);

        if (!userId) {
          throw new Error(MESSAGES_RESPONSE.WARNING.USER_ID_NOT_FOUND);
        }

        await modalLoadingAuto(
          async () => setSearchedStudent(await getStudent(Number(userId))),
          MESSAGES_LOADING.GET,
        );
        await modalLoadingAuto(
          () => getAcademicExperienceCards(Number(userId)),
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
      <UserBanner />
      <div className="flex w-full max-w-3xl flex-col gap-3">
        <div className="flex w-full gap-3">
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

          {searchedStudent?.mediaNotaGeral && (
            <UserAttribute
              icon={
                <Star
                  width={ICON_SIZE}
                  height={ICON_SIZE}
                  strokeWidth={STROKE_WIDTH}
                />
              }
              title="Média da Nota Geral"
              value={searchedStudent.mediaNotaGeral}
            />
          )}
        </div>

        <div className="flex w-full gap-3">
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
              value={searchedStudent.dataNascimento}
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
            value={searchedStudent.setorInteresse}
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

      <div className="flex w-full justify-center">
        <div className="flex w-full max-w-xl flex-col gap-6">
          <h2 className="text-2xl font-semibold">Experiência Acadêmica</h2>
          {academicExperienceCards.map(item => (
            <AcademicExperienceCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};
