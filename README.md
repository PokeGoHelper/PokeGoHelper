# 🧭 PokéGo Helper — Pokémon GO Companion

## 🎯 Descrição do Projeto

A **Pokédex Interativa** é uma aplicação web desenvolvida com o objetivo de **auxiliar jogadores iniciantes de Pokémon GO** a conhecer melhor os Pokémon, entender suas forças e fraquezas e montar **times mais equilibrados** para batalhas.  

O sistema foi construído em **React**, consumindo dados da **PokéAPI**, e projetado com **design responsivo**, oferecendo uma navegação fluida e intuitiva em qualquer dispositivo.

---

## 🌟 Objetivos do Sistema

O sistema tem como finalidade fornecer informações detalhadas e acessíveis sobre os Pokémon do universo de Pokémon GO, além de **auxiliar o jogador na criação de times estratégicos**.

🎯 **Principais metas:**
- Facilitar o aprendizado dos iniciantes.  
- Tornar o processo de montagem de time mais estratégico e visual.  
- Servir como uma enciclopédia rápida e prática para jogadores experientes.

---

## ⚙️ Funcionalidades Principais

### 🔍 Pesquisa de Pokémon (Home)
- Pesquise Pokémon por **nome** ou **número da Pokédex**.  
- Exibe **imagem oficial**, **tipos**, **estatísticas base**, **fraquezas** e **resistências**.

### 📄 Página Individual do Pokémon
- Detalhes completos sobre o Pokémon selecionado:  
  - Tipos e vantagens/desvantagens  
  - Estatísticas base  
  - Evoluções  
  - **Moves (ataques)** do Pokémon GO  

### 🎒 Guia de Itens
- Explicação visual dos principais itens do jogo:
  - Pokébolas, Poções, Frutas, Passes, Incubadoras, etc.  
- Ideal para **novos jogadores entenderem a utilidade de cada item.**

### ⚔️ Team Builder
- Modo de batalha:  
  - **PVP** (3 Pokémon)  
  - **Raide** (6 Pokémon)  
- Escolha Pokémon para formar o time.  
- O sistema **analisa automaticamente as forças e fraquezas** do time criado.  

---

## 💻 Tecnologias Utilizadas

| Categoria | Tecnologias |
|------------|-------------|
| **Frontend** | React + Vite (ou CRA) |
| **Estilização** | CSS / Tailwind / Styled Components |
| **API** | [PokéAPI](https://pokeapi.co/) |
| **Hospedagem** | Vercel (ou similar) |
| **Versionamento** | Git + GitHub |

---

## 🧱 Estrutura de Páginas

| Página | Descrição |
|--------|------------|
| 🏠 **Home** | Pesquisa e listagem de Pokémon |
| 📄 **Detalhes** | Informações completas sobre um Pokémon |
| 🎒 **Itens** | Explicações dos principais itens do jogo |
| ⚔️ **Team Builder** | Criação e análise de times estratégicos |

---

## 🎨 Paleta de Cores

Baseada na logo do Pokémon GO, mas com tons neutros para destacar os Pokémon de forma equilibrada:

| Elemento | Cor | Código |
|-----------|-----|--------|
| Primária | Azul Escuro | `#1B2A41` |
| Secundária | Amarelo Suave | `#F6C800` |
| Acento | Azul Claro | `#4A90E2` |
| Fundo Principal | Cinza Claro | `#F4F4F4` |
| Texto Primário | Cinza Escuro | `#1E1E1E` |

---

## 🧠 Design e UX

- Layout **limpo e responsivo** (desktop, tablet e mobile).  
- Ícones minimalistas (*Lucide* / *Feather Icons*).  
- Cards e botões com **cantos arredondados** e **sombras suaves**.  
- Feedback visual em interações (hover, clique, loading).  
- **Dark Mode** opcional com fundo `#101820`.  

---

## 🚀 Como Executar o Projeto

```bash
# Clone o repositório
git clone https://github.com/PokeGoHelper/PokeGoHelper.git

# Acesse a pasta do projeto
cd pokegohelper

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev
