# ANOTAÇÕES SOBRE VUE.JS

1. [Native Event Object](#native-event-object)
2. [2-Way Binding](#2-way-binding)

   * 2.1 [Comunicação de HTML para JS (v-on)](#comunicação-de-html-para-js-v-on)
   * 2.2 [Comunicação de JS para HTML (v-bind)](#comunicação-de-js-para-html-v-bind)
   * 2.3 [2-Way Data Binding (v-model)](#2-way-data-binding-v-model)
3. [Computed Properties](#computed-properties)
4. [Watchers](#watchers)
5. [Renderização Condicional](#renderização-condicional)
6. [Loop](#loop)
7. [Props](#props)
8. [Emits (Comunicação Filho para Pai)](#emits-comunicação-filho-para-pai)
9. [Provide + Inject](#provide--inject)
10. [Slots](#slots)

    * 10.1 [Slot Padrão](#slot-padrão)
    * 10.2 [Named Slot](#named-slot)
    * 10.3 [Scoped Slot](#scoped-slot)
11. [Routes](#routes)

    * 11.1 [Exemplo de Configuração de Roteamento](#exemplo-de-configuração-de-roteamento)
    * 11.2 [Navigation Guards](#navigation-guards)

12. [Proxy](proxy)

---

## Native Event Object

O uso de $ permite que eu tenha acesso ao event. Isso é definido pelo Vue.js.

```js 
<input type="text" v-on:input="setName($event, 'Gremlin')" v-on:keyup.enter="confirmName">
```

## 2-Way Binding

- **1. Comunicação de HTML para JS (v-on):** O v-on é usado para escutar eventos do DOM e chamar métodos no JavaScript. Então, quando um evento como click, input, change, etc., ocorre, você usa v-on para escutá-lo e reagir a ele com uma função no Vue.
- **2. Comunicação de JS para HTML (v-bind):** O v-bind é usado para vincular valores dinâmicos de dados (do JavaScript) a atributos do HTML.
- **2-Way Data Binding (v-model):** Agora, no Vue, o verdadeiro 2-way data binding é feito com o `v-model`. Ele permite que você vincule uma variável de dados com um elemento de entrada, e as mudanças em um lado (input ou variável) são refletidas no outro.

``` js
<!-- Exemplo de 2-way binding -->
<input v-model="message" />
<p>{{ message }}</p>
```

## Computed Properties

As computed properties são uma forma de calcular valores com base em dados reativos de maneira eficiente. Diferente das funções simples que podem ser usadas diretamente no template, as computed properties são cacheadas. Ou seja, o Vue vai recalcular o valor apenas quando uma das dependências (dados reativos) mudar. Isso ajuda a evitar re-renderizações desnecessárias e melhora o desempenho da aplicação.

### Exemplo:
```js
<template>
  <div>{{ fullName }}</div>
</template>

<script>
export default {
  data() {
    return {
      firstName: 'John',
      lastName: 'Doe'
    };
  },
  computed: {
    fullName() {
      return `${this.firstName} ${this.lastName}`;
    }
  }
};
</script>
```
> [!WARNING]
> - Nesse exemplo, a propriedade fullName será recalculada somente quando firstName ou lastName mudarem.
> - Se fosse uma função no template, o Vue chamaria essa função em cada renderização, o que poderia ser ineficiente.

## Watchers

O `watch` **reage a mudanças em dados e executa ações**. Não é usado para calcular valores, mas sim para fazer algo quando uma variável muda, como executar código adicional (por exemplo, buscar dados na API, fazer validações, etc.).
Em resumo: Reage a mudanças e executa ações (como chamadas à API ou mudanças de estado).

OBS.: 
- computed = calcula algo.
- watch = faz algo em resposta a uma mudança.

## Renderização Condicional
- `v-if`
- `v-else-if`
- `v-else`
- `v-show` tem a mesma ideia do `v-if`, mas ao invés de **adicionar e remover items do DOM** (o que pode custar desempenho da aplicação), `v-show` apenas revela/esconde usando CSS (display: none).

## Loop
- `v-for`:
```js
<div v-for="item in items">{{item}}</div>
<div v-for="(item, index) in items">{{item}}</div>
```

> [!WARNING]
> - No Vue, ao trabalhar com loops (como v-for), é fundamental utilizar a propriedade key. O key serve para atribuir uma identificação única a cada item repetido na lista. Isso permite que o Vue consiga rastrear e identificar com precisão qual item foi alterado ou removido. Como resultado, o Vue pode otimizar o processo de re-renderização, atualizando apenas o item específico que sofreu alteração, em vez de atualizar toda a lista, o que melhora a performance da aplicação.

## Props

Para falar de props precisamos falar sobre **componentes**; São, basicamente, códigos que contém seu html, css e js, e são usados para reaproveitar o código escrito fazendo com que seja renderizado em outras trechos de códigos.

Props é a forma abrevidade de **propriedade** dos componentes, isto é, podemos passar valores de forma dinâmica para os componentes. Em palavras mais técnicas: Props são uma forma de passar dados de um componente pai para um componente filho. Elas permitem que o componente filho receba valores dinâmicos, que podem ser usados em seu template ou lógica interna.

> [!NOTE]
> - Quando você passa a prop de um componente pai para um componente filho, a convenção no template é usar kebab-case (porque HTML é insensível a maiúsculas e minúsculas).
> - Já no script, dentro do componente filho, a prop é referenciada em camelCase, pois JavaScript distingue maiúsculas de minúsculas.

### Exemplo:

```html
<!-- Componente Pai -->
<meu-componente numero-telefone="123456789"></meu-componente>

// Componente Filho
export default {
  props: {
    numeroTelefone: String
  }
}
```

## Emits (Comunicação Filho para Pai)

No Vue.js, a comunicação filho para pai é feita usando a **emissão de eventos customizados**, onde o componente filho emite um evento e o pai escuta esse evento para executar uma função de callback, como uma forma de enviar dados ou notificar o pai sobre uma ação.

```html
<!-- Componente Filho -->
<template>
  <!-- Usando $emit() para disparar um evento, passando o nome do evento e os dados a ser enviado. -->
  <button @click="$emit('customEvent', { message: 'Olá do filho!' })">
    Enviar para Pai
  </button>
</template>

<!-- Componente Pai -->
<template>
  <!-- Ouvindo o evento emitido pelo filho usando @customEvent -->
  <!-- e definindo uma função para ser executada, handleChildEvent, quando o evento ocorrer. -->
  <ChildComponent @customEvent="handleChildEvent" />
</template>

<script>
export default {
  methods: {
    handleChildEvent(data) {
      console.log('Mensagem recebida do filho:', data.message);
    }
  }
}
</script>
```

## Provide + Inject

Algo que pode ser muito comum em projetos Vue é o `prop drilling` ou repassar informações de componentes para componentes. Ou seja, uma infomação que está, por exemplo, no componente raiz, precisa passar por um Componente A até chegar num Componente B ao qual de fato precisa.

`Provide` e `Inject` está aí para isso! Remover essa necessidade de passar informações para componentes intermediários e fazer uma comunicação direta.

### Exemplo 1
```js
// ParentComponent.vue
<script setup>
import { provide } from 'vue'
import ChildComponent from './ChildComponent.vue'

provide('message', 'Hello from ParentComponent')

</script>

<template>
  <div>
    <child-component />
  </div>
</template>
```

```js
//ChildComponent.vue
<script setup>
import { inject } from 'vue'
const injectedMessage = inject('message', 'This is the default message')
</script>

<template>
  <div>
    <p>{{ injectedMessage }}</p>
  </div>
</template>
```

É possível passar vários tipos de dados/informações entre componentes usando `provide` e `inject`. No exemplo a seguir, vamos passar uma função.

O que acontece aqui:
- O componente pai fornece a função greet usando provide.
- O componente filho injeta a função com inject('greet').
- O componente filho chama a função passando o parâmetro desejado e exibe o resultado.

### Exemplo 2
```js
// ParentComponent.vue
<script setup>
import { provide } from 'vue'
import ChildComponent from './ChildComponent.vue'

function greet(name) {
  return `Hello, ${name}!`
}

provide('greet', greet) // Fornece a função greet
</script>

<template>
  <div>
    <child-component />
  </div>
</template>
```

## Slots

`<slot></slot>` permite que você defina um ponto dentro do template de um componente onde o conteúdo dinâmico será inserido. Em Vue, você usa slots para inserir conteúdo dentro de um componente pai no local que você definir no componente filho.

- Slot: Um slot no Vue é um ponto de inserção de conteúdo dentro de um componente. O conteúdo é injetado pelo componente pai e renderizado no lugar do slot no componente filho.
- Named Slot: São slots com nome, <ins>permitindo que você insira conteúdo em lugares específicos<ins> do componente filho. O nome do slot é usado para identificar onde o conteúdo deve ser renderizado.
- Scoped Slots: Ao usar `v-slot`, você pode passar dados do componente filho para o conteúdo do slot.

### Exemplo 1
```html
<!-- Componente Pai -->
<template>
  <ChildComponent>
    <p>This is dynamic content passed from parent!</p>
  </ChildComponent>
</template>

<script setup>
import ChildComponent from './ChildComponent.vue';
</script>

<!-- Componente Filho -->
<template>
  <div>
    <h1>Content from Parent:</h1>
    <slot></slot>  <!-- O conteúdo passado para o slot será renderizado aqui -->
  </div>
</template>
```

### Exemplo 2
```html
<!-- Named slot sem usar "v-slot" -->
<slot name="header"></slot>
```
```html
<!-- Named slot com "v-slot" -->
<template v-slot:header>
  <h1>Header content</h1>
</template>
```
```html
<template v-slot:header="{ title }">
  <h1>{{ title }}</h1>
</template>
```

### Exemplo 3
```html
<!-- Componente Pai -->
<template>
  <ChildComponent>
    <template v-slot:default="{ title, description }">
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
    </template>
  </ChildComponent>
</template>

<!-- Componente Filho -->
<template>
  <slot :title="title" :description="description"></slot>  <!-- Passando múltiplos dados -->
</template>

<script setup>
import { ref } from 'vue';

const title = ref('Vue is Awesome!');
const description = ref('Scoped slots allow passing dynamic data to child content.');
</script>
```

## Routes

No Vue.js, o router é uma ferramenta que permite a <ins>navegação entre diferentes URLs<ins> em uma aplicação, possibilitando renderizar componentes específicos conforme a URL solicitada.

Com o Vue Router, podemos <ins>mapear URLs para componentes<ins>, criando rotas para páginas distintas em um projeto. Além disso, é possível utilizar `props` para permitir um **roteamento dinâmico**, passando parâmetros ou dados específicos para os componentes renderizados.

Para utilizar o Vue Router, é necessário instalar a biblioteca `vue-router` e configurá-la corretamente no projeto.

### Exemplo (com configuração)

```js
import Vue from 'vue';
import Router from 'vue-router';
import Home from './components/Home.vue';   // exemplo de componente
import About from './components/About.vue'; // outro componente

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',       // URL da rota
      name: 'home',    // nome da rota
      component: Home, // componente que será exibido
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
  ],
});
```

Podemos usar o componente próprio do Vue `<router-link>` para criar links de navegação dentro da aplicação.
```html
<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/about">About</router-link>
    <router-view></router-view>
  </div>
</template>
```

Podemos fazer redirecionamento programatico também, utilizando o método $router.push():
```html
this.$router.push('/about'); // Redireciona para a página /about
```

Outro recurso interessante de routes são **navigation guards**. Esta ferramenta permite criar uma segurança de acesso a rotas através de métodos do vue. Existem 3 tipos de guards:
1. Global Guards (`beforeEach()`, `afterEach()` e `beforeResolve()`)
   - Exemplo de uso: Necessidade de fazer login antes de acessar outras telas.
3. Per-Route Guards (`beforeEnter()`)
    - Exemplo de uso: Usuário precisa ter a devida autorização de acesso. (Administrador, Convidado, etc)
5. In-Components Guards (`beforeRouteEnter()`, `beforeRouteUpdate()`, e `beforeRouteLeave()`)
     - Eles são úteis para lógica mais específica, onde a navegação depende do estado ou do comportamento de um componente em particular. Como por exemplo, confirmar se deseja voltar/avançar navegação antes de salvar alguma informação.

```js
// Código omitido.
const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }
];

const router = new Router({
  routes
});

// Global Guard - antes de cada navegação
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('auth_token'); // Verifica se o usuário está autenticado (simulação simples)
  
  // Se a rota não for a página de login e o usuário não estiver autenticado
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login'); // Redireciona para a página de login
  } else {
    next(); // Ou "next(true). Permite a navegação para a próxima rota
  }
});
// Código omitido.
```

## Proxy

O sistema de reatividade do Vue é baseado no `Proxy`, uma funcinalidade nativa do JavaScript.

Isso permite que o Vue atualize automaticamente a interface do usuário (UI).

Em comparação do React, o a UI só será atualizada por meio de uma função de atualização do hook `useState`
