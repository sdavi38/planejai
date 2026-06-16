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

## Como Executar a Aplicação

Siga as etapas abaixo para configurar e executar o projeto localmente:

### Pré-requisitos

Certifique-se de ter instalado em sua máquina:
*   [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
*   Um gerenciador de pacotes (`npm`, `yarn` ou `pnpm`)

### Passo 1: Instalar as Dependências

Abra o terminal na pasta raiz do projeto e execute o comando correspondente ao seu gerenciador de pacotes:

```bash
# Usando npm
npm install

# Usando yarn
yarn install

# Usando pnpm
pnpm install
```

### Passo 2: Configurar a Chave de API do Gemini

Crie um arquivo chamado `.env.local` na raiz do projeto e defina a variável `VITE_GEMINI_API_KEY` com a sua chave de API obtida no Google AI Studio:

```env
VITE_GEMINI_API_KEY="SUA_CHAVE_API_DO_GEMINI"
```

> [!TIP]
> Caso queira obter uma chave de API do Gemini, acesse o painel do [Google AI Studio](https://aistudio.google.com/).

### Passo 3: Iniciar o Servidor de Desenvolvimento

Para rodar a aplicação em modo de desenvolvimento local:

```bash
# Usando npm
npm run dev

# Usando yarn
yarn dev

# Usando pnpm
pnpm dev
```

Após inicializar, a aplicação estará disponível para acesso em: [http://localhost:5173](http://localhost:5173)

### Passo 4: Compilar para Produção (Build)

Para realizar a análise estática e gerar a build de produção otimizada na pasta `/dist`:

```bash
# Usando npm
npm run build

# Usando yarn
yarn build

# Usando pnpm
pnpm build
```

---

## Como Testar o Fluxo Principal

Para validar todas as funcionalidades da aplicação de ponta a ponta, siga o roteiro de teste do fluxo principal a seguir:

### Passo 1: Criar uma Nova Simulação Financeira
1. Acesse a página inicial da aplicação: [http://localhost:5173]
Clique em **Nova Simulação** no menu superior'
2. O formulário guiará você passo a passo. Insira valores fictícios para teste, por exemplo:
   * **Renda Mensal Bruta**: R$ 5.000,00
   * **Custos Fixos**: R$ 2.000,00
   * **Dívidas e Parcelas**: R$ 500,00
   * **Nome da Meta**: Viagem para Londres
   * **Valor Total da Meta**: R$ 12.000,00
   * **Prazo da Meta**: 12 meses
   * **Prazo de Investimento**: 5 anos (ou outro de sua preferência)
3. No último passo, clique no botão **Gerar simulação 🚀** para disparar a análise e aguarde a chamada da IA.

### Passo 2: Analisar os Resultados e o Diagnóstico da IA
1. Você será redirecionado automaticamente para a página do resultado (com rota `/result/:id`).
2. Verifique na parte superior os cards com as contas calculadas (custo da meta, prazo e a economia recomendada mensalmente).
3. No centro da tela, verifique o card **Insight Financeiro Personalizado** contendo a análise gerada pela inteligência artificial (Viabilidade, Diagnóstico, Sugestões Práticas, Investimentos e Mensagem Final).

### Passo 3: Interagir com o Assistente Virtual (Chat Contextual)
1. Role a tela até a área inferior do card de diagnóstico, onde está escrito **💬 Converse com seu Assistente**.
2. No campo de texto que diz *"Faça uma pergunta sobre sua simulação..."*, digite uma pergunta relacionada aos dados inseridos. Exemplos:
   * *“Onde posso reduzir meus custos fixos para sobrar mais dinheiro?”*
   * *“Qual tipo de título de renda fixa você recomenda para guardar esses R$ 834 por mês?”*
3. Pressione a tecla **Enter** ou clique no botão de envio (ícone de avião de papel).
4. Verifique o estado visual animado *"Analisando sua pergunta..."*.
5. Assim que a IA retornar a resposta:
   * O chat rolará a tela de forma automática e suave para manter a resposta mais recente visível.
   * O balão cinza mostrará as dicas personalizadas da IA e as perguntas anteriores ficarão legíveis logo acima.

### Passo 4: Persistência e Navegação no Histórico
1. No menu do cabeçalho superior (Header), clique em **Histórico**.
2. Verifique se a simulação recém-criada (ex: *"Viagem para Londres"*) aparece listada com o resumo dos custos e prazo.
3. Atualize a página do navegador (F5). Note que as simulações persistem na tela.
4. Clique no botão **Ver detalhes** do card da simulação que você acabou de criar.
5. Verifique se o resultado carrega instantaneamente e se **todo o histórico da conversa** que você manteve com o chat assistente é recuperado intacto do `localStorage`.

### Passo 5: Testar a Exclusão Segura com Confirmação
1. Volte para a página de **Histórico**.
2. Clique no botão de lixeira vermelha (Excluir) em algum dos cards.
3. Note a abertura do **Modal personalizado de Confirmação** (com visual estilizado e animação de balanço no ícone de aviso). O modal exibirá de forma dinâmica o nome da meta que você escolheu (ex: *"Tem certeza que deseja excluir a simulação de meta "Viagem para Londres"?"*).
4. Clique em **Cancelar** e verifique se nada é removido.
5. Clique em **Excluir** e confirme se a simulação foi apagada da listagem física e do `localStorage` com sucesso.

---

## Desafios Concluídos e Implementações

Abaixo está a relação de todos os tópicos solicitados nos desafios e os trechos de código referentes à implementação executada na aplicação:

### Desafio 1 — Página de Histórico de Simulações

*   **Exibir um resumo de cada simulação salva**
    *   **Código:** Em [SimulationHistory.tsx] 
    buscamos todas as simulações persistidas na inicialização e repassamos ao componente de card:

        ```typescript
        const { getAllSimulations } = useSimulationStorage();
        const [simulations, setSimulations] = useState<SimulationRecord[]>([]);

        useEffect(() => {
            setSimulations(getAllSimulations());
        }, []);
        ```
    *   No componente [CardHistory.tsx], renderizamos as metas e os valores:
        ```tsx
        export function CardHistory({ simulation, onDelete }: CardHistoryProps) {
            return (
                <div className="rounded-2xl border border-(--border) bg-card p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.05)] ...">
                    {/* Exibe nome da meta, data, custo total, prazo e economia recomendada */}
                </div>
            );
        }
        ```

*   **Criar um layout responsivo seguindo o protótipo**
    *   **Código:** Aplicamos classes utilitárias de flexbox responsivo e layout em [CardHistory.tsx] (adapta-se de coluna para linha a partir de telas médias `md:`):
        ```tsx
        <div className="rounded-2xl border border-(--border) bg-card p-5 shadow-[4px_4px_18px_0px_rgba(0,0,0,0.05)] hover:shadow-[4px_4px_22px_0px_rgba(0,0,0,0.12)] hover:border-primary/25 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-4 w-full">
        ```

*   **Permitir excluir uma simulação do histórico**
    *   **Código:** Criamos um componente de modal reutilizável e estilizado [ConfirmModal.tsx] e o integramos na listagem [SimulationHistory.tsx]:
        ```typescript
        const handleDeleteClick = (id: string, e: React.MouseEvent) => {
            e.stopPropagation();
            const sim = simulations.find((s) => s.id === id);
            if (sim) {
                setSimulationToDelete(sim);
                setIsDeleteModalOpen(true);
            }
        };

        const handleConfirmDelete = () => {
            if (simulationToDelete) {
                deleteSimulation(simulationToDelete.id);
                setSimulations(getAllSimulations());
                setIsDeleteModalOpen(false);
                setSimulationToDelete(null);
            }
        };
        ```

*   **Navegar para a página de resultados ao clicar em "Ver detalhes" com os insights já gerados**
    *   **Código:** Adicionado botão de navegação usando o hook `useNavigate` em [CardHistory.tsx]:
        ```tsx
        <Button
           variant="secondary"
           onClick={() => navigate(`/result/${simulation.id}`)}
           title="Ver detalhes"
           icon={ExternalLink}
           className="text-xs font-semibold py-2 px-4 inline-flex items-center justify-center gap-1.5"
        >
           Ver detalhes
        </Button>
        ```

---

### Desafio 2 — Conversando com o Educador Financeiro

*   **Adicionar um campo de texto dentro do componente `AIInsightCard`**
    *   **Código:** Inserido container inline contendo o componente `<Input>` e o botão de envio no final de [AIInsightCardProps.tsx]
        ```tsx
        <div className="flex items-center gap-3 mt-4 w-full">
            <Input
                containerClassName="flex-1 shadow-none border border-border"
                placeholder="Faça uma pergunta sobre sua simulação..."
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSend();
                    }
                }}
                disabled={isWaitingForAi}
            />
            <Button
                icon={Send}
                variant="primary"
                className="rounded-2xl py-4 px-5 shrink-0 cursor-pointer disabled:opacity-50"
                title="Enviar pergunta"
                onClick={handleSend}
                disabled={isWaitingForAi || !question.trim()}
            />
        </div>
        ```

*   **Permitir que o usuário faça perguntas sobre a simulação realizada**
    *   **Código:** Atualizamos o array local de mensagens com o conteúdo digitado antes de iniciar a chamada da API do Gemini em [AIInsightCardProps.tsx]:
        ```typescript
        const userMsg: ChatMessage = {
            sender: "user",
            text: currentQuestion,
            timestamp: new Date().toISOString(),
        };

        const updatedMessages = [...chatMessages, userMsg];
        setChatMessages(updatedMessages);
        ```

*   **Retornar respostas claras da IA e exibi-las na tela seguindo o protótipo**
    *   **Código:** Implementado o método de chamada do Gemini com todo o contexto na função `getChatResponse` em [aiServices.ts]:
        ```typescript
        export const getChatResponse = async (
            simulation: any,
            initialInsight: InsightData,
            chatHistory: ChatMessage[],
            userQuestion: string
        ) => {
            // ... Extração segura de dados e concatenação do histórico ...
            const response = await callGeminiAPI(prompt);
            const text = response.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!text) {
                throw new Error("Erro ao gerar resposta do chat. Tente novamente.");
            }
            return text.trim();
        };
        ```
    *   E exibimos a lista de mensagens estilizada no componente:
        ```tsx
        chatMessages.map((msg, index) => (
            <div key={index} className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "self-end items-end" : "self-start items-start"}`}>
                <span className="text-sm text-muted-foreground mb-1 px-1">
                    {msg.sender === "user" ? "Você" : "Resposta da IA"}
                </span>
                <div className={`rounded-2xl px-4 py-3 text-sm ...`}>
                    {msg.text}
                </div>
            </div>
        ))
        ```

*   **Rolagem automática do scroll após resposta da IA**
    *   **Código:** Efeito automático que rola o contêiner de conversa (`scrollTop`) e o viewport principal (`scrollIntoView`) logo após o retorno em [AIInsightCardProps.tsx]:
        ```typescript
        useEffect(() => {
            const executeScroll = () => {
                if (chatContainerRef.current) {
                    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
                }
                messagesEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
            };

            executeScroll();
            const timer1 = setTimeout(executeScroll, 100);
            const timer2 = setTimeout(executeScroll, 300);

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
            };
        }, [chatMessages, isWaitingForAi]);
        ```

*   **Mostrar feedback de carregamento e erro para o usuário**
    *   **Código:** Feedback de digitação através de esferas com pulso de animação e mensagens de erro capturadas na chamada em [AIInsightCardProps.tsx]:
        {isWaitingForAi && (
            <div className="self-start flex flex-col max-w-[85%] items-start">
                <span className="text-[10px] text-muted-foreground mb-1 px-1">
                    Analisando sua pergunta...
                </span>
                <div className="rounded-2xl rounded-tl-none bg-secondary-button text-foreground border border-border px-4 py-3 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
            </div>
        )}
        ```
        ```typescript
        } catch (err) {
            console.error("Erro na resposta do chat:", err);
            const errorMsg: ChatMessage = {
                sender: "ai",
                text: "Desculpe, ocorreu um erro ao processar sua pergunta. Por favor, verifique sua conexão ou tente novamente.",
                timestamp: new Date().toISOString(),
            };
            setChatMessages([...updatedMessages, errorMsg]);
        }
        ```

*   **Permitir fazer múltiplas perguntas por simulação com exibição de todo o histórico**
    *   **Código:** Armazenamento da lista completa no estado `chatMessages` e renderização iterativa com `.map(...)` no corpo do card.

*   **Salvar as conversas no `localStorage` para consulta posterior**
    *   **Código:** Leitura da base de dados local no `useEffect` de montagem da tela e escrita segura no `handleSend` (recuperando o registro mais recente com `getFormData` para evitar concorrências):
        ```typescript
        // Carrega ao iniciar:
        useEffect(() => {
            const sim = getFormData(simulationId);
            if (sim && (sim as any).chatHistory) {
                setChatMessages((sim as any).chatHistory);
            } else {
                setChatMessages([]);
            }
        }, [simulationId, getFormData]);

        // Grava ao obter resposta da IA:
        const freshSim = getFormData(simulationId);
        if (freshSim) {
            const currentHistory = (freshSim as any).chatHistory || updatedMessages;
            const finalMessages = [...currentHistory, aiMsg];
            setChatMessages(finalMessages);
            updateSimulation(simulationId, {
                ...freshSim,
                chatHistory: finalMessages,
            } as any);
        }
        ```

---

## Aprendizados Durante o Desafio

Durante o desenvolvimento e resolução deste desafio, tive a oportunidade de adquirir e consolidar diversos conhecimentos técnicos relevantes em desenvolvimento front-end com React, integração com Inteligência Artificial e deploy de aplicações:

1.  **Integração Contextualizada de LLMs**: Aprendi como estruturar prompts complexos contendo múltiplos metadados locais (como valores numéricos da simulação) combinados com o histórico dinâmico de conversas anteriores. Isso me permitiu criar uma experiência de chat contextual contínua, onde o modelo da IA do Gemini se comporta de forma totalmente coerente com as entradas do usuário.

2.  **Gerenciamento de estado e uso de componentes personalizados**: Aprendi como gerenciar o estado de componentes complexos e como criar componentes reutilizáveis. Além disso, aprendi sobre o uso de componentes personalizados, como o AIInsightCard.tsx, que é responsável por exibir as respostas da IA e o feedback de carregamento. O uso de hooks como useEffect e useState foi fundamental para o gerenciamento do estado e para a atualização da interface do usuário.

3.  **Gerenciamento Robusto de Persistência com React**: Aprofundei minhas habilidades em registrar e atualizar estados complexos no `localStorage` sem gerar concorrências ou inconsistências. Entendi como recuperar e sincronizar o histórico de chat de forma estável, mitigando condições de corrida comuns em estados React assíncronos.

4.  **Aprimoramento de UX e Comportamentos de Tela**: Pratiquei o desenvolvimento de micro-interações como feedbacks dinâmicos de digitação (efeito bounce animado) e controle de foco inteligente através de múltiplos comportamentos de scroll suave (scrollTop da conversa e scrollInto View da tela) com atraso sincronizado ao ciclo do React.




