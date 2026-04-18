import { useStore } from '@contexts/store/useStore';
import type {
  IReview,
  IReviewCardCompanyView,
  IReviewCardStudentView,
} from '@models/review.types';
import type { ReviewData } from '@schemas/reviewSchema';
import { reviewService } from '@services/reviewService';

export const useReview = () => {
  const { reviewStore } = useStore();

  const reviewCards = reviewStore.getReviewCards;
  const review = reviewStore.getReview;

  const mockReviewCardsStudent: IReviewCardStudentView[] = [
    {
      idAvaliacao: 1,
      idEmpresa: 1,
      tituloCargo: 'Desenvolvedor Frontend',
      notaMedia: 8,
      textoAvaliacao:
        'Ótima experiência, equipe colaborativa e bons desafios técnicos.',
      dataPublicacao: '2026-03-15',
    },
    {
      idAvaliacao: 1,
      idEmpresa: 1,
      tituloCargo: 'Estagiária de UX/UI',
      notaMedia: 10,
      textoAvaliacao:
        'Minha experiência como estagiária de UX/UI na Inova Corp foi extremamente positiva e enriquecedora. Desde o início, fui muito bem acolhida pela equipe, que sempre se mostrou disponível para tirar dúvidas, orientar e compartilhar conhecimentos. A cultura da empresa valoriza bastante a colaboração, o aprendizado contínuo e a troca de ideias, o que tornou o ambiente muito agradável e motivador.\n\nDurante o estágio, tive a oportunidade de participar de projetos reais, contribuindo ativamente em pesquisas com usuários, criação de wireframes, prototipagem e testes de usabilidade. Recebi feedbacks frequentes e construtivos, que foram essenciais para o desenvolvimento das minhas habilidades técnicas e também das minhas soft skills, como comunicação e trabalho em equipe.\n\nAlém disso, a empresa oferece uma boa estrutura de trabalho e incentiva o crescimento profissional, permitindo que os estagiários se sintam parte importante do time. Sem dúvida, foi uma experiência fundamental para minha formação e que agregou muito valor à minha carreira.',
      dataPublicacao: '2026-02-28',
    },
    {
      idAvaliacao: 1,
      idEmpresa: 1,
      tituloCargo: 'Analista de Dados Júnior',
      notaMedia: 7.5,
      textoAvaliacao:
        'Trabalhar como Analista de Dados Júnior na DataMind foi uma experiência desafiadora e, ao mesmo tempo, bastante enriquecedora. A empresa possui um ambiente dinâmico, com projetos variados e oportunidades constantes de aprendizado, especialmente para quem está no início da carreira.\n\nNo dia a dia, tive contato com grandes volumes de dados, desenvolvimento de relatórios e dashboards, além de participação em tomadas de decisão orientadas por dados. A equipe é tecnicamente competente, e há bastante troca de conhecimento entre os colegas, o que contribui para a evolução profissional.\n\nPor outro lado, é importante destacar que existe uma pressão significativa por resultados e cumprimento de prazos, o que pode tornar a rotina um pouco estressante em determinados períodos. Em alguns momentos, senti falta de um melhor equilíbrio entre demanda e capacidade da equipe.\n\nApesar desses pontos, considero uma boa empresa para adquirir experiência prática rapidamente, desenvolver resiliência e crescer na área de dados. Recomendo principalmente para profissionais que buscam aprendizado acelerado e não se incomodam com um ambiente mais exigente.',
      dataPublicacao: '2026-01-20',
    },
    {
      idAvaliacao: 1,
      idEmpresa: 1,
      tituloCargo: 'Desenvolvedora Backend',
      notaMedia: 6.52,
      textoAvaliacao:
        'Projetos interessantes e boa oportunidade de crescimento profissional.',
      dataPublicacao: '2025-12-10',
    },
  ];

  const mockReview: IReview = {
    id: 1,
    idEstudante: 1,
    idEmpresa: 1,
    idSetor: 2,
    estadoAtuacao: 'São Paulo',
    modeloTrabalho: 'Presencial',
    dataInicio: '2023-01-01',
    dataFim: '2023-12-31',
    tituloCargo: 'Desenvolvedor Frontend',
    textoAvaliacao: `Minha experiência na empresa foi extremamente enriquecedora e contribuiu muito para o meu crescimento profissional e pessoal. Desde o início, fui bem recebido pela equipe, que sempre se mostrou disponível para ajudar, tirar dúvidas e compartilhar conhecimento.
Durante o período em que atuei como Desenvolvedor Frontend, tive a oportunidade de trabalhar com diversas tecnologias modernas, participar de decisões técnicas e contribuir ativamente em projetos relevantes para o negócio. O ambiente de trabalho era bastante colaborativo, incentivando a troca constante entre os membros do time, o que facilitava muito o aprendizado contínuo.

A liderança também teve um papel importante na minha jornada. Os gestores eram acessíveis, abertos a feedbacks e preocupados com o desenvolvimento dos colaboradores. Recebia orientações claras sobre minhas atividades e tinha autonomia para propor melhorias e novas soluções.

Outro ponto positivo foi a cultura organizacional, que valorizava inovação, respeito e transparência. Havia um incentivo constante para evoluir tecnicamente, inclusive com acesso a cursos, treinamentos e momentos dedicados ao aprendizado.
  `,
    faixaSalarial: {
      salarioMin: 1850,
      salarioMax: 2480,
    },
    anonima: 1,
    ambiente: 4,
    aprendizado: 5,
    beneficios: 3,
    cultura: 4,
    efetivacao: 3,
    entrevista: 4,
    feedback: 5,
    infraestrutura: 4,
    integracao: 5,
    remuneracao: 3,
    rotina: 4,
    lideranca: 5,
    created_at: '2023-01-01T10:00:00Z',
  };

  const mockReviewCardsCompany: IReviewCardCompanyView[] = [
    {
      idAvaliacao: 1,
      idEstudante: 1,
      tituloCargo: 'Desenvolvedor Frontend',
      notaMedia: 8,
      textoAvaliacao:
        'Ótima experiência, equipe colaborativa e bons desafios técnicos.',
      dataPublicacao: '2026-03-15',
    },
    {
      idAvaliacao: 1,
      idEstudante: 1,
      tituloCargo: 'Estagiária de UX/UI',
      notaMedia: 10,
      textoAvaliacao:
        'Minha experiência como estagiária de UX/UI na Inova Corp foi extremamente positiva e enriquecedora. Desde o início, fui muito bem acolhida pela equipe, que sempre se mostrou disponível para tirar dúvidas, orientar e compartilhar conhecimentos. A cultura da empresa valoriza bastante a colaboração, o aprendizado contínuo e a troca de ideias, o que tornou o ambiente muito agradável e motivador.\n\nDurante o estágio, tive a oportunidade de participar de projetos reais, contribuindo ativamente em pesquisas com usuários, criação de wireframes, prototipagem e testes de usabilidade. Recebi feedbacks frequentes e construtivos, que foram essenciais para o desenvolvimento das minhas habilidades técnicas e também das minhas soft skills, como comunicação e trabalho em equipe.\n\nAlém disso, a empresa oferece uma boa estrutura de trabalho e incentiva o crescimento profissional, permitindo que os estagiários se sintam parte importante do time. Sem dúvida, foi uma experiência fundamental para minha formação e que agregou muito valor à minha carreira.',
      dataPublicacao: '2026-02-28',
    },
    {
      idAvaliacao: 1,
      idEstudante: 1,
      tituloCargo: 'Analista de Dados Júnior',
      notaMedia: 7.5,
      textoAvaliacao:
        'Trabalhar como Analista de Dados Júnior na DataMind foi uma experiência desafiadora e, ao mesmo tempo, bastante enriquecedora. A empresa possui um ambiente dinâmico, com projetos variados e oportunidades constantes de aprendizado, especialmente para quem está no início da carreira.\n\nNo dia a dia, tive contato com grandes volumes de dados, desenvolvimento de relatórios e dashboards, além de participação em tomadas de decisão orientadas por dados. A equipe é tecnicamente competente, e há bastante troca de conhecimento entre os colegas, o que contribui para a evolução profissional.\n\nPor outro lado, é importante destacar que existe uma pressão significativa por resultados e cumprimento de prazos, o que pode tornar a rotina um pouco estressante em determinados períodos. Em alguns momentos, senti falta de um melhor equilíbrio entre demanda e capacidade da equipe.\n\nApesar desses pontos, considero uma boa empresa para adquirir experiência prática rapidamente, desenvolver resiliência e crescer na área de dados. Recomendo principalmente para profissionais que buscam aprendizado acelerado e não se incomodam com um ambiente mais exigente.',
      dataPublicacao: '2026-01-20',
    },
    {
      idAvaliacao: 1,
      idEstudante: 1,
      tituloCargo: 'Desenvolvedora Backend',
      notaMedia: 6.52,
      textoAvaliacao:
        'Projetos interessantes e boa oportunidade de crescimento profissional.',
      dataPublicacao: '2025-12-10',
    },
  ];

  const getReviewCardsStudent = async (id: number) => {
    try {
      console.log(id);
      // const response = await reviewService.getReviewCardsStudent(id);
      const response = mockReviewCardsStudent;
      reviewStore.setReviewCards(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getReviewCardsCompany = async (id: number) => {
    try {
      console.log(id);
      // const response = await reviewService.getReviewCardsCompany(id);
      const response = mockReviewCardsCompany;
      reviewStore.setReviewCards(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getReview = async (id: number) => {
    try {
      console.log(id);
      // const response = await reviewService.getReview(id);
      const response = mockReview;
      reviewStore.setReview(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createReview = async (id: number, review: ReviewData) => {
    try {
      const response = await reviewService.createReview(id, review);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateReview = async (id: number, review: ReviewData) => {
    try {
      const response = await reviewService.updateReview(id, review);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteReview = async (id: number) => {
    try {
      const response = await reviewService.deleteReview(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    reviewCards,
    review,
    getReviewCardsStudent,
    getReviewCardsCompany,
    getReview,
    createReview,
    updateReview,
    deleteReview,
  };
};
