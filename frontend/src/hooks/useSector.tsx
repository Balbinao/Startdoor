import { useCallback } from 'react';
import { useStore } from '@contexts/store/useStore';
import type { IInputOption } from '@models/input.types';
import { sectorService } from '@services/sectorService';

export const useSector = () => {
  const { sectorStore } = useStore();

  const sectorsItems = sectorStore.getSectors;

  // const mockSectorItems: ISector[] = [
  //   { id: 1, nome: 'Administração' },
  //   { id: 2, nome: 'Agronegócio' },
  //   { id: 3, nome: 'Arquitetura' },
  //   { id: 4, nome: 'Atendimento ao Cliente' },
  //   { id: 5, nome: 'Auditoria' },
  //   { id: 6, nome: 'Biotecnologia' },
  //   { id: 7, nome: 'Ciência de Dados' },
  //   { id: 8, nome: 'Compliance' },
  //   { id: 9, nome: 'Computação em Nuvem' },
  //   { id: 10, nome: 'Compras e Suprimentos' },
  //   { id: 11, nome: 'Contabilidade' },
  //   { id: 12, nome: 'Customer Success' },
  //   { id: 13, nome: 'Desenvolvimento de Software' },
  //   { id: 14, nome: 'Design Gráfico' },
  //   { id: 15, nome: 'Economia' },
  //   { id: 16, nome: 'Educação' },
  //   { id: 17, nome: 'Engenharia' },
  //   { id: 18, nome: 'Engenharia de Software' },
  //   { id: 19, nome: 'Financeiro' },
  //   { id: 20, nome: 'Gestão de Produtos' },
  //   { id: 21, nome: 'Gestão de Projetos' },
  //   { id: 22, nome: 'Infraestrutura e Redes' },
  //   { id: 23, nome: 'Inteligência Artificial' },
  //   { id: 24, nome: 'Jurídico' },
  //   { id: 25, nome: 'Logística' },
  //   { id: 26, nome: 'Marketing' },
  //   { id: 27, nome: 'Marketing Digital' },
  //   { id: 28, nome: 'Pesquisa e Desenvolvimento' },
  //   { id: 29, nome: 'Produto Digital' },
  //   { id: 30, nome: 'Recursos Humanos' },
  //   { id: 31, nome: 'Recrutamento e Seleção' },
  //   { id: 32, nome: 'Relações Internacionais' },
  //   { id: 33, nome: 'Saúde' },
  //   { id: 34, nome: 'Segurança da Informação' },
  //   { id: 35, nome: 'Supply Chain' },
  //   { id: 36, nome: 'Sustentabilidade' },
  //   { id: 37, nome: 'Tecnologia da Informação' },
  //   { id: 38, nome: 'Treinamento e Desenvolvimento' },
  //   { id: 39, nome: 'UX/UI Design' },
  //   { id: 40, nome: 'Vendas' },
  // ];

  const getSectors = useCallback(async () => {
    try {
      const response = await sectorService.getSectors();
      // const response = mockSectorItems;
      const formatted: IInputOption[] = [
        { label: 'Selecione...', value: '' },
        ...response.map(item => ({
          label: item.nome,
          value: item.id,
        })),
      ];

      sectorStore.setSectors(formatted);

      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [sectorStore]);

  return {
    sectorsItems,
    getSectors,
  };
};
