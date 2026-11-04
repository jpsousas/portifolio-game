import { buildPersonalModalBody } from "../ui/personalGallery.js";

// -----------------------------------------------------------------------
// Conteúdo do currículo mapeado para os elementos do mundo
// -----------------------------------------------------------------------
export const ELEMENTS = [
  {
    key: "house",
    x: 168,
    y: 150,
    icon: "house",
    eyebrow: "Vivências pessoais",
    title: "Quem sou eu?",
    period: "",
    body: buildPersonalModalBody(),
  },
  {
    key: "novelos",
    x: 412,
    y: 190,
    icon: "novelos",
    eyebrow: "Experiências",
    title: "Experiências profissionais",
    body: `
      <div class="exp">
        <div class="exp-header">
          <span class="role pill">Desenvolvedor FullStack</span>
          <span class="company">Forte Security</span>
          <span class="period pill">out/2025 – jun/2026</span>
        </div>
        <ul>
          <li>Desenvolveu e refatorou funcionalidades-chave do CRM interno, atuando fullstack com <b>React</b> no frontend, <b>TypeScript</b> no backend e persistência em <b>MySQL</b>.</li>
          <li>Atuou em todas as fases do ciclo de desenvolvimento, usando <b>SCRUM</b> e <b>Kanban</b> para entregas contínuas alinhadas aos objetivos do negócio.</li>
        </ul>
      </div>
      <div class="exp">
        <div class="exp-header">
          <span class="role pill">Testador</span>
          <span class="company">SIS-ASTROS</span>
          <span class="period pill">dez/2024 – mai/2025</span>
        </div>
        <ul>
          <li>Teste, identificação e reporte de bugs no simulador SIS-ASTROS.</li>
          <li>Criação e refatoração de casos de teste, com SCRUM e Kanban.</li>
          <li>Atuação baseada em métodos ágeis de desenvolvimento de software SCRUM e Kanban em colaboração com desenvolvedores.</li>
        </ul>
      </div>
      <div class="exp">
        <div class="exp-header">
          <span class="role pill">Bolsista de Redes de Computadores</span>
          <span class="company">CPD - UFSM</span>
          <span class="period pill">ago/2023 – dez/2024</span>
        </div>
        <ul>
          <li>Criação de scripts em Python para configuração de dispositivos de rede, utilizando as libraries <b>Paramiko</b> e <b>Netmiko</b>.</li>
          <li>Desenvolvimento web com <b>Django</b>,  e uso de <b>Pandas</b>/<b>NumPy</b> para manipular e visualizar dados de status de dispositivos.</li>
          <li>Busca e identificação de switches não gerenciáveis na rede da UFSM.</li>
        </ul>
      </div>
    `,
  },
  {
    key: "computador1",
    x: 300,
    y: 380,
    icon: "computador1",
    iconFrames: 4,
    eyebrow: "PROJETOS PESSOAIS",
    title: "RoboBlocks",
    period: "Projeto acadêmico",
    body: `
      <p><b>RoboBlocks</b> (Web Game)</p>
      <ul>
        <li>Projeto final da disciplina de Desenvolvimento de software educacional.</li>
        <li>Tecnologias: React, Next.js e CSS Modules</li>
        <li>Objetivo: Colaborar com a comunidade educacional para promover o aprendizado de lógica e pensamento computacional, aplicando conceitos de matrizes, registros, condicionais  e laços de repetição.</li>
        <li><a href="https://fabrica-de-algor-timo.vercel.app/" target="_blank">fabrica-de-algor-timo.vercel.app</a></li>
      </ul>
    `,
  },
  {
    key: "computador2",
    x: 373,
    y: 420,
    icon: "computador2",
    iconFrames: 4,
    eyebrow: "PROJETOS PESSOAIS",
    title: "Gerenciador de escala", 
    period: "Projeto acadêmico",
    body: `
      <p>Gerenciador de escalas de trabalho, desenvolvido como projeto final da disciplina de Gerência de Banco de Dados.</p>
      <ul>
        <li>CRUD completo com React no frontend e Django no backend.</li>
        <li>Persistência em banco relacional MySQL.</li>
        <li>Aplicação e compreensão de: <b>Triggers, Functions, Procedures, Cursores, Queries, e Junções.</b></li>
      </ul>
    `,
  },
  {
    key: "computador3",
    x: 460,
    y: 380,
    icon: "computador3",
    iconFrames: 4,
    eyebrow: "PROJETOS PESSOAIS",
    title: "divideAi",
    period: "Projeto pessoal",
    body: `
      <p><b>divideAi</b> (Web App)</p>
      <ul>
        <li>Divide contas de supermercado a partir da leitura do QR Code da nota fiscal eletrônica.</li>
        <li>Tecnologias: Spring Boot, Python, React, H2, Selenium, Docker, REST API.</li>
        <li><a href="https://github.com/jpsousas/divide-ai" target="_blank">github.com/jpsousas/divide-ai</a></li>
      </ul>
    `,
  },
];
