# Planej.ai: Desenvolvendo um Educador Financeiro com React e IA Generativa

O **Planej.ai** é uma aplicação web de planejamento financeiro pessoal. O usuário preenche um formulário com informações sobre sua renda, gastos e uma meta financeira (como uma viagem ou a compra de um bem), e a aplicação usa inteligência artificial para gerar um diagnóstico personalizado com sugestões práticas, ideias de renda extra e um plano de ação.

Tudo funciona diretamente no navegador: sem backend, sem banco de dados remoto. Os dados são salvos no `localStorage` e as análises são geradas em tempo real pela API do Google Gemini.

---

## Stacks do Projeto

### Dependências de produção

| Pacote                   | Versão  | Finalidade                   |
| ------------------------ | ------- | ---------------------------- |
| `react`                  | ^19.2.6 | Biblioteca principal de UI   |
| `react-dom`              | ^19.2.6 | Renderização React no DOM    |
| `react-router-dom`       | ^7.16.0 | Roteamento client-side (SPA) |
| `tailwindcss`            | ^4.3.0  | Framework de CSS utilitário  |
| `@tailwindcss/vite`      | ^4.2.2  | Plugin Tailwind para Vite    |
| `@fontsource/inter`      | ^5.2.8  | Fonte Inter auto-hospedada   |
| `lucide-react`           | ^1.5.0  | Biblioteca de ícones SVG     |
| `react-loading-skeleton` | ^3.5.0  | Skeletons de carregamento    |

### Dependências de desenvolvimento

| Pacote                             | Versão  | Finalidade                               |
| ---------------------------------- | ------- | ---------------------------------------- |
| `vite`                             | ^8.0.12  | Build tool e dev server                  |
| `typescript`                       | ~6.0.2  | Tipagem estática                         |
| `@vitejs/plugin-react`             | ^6.0.1  | Suporte a React no Vite (Fast Refresh)   |
| `eslint`                           | ^10.0.0 | Linter de código                         |
| `prettier`                         | ^3.8.3  | Formatação de código                     |

---


## Desafios

### Desafio 1 — Página de Histórico de Simulações

- Exiba um resumo de cada simulação salva
- Crie um layout responsivo seguindo o protótipo
- Permita excluir uma simulação do histórico
- Ao clicar em "Ver detalhes", navegue para a página de resultados com os insights já gerados

### Desafio 2 — Conversando com o Educador Financeiro

- Adicione um campo de texto dentro do componente `AIInsightCard`
- Permita que o usuário faça perguntas sobre a simulação realizada
- A IA deve retornar respostas claras e exibi-las seguindo o protótipo
- O scroll deve rolar automaticamente quando a IA retornar uma resposta
- Mostre feedback de carregamento e erro para o usuário
- O usuário pode fazer quantas perguntas quiser por simulação
- Todo o histórico de perguntas e respostas deve ser exibido na tela
- As conversas devem ser salvas no `localStorage` para consulta posterior