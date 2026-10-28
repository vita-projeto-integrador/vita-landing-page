# ByteForge + VITA — Landing Page

Landing page da equipe do Projeto Integrador. Ela apresenta a empresa **ByteForge** e o seu produto, o **VITA**.

## Sobre

### ByteForge

A ByteForge é uma fábrica de software fictícia, criada pela equipe responsável pelo Projeto VITA. A marca nasce do conceito de uma forja de softwares: transformação, força e, ao mesmo tempo, simplicidade. A chama da criatividade e uma sólida base técnica forjam a excelência.

### VITA

O VITA é um aplicativo web e mobile (Android) de agricultura de precisão para o monitoramento fitossanitário da cultura da **tangerina ponkan**. Algoritmos de visão computacional fazem o pré-diagnóstico da **pinta preta dos citros** a partir de imagens capturadas pela câmera, permitindo a detecção precoce de sintomas em folhas e frutos.

## Identidade visual

Cada marca tem o seu manual de identidade visual. A página respeita as duas identidades, separando visualmente a empresa (ByteForge) do produto (VITA).

### ByteForge

**Paleta**

| Cor | Hex | Uso |
| --- | --- | --- |
| Bigorna | `#293462` | Primária: base, textos e fundos |
| Faísca | `#F7D716` | Destaque e estados ativos. Nunca em texto |
| Brasa | `#EC9B3B` | Destaque gráfico (fagulhas, ilustrações) |
| Chama | `#F24C4C` | Destaque gráfico, alertas e títulos grandes |

Proporção de uso de referência: Bigorna 55% · Branco 30% · Faísca 7% · Brasa 5% · Chama 3%.

**Tipografia**

- **Tiny5:** títulos e destaques, a partir de 24 px e apenas em frases curtas.
- **IBM Plex Sans:** texto corrido e interface.
- **IBM Plex Mono:** rótulos, valores e trechos de código.

**Convenções de estilo**

- Estética de pixel: cantos retos e sombras deslocadas, sem desfoque.
- Sobre Faísca, o texto é sempre Bigorna.
- Assinatura horizontal na barra de navegação e assinatura principal no rodapé.
- Na dúvida, use a versão positiva sobre fundos claros e a negativa sobre a Bigorna.
- O logotipo é um desenho em pixels: use sempre os arquivos oficiais, sem recompor com a fonte.

### VITA

**Paleta**

| Cor | Hex | Uso |
| --- | --- | --- |
| Laranja Ponkan | `#ED840B` | Primária: logotipo, ícone e destaques |
| Verde Folha | `#10B981` | Destaque: traço do "A", saudável, sucesso |
| Verde Folha Escuro | `#10AF7A` | Fundos verdes e estados de hover |
| Creme | `#FFFBEB` | Fundo principal |
| Grafite | `#1C1917` | Textos, ícones de interface e modo escuro |

Proporção de uso de referência: Creme 50% · Laranja 22% · Grafite 15% · Verde 10% · Verde escuro 3%.

**Tipografia**

- **Lexend:** títulos e números de destaque, nos pesos SemiBold (600) e Regular (400).
- **Inter:** texto corrido, rótulos e dados. Os rótulos usam Medium, caixa alta e espaçamento de +8%.

**Convenções de estilo**

- Formas arredondadas: botões em pílula e cantos suaves.
- Textos de interface sempre em Grafite, inclusive sobre o laranja.
- Laranja e verde nunca são usados como fundo um do outro.
- A assinatura com descritor marca a primeira aparição da marca, e o endosso ByteForge fica no encerramento.
- O logotipo é um desenho geométrico próprio: use sempre os arquivos oficiais, sem recompor "VITA" com a fonte.

## Estrutura do repositório

```
vita-landing-page/
├── index.html
├── favicon.ico
├── assets/
│   ├── css/
│   │   ├── main.css          # importa os demais arquivos na ordem
│   │   ├── base/             # cores, fontes, reset e estilos globais
│   │   ├── layout/           # header, rodapé e estrutura das seções
│   │   ├── components/       # botões, carrosséis, abas, cards, timeline, formulário
│   │   └── sections/         # estilos de cada seção da página
│   ├── js/
│   │   ├── utils.js          # funções compartilhadas
│   │   ├── modules/          # um comportamento por arquivo
│   │   └── main.js           # inicia os módulos
│   ├── fonts/                # Tiny5, IBM Plex Sans/Mono, Lexend e Inter + licenças OFL
│   └── img/
│       ├── brand/            # logotipos oficiais (SVG)
│       ├── favicon/          # favicons e ícone para iOS
│       ├── mockups/          # mockups da ByteForge e do VITA
│       ├── projects/         # logos dos projetos da empresa
│       ├── photos/           # fotos da seção do VITA
│       ├── testimonials/     # fotos dos depoimentos
│       ├── team/             # fotos da equipe
│       ├── illustrations/    # ilustrações
│       └── icons/            # ícones de contato
├── LICENSE
└── README.md
```

## Como rodar

A página é feita em HTML, CSS e JavaScript puros, sem dependências nem etapa de build.

1. Clone o repositório ou baixe o projeto.
2. Abra o `index.html` no navegador.

Para desenvolver, prefira um servidor local, que recarrega a página a cada alteração. Algumas opções:

- **VS Code:** extensão Live Server → botão direito no `index.html` → *Open with Live Server*.
- **Node.js:** `npx serve .`
- **Python:** `python -m http.server`

A publicação funciona diretamente no **GitHub Pages**, sem configuração extra.

## Licença

Distribuído sob a licença MIT (veja `LICENSE`). As fontes são distribuídas sob a SIL Open Font License, e os ícones do Font Awesome sob a CC BY 4.0.