import { useStore } from '@contexts/store/useStore';
import type { ICommentStudent, ICommentPayload } from '@models/comment.types';
import { commentService } from '@services/commentService';

export const useComment = () => {
  const { commentStore } = useStore();

  const comments = commentStore.getComments;

  const mockComments: ICommentStudent[] = [
    {
      id: 1,
      idEstudante: 1,
      texto: 'Muito bom!',
      anonimo: true,
      createdAt: '2026-04-10T14:32:00Z',
    },
    {
      id: 2,
      idEstudante: 1,
      texto: 'Gostei bastante da explicação, foi direta ao ponto.',
      anonimo: true,
      createdAt: '2026-04-10T15:10:00Z',
    },
    {
      id: 3,
      idEstudante: 1,
      texto:
        'Não entendi muito bem essa parte, principalmente quando você começou a entrar naquele conceito mais avançado. No início estava tudo claro, mas conforme a explicação foi evoluindo, senti que alguns passos importantes foram pulados ou explicados de forma muito rápida. Isso acabou dificultando bastante o acompanhamento, especialmente para quem ainda não tem tanta familiaridade com o assunto.\n\nTentei pausar e rever algumas vezes, mas mesmo assim fiquei com dúvidas em pontos específicos, como na transição entre a teoria e a aplicação prática. Acho que faltou um exemplo mais concreto, algo do dia a dia ou até um caso real que ajudasse a visualizar melhor o que estava sendo explicado.\n\nOutro ponto é que alguns termos técnicos apareceram sem muita introdução, o que pode confundir quem está vendo isso pela primeira vez. Talvez incluir uma breve explicação desses termos ou até um pequeno resumo antes de avançar ajudaria bastante.\n\nNo geral, o conteúdo parece muito bom e bem estruturado, mas essa parte em específico poderia ser mais detalhada e didática. Com alguns exemplos adicionais e um ritmo um pouco mais lento nessa seção, acredito que ficaria muito mais fácil de entender. Vou tentar revisar novamente com mais calma depois, mas deixo aqui esse feedback porque acho que pode ajudar a melhorar ainda mais a qualidade da explicação.',
      anonimo: true,
      createdAt: '2026-04-11T09:05:00Z',
    },
    {
      id: 4,
      idEstudante: 1,
      texto:
        'A aula foi interessante, mas acho que poderia ter mais exemplos práticos para facilitar o entendimento de quem está começando.',
      anonimo: true,
      createdAt: '2026-04-11T11:47:00Z',
    },
    {
      id: 5,
      idEstudante: 1,
      texto: 'Perfeito!',
      anonimo: true,
      createdAt: '2026-04-12T18:22:00Z',
    },
  ];

  const getComments = async (reviewId: number) => {
    try {
      console.log(reviewId)
      // const response = await commentService.getComments(reviewId);
      const response = mockComments;
      commentStore.setComments(response);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const createComment = async (userId: number, comment: ICommentPayload) => {
    try {
      const response = await commentService.createComment(userId, comment);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const updateComment = async (userId: number, comment: ICommentPayload) => {
    try {
      const response = await commentService.updateComment(userId, comment);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteComment = async (id: number) => {
    try {
      const response = await commentService.deleteComment(id);
      return response;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return {
    comments,
    getComments,
    createComment,
    updateComment,
    deleteComment,
  };
};
