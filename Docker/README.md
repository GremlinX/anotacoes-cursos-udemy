## Visão Geral

### O que é Docker?

Docker é uma ferramente que permite criar, empacotar e executar projetos (códigos) em <ins>ambientes isolados</ins> chamados "containers".

### O que são Containers?

O container de fato é um <ins>ambiente que contem tudo o que sua aplicação precisa para ser executada</ins>, como bibliotecas, frameworks, dependências, configurações etc.

O container funciona de forma <ins>isolada</ins>, isto é, <ins>funciona em qualquer lugar</ins> (computador local, servidor, nuvem...)

### Por quê usar Docker?

É muito comum em projetos da vida real a frase: "Na minha máquina funciona!".

O Docker serve para contornar esse problema devido aos seus ambientes isolados. Ou seja, Docker ajuda a garantir de que os ambientes de produção e desenvolvimento sejam idênticos.

### Máquinas Virtuais x Docker

- Máquina Virtual
  - Cada máquina virtual tem um sistema operacional completo (como se fosse um computador novo, ou seja, os recursos em cada MV são duplicados)
  - Isso tem um grande consumo de memória e recurso.
  - Tempo de inicialização pode ser lento devido a quantidade de recursos a serem inicializados.
 
- Docker
  - Somenta a instalação da aplicação é feita, o sistema operacional é do próprio computador.
  - Mais rápido e leve.
