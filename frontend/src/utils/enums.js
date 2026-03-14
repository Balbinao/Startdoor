export const ModeloTrabalho = {
  PRESENCIAL: 'Presencial',
  HIBRIDO: 'Híbrido',
  REMOTO: 'Remoto'
};

export const ReceitaAnual = {
  ATE_1_MILHAO: 'Até 1 milhão',
  ATE_10_MILHOES: 'Até 10 milhões',
  ATE_50_MILHOES: 'Até 50 milhões',
  ATE_100_MILHOES: 'Até 100 milhões',
  ATE_500_MILHOES: 'Até 500 milhões',
  ATE_1_BILHAO: 'Até 1 bilhão',
  ATE_10_BILHOES: 'Até 10 bilhões',
  ATE_50_BILHOES: 'Até 50 bilhões',
  ATE_100_BILHOES: 'Até 100 bilhões',
  ATE_250_BILHOES: 'Até 250 bilhões',
  ATE_500_BILHOES: 'Até 500 bilhões',
  MAIS_500_BILHOES: 'Mais de 500 bilhões'
};

export const TamanhoEmpresa = {
  MICRO_1_10: 'Micro (1-10 funcionários)',
  PEQUENA_11_50: 'Pequena (11-50)',
  MEDIA_51_100: 'Média (51-100)',
  MEDIA_101_250: 'Média (101-250)',
  GRANDE_251_500: 'Grande (251-500)',
  GRANDE_501_1000: 'Grande (501-1000)',
  CORPORATIVA_1001_5000: 'Corporativa (1001-5000)',
  CORPORATIVA_5001_10000: 'Corporativa (5001-10000)',
  MULTINACIONAL_10001_50000: 'Multinacional (10001-50000)',
  MULTINACIONAL_50001_100000: 'Multinacional (50001-100000)',
  GIGANTE_MAIS_100000: 'Gigante (mais de 100.000)'
};

export const UserRole = {
  ADMIN: 'admin',
  ESTUDANTE: 'estudante',
  EMPRESA: 'empresa'
};


export const EnumUtils = {
  
  getValues: (enumObj) => Object.values(enumObj),
  
  
  getKeys: (enumObj) => Object.keys(enumObj),
  
  
  getLabel: (enumObj, key) => enumObj[key] || key,
  
  
  getSelectOptions: (enumObj) => 
    Object.entries(enumObj).map(([key, value]) => ({
      value: key,
      label: value
    }))
};
