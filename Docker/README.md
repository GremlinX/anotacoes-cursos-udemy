# Entendendo Docker

> [!WARNING]
> Documento em construção

Trata-se de um resumo baseado na minha interpretação, reunindo anotações de pesquisas, estudos e cursos sobre o tema.

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

--- 

## Imagem

Imagens em Docker são como um molde (templates/blueprints) dos containers que serão montados. É a partir de uma Imagem que definimos tudo o que o container precisa para executar, como bibliotecas, dependências, configurações, inclusive o código.

Essas imagens podem ser <ins>construídas manualmente</ins>, ou podem ser adquiridas no [Docker Hub](https://hub.docker.com)

## Container

É um exemplar em execução gerado a partir da imagem - ou seja, uma cópia funcional, viva e isolada daquele ambiente descrito na imagem

## Como construir uma Imagem?

Uma imagem, [como dito anteriormente](#imagem), contém todas as intruções para criá-la. Portanto, para isso, você pode seguir os seguintes passos (usando `Node` como exemplo):

1. Criar o arquivo `Dockerfile`.
   - Na pasta raiz do projeto, precisaremos criar um arquivo com nome `Dockerfile` (é um nome que será identificado pelo Docker, então não é recomendado variar esse nome).
   - Esse arquivo contém as instruções necessárias para se criar uma Imagem. `Dockerfile` não é a Imagem! 

2. Inicie com a instrução `FROM`.
   - Isso permite que você construa sua imagem baseada em outra imagem existente.  
     O Docker buscará essa imagem no Docker Hub (caso ainda não esteja disponível localmente) e fará o download de uma cópia idêntica para usá-la como base.
   - Você pode (e deve!) especificar a versão, para evitar problemas com atualizações ou incompatibilidades futuras.
   - Exemplo: `FROM <nome-da-imagem-base:versão>`

3. Aponte, através do comando `COPY`, quais arquivos locais devem ir para a imagem.
   - Esse comando espera dois parâmetros: <ins>de onde</ins> e <ins>para onde</ins>.
   - Exemplo: `COPY . /app`. o primeiro ponto indica que todos os arquivos da pasta raíz deve ser copiado para o diretório `/app` dentro da imagem Docker.

4. Executar a instalação das dependências do projeto com o comando `RUN`.
   - Antes de executarmos uma aplicação Node.js, é necessário instalar suas dependências usando o comando `npm install` (ou npm i).
   - No `Dockerfile`, essa instalação também é feita, mas através da instrução `RUN`, que executa comandos durante o processo de build da imagem.
   - Exemplo: `RUN npm install`
   - Isso faz com que as dependências sejam instaladas dentro da imagem Docker, no momento da construção da imagem.

> [!NOTE]
> - No passo 3, mencionei que a minha pasta raiz do meu projeto real deve ser a pasta `/app` da imagem. Portanto, para que a instrução `RUN` faça a instalação das dependências, será necessário apontar para `/app` também.
> - Portanto, após o comando `FROM`, vamos precisar usar o comando `WORKDIR` para apontar para `/app`.
> - A partir desse ponto, todos os comandos seguintes (como RUN, CMD, etc.) serão executados dentro de /app.

5. Exponha a porta usada pela aplicação com `EXPOSE`.
   - A instrução `EXPOSE` informa qual porta a aplicação irá escutar dentro do container.
   - Em termos mais simples, é como dizer ao Docker: "Ei, quando um container for criado com essa Imagem, a aplicação estará escutando na porta 8080".
  
> [!NOTE]
> - `EXPOSE` sozinho não torna a porta acessível fora do container
> - Para realmente conseguir acessar sua aplicação fora do container, você precisa mapear a porta usando o comando `docker run` com a flag `-p`.
> - Mas calma, ainda vamos chegar nessa etapa. É apenas uma nota para se ter informado.

6. Agora, precisamos executar o nosso projeto.
   - A execução de um projeto node pode variar dependendo do projeto, mas para fins de exemplo, usarei o comando `node server.js`.
   - Pode parecer que o comando `RUN` sirva aqui, mas na verdade não é esse comando que devemos usar. Isso acontece pois o comando `RUN` faria a execução do projeto na Imagem, mas isso é papel do Container.
   - De forma mais didática, a instrução `RUN` é usada durante o processo de build da imagem, e executa comandos que geram arquivos dentro da imagem (por exemplo, instalar pacotes ou compilar código).
   - Portanto, o comando adequado é `CMD`. Isso não fará a execução quando a Imagem for criada <ins>mas sim quando o Container for iniciado.</ins>
   - E a sintaxe também é diferente, utilizamos um array de argumentos.
   - Exemplo: `CMD ["node", "server.js"]`
   
> [!TIP]
> A instrução `CMD` não é executada na criação da imagem, mas apenas quando você roda um container a partir dela (por exemplo, com `docker run`).

### Como ficou a Imagem final:
```dockerfile
FROM node:18

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 8080

CMD ["node", "server.js"]
```

## Como executar um container baseado em uma Imagem personalizada?

[Nesta etapa](#como-construir-uma-imagem) definimos como será a nossa Imagem através de comandos dentro do `Dockerfile`. Agora precisamos criá-la com todas essas intruções. Isso é possível através do comando `docker build <caminho>`.

Após a execução desse comando, o terminal irá lhe indicar um id referente a sua Imagem criada. Use esse id para finalmente executar o container através do comando `docker run <id>`

> [!NOTE]
> Imagens e Containers não são só isso. Mais a frente terá explicações mais avançadas e detalhadas.

## Imagens são IMUTÁVEIS (READ-ONLY)❗

Este é um ponto importante do Docker, então vale a pena anotar isso no seu coração.

A Imagem contém seu código e, uma vez construída a imagem (`docker build caminho-da-imagem`), o código copiado não será alterado. Ou seja, o seu código desenvolvido localmente pode ser modificado, até mesmo apagado que a Imagem (e o código que ela copiou) não sofrerá quaisquer alterações.

## Image Layers (Camadas)

Uma Imagem no Docker é composta por <ins>camadas</ins>. Cada camada representa uma <ins>instrução</ins> no Dockerfile, ou seja, comandos como `RUN`, `FROM`, `COPY` etc.

Essas camadas são **READ-ONLY** e empilhadas em sequência para formar a Imagem final.

As camadas são "cacheadas", significa que, se não houver uma alteração em uma instrução ou os arquivos envolvidos, o Docker pode reutilizar essas camadas ao invés de recriar quando executar o comando `docker build <caminho>`. O cache acelera a construção da imagem.

## Exemplo
```dockerfile
FROM node:18              # Camada 1 - imagem base
WORKDIR /app              # Camada 2 - define o diretório de trabalho
COPY . /app               # Camada 3 - copia os arquivos para a imagem
RUN npm install           # Camada 4 - instala dependências
EXPOSE 8080               # Camada 5 - expõe a porta 8080
CMD ["node", "server.js"] # Camada 6 - comando para iniciar a aplicação
```

## Attached/Detacched Containers

### Attached Mode:

Este é o modo padrão de execução do Docker, o que significa que, caso você não adicione nenhum parâmetro específico, o container será executado em Attached Mode.

Enquanto o container estiver em execução, você poderá visualizar tudo o que está acontecendo no console, incluindo o output da aplicação, os logs do container e até mesmo as mensagens do próprio processo em execução. Ou seja, o terminal fica "preso" à execução do container.

Além disso, é possível interagir com o console enquanto ele está rodando, ou seja, você pode inserir comandos diretamente no terminal do container.

### Detached Mode:

Para executar o container em "Detached Mode", é necessário inserir a flag `-d`, conforme no exemplo: `docker run -d my-image`

Neste modo, o Docker executa o container em segundo plano. O container roda "nos bastidores", e o terminal fica disponível para outras tarefas, já que o terminal não fica "preso" ao processo do container.


## Interação (-it)

- Ao criar ou executar containers Docker, o parâmetro `-it` é usado para habilitar a interação com o terminal dentro do container. Esse comando é uma combinação de duas opções:
  
| Parâmetro | Significado   | Função                                                                                                                |
| --------- | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `-i`      | *interactive* | Mantém o **stdin** (entrada padrão) aberto, permitindo enviar comandos ao container.                                  |
| `-t`      | *tty*         | Aloca um **pseudo-terminal**, simulando um terminal real, o que melhora a exibição da saída (cores, formatação, etc). |

- Em conjunto, eles permitem que você interaja diretamente com o container, como se estivesse dentro do seu terminal.
- Use `-it` sempre que precisar interagir manualmente com o container, por exemplo:
  1. Acessar uma shell para depuração;
  2. Testar comandos dentro do container;
  3. Executar scripts de forma interativa.
