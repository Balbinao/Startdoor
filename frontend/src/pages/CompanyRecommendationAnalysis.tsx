import { PageTitle } from '@components/ui/PageTitle';

export const CompanyRecommendationAnalysis = () => {
  const modalMessage = (
    <div className="flex flex-col gap-12 leading-8 text-(--grey-200)">
      <div className="flex flex-col gap-3">
        <h1 className="text-lg font-medium">Justificativa da recomendação</h1>
        <p>
          O objetivo é explicar por que uma empresa específica foi recomendada
          para um usuário específico. A análise cruza{' '}
          <span className="font-medium text-(--purple-100)">
            requisitos do usuário, características da empresa e contexto geral
          </span>{' '}
          para justificar o encaixe entre ambos.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Dados considerados na análise</h2>
        <p>
          A justificativa é construída com base em três tipos principais de
          informação:
        </p>
        <p>
          • Requisitos mínimos definidos pelo usuário para cada competência
          <br />
          • Notas médias da empresa em cada critério avaliado
          <br />• Informações gerais como biografia, modelo de trabalho e porte
          da empresa
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Verificação de compatibilidade</h2>
        <p>
          Cada requisito do usuário é comparado com os dados da empresa para
          verificar se há aderência mínima.
        </p>
        <p>
          Quando os critérios são atendidos ou superados, isso reforça a
          justificativa de compatibilidade.
        </p>
        <p>
          Quando há proximidade, o sistema avalia o contexto geral para entender
          se o conjunto ainda faz sentido.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Peso dos critérios do usuário</h2>
        <p>
          Os requisitos definidos pelo usuário têm peso direto na explicação.
          Quanto mais exigente for um critério, maior sua influência na
          justificativa final. Isso garante que a análise seja centrada no
          perfil individual e suas prioridades.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Contexto da empresa</h2>
        <p>
          Além das notas, o sistema considera características estruturais da
          empresa, como modelo de trabalho, cultura e porte. Esses fatores
          ajudam a explicar o encaixe além dos números, trazendo uma visão mais
          completa da organização.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-medium">Geração da justificativa</h2>
        <p>
          A justificativa final explica de forma clara por que a empresa atende
          (ou se aproxima) dos critérios do usuário. O foco não é indicar
          alternativas, mas demonstrar o alinhamento entre perfil e empresa
          analisada.
        </p>
        <p>
          O resultado final é uma explicação estruturada baseada em{' '}
          <span className="font-medium text-(--purple-100)">
            compatibilidade entre expectativas e realidade
          </span>
          .
        </p>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-full w-full flex-col gap-12">
      <PageTitle title="Análise da Recomendação" modalMessage={modalMessage} />

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl font-extrabold text-(--purple-300)">
          O motivo da escolha...
        </h2>
        <p className="leading-8">
          O Itaú é recomendado para o seu perfil porque apresenta um bom
          alinhamento entre suas expectativas e o que a empresa oferece em
          termos de ambiente de trabalho, cultura organizacional e oportunidades
          de desenvolvimento. Considerando seus requisitos mínimos para
          diferentes competências, a empresa demonstra consistência nas
          avaliações médias em áreas como aprendizado, estrutura e estabilidade,
          além de possuir um modelo de trabalho e porte que favorecem
          experiências mais estruturadas e de longo prazo. Somado a isso, as
          informações gerais da organização indicam um ambiente consolidado e
          com processos bem definidos, o que reforça a compatibilidade com um
          perfil que busca segurança, crescimento e coerência entre prática e
          expectativas.
        </p>
      </div>
    </div>
  );
};
