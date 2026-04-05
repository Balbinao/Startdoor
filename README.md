# Startdoor

<p align="center">
  <b>Plataforma web colaborativa dedicada à avaliação e ao compartilhamento de experiências de estágio.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge&logo=progress"/>
   <img src="https://img.shields.io/badge/%20Trabalho%20Acadêmico-FATEC%20Ipiranga-8B0000?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge&logo=open-source-initiative"/>
  <img src="https://img.shields.io/badge/AI-Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white"/>
</p>

<br>

# Sumário
* [Sobre o Projeto](#sobre-o-projeto)
* [Protótipo Figma](#prototipo-figma)
* [Funcionalidades](#funcionalidades)
* [Recomendações com IA](#recomendacoes-com-ia)
* [Competências Avaliadas](#competencias-avaliadas)
* [Arquitetura Geral do Projeto](#arquitetura-geral-do-projeto)
* [🐳 Imagens Docker](#imagens-docker)
    * [Como Usar](#como-usar)    
* [Tecnologias](#tecnologias)
* [Contribuidores](#contribuidores)
* [License](#license)
<br>

## 🎯 **Sobre o Projeto**  <a name="sobre-o-projeto"></a>

A função principal do sistema é atuar como um **repositório centralizado** onde estudantes e estagiários podem registrar relatos detalhados e notas sobre as organizações onde atuam, transformando experiências individuais em informações acessíveis e estruturadas para outros alunos.

### 🎓 **Objetivo**

Funcionar como uma **ferramenta de apoio à decisão**, permitindo que o estudante identifique as empresas que melhor se alinham às suas expectativas profissionais antes de se candidatar a uma vaga.

<br>

## 📱 **Protótipo Figma** <a name="prototipo-figma"></a>

Clique no botão abaixo para acessar o protótipo feito no figma.

<p align="center">
  <a href="https://www.figma.com/proto/uMYDnHDMyCmws5SYpOI9VS/AvaliarEstagios_Prototipo?node-id=3-3&p=f&t=2pt5tdZCC8aVvnQo-0&scaling=contain&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=3%3A3&show-proto-sidebar=1">
    <img src="https://img.shields.io/badge/🎨%20Figma-Protótipo%20Interativo-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/>
  </a>
</p>

<br>


## ✨ **Funcionalidades** <a name="funcionalidades"></a>

<table align="center">
  <tr>
    <th>🔍 Funcionalidade</th>
    <th>📝 Descrição</th>
  </tr>
  <tr>
    <td><b>Pesquisar empresas</b></td>
    <td>Encontre organizações por nome, setor ou localização</td>
  </tr>
  <tr>
    <td><b>Acessar avaliações</b></td>
    <td>Veja notas e relatos de outros estagiários</td>
  </tr>
  <tr>
    <td><b>Comparar oportunidades</b></td>
    <td>Gráficos e estatísticas lado a lado</td>
  </tr>
  <tr>
    <td><b>Compartilhar feedback</b></td>
    <td>Contribua com sua experiência</td>
  </tr>
  <tr>
    <td><b>🤖 Recomendações com IA</b></td>
    <td>Receba sugestões personalizadas baseadas no seu perfil</td>
  </tr>
</table>

<br>

## 🤖 **Recomendações com IA** <a name="recomendacoes-com-ia"></a>

<p align="center">
  <img src="https://img.shields.io/badge/Powered%20by-Google%20Gemini-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white"/>
</p>

O sistema utiliza **Inteligência Artificial (Google Gemini)** para gerar recomendações personalizadas de empresas para cada estudante.

### Como funciona?

1. O sistema analisa as **notas condicionais** do estudante (suas preferências)
2. Compara com as **médias reais** das empresas avaliadas
3. A IA gera um **texto explicativo** personalizado justificando o "match"

### Exemplo de recomendação gerada por IA:

> *"Como você mencionou em seu perfil que valoriza **autonomia** e busca o setor de **Tecnologia**, a Empresa X é recomendada pois sua nota em 'Autonomia' (4.5) supera sua nota condicional (3.0)."*

### Regras de Negócio aplicadas:

| Regra | Descrição |
|-------|-----------|
| **RN010** | Algoritmo de afinidade - apenas empresas com ≥70% das competências atendidas |
| **RN011** | Personalização via IA - texto explicativo baseado no perfil do estudante |

<br>

## 📊 **Competências Avaliadas** <a name="competencias-avaliadas"></a>

<table align="center">
  <tr>
    <th>🏢 Ambiente</th>
    <th>📚 Aprendizado</th>
    <th>🎁 Benefícios</th>
    <th>🎭 Cultura</th>
  </tr>
  <tr>
    <th>📈 Efetivação</th>
    <th>🎯 Entrevista</th>
    <th>💬 Feedback</th>
    <th>🖥️ Infraestrutura</th>
  </tr>
  <tr>
    <th>🤝 Integração</th>
    <th>💰 Remuneração</th>
    <th>⏰ Rotina</th>
    <th>👔 Liderança</th>
  </tr>
</table>

<br>

## 🏗️ **Arquitetura Geral do Projeto** <a name="arquitetura-geral-do-projeto"></a>

O projeto é composto por **dois diretórios**.

### Frontend

Interface da aplicação desenvolvida com **React, TypeScript, Vite e Tailwind CSS**.

🔗 **Mais detalhes da arquitetura do Frontend:**  
[https://github.com/Balbinao/Startdoor/blob/main/frontend/README.md](https://github.com/Balbinao/Startdoor/blob/main/frontend/README.md)

### Backend

API responsável pelas regras de negócio, autenticação com **JWT** e fornecimento dos dados para o frontend.

🔗 **Mais detalhes da arquitetura do Backend:**  
[https://github.com/Balbinao/Startdoor/blob/main/backend/README.md](https://github.com/Balbinao/Startdoor/blob/main/backend/README.md)

<br>

## 🐳 **Imagens Docker** <a name="imagens-docker"></a>

<p>As imagens do projeto estão disponíveis no Docker Hub e são atualizadas automaticamente a cada push na branch <code>main</code>.</p>

<h3>Repositórios</h3>

<table align="center">
  <tr>
    <th>🔧 Serviço</th>
    <th>📦 Docker Hub</th>
    <th>📥 Comando</th>
  </tr>
  <tr>
    <td><b>Backend</b></td>
    <td><a href="https://hub.docker.com/r/startdoor/startdoor-backend">startdoor/startdoor-backend</a></td>
    <td><code>docker pull startdoor/startdoor-backend:latest</code></td>
  </tr>
  <tr>
    <td><b>Frontend</b></td>
    <td><a href="https://hub.docker.com/r/startdoor/startdoor-frontend">startdoor/startdoor-frontend</a></td>
    <td><code>docker pull startdoor/startdoor-frontend:latest</code></td>
  </tr>
</table>

<h3>Tags Disponíveis</h3>

<table align="center">
  <tr>
    <th>🏷️ Tag</th>
    <th>📝 Descrição</th>
  </tr>
  <tr>
    <td><code>latest</code></td>
    <td>Versão mais recente da branch main</td>
  </tr>
  <tr>
    <td><code>sha-&lt;commit&gt;</code></td>
    <td>Versão específica por commit (ex: sha-a1b2c3d)</td>
  </tr>
</table>

<br>

<h3>🚀 Como Usar</h3> <a name="como-usar"></a>
<p>As imagens do projeto podem ser executadas em qualquer ambiente com <b>Docker Desktop</b> instalado, sem necessidade de instalar Java, Node.js ou configurar banco de dados manualmente.</p>
<h4>Fluxo de Uso:</h4>
<ol>
  <li><b>Pré-requisito:</b> Instalar o <a href="https://www.docker.com/products/docker-desktop/">Docker Desktop</a></li>
  <li><b>Criar arquivo</b> <code>docker-compose.yml</code> com o conteúdo abaixo</li>
  <h4>docker-compose.yml:</h4>
<pre><code>version: '3.8'
services:
  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: "0000"
      MYSQL_DATABASE: startdoor
    ports:
      - "3307:3306"
  backend:
    image: startdoor/startdoor-backend:latest
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
  frontend:
    image: startdoor/startdoor-frontend:latest
    ports:
      - "5173:5173"</code></pre>
  <li><b>Baixar imagens:</b>
    <pre><code>docker pull startdoor/startdoor-backend:latest
docker pull startdoor/startdoor-frontend:latest</code></pre>
  </li>
  <li><b>Executar:</b> <code>docker-compose up -d</code></li>
  <li><b>Acessar o projeto:</b> Abrir <a href="http://localhost:5173">http://localhost:5173</a></li>
</ol>
<h4>Como acessar:</h4>
<table align="center">
  <tr>
    <th>🔧 Serviço</th>
    <th>🌐 URL</th>
  </tr>
  <tr>
    <td><b>Frontend</b></td>
    <td><a href="http://localhost:5173">http://localhost:5173</a></td>
  </tr>
  <tr>
    <td><b>Backend API</b></td>
    <td><a href="http://localhost:8080">http://localhost:8080</a></td>
  </tr>
</table>
<h4>Notas:</h4>
<ul>
  <li>Todas as imagens são atualizadas automaticamente a cada push na branch <code>main</code></li>
  <li>Para atualizar, basta rodar <code>docker-compose pull && docker-compose up -d</code></li>
  <li>O banco MySQL é criado automaticamente na primeira execução</li>
</ul>
<br>

## 🛠️ **Tecnologias Utilizadas** <a name="tecnologias"></a>

<table align="center">
  <tr>
    <th></th>
    <th>🎨 Frontend</th>
    <th>⚙️ Backend</th>
  </tr>

  <tr>
    <th>Linguagens</th>
    <td>
      <a href="https://www.typescriptlang.org/">
        <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
      </a>
    </td>
    <td>
      <a href="https://www.java.com/">
        <img alt="Java" src="https://img.shields.io/badge/Java-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"/>
      </a>
    </td>
  </tr>

  <tr>
    <th>Frameworks<br>Bibliotecas</th>
    <td>
      <a href="https://react.dev/"><img alt="React" src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/></a>
      <a href="https://vitejs.dev/"><img alt="Vite" src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/></a>
      <a href="https://mobx.js.org/"><img alt="MobX" src="https://img.shields.io/badge/MobX-FF9955?style=for-the-badge&logo=mobx&logoColor=white"/></a>
      <a href="https://react-hook-form.com/"><img alt="React Hook Form" src="https://img.shields.io/badge/React%20Hook%20Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white"/></a>
      <a href="https://zod.dev/"><img alt="Zod" src="https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white"/></a>
      <a href="https://tailwindcss.com/"><img alt="Tailwind" src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/></a>
      <a href="https://axios-http.com/"><img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/></a>
      <a href="https://reactrouter.com/"><img alt="React Router" src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/></a>
    </td>
    <td>
      <a href="https://spring.io/projects/spring-boot"><img alt="Spring Boot" src="https://img.shields.io/badge/Spring%20Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white"/></a>
      <a href="https://spring.io/projects/spring-security"><img alt="Spring Security" src="https://img.shields.io/badge/Spring%20Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"/></a>
      <a href="https://jwt.io/"><img alt="JWT" src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white"/></a>
      <a href="https://hibernate.org/"><img alt="Hibernate" src="https://img.shields.io/badge/Hibernate-59666C?style=for-the-badge&logo=hibernate&logoColor=white"/></a>
      <a href="https://ai.google.dev/gemini-api"><img alt="Gemini AI" src="https://img.shields.io/badge/Gemini%20AI-8E75B2?style=for-the-badge&logo=googlebard&logoColor=white"/></a>
    </td>
  </tr>

  <tr>
    <th>Banco de Dados</th>
    <td align="center">—</td>
    <td>
      <a href="https://www.mysql.com/"><img alt="MySQL" src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/></a>
    </td>
  </tr>

  <tr>
    <th>DevOps / Infra</th>
    <td>
      <a href="https://www.docker.com/"><img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/></a>
      <a href="https://git-scm.com/"><img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/></a>
    </td>
    <td>
      <a href="https://www.docker.com/"><img alt="Docker" src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/></a>
      <a href="https://git-scm.com/"><img alt="Git" src="https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white"/></a>
    </td>
  </tr>

  <tr>
    <th>Design & Documentação</th>
    <td>
      <a href="https://www.figma.com/"><img alt="Figma" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white"/></a>
      </td>
    <td>
      <a href="https://swagger.io/"><img alt="Swagger" src="https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"/></a>
      </td>
  </tr>

  <tr>
    <th>IDE / Editor</th>
    <td>
      <a href="https://code.visualstudio.com/"><img alt="VS Code" src="https://img.shields.io/badge/VS%20Code-0078d7?style=for-the-badge&logo=visual-studio-code&logoColor=white"/></a>
      </td>
    <td>
      <a href="https://www.jetbrains.com/idea/"><img alt="IntelliJ" src="https://img.shields.io/badge/IntelliJ%20IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white"/></a>
      </td>
  </tr>
</table>

<br>

## 👥 **Contribuidores** <a name="contribuidores"></a>

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/ScrivaniAfonso">
        <img src="https://github.com/ScrivaniAfonso.png" width="80" height="80" style="border-radius: 50%;" alt="Afonso Scrivani" />
        <br />
        <sub><b>Afonso Scrivani</b></sub>
      </a>
     </td>
    <td align="center">
      <a href="https://github.com/Balbinao">
        <img src="https://github.com/Balbinao.png" width="80" height="80" style="border-radius: 50%;" alt="Gustavo Balbino" />
        <br />
        <sub><b>Gustavo Balbino</b></sub>
      </a>
     </td>
    <td align="center">
      <a href="https://github.com/gustavojoze">
        <img src="https://github.com/gustavojoze.png" width="80" height="80" style="border-radius: 50%;" alt="Gustavo José" />
        <br />
        <sub><b>Gustavo José</b></sub>
      </a>
     </td>
    <td align="center">
      <a href="https://github.com/LucasOkokama">
        <img src="https://github.com/LucasOkokama.png" width="80" height="80" style="border-radius: 50%;" alt="Lucas Okokama" />
        <br />
        <sub><b>Lucas Okokama</b></sub>
      </a>
     </td>
    <td align="center">
      <a href="https://github.com/pedro-Trovo">
        <img src="https://github.com/pedro-Trovo.png" width="80" height="80" style="border-radius: 50%;" alt="Pedro Trovo" />
        <br />
        <sub><b>Pedro Trovo</b></sub>
      </a>
     </td>
  </tr>
</table>

<br>

## **License** <a name="license"></a>

MIT License

Copyright (c) 2026 Startdoor Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
