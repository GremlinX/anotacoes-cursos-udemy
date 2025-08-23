# ANOTAÇÕES SOBRE VUE.JS

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
