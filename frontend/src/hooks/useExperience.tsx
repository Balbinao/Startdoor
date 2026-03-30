import { useStore } from '@contexts/store/useStore';
import type {
  IAcademicExperience,
  IProfessionalExperience,
} from '@models/experience.types';
import type { AcademicExperienceCardData } from '@schemas/academicExperienceCardSchema';
import type { ProfessionalExperienceCardData } from '@schemas/professionalExperienceCardSchema';
import { experienceService } from '@services/experienceService';

export const useExperience = () => {
  const { experienceStore } = useStore();

  const academicExperienceCards = experienceStore.getAcademicExperienceCards;
  const professionalExperienceCards =
    experienceStore.getProfessionalExperienceCards;

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

  const mockProfessionalExperienceItems: IProfessionalExperience[] = [
    {
      id: 1,
      idEstudante: 101,
      idEmpresa: 4,
      tituloCargo: 'Desenvolvedor Front-end Júnior',
      nomeEmpresa: 'Itaú Unibanco',
      estadoAtuacao: 'São Paulo',
      modeloTrabalho: 'Presencial',
      dataInicio: '2021-03-01',
      dataFim: '2022-08-30',
      descricao:
        'Atuação no desenvolvimento de interfaces web utilizando React, com foco em componentização, reutilização de código e boas práticas de UI/UX. Participação ativa em reuniões de planejamento e revisão de código, colaborando com times multidisciplinares. Experiência com integração de APIs REST, versionamento com Git e organização de projetos seguindo padrões de arquitetura front-end.',
    },
    {
      id: 2,
      idEstudante: 101,
      idEmpresa: 10,
      tituloCargo: 'Desenvolvedor Front-end Pleno',
      nomeEmpresa: 'Nubank',
      estadoAtuacao: 'Rio de Janeiro',
      modeloTrabalho: 'Híbrido',
      dataInicio: '2022-09-01',
      dataFim: null,
      descricao:
        'Responsável pelo desenvolvimento e manutenção de aplicações web escaláveis. Implementação de melhorias de performance, acessibilidade e responsividade. Atuação com TypeScript, gerenciamento de estado e consumo de APIs. Colaboração próxima com designers e back-end para definição de soluções técnicas eficientes.',
    },
    {
      id: 3,
      idEstudante: 102,
      idEmpresa: 5,
      tituloCargo: 'Analista de Suporte Técnico',
      nomeEmpresa: 'Santander',
      estadoAtuacao: 'Minas Gerais',
      modeloTrabalho: 'Remoto',
      dataInicio: '2020-02-15',
      dataFim: '2021-12-10',
      descricao:
        'Atendimento a usuários para resolução de problemas técnicos relacionados a sistemas internos e infraestrutura. Diagnóstico e solução de falhas, instalação de softwares e suporte remoto. Registro e acompanhamento de chamados, garantindo cumprimento de SLAs.',
    },
    {
      id: 4,
      idEstudante: 103,
      idEmpresa: 9,
      tituloCargo: 'Engenheiro de Software',
      nomeEmpresa: 'Banco Inter',
      estadoAtuacao: 'Amapá',
      modeloTrabalho: 'Remoto',
      dataInicio: '2023-01-05',
      dataFim: null,
      descricao: null,
    },
  ];

  const getAcademicExperienceCards = async (id: number) => {
    try {
      // const response = await experienceService.getAcademicExperienceCards(id);
      const response = mockAcademicExperienceItems;
      experienceStore.setAcademicExperienceCards(response);

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

  const getProfessionalExperienceCards = async (id: number) => {
    try {
      // const response = await experienceService.getProfessionalExperienceCards(id);
      const response = mockProfessionalExperienceItems;
      experienceStore.setProfessionalExperienceCards(response);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createProfessionalExperienceCard = async (
    id: number,
    company: ProfessionalExperienceCardData,
  ) => {
    try {
      const response = await experienceService.createProfessionalExperienceCard(
        id,
        company,
      );
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateProfessionalExperienceCard = async (
    id: number,
    company: ProfessionalExperienceCardData,
  ) => {
    try {
      const response = await experienceService.updateProfessionalExperienceCard(
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
    professionalExperienceCards,
    getProfessionalExperienceCards,
    createProfessionalExperienceCard,
    updateProfessionalExperienceCard,
  };
};
