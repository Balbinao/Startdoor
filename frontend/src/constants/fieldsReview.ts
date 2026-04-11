import type { ReviewData } from '@schemas/reviewSchema';

export const reviewScoreFields = [
  ['ambiente', 'Ambiente'],
  ['aprendizado', 'Aprendizado'],
  ['beneficios', 'Benefícios'],
  ['cultura', 'Cultura'],
  ['efetivacao', 'Efetivação'],
  ['entrevista', 'Entrevista'],
  ['feedback', 'Feedback'],
  ['infraestrutura', 'Infraestrutura'],
  ['integracao', 'Integração'],
  ['remuneracao', 'Remuneração'],
  ['rotina', 'Rotina'],
  ['lideranca', 'Liderança'],
] as const satisfies readonly (readonly [keyof ReviewData, string])[];
