import { useStore } from '@contexts/store/useStore';
import type { IAcademicExperience } from '@models/experience.types';
import type { AcademicExperienceCardData } from '@schemas/academicExperienceCardSchema';
import { experienceService } from '@services/experienceService';

export const useExperience = () => {
  const { experienceStore } = useStore();

  const academicExperienceCards = experienceStore.getAcademicExperienceItems;

  const mockAcademicExperienceItems: IAcademicExperience[] = [
    {
      id: 1,
      idEstudante: 101,
      tituloEnsino: 'Ensino Médio',
      nomeEscola: 'Escola Estadual São Paulo',
      estadoAtuacao: 'Rio de Janeiro',
      modeloEnsino: 'Presencial',
      dataInicio: '2018-02-01',
      dataFim: '2020-12-15',
      descricao:
        'Conclusão do ensino médio com forte direcionamento para disciplinas da área de exatas, com destaque em matemática, física e lógica. Durante o período, houve participação ativa em projetos interdisciplinares, feiras de ciências e atividades extracurriculares voltadas à resolução de problemas e pensamento crítico. Envolvimento em trabalhos em grupo que exigiram colaboração, organização e comunicação eficaz, incluindo apresentações formais para turmas e professores. Desenvolvimento consistente de habilidades analíticas, raciocínio lógico estruturado e autonomia nos estudos. Além disso, contato inicial com conceitos básicos de tecnologia e informática, despertando interesse pela área de desenvolvimento de software e engenharia. Experiência na elaboração de relatórios acadêmicos, cumprimento de prazos e adaptação a diferentes metodologias de ensino, contribuindo para uma base sólida para o ensino superior.',
    },
    {
      id: 2,
      idEstudante: 101,
      tituloEnsino: 'Graduação em Ciência da Computação',
      nomeEscola: 'Universidade de São Paulo',
      estadoAtuacao: 'São Paulo',
      modeloEnsino: 'Presencial',
      dataInicio: '2021-02-01',
      dataFim: null,
      descricao: 'Curso superior com ênfase em desenvolvimento de software.',
    },
    {
      id: 3,
      idEstudante: 102,
      tituloEnsino: 'Curso Técnico em Informática',
      nomeEscola: 'ETEC',
      estadoAtuacao: 'Minas Gerais',
      modeloEnsino: 'Híbrido',
      dataInicio: '2019-01-10',
      dataFim: '2020-12-20',
      descricao: 'Formação técnica voltada para programação e redes.',
    },
    {
      id: 4,
      idEstudante: 103,
      tituloEnsino: 'Pós-graduação em Engenharia de Software',
      nomeEscola: 'PUC-SP',
      estadoAtuacao: 'Amapá',
      modeloEnsino: 'Remoto',
      dataInicio: '2022-03-01',
      dataFim: null,
      descricao: null,
    },
  ];

  const getAcademicExperienceCards = async (id: number) => {
    try {
      // const response = await experienceService.getAcademicExperienceCards(id);
      const response = mockAcademicExperienceItems;
      experienceStore.setAcademicExperienceItems(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createAcademicExperienceCard = async (
    id: number,
    company: AcademicExperienceCardData,
  ) => {
    try {
      const response = await experienceService.createAcademicExperienceCard(
        id,
        company,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateAcademicExperienceCard = async (
    id: number,
    company: AcademicExperienceCardData,
  ) => {
    try {
      const response = await experienceService.updateAcademicExperienceCard(
        id,
        company,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    academicExperienceCards,
    getAcademicExperienceCards,
    createAcademicExperienceCard,
    updateAcademicExperienceCard,
  };
};
