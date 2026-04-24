import type { InputMask } from '@models/input.types';

export const masks: Record<InputMask, (value: string) => string> = {
  cpf: value => {
    const v = value.replace(/\D/g, '').slice(0, 11);
    return v
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})/, '$1-$2');
  },

  cep: value => {
    const v = value.replace(/\D/g, '').slice(0, 8);
    return v.replace(/(\d{5})(\d)/, '$1-$2');
  },

  phone: value => {
    const v = value.replace(/\D/g, '').slice(0, 10);
    return v.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d)/, '$1-$2');
  },

  mobile: value => {
    const v = value.replace(/\D/g, '').slice(0, 11);
    return v.replace(/(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d)/, '$1-$2');
  },

  rg: value => {
    const v = value.replace(/\D/g, '').slice(0, 9);
    return v
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1})$/, '$1-$2');
  },

  cnpj: value => {
    const v = value.replace(/\D/g, '').slice(0, 14);
    return v
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d{1,2})$/, '$1-$2');
  },
};
