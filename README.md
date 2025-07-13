# User Management Frontend

Interface moderna e responsiva para o sistema centralizado de gerenciamento de usuários.

## 📋 Sobre o Projeto

Frontend desenvolvido para integrar com a **API de Gerenciamento de Usuários**, oferecendo uma experiência de usuário moderna e intuitiva. Implementa autenticação tradicional e Magic Link, com animações suaves e design responsivo.

## 🚀 Tecnologias

- **React** - Biblioteca JavaScript
- **Next.js** - Framework React
- **Material-UI** - Componentes de UI
- **Emotion** - Estilização CSS-in-JS
- **Axios** - Cliente HTTP
- **React Hook Form** - Gerenciamento de formulários
- **JWT Decode** - Manipulação de tokens
- **Framer Motion** - Animações

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# API
NEXT_PUBLIC_API_URL=http://localhost:3000

# Ambiente
NODE_ENV=development
```

### 2. Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/control-users-front.git
cd control-users-front

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

## 🎯 Funcionalidades

### Autenticação

- **Login Tradicional**: Email e senha
- **Magic Link**: Autenticação sem senha
- **Persistência**: Tokens JWT no localStorage
- **Proteção**: Rotas autenticadas

## 🎯 Performance

### Otimizações Implementadas

- **Lazy Loading**: Componentes carregados sob demanda
- **Memoização**: Uso de `useMemo` e `useCallback`
- **Animações**: Otimizadas com `transform` e `opacity`

## 📱 Responsividade

- **Mobile First**: Design adaptativo
- **Breakpoints**:
  - Mobile: < 600px
  - Tablet: 600px - 960px
  - Desktop: > 960px

---

**Desenvolvido para o Projeto Frontend Acadêmico** | Equipe Frontend - Sistema de Gerenciamento de Usuários
