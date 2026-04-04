import type { FieldConfig } from '@models/input.types';
import type { StudentProfileUpdateData } from '@schemas/studentProfileUpdateSchema';
import { DROPDOWN_VALUES_CONST } from './dropdownValues';

export const studentConditionalScoreUpdateFields: FieldConfig<StudentProfileUpdateData>[] =
  [
    {
      type: 'select',
      name: 'ambiente',
      label: 'Ambiente',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'aprendizado',
      label: 'Aprendizado',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'beneficios',
      label: 'Benefícios',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'cultura',
      label: 'Cultura',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'efetivacao',
      label: 'Efetivação',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'entrevista',
      label: 'Entrevista',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'feedback',
      label: 'Feedback',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'infraestrutura',
      label: 'Infraestrutura',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'integracao',
      label: 'Integração',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'remuneracao',
      label: 'Remuneração',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'rotina',
      label: 'Rotina',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
    {
      type: 'select',
      name: 'lideranca',
      label: 'Liderança',
      options: DROPDOWN_VALUES_CONST.NOTA_CONDI.map(option => ({
        ...option,
      })),
    },
  ] as const;
