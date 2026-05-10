import { PencilFilled } from '@assets/icons';
import { ButtonSquare } from '@components/ui/ButtonSquare';
import { CompanyCard } from '@components/ui/CompanyCard';
import { PageTitle } from '@components/ui/PageTitle';
import { ReviewCard } from '@components/ui/ReviewCard';
import { MESSAGES_LOADING, ROUTES_CONST } from '@constants';
import { useAuth } from '@hooks/useAuth';
import { useModalMessageDefault } from '@hooks/useMessageModalDefault';
import { useModalLoadingAuto } from '@hooks/useModalLoadingAuto';
import { useStudentFavorite } from '@hooks/useStudentFavorite';
import type { ICompanySearchItem } from '@models/companySearchData.types';
import type { IReview } from '@models/review.types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();

  const { getUserId } = useAuth();
  const { getFavorites, toggleFavorite } = useStudentFavorite();

  const modalLoadingAuto = useModalLoadingAuto();
  const { modalMessageError } = useModalMessageDefault();

  const [initialLoading, setInitialLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const [favorites, setFavorites] = useState<{ id: number }[]>([]);

  const id = getUserId();

  useEffect(() => {
    const fetchInitial = async () => {
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

  const mock__recentReviews: IReview[] = [
    {
      id: 9,
      estudanteId: 8,
      nomeEstudante: 'Ana Souza',
      fotoUrlEstudante: 'https://picsum.photos/100/100?random=11',
      userEstudante: 'ana.souza',
      empresaId: 1,
      fotoUrlEmpresa: 'https://picsum.photos/100/100?random=21',
      nomeEmpresa: 'TechNova Solutions',
      setorId: 10,
      nomeSetor: 'Tecnologia',
      estadoAtuacao: 'São Paulo',
      modeloTrabalho: 'Híbrido',
      dataInicio: '2024-01-10',
      dataFim: null,
      tituloCargo: 'Desenvolvedora Front-end',
      textoAvaliacao: 'Ótima empresa para aprendizado e crescimento técnico.',
      salarioMin: 4500,
      salarioMax: 6500,
      anonima: false,
      ambiente: 4,
      aprendizado: 5,
      beneficios: 4,
      cultura: 5,
      efetivacao: 4,
      entrevista: 4,
      feedback: 5,
      infraestrutura: 4,
      integracao: 5,
      remuneracao: 4,
      rotina: 4,
      lideranca: 4,
      createdAt: '2024-06-01T10:00:00Z',
      updatedAt: '2024-06-10T12:00:00Z',
    },
    {
      id: 2,
      estudanteId: 102,
      nomeEstudante: 'Carlos Lima',
      fotoUrlEstudante: 'https://picsum.photos/100/100?random=12',
      userEstudante: 'carlos.lima',
      empresaId: 2,
      fotoUrlEmpresa: 'https://picsum.photos/100/100?random=22',
      nomeEmpresa: 'GreenFields Agro',
      setorId: 20,
      nomeSetor: 'Agronegócio',
      estadoAtuacao: 'Minas Gerais',
      modeloTrabalho: 'Presencial',
      dataInicio: '2023-08-01',
      dataFim: '2025-01-01',
      tituloCargo: 'Analista de Dados Agrícolas',
      textoAvaliacao:
        'Ambiente muito estruturado, mas com pouca flexibilidade.',
      salarioMin: 3500,
      salarioMax: 5000,
      anonima: true,
      ambiente: 3,
      aprendizado: 4,
      beneficios: 3,
      cultura: 3,
      efetivacao: 3,
      entrevista: 5,
      feedback: 3,
      infraestrutura: 4,
      integracao: 3,
      remuneracao: 4,
      rotina: 3,
      lideranca: 3,
      createdAt: '2024-02-15T09:30:00Z',
      updatedAt: '2024-03-01T11:00:00Z',
    },
    {
      id: 3,
      estudanteId: 103,
      nomeEstudante: null,
      fotoUrlEstudante: null,
      userEstudante: null,
      empresaId: 3,
      fotoUrlEmpresa: 'https://picsum.photos/100/100?random=23',
      nomeEmpresa: 'InovaBank',
      setorId: 30,
      nomeSetor: 'Financeiro',
      estadoAtuacao: 'Rio de Janeiro',
      modeloTrabalho: 'Remoto',
      dataInicio: '2024-03-01',
      dataFim: null,
      tituloCargo: 'Estagiário de Back-end',
      textoAvaliacao:
        'Processos bem definidos e muita oportunidade de aprendizado.',
      salarioMin: 2000,
      salarioMax: 3000,
      anonima: true,
      ambiente: 5,
      aprendizado: 5,
      beneficios: 4,
      cultura: 5,
      efetivacao: 5,
      entrevista: 4,
      feedback: 5,
      infraestrutura: 5,
      integracao: 5,
      remuneracao: 3,
      rotina: 4,
      lideranca: 5,
      createdAt: '2024-05-20T08:00:00Z',
      updatedAt: '2024-05-25T08:00:00Z',
    },
    {
      id: 4,
      estudanteId: 104,
      nomeEstudante: 'Juliana Martins',
      fotoUrlEstudante: 'https://picsum.photos/100/100?random=14',
      userEstudante: 'juliana.m',
      empresaId: 4,
      fotoUrlEmpresa: 'https://picsum.photos/100/100?random=24',
      nomeEmpresa: 'HealthPlus Care',
      setorId: 40,
      nomeSetor: 'Saúde',
      estadoAtuacao: 'Paraná',
      modeloTrabalho: 'Híbrido',
      dataInicio: '2023-10-10',
      dataFim: null,
      tituloCargo: 'Analista de Produto',
      textoAvaliacao: 'Boa cultura, mas pressão por resultados é alta.',
      salarioMin: 5000,
      salarioMax: 8000,
      anonima: false,
      ambiente: 4,
      aprendizado: 4,
      beneficios: 5,
      cultura: 4,
      efetivacao: 4,
      entrevista: 3,
      feedback: 4,
      infraestrutura: 4,
      integracao: 4,
      remuneracao: 5,
      rotina: 3,
      lideranca: 4,
      createdAt: '2024-01-12T10:00:00Z',
      updatedAt: '2024-02-01T10:00:00Z',
    },
  ];

  const mock__bestCompanies: ICompanySearchItem[] = [
    {
      id: 1,
      nomeFantasia: 'TechNova Solutions',
      paisOrigem: 'Brasil',
      estadoSede: 'SP',
      fotoUrl: 'https://picsum.photos/200/200?random=1',
      biografia:
        'Empresa focada em soluções de software corporativo e inovação digital.',
      areaAtuacao: 'Tecnologia',
      tamanhoEmpresa: 'Média',
      mediaGeral: 4.7,
    },
    {
      id: 2,
      nomeFantasia: 'GreenFields Agro',
      paisOrigem: 'Brasil',
      estadoSede: 'MG',
      fotoUrl: 'https://picsum.photos/200/200?random=2',
      biografia:
        'Atuação no setor agrícola com foco em sustentabilidade e exportação.',
      areaAtuacao: 'Agronegócio',
      tamanhoEmpresa: 'Grande',
      mediaGeral: 4.3,
    },
    {
      id: 3,
      nomeFantasia: 'InovaBank',
      paisOrigem: 'Brasil',
      estadoSede: 'RJ',
      fotoUrl: 'https://picsum.photos/200/200?random=3',
      biografia:
        'Fintech especializada em pagamentos digitais e crédito pessoal.',
      areaAtuacao: 'Financeiro',
      tamanhoEmpresa: 'Grande',
      mediaGeral: 4.8,
    },
    {
      id: 4,
      nomeFantasia: 'HealthPlus Care',
      paisOrigem: 'Brasil',
      estadoSede: 'PR',
      fotoUrl: 'https://picsum.photos/200/200?random=4',
      biografia:
        'Empresa de saúde com foco em telemedicina e gestão hospitalar.',
      areaAtuacao: 'Saúde',
      tamanhoEmpresa: 'Média',
      mediaGeral: 4.5,
    },
    {
      id: 5,
      nomeFantasia: 'EduSmart',
      paisOrigem: 'Brasil',
      estadoSede: 'RS',
      fotoUrl: 'https://picsum.photos/200/200?random=5',
      biografia:
        'Plataforma educacional voltada para ensino remoto e inteligência adaptativa.',
      areaAtuacao: 'Educação',
      tamanhoEmpresa: 'Startup',
      mediaGeral: 4.6,
    },
  ];

  if (initialLoading) return <></>;
  if (isError) return <></>;

  return (
    <div className="flex min-h-full w-full flex-col gap-16">
      <PageTitle title="Home" />

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

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-normal text-white">Avaliações recentes</h2>
        <div className="flex flex-1 flex-col gap-6">
          {mock__recentReviews.map(item => (
            <ReviewCard key={item.id} item={item} source="ESTUDANTE" />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <h2 className="text-2xl font-normal text-white">Melhores empresas</h2>
        <div className="flex flex-1 flex-col gap-6">
          {mock__bestCompanies.map(company => (
            <CompanyCard
              key={company.id}
              item={company}
              isFavorite={favorites.some(item => item.id === company.id)}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
