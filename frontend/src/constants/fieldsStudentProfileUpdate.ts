import type { FieldConfig } from '@models/input.types';
import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';

export const studentConditionalScoreUpdateFields: FieldConfig<StudentProfileUpdateData>[] =
  [
    {
      type: 'rating',
      name: 'ambiente',
      label: 'Ambiente',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'aprendizado',
      label: 'Aprendizado',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'beneficios',
      label: 'Benefícios',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'cultura',
      label: 'Cultura',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'efetivacao',
      label: 'Efetivação',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'entrevista',
      label: 'Entrevista',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'feedback',
      label: 'Feedback',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'infraestrutura',
      label: 'Infraestrutura',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'integracao',
      label: 'Integração',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'remuneracao',
      label: 'Remuneração',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'rotina',
      label: 'Rotina',
      maxStars: 5,
    },
    {
      type: 'rating',
      name: 'lideranca',
      label: 'Liderança',
      maxStars: 5,
    },
  ] as const;
