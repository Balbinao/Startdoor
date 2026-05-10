import { Filter } from '@assets/icons';
import { FormField } from '@components/layout/FormField/FormField';
import { CompanyStatisticsCard } from '@components/ui/CompanyStatisticsCard';
import { CompanyStatisticsChart } from '@components/ui/CompanyStatisticsChart';
import { PageTitle } from '@components/ui/PageTitle';
import { StrongWeakPointTable } from '@components/ui/StrongWeakPointTable';
import { TitleDivisor } from '@components/ui/TitleDivisor';
import { MESSAGES_LOADING } from '@constants';
import { useStore } from '@contexts/store/useStore';
import { useAuth } from '@hooks/useAuth';
import { useCompany } from '@hooks/useCompany';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStatisticRecommendation } from '@hooks/useStatisticRecommendation';
import { useStudent } from '@hooks/useStudent';
import type { ICompany } from '@models/companyData.types';
import type { IStrongWeakPoint } from '@models/statisticRecommendation.types';
import { useEffect, useState } from 'react';

export const StatisticsAnalysis = () => {
  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();
  const { companiesOptions, getCompanies, getCompany } = useCompany();
  const { conditinalScore, getConditionalScore } = useStudent();
  const { getStrongWeakPoints } = useStatisticRecommendation();
  const { getUserId } = useAuth();

  const { companyStore } = useStore();

  const [isLoading, setIsLoading] = useState(true);

  const [firstCompany, setFirstCompany] = useState<ICompany | null>(
    companyStore.getStatisticsFirstCompany,
  );
  const [firstCompanyStrongWeakPoints, setFirstCompanyStrongWeakPoints] =
    useState<IStrongWeakPoint | null>(null);

  const [secondCompany, setSecondCompany] = useState<ICompany | null>(
    companyStore.getStatisticsSecondCompany,
  );
  const [secondCompanyStrongWeakPoints, setSecondCompanyStrongWeakPoints] =
    useState<IStrongWeakPoint | null>(null);

  const userId = getUserId();

  const canLoadStrongWeakPoints =
    conditinalScore &&
    Object.values(conditinalScore).every(
      value => value !== 0 && value !== undefined && value !== null,
    );

  const firstCompanyHasValidMedias =
    firstCompany?.medias &&
    Object.values(firstCompany.medias).every(
      value => value !== 0 && value !== undefined && value !== null,
    );

  const secondCompanyHasValidMedias =
    secondCompany?.medias &&
    Object.values(secondCompany.medias).every(
      value => value !== 0 && value !== undefined && value !== null,
    );

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setIsLoading(true);

        await modalLoadingAuto(() => getCompanies(), MESSAGES_LOADING.GET);

        await modalLoadingAuto(
          () => getConditionalScore(Number(userId)),
          MESSAGES_LOADING.GET,
        );
      } catch (error) {
        await modalMessageError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchStrongWeakPoints = async () => {
      try {
        if (
          canLoadStrongWeakPoints &&
          firstCompany &&
          firstCompanyHasValidMedias
        ) {
          const strongWeakPoints = await modalLoadingAuto(
            () => getStrongWeakPoints(firstCompany.id),
            MESSAGES_LOADING.GET,
          );

          setFirstCompanyStrongWeakPoints(strongWeakPoints);
        }

        if (
          canLoadStrongWeakPoints &&
          secondCompany &&
          secondCompanyHasValidMedias
        ) {
          const strongWeakPoints = await modalLoadingAuto(
            () => getStrongWeakPoints(secondCompany.id),
            MESSAGES_LOADING.GET,
          );

          setSecondCompanyStrongWeakPoints(strongWeakPoints);
        }
      } catch (error) {
        await modalMessageError(error);
      }
    };

    fetchStrongWeakPoints();
  }, [
    canLoadStrongWeakPoints,
    firstCompany,
    firstCompanyHasValidMedias,
    secondCompany,
    secondCompanyHasValidMedias,
  ]);

  const modalMessage = (
    <div className="flex flex-col gap-12 leading-8 text-(--grey-200)">
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-medium">Critérios avaliados</h1>
        <p>
          Cada empresa é analisada com base em critérios importantes para sua
          experiência de estágio, considerando{' '}
          <span className="font-medium text-(--purple-100)">
            qualidade, desenvolvimento e bem-estar
          </span>
          .
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Ambiente, Cultura e Liderança</h2>
        <p>
          Avaliam o{' '}
          <span className="font-medium text-(--purple-100)">
            clima de trabalho, valores da empresa e suporte da liderança
          </span>
          . Um contexto saudável aumenta motivação e produtividade, enquanto
          problemas nesses pontos geram estresse e desmotivação.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Aprendizado e Feedback</h2>
        <p>
          Medem o quanto você evolui com{' '}
          <span className="font-medium text-(--purple-100)">
            novas experiências e retornos sobre seu desempenho
          </span>
          . Um bom desenvolvimento acelera sua carreira, enquanto a ausência
          disso limita o crescimento.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">
          Benefícios, Remuneração e Efetivação
        </h2>
        <p>
          Consideram{' '}
          <span className="font-medium text-(--purple-100)">
            compensação financeira, benefícios e oportunidades futuras
          </span>
          . Boas condições trazem segurança e motivação, enquanto a falta delas
          pode gerar insatisfação.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">
          Infraestrutura, Integração e Rotina
        </h2>
        <p>
          Avaliam a{' '}
          <span className="font-medium text-(--purple-100)">
            estrutura de trabalho, adaptação e organização das atividades
          </span>
          . Um ambiente bem estruturado facilita o desempenho, enquanto falhas
          dificultam a adaptação e produtividade.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Processo Seletivo</h2>
        <p>
          Analisa a{' '}
          <span className="font-medium text-(--purple-100)">
            clareza e organização das entrevistas
          </span>
          . Processos bem conduzidos geram confiança, enquanto experiências
          ruins causam frustração e insegurança.
        </p>
      </div>
    </div>
  );

  const handleSelectCompany = async (
    value: string | number,
    setCompany: (company: ICompany | null) => void,
    storeCompany: (company: ICompany | null) => void,
    setStrongWeakPoints: (strongWeakPoints: IStrongWeakPoint | null) => void,
  ) => {
    if (!value) {
      setCompany(null);
      storeCompany(null);
      setStrongWeakPoints(null);
      return;
    }

    try {
      const company = await modalLoadingAuto(
        () => getCompany(Number(value)),
        MESSAGES_LOADING.GET,
      );

      setCompany(company);
      storeCompany(company);

      const companyHasValidMedias =
        company.medias &&
        Object.values(company.medias).every(
          value => value !== 0 && value !== undefined && value !== null,
        );

      if (canLoadStrongWeakPoints && companyHasValidMedias) {
        const strongWeakPoints = await modalLoadingAuto(
          () => getStrongWeakPoints(company.id),
          MESSAGES_LOADING.GET,
        );

        setStrongWeakPoints(strongWeakPoints);
      } else {
        setStrongWeakPoints(null);
      }
    } catch (error) {
      await modalMessageError(error);
    }
  };

  if (isLoading) return null;

  return (
    <div className="flex min-h-full flex-1 flex-col gap-22">
      <PageTitle title="Análise de Estatísticas" modalMessage={modalMessage} />

      <div className="flex flex-wrap gap-4">
        <div className="min-w-3xs flex-1">
          <FormField
            type="select"
            name="firstCompany"
            options={companiesOptions}
            value={firstCompany?.id}
            onChange={(value: string | number) => {
              handleSelectCompany(
                value,
                setFirstCompany,
                companyStore.setStatisticsFirstCompany,
                setFirstCompanyStrongWeakPoints,
              );
            }}
            iconLeft={<Filter className="text-(--grey-300)" width={20} />}
          />
        </div>

        <div className="min-w-3xs flex-1">
          <FormField
            type="select"
            name="secondCompany"
            options={companiesOptions}
            value={secondCompany?.id}
            onChange={(value: string | number) => {
              handleSelectCompany(
                value,
                setSecondCompany,
                companyStore.setStatisticsSecondCompany,
                setSecondCompanyStrongWeakPoints,
              );
            }}
            iconLeft={<Filter className="text-(--grey-300)" width={20} />}
          />
        </div>
      </div>

      {(firstCompany || secondCompany) && (
        <div className="flex flex-col gap-6">
          <TitleDivisor title="Detalhes das Empresas" />
          {firstCompany && <CompanyStatisticsCard company={firstCompany} />}
          {secondCompany && <CompanyStatisticsCard company={secondCompany} />}
        </div>
      )}

      {(firstCompany || secondCompany) && (
        <div className="flex flex-col gap-6">
          <TitleDivisor title="Pontos Fortes e Fracos" />
          <div className="flex flex-wrap justify-center gap-2">
            <div
              className={`flex flex-1 flex-wrap gap-2 ${
                firstCompany && secondCompany
                  ? 'justify-center lg:justify-between'
                  : 'justify-center'
              }`}
            >
              {!canLoadStrongWeakPoints && (
                <div className="flex flex-1 justify-center">
                  <span className="block w-96 text-center text-sm font-normal text-(--grey-500)">
                    Para visualizar esta estatística, por favor defina todas as
                    notas condicionais em seu perfil...
                  </span>
                </div>
              )}
              {firstCompany && canLoadStrongWeakPoints && (
                <div className="flex flex-col items-center gap-3">
                  <h3 className="text-xl font-medium text-(--grey-300)">
                    {firstCompany.nomeFantasia}
                  </h3>
                  {!firstCompanyHasValidMedias && (
                    <div className="w-82 text-center text-sm font-normal text-(--grey-500)">
                      <span>
                        Esta empresa não possui informações suficientes para
                        gerar os pontos fortes e fracos...
                      </span>
                    </div>
                  )}

                  {firstCompanyStrongWeakPoints &&
                    firstCompanyHasValidMedias && (
                      <StrongWeakPointTable
                        item={firstCompanyStrongWeakPoints}
                      />
                    )}
                </div>
              )}
              {secondCompany && canLoadStrongWeakPoints && (
                <div className="flex flex-col items-center gap-3">
                  <h3 className="text-xl font-medium text-(--grey-300)">
                    {secondCompany.nomeFantasia}
                  </h3>
                  {!secondCompanyHasValidMedias && (
                    <div className="w-82 text-center text-sm font-normal text-(--grey-500)">
                      <span>
                        Esta empresa não possui informações suficientes para
                        gerar os pontos fortes e fracos...
                      </span>
                    </div>
                  )}
                  {secondCompanyStrongWeakPoints &&
                    secondCompanyHasValidMedias && (
                      <StrongWeakPointTable
                        item={secondCompanyStrongWeakPoints}
                      />
                    )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {(firstCompany || secondCompany) && (
        <div className="flex flex-col gap-6">
          <TitleDivisor title="Gráfico de Competências" />
          <CompanyStatisticsChart
            firstCompany={firstCompany}
            secondCompany={secondCompany}
            studentConditionalScore={conditinalScore}
          />
        </div>
      )}
    </div>
  );
};
