import { useStore } from '@contexts/store/useStore';
import type { IReviewCard } from '@models/review.types';

export const useReview = () => {
  const { reviewStore } = useStore();

  const reviewCards = reviewStore.getReviewCards;

  const mockReviewCards: IReviewCard[] = [
    {
      source: 'Estudante',
      nomeEmpresa: 'Tech Solutions',
      nomeEstudante: 'João Silva',
      tituloCargo: 'Desenvolvedor Frontend',
      notaMedia: 8,
      textoAvaliacao:
        'Ótima experiência, equipe colaborativa e bons desafios técnicos.',
      dataPublicacao: '2026-03-15',
      numApoios: 12,
      numComents: 3,
    },
    {
      source: 'Estudante',
      nomeEmpresa: 'Inova Corp',
      nomeEstudante: 'Maria Oliveira',
      tituloCargo: 'Estagiária de UX/UI',
      notaMedia: 10,
      textoAvaliacao:
        'Minha experiência como estagiária de UX/UI na Inova Corp foi extremamente positiva e enriquecedora. Desde o início, fui muito bem acolhida pela equipe, que sempre se mostrou disponível para tirar dúvidas, orientar e compartilhar conhecimentos. A cultura da empresa valoriza bastante a colaboração, o aprendizado contínuo e a troca de ideias, o que tornou o ambiente muito agradável e motivador.\n\nDurante o estágio, tive a oportunidade de participar de projetos reais, contribuindo ativamente em pesquisas com usuários, criação de wireframes, prototipagem e testes de usabilidade. Recebi feedbacks frequentes e construtivos, que foram essenciais para o desenvolvimento das minhas habilidades técnicas e também das minhas soft skills, como comunicação e trabalho em equipe.\n\nAlém disso, a empresa oferece uma boa estrutura de trabalho e incentiva o crescimento profissional, permitindo que os estagiários se sintam parte importante do time. Sem dúvida, foi uma experiência fundamental para minha formação e que agregou muito valor à minha carreira.',
      dataPublicacao: '2026-02-28',
      numApoios: 8,
      numComents: 1,
    },
    {
      source: 'Estudante',
      nomeEmpresa: 'DataMind',
      nomeEstudante: 'Carlos Souza',
      tituloCargo: 'Analista de Dados Júnior',
      notaMedia: 7.5,
      textoAvaliacao:
        'Trabalhar como Analista de Dados Júnior na DataMind foi uma experiência desafiadora e, ao mesmo tempo, bastante enriquecedora. A empresa possui um ambiente dinâmico, com projetos variados e oportunidades constantes de aprendizado, especialmente para quem está no início da carreira.\n\nNo dia a dia, tive contato com grandes volumes de dados, desenvolvimento de relatórios e dashboards, além de participação em tomadas de decisão orientadas por dados. A equipe é tecnicamente competente, e há bastante troca de conhecimento entre os colegas, o que contribui para a evolução profissional.\n\nPor outro lado, é importante destacar que existe uma pressão significativa por resultados e cumprimento de prazos, o que pode tornar a rotina um pouco estressante em determinados períodos. Em alguns momentos, senti falta de um melhor equilíbrio entre demanda e capacidade da equipe.\n\nApesar desses pontos, considero uma boa empresa para adquirir experiência prática rapidamente, desenvolver resiliência e crescer na área de dados. Recomendo principalmente para profissionais que buscam aprendizado acelerado e não se incomodam com um ambiente mais exigente.',
      dataPublicacao: '2026-01-20',
      numApoios: 15,
      numComents: 5,
    },
    {
      source: 'Empresa',
      nomeEmpresa: 'NextGen Systems',
      nomeEstudante: 'Ana Costa',
      tituloCargo: 'Desenvolvedora Backend',
      notaMedia: 6.52,
      textoAvaliacao:
        'Projetos interessantes e boa oportunidade de crescimento profissional.',
      dataPublicacao: '2025-12-10',
      numApoios: 20,
      numComents: 7,
    },
  ];

  const getReviewCards = async (id: number) => {
    try {
      // const response = await reviewService.getReviewCards(id);
      const response = mockReviewCards;
      reviewStore.setReviewCards(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    reviewCards,
    getReviewCards,
  };
};
