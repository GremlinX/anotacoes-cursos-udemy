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
