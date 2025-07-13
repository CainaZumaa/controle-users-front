# Sistema de Gerenciamento de Usuários

Um sistema completo de gerenciamento de usuários desenvolvido com Next.js, TypeScript e Material-UI, seguindo as melhores práticas de UX/UI e arquitetura de software.

## 🚀 Funcionalidades

### CRUD Completo de Usuários

- **Criar**: Adicionar novos usuários com validação de formulário
- **Ler**: Visualizar lista de usuários com busca e paginação
- **Atualizar**: Editar informações dos usuários existentes
- **Deletar**: Remover usuários com confirmação

### Interface Moderna e Responsiva

- Design glassmorphism com efeitos de blur
- Animações suaves e transições
- Layout responsivo para todos os dispositivos
- Tema escuro com gradientes personalizados

### Experiência do Usuário (UX)

- Notificações em tempo real para feedback
- Busca em tempo real
- Paginação otimizada
- Loading states e error handling
- Confirmações para ações destrutivas

## 🛠️ Tecnologias Utilizadas

### Frontend

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Framework CSS utilitário
- **Material-UI** - Componentes React
- **Axios** - Cliente HTTP

### Bibliotecas Principais

- `@mui/x-data-grid` - DataGrid para tabelas
- `@mui/icons-material` - Ícones Material Design
- `@emotion/react` & `@emotion/styled` - Styling

## 📁 Estrutura do Projeto

```
src/
├── app/
│   └── user/
│       └── page.tsx          # Página principal de usuários
├── components/
│   ├── UsersDataGrid.tsx     # Componente principal do CRUD
│   ├── UserForm.tsx          # Formulário de usuário
│   ├── Modal.tsx             # Modal reutilizável
│   ├── Notification.tsx      # Sistema de notificações
│   └── ...                   # Outros componentes
├── hooks/
│   └── useUsers.ts           # Hook personalizado para usuários
├── services/
│   └── userService.ts        # Serviços de API
├── types/
│   └── index.ts              # Definições de tipos TypeScript
└── styles/
    ├── theme.ts              # Configuração de tema
    └── animations.css        # Animações CSS
```

## 🎨 Design System

### Cores

- **Primary**: Azul (#096c9e) - Cor principal
- **Secondary**: Verde (#28a745) - Cor secundária
- **Success**: Verde (#10B981) - Sucessos
- **Error**: Vermelho (#EF4444) - Erros
- **Warning**: Amarelo (#F59E0B) - Avisos
- **Info**: Azul (#3B82F6) - Informações

### Efeitos Visuais

- **Glassmorphism**: Efeito de vidro com blur
- **Gradientes**: Transições suaves entre cores
- **Sombras**: Profundidade e elevação
- **Animações**: Transições fluidas

## 🔧 Configuração e Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

1. **Clone o repositório**

```bash
git clone <repository-url>
cd users_management
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

4. **Execute o projeto**

```bash
npm run dev
```

O projeto estará disponível em `http://localhost:5000`

## 📋 API Endpoints

O sistema espera os seguintes endpoints da API:

### Usuários

- `GET /api/users` - Listar usuários
- `GET /api/users/:id` - Buscar usuário por ID
- `POST /api/users` - Criar usuário
- `PUT /api/users/:id` - Atualizar usuário
- `DELETE /api/users/:id` - Deletar usuário
- `POST /api/users/:id/photo` - Upload de foto

### Formato de Resposta

```json
{
  "data": {
    "users": [
      {
        "id": "13",
        "nome": "user",
        "email": "user@example.com",
        "foto_perfil": null
      }
    ],
    "total": 1,
    "page": 1,
    "limit": 10
  },
  "message": "Usuários carregados com sucesso",
  "success": true
}
```

## 🎯 Funcionalidades Detalhadas

### DataGrid

- **Colunas**: ID, Nome, Email, Ações
- **Busca**: Filtro em tempo real por nome e email
- **Paginação**: Configurável (5, 10, 25, 50 itens)
- **Ordenação**: Por colunas específicas
- **Ações**: Visualizar, Editar, Deletar

### Formulário de Usuário

- **Validação**: Nome obrigatório, email válido
- **Upload**: Foto de perfil com validação
- **Estados**: Loading, erro, sucesso
- **Responsivo**: Adaptável a diferentes telas

### Sistema de Notificações

- **Tipos**: Success, Error, Warning, Info
- **Auto-remove**: Desaparece após 5 segundos
- **Posicionamento**: Canto superior direito
- **Animações**: Slide-in suave

## 🔒 Segurança e Boas Práticas

### Validação

- Validação de formulários no frontend
- Sanitização de dados
- Validação de tipos com TypeScript

### Tratamento de Erros

- Interceptors do Axios
- Mensagens de erro amigáveis
- Fallbacks para estados de erro

### Performance

- Lazy loading de componentes
- Otimização de re-renders
- Memoização com useCallback/useMemo

## 📱 Responsividade

O sistema é totalmente responsivo com breakpoints:

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

### Adaptações

- Layout flexível para diferentes telas
- Navegação otimizada para mobile
- Touch-friendly para dispositivos touch

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

**Desenvolvido usando Next.js, TypeScript e Material-UI**
