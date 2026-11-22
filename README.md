# Paginação SO

Simulador de algoritmos de substituição de páginas desenvolvido para a disciplina de **Sistemas Operacionais**.

O projeto tem como objetivo simular o comportamento dos principais algoritmos de substituição de páginas utilizados no gerenciamento de memória de sistemas operacionais, permitindo analisar o impacto do número de frames e comparar o desempenho de diferentes estratégias.

## Algoritmos implementados

O simulador implementará os seguintes algoritmos de substituição de páginas:

- **FIFO (First-In, First-Out)**
- **LRU (Least Recently Used)**
- **Ótimo (OPT)**
- **Segunda Chance / Clock**
- **NRU (Not Recently Used)**
- **LFU (Least Frequently Used)**
- **MFU (Most Frequently Used)**

## O que será implementado

O sistema deverá permitir:

- Informar o algoritmo de substituição utilizado;
- Informar a quantidade de frames disponíveis;
- Carregar um arquivo de referências `.trace`;
- Simular a execução das referências de páginas;
- Identificar acertos e faltas de página;
- Realizar as substituições de páginas de acordo com cada algoritmo;
- Calcular o número total de faltas de página;
- Calcular a taxa de faltas;
- Calcular o número de evicções;
- Calcular o número de escritas em disco;
- Exibir o conjunto residente final;
- Exibir o estado dos frames a cada referência através do modo detalhado;
- Comparar o comportamento dos algoritmos utilizando diferentes quantidades de frames.

O simulador também deverá permitir a utilização de diferentes arquivos `.trace`, não ficando limitado aos arquivos fornecidos no enunciado.

## Regras da simulação

A implementação seguirá as regras definidas no enunciado.

### Frames e evicção

Uma nova página ocupa o menor frame livre. Quando todos os frames estiverem ocupados, será selecionada uma página vítima de acordo com o algoritmo utilizado.

Só existe evicção quando todos os frames estão ocupados.

### Critério de desempate

Quando houver mais de uma página que possa ser escolhida como vítima, será removida a página que está residente há mais tempo.

### FIFO

Remove a página que está residente há mais tempo.

### LRU

Remove a página cujo último acesso ocorreu há mais tempo.

### Ótimo

Remove a página cujo próximo acesso está mais distante no futuro. Páginas que não serão mais acessadas possuem prioridade para remoção.

### Segunda Chance / Clock

Utiliza uma fila circular com um ponteiro iniciado no frame 0.

O bit `R` é definido como `1` quando a página é carregada e também a cada acesso. Durante a escolha da vítima, páginas com `R = 1` têm o bit zerado e o ponteiro avança até encontrar uma página com `R = 0`.

### NRU

O algoritmo utiliza os bits:

- `R`: referência;
- `M`: modificação.

O bit `R` é zerado a cada 4 referências. As páginas são classificadas utilizando:

```text
Classe = 2 × R + M
```

A página pertencente à menor classe será escolhida como vítima.

### LFU

Remove a página com o menor número de acessos desde que ela foi carregada.

### MFU

Remove a página com o maior número de acessos desde que ela foi carregada.

## Arquivos `.trace`

As referências de páginas serão armazenadas em arquivos de texto com extensão `.trace`.

Cada linha representa uma referência e pode conter:

```text
7
```

Uma referência sem letra representa uma operação de leitura.

Também é possível informar explicitamente o tipo de acesso:

```text
0 R
1 W
```

Onde:

- `R` representa leitura;
- `W` representa escrita.

Linhas iniciadas com `#` são consideradas comentários e serão ignoradas.

Exemplo:

```text
7
0 R
1 W
# comentário
2
3 R
```

A informação de escrita é utilizada principalmente pelo algoritmo **NRU** e para o cálculo das escritas em disco.

## Métricas

Ao final de cada simulação serão apresentadas as seguintes métricas:

### Faltas de página

Quantidade total de referências que não estavam presentes nos frames.

### Taxa de faltas

Percentual de referências que resultaram em falta de página.

```text
Taxa de faltas = (faltas de página / número de referências) × 100
```

### Evicções

Quantidade de páginas removidas dos frames.

### Escritas em disco

Quantidade de páginas modificadas que precisaram ser removidas da memória e, consequentemente, escritas em disco.

Páginas modificadas que permanecem nos frames ao final da simulação não são contabilizadas.

## Traços utilizados

O projeto deverá funcionar com qualquer arquivo `.trace` fornecido pelo usuário.

Entre os arquivos utilizados para os testes estão:

- `silberschatz2001.trace`
- `belady.trace`
- `escritas.trace`

O `silberschatz2001.trace` possui 20 referências e é utilizado para comparar os algoritmos com 3 e 4 frames.

O `belady.trace` será utilizado para analisar a **anomalia de Belady**.

O `escritas.trace` possui acessos de leitura e escrita e será utilizado para testar o comportamento dos bits de referência/modificação e o cálculo de escritas em disco.

## Interface web

A interface do projeto será desenvolvida utilizando **React com JavaScript**.

A aplicação terá como objetivo facilitar a configuração e visualização das simulações, permitindo ao usuário informar os parâmetros necessários e visualizar os resultados dos algoritmos.

Como funcionalidade adicional, poderá ser implementada uma visualização passo a passo da simulação, mostrando:

- Estado dos frames a cada referência;
- Acertos e faltas de página;
- Página que entrou;
- Página que foi removida;
- Avanço passo a passo da execução;
- Execução completa da simulação.

Essa funcionalidade corresponde à proposta de **simulação visual** apresentada como bônus no enunciado.

# Instalação

## Pré-requisitos

Para executar a interface do projeto, é necessário ter instalado:

- **Node.js**
- **npm**

Para verificar se estão instalados:

```bash
node -v
npm -v
```

## Clonando o projeto

Clone o repositório:

```bash
git clone <URL_DO_REPOSITORIO>
```

Entre na pasta do projeto:

```bash
cd paginacao-SO
```

## Instalando as dependências

Execute:

```bash
npm install
```

Esse comando instala todas as dependências necessárias para executar a aplicação React.

# Executando o projeto

Após instalar as dependências, execute:

```bash
npm run dev
```

O Vite iniciará o servidor de desenvolvimento e exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

Abra esse endereço no navegador para acessar a aplicação.

# Estrutura esperada

A estrutura do projeto poderá seguir uma organização semelhante a:

```text
paginacao-SO/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   ├── algorithms/
│   ├── services/
│   ├── App.jsx
│   └── main.jsx
├── traces/
│   ├── silberschatz2001.trace
│   ├── belady.trace
│   └── escritas.trace
├── package.json
└── README.md
```

A organização poderá ser modificada conforme as decisões de implementação da equipe.

# Exemplo de execução

Uma execução equivalente ao exemplo apresentado no enunciado seria:

```bash
./pager --algo lru --frames 3 --trace silberschatz2001.trace
```

Na aplicação web, esses mesmos parâmetros serão informados pela interface.

Por exemplo:

```text
Algoritmo: LRU
Frames: 3
Arquivo: silberschatz2001.trace
```

O resultado deverá apresentar informações como:

```text
Algoritmo: LRU
Frames: 3
Referências: 20
Faltas de página: 12
Taxa de faltas: 60.00%
Evicções: 9
Escritas em disco: 0
```

Esses valores correspondem ao resultado esperado apresentado no enunciado para o LRU com 3 frames e o traço `silberschatz2001.trace`.

# Análise da anomalia de Belady

O projeto também permitirá analisar a **anomalia de Belady**, utilizando o arquivo `belady.trace`.

No exemplo fornecido pelo enunciado, o FIFO apresenta:

| Frames | Faltas |
|---:|---:|
| 3 | 9 |
| 4 | 10 |

Ou seja, aumentar a quantidade de frames de 3 para 4 provoca um aumento no número de faltas de página.

O LRU e o algoritmo Ótimo não apresentam essa anomalia no exemplo apresentado.

# Desenvolvimento

O código será desenvolvido de forma modular, buscando separar:

- Interface da aplicação;
- Representação dos frames;
- Leitura das referências;
- Implementação dos algoritmos;
- Cálculo das métricas;
- Exibição dos resultados.

O código deverá ser devidamente comentado e acompanhado de uma documentação das decisões de implementação, incluindo as estruturas de dados utilizadas e, quando aplicável, os padrões de projeto adotados.

# Tecnologias

- **React**
- **JavaScript**
- **Vite**
- **HTML**
- **CSS**

---

**Disciplina:** Sistemas Operacionais  
**Atividade:** Paginação  
**Projeto:** paginacao-SO