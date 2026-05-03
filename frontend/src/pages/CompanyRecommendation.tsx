import { CompanyRecommendationCard } from '@components/ui/CompanyRecommendationCard';
import { PageTitle } from '@components/ui/PageTitle';
import type { ICompanyRecommendation } from '@models/statisticsRecommendation.types';

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
    biografia: 'Plataforma educacional com foco em ensino digital e acessível.',
    mediaGeral: 4.7,
    porcentagemCompatibilidade: 95,
  },
];

export const CompanyRecommendation = () => {
  return (
    <div className="flex min-h-full flex-1 flex-col gap-22">
      <PageTitle title="Recomendação de Empresas" />

      <div className="flex flex-col gap-8">
        {companyRecommendationsMock.map(item => {
          return (
            <CompanyRecommendationCard key={item.id} recommendation={item} />
          );
        })}
      </div>
    </div>
  );
};
