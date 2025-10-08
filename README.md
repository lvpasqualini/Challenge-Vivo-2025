# Challenge Vivo 2025

Um front-end moderno em **React + TypeScript** utilizando **Vite** para a interface de onboarding e gestão de tarefas da Vivo. Este projeto contém componentes reutilizáveis, layout responsivo e integração básica com APIs. O objetivo é oferecer uma experiência intuitiva tanto para colaboradores quanto para gestores.

## 🚀 Funcionalidades Principais

- **Painel do Colaborador:** Veja suas tarefas, acompanhe o progresso e interaja com treinamentos.
- **Painel do Gestor:** Crie e visualize tarefas, gerencie treinamentos e acompanhe o desempenho da equipe.
- **Componentes Reutilizáveis:** Navbar, Footer, Card, Container, Chat e outros elementos prontos para uso.
- **Integração HTTP:** Comunicação via Axios, centralizada em `lib/api.ts`.
- **Layout Responsivo:** Desenvolvido com Tailwind CSS para se adaptar a qualquer dispositivo.

## 🛠️ Tecnologias Utilizadas

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [Node.js](https://nodejs.org/) / npm

## 📁 Estrutura do Projeto

```
├── app         # Páginas principais (dashboard, início, erro, etc.)
├── components  # Componentes reutilizáveis
├── lib         # Cliente HTTP e helpers (ex.: api.ts)
├── router      # Configuração de rotas
├── public      # Assets públicos (imagens, ícones)
├── index.html  # HTML principal da aplicação
├── vite.config.ts # Configuração do Vite
├── package.json   # Dependências e scripts
```

## ⚡ Como Executar

1. **Pré-requisitos:**  
   - Node.js **16+**
   - npm, yarn ou pnpm

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn
   # ou
   pnpm install
   ```

3. **Execute o projeto:**
   ```bash
   npm run dev
   ```

4. **Acesse no navegador:**  
   Normalmente em [http://localhost:5173](http://localhost:5173)

## 📝 Observações

- O projeto é apenas a UI e utiliza APIs simuladas/localizadas no diretório `lib`.
- Para integração real, adapte as URLs e métodos conforme sua API.
- O layout é responsivo e pronto para ser customizado conforme necessidade.

## 📌 Contribuição

Sinta-se à vontade para abrir Issues ou Pull Requests!  
Sugestões, melhorias e correções são muito bem-vindas.

---

**Desenvolvido para o challenge Vivo 2025.**
