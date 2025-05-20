# NewsExplorer

O projeto **NewsExplorer** é um aplicativo web onde o usuário possa pesquisar noticias de qualquer tema e salvar os artigo de interesse em sua conta. Seu layout é responsivo, adaptando-se a diferentes tamanhos de tela por meio de **unidades de medida relativas** e **media queries**, ajustando o design conforme os pontos de interrupção, garantindo que o layout seja consistente e não quebre. Foi desenvolvido utilizando **React**, com a estrutura separada em componentes **JSX (JavaScript XML)**, utilizando uma API teceiro para as noticias.

<img src="./src/images/screenshot_fullpage.png" alt="Captura de tela do projeto NewsExplorer" />

**Veja o projeto em funcionamento clicando [aqui]().**

## Tecnologias e Metodologias

- HTML5 semântico
- Metodologia BEM
- Flexbox
- Grid
- Text-overflow
- Hover
- Pseudo-classe
- Unidades de medida relativas
- Media queries
- React JS
- API

## Descrição das Tecnologias e Técnicas Utilizadas

### HTML Semântico

O **HTML semântico** foi aplicado para tornar o código mais legível e acessível, melhorando a compreensão e a estruturação do conteúdo.

### Metodologia BEM

A **metodologia BEM** foi adotada para melhorar a manutenção e a escalabilidade do código, tornando a estrutura de classes mais clara e intuitiva.

### Flexbox

O `flexbox` foi utilizado em conjunto com **unidades de medida relativas** para organizar o layout e otimizar a responsividade da página, garantindo uma boa experiência em diferentes dispositivos.

### Grid e Text-overflow

A propriedade `grid` foi usada para estruturar os cartões de noticias na seção news, criando um layout bem distribuído. A propriedade `text-overflow: ellipsis` foi aplicada juntoamente com `overflow: hidden`, ` line-clamp` e `white-space: nowrap` para truncar titulos e descrições que ultrapassam o limite do layout.

- Seção "News"

  <img src="./src/images/" alt="Captura de tela da seção News" />

### Pseudo-classes

As **pseudo-classes** `:hover` e `:active` foram aplicadas para melhorar a interatividade do site. A primeira altera o estilo dos elementos quando o cursor passa sobre eles, enquanto a segunda é ativada quando o elemento é clicado.

<p align="center">
<img src="./src/images/" alt="Captura de tela mostrando pseudo-classes">
</p>

### Media Queries

As **media queries** foram configuradas para garantir que o layout se ajuste corretamente em diferentes resoluções de tela. Foram definidos os seguintes pontos de interrupção:

- 320-768px (540px)
- 768-1280px (1024px)
- 1280px ou superior

  <img src="./src/images/" alt="Captura de tela de diferentes resoluções de tela" />

- Foi adicionado um botão hamburguer na barra de navegação para as telas menores.

<img src="./src/images/" alt="Captura de tela de diferentes resoluções de tela" width='49%'/> <img src="./src/images/screen-size.png" alt="Captura de tela de diferentes resoluções de tela" width='49%'/>

### React JS

No **React**, o código foi estruturado usando o formato **JSX** e separado em componentes que são montados e renderizados na página.

- **Popup para login e cadastro** - O evento `onClick()` foi aplicado no botão para manipular o estado das popups, utilizando a função `useState()`. Assim, ao clicar para abrir uma popup, o componente é montado e renderizado na página. Com o `useEffect()`, adiciona-se um ouvinte de evento `keydown` para fechar as popups ao pressionar a tecla "esc". Quando a popup é fechada, o ouvinte é removido com o método `removeEventListener()`.

  <img src="./src/images/" alt="Captura de tela de cadastro" width="49.4%"> <img src="./src/images/" alt="Captura de tela da login" width="49.4%">
  </p>
  <p align="center"><img src="./src/images/add-card.png" alt="Captura de tela da adição de novo cartão" width="49.4%"></p>

- **Validação de formulário** - Dentro do `useEffect()`, instanciou-se uma classe responsável por validar os formulários, manipulando o estado do `useState()` para melhorar a **UX** dos formulários. A classe desabilita o botão de **submit** quando o formulário contém entradas inválidas, sublinhando de vermelho o **input** inválido e exibindo uma mensagem explicativa abaixo do campo. O botão **submit** só é habilitado quando o formulário é validado corretamente.

  <img src="./src/images/form_validation.png" alt="Captura de tela da validação de formulário" />

- **Formulário de Busca** - Foi criado um formulário para buscar os artigos através de palavras chaves, e com o uso de `onChange()` e `onSubmit()` a palavra chave será armazenada e enviadas para solicitar a **API**, que serão retornada e depois enviada para fazer a solicitações dos artigos.

  <p align="center"><img src="./src/images/" alt="Captura de tela do formulário" width="100%"></p>

- **Preloader** - Foi utilizado um preloader, uma animação para indicar que esta sendo realizado uma busca, que é controlado por um estado do `useState()` que monta o preloader ao iniciar a solicitação e desmonta ao receber a resposta, exibindo a seção **news** com os resultados.

  <p align="center"><img src="./src/images/" alt="Captura de tela do preloader" width="100%"></p>

- **Cartões da seção news** - Utiliza-se o método `map()` para iterar sobre os cartões para montar o componente de cada um. Os dados são passados como `props` para renderizar o cartão na seção "news" da página, inclui um botão para salvar o artigo na conta e um botão ao final da seção para carregar mais artigos relacionadas, carregando de 3 em 3 os artigos relacionados.

  <p align="center"><img src="./src/images/" alt="Captura de tela da seção news" width="100%"></p>

- **Cartões não encontrado e erro no servidor** - Foi criado a lógica para mostrar uma mensagem no lugar dos cartões caso não encontre nenhum artigo ou caso de algum erro no servidor.

  <p align="center"><img src="./src/images/" alt="Captura de tela da seção news com mensagem de artigo não encontrado" width="49%"> <img src="./src/images/" alt="Captura de tela da seção news com uma mensagem de erro do servidor" width="49%"></p>

### API

Foi criada um modulo para interagir com a **NewsAPI**, uma **API** que retorna os artigos através de palavras chaves. Foi utilizado o método `fetch()`, permitindo realizar solicitações **GET** passando a palavra chave na **URL**, e recebe de resposta uma **array** contendo os artigos em ordem de relevância.

## Planos de melhoria do projeto

- Desenvolver o backend com o banco de dados para persistir os dados.

- Adicionar a API própria.

- Registrar e autenticar o usuário.

- Salvar os artigos na conta do usuário para ser exibido ao fazer o login.
