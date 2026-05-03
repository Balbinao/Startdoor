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
import { useStudent } from '@hooks/useStudent';
import type { ICompany } from '@models/companyData.types';
import type { IStrongWeakPointTable } from '@models/statisticsRecommendation.types';
import { useEffect, useState } from 'react';

export const StatisticsAnalysis = () => {
  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();
  const { companiesOptions, getCompanies, getCompany } = useCompany();
  const { conditinalScore, getConditionalScore } = useStudent();
  const { getUserId } = useAuth();

  const { companyStore } = useStore();

  const [isLoading, setIsLoading] = useState(true);

  const [firstCompany, setFirstCompany] = useState<ICompany | null>(
    companyStore.getStatisticsFirstCompany,
  );
  const [secondCompany, setSecondCompany] = useState<ICompany | null>(
    companyStore.getStatisticsSecondCompany,
  );

  const userId = getUserId();

  const strongWeakPointTable: IStrongWeakPointTable = {
    pontosFortes: [
      {
        titulo: 'Aprendizado',
        porcentagem: 92,
        estudanteNota: 5,
        empresaNota: 4.2,
      },
      {
        titulo: 'Educação',
        porcentagem: 86,
        estudanteNota: 5,
        empresaNota: 4.6,
      },
      {
        titulo: 'Benefícios',
        porcentagem: 81,
        estudanteNota: 4,
        empresaNota: 4.5,
      },
    ],
    pontosFracos: [
      {
        titulo: 'Efetivação',
        porcentagem: 25,
        estudanteNota: 5,
        empresaNota: 1.25,
      },
      {
        titulo: 'Entrevista',
        porcentagem: 34,
        estudanteNota: 5,
        empresaNota: 2.4,
      },
      {
        titulo: 'Liderança',
        porcentagem: 36,
        estudanteNota: 5,
        empresaNota: 2.6,
      },
    ],
  };

  useEffect(() => {
    const fetchCompanies = async () => {
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

    fetchCompanies();
  }, []);

  const handleSelectCompany = async (
    value: string | number,
    setter: (company: ICompany | null) => void,
    store: (company: ICompany) => void,
  ) => {
    if (!value) {
      setter(null);
      return;
    }

    try {
      const company = await modalLoadingAuto(
        () => getCompany(Number(value)),
        MESSAGES_LOADING.GET,
      );
      setter(company);
      store(company);
    } catch (error) {
      await modalMessageError(error);
    }
  };

  if (isLoading) return null;

  return (
    <div className="flex min-h-full flex-1 flex-col gap-22">
      <PageTitle title="Análise de Estatísticas" />

      <div className="flex gap-4">
        <div className="w-full">
          <FormField
            type="select"
            name="firstCompany"
            options={companiesOptions}
            value={firstCompany?.id}
            onChange={value =>
              handleSelectCompany(
                value,
                setFirstCompany,
                companyStore.setStatisticsFirstCompany,
              )
            }
            iconLeft={<Filter className="text-(--grey-300)" width={20} />}
          />
        </div>

        <div className="w-full">
          <FormField
            type="select"
            name="secondCompany"
            options={companiesOptions}
            value={secondCompany?.id}
            onChange={value =>
              handleSelectCompany(
                value,
                setSecondCompany,
                companyStore.setStatisticsSecondCompany,
              )
            }
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
            {firstCompany && (
              <div className="flex flex-col items-center gap-3">
                <h3 className="text-xl font-medium text-(--grey-300)">
                  {firstCompany.nomeFantasia}
                </h3>
                <StrongWeakPointTable item={strongWeakPointTable} />
              </div>
            )}
            {secondCompany && (
              <div className="flex flex-col items-center gap-3">
                <h3 className="text-xl font-medium text-(--grey-300)">
                  {secondCompany.nomeFantasia}
                </h3>
                <StrongWeakPointTable item={strongWeakPointTable} />
              </div>
            )}
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
