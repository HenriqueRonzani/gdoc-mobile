# G-Doc Mobile 📱

O **G-Doc Mobile** é a adaptação para dispositivos móveis da plataforma G-Doc, focada na gestão documental, visualização de serviços e acompanhamento de solicitações para o utilizador final.

## 🚀 Funcionalidades Principais

* **Módulo de Autenticação:**
    * Login seguro e gestão de sessão.
    * Fluxo de recuperação de conta passo-a-passo (*User Identity* -> *Verification* -> *Reset*).
* **Catálogo de Serviços:**
    * Visualização de serviços disponíveis para o utilizador.
    * Interface otimizada para consulta rápida.
* **Gestão de Solicitações:**
    * Listagem de solicitações já criadas.
    * Acompanhamento de estado (status) das solicitações em tempo real.
* **Formulários Inteligentes:**
    * Validação robusta com **Zod**.

## 🛠️ Stack Tecnológica

* **Core:** React Native (Expo) + TypeScript.
* **Formulários:** React Hook Form & @hookform/resolvers.
* **Validação:** Zod.
* **Navegação:** React Navigation.
* **UI/UX:** React Native Paper, Componentes customizados (GdocPrimaryButton, GdocTextInput, GdocForm).

## 📁 Estrutura de Pastas (Referência)

```text
src/
 ├── components/       # Componentes de UI (Botões, Inputs, Cards de Solicitação)
 ├── screens/          # Ecrãs (auth/recover, services/list, requests/history)
 ├── providers/        # Contextos Globais (Auth, Stepper Context)
 └── types/            # Tipagens TypeScript (Navigation, API Models)
