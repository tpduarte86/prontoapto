# Deploy Automático no Cloudflare Pages (prontoapto.com.br)

Este guia explica como colocar o **ProntoApto** no ar automaticamente em `prontoapto.com.br` a cada commit no repositório GitHub `prontoapto`.

---

## Método 1: Conexão Direta Git (Recomendado — Mais Simples e 100% Automático)

Como seu domínio `prontoapto.com.br` já está gerenciado pelo Cloudflare, o Cloudflare Pages cuida de tudo: build, SSL gratuito, CDN global e atualização a cada commit.

### Passo 1: Criar o Projeto no Cloudflare Pages
1. Acesse o painel do Cloudflare: [dash.cloudflare.com](https://dash.cloudflare.com).
2. No menu lateral esquerdo, clique em **Compute (Workers & Pages)** > **Create application** > aba **Pages**.
3. Clique em **Connect to Git** (Conectar ao Git).
4. Conecte sua conta do GitHub e selecione o repositório **`prontoapto`**.
5. Clique em **Begin setup** (Iniciar configuração).

### Passo 2: Configurar o Build
Preencha exatamente com os valores abaixo:
- **Project name**: `prontoapto`
- **Production branch**: `main` (ou `master`, dependendo da sua branch padrão)
- **Framework preset**: `Vite` (ou `None`)
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Environment variables** (Variáveis de ambiente):
  - `NODE_VERSION` = `20`

*(Os arquivos `.node-version` e `public/_redirects` já foram criados no repositório para garantir que tudo funcione perfeitamente).*

6. Clique em **Save and Deploy** (Salvar e implantar).
O Cloudflare fará o primeiro build e gerará um link temporário (ex: `prontoapto.pages.dev`).

### Passo 3: Ativar o Domínio Personalizado (`prontoapto.com.br`)
1. No projeto que acabou de criar no Cloudflare Pages, vá na aba **Custom domains** (Domínios personalizados).
2. Clique em **Set up a custom domain**.
3. Digite: `prontoapto.com.br`
4. Como o DNS do domínio já está no seu Cloudflare, ele vai reconhecer automaticamente e solicitar apenas que você confirme a adição dos registros CNAME. Clique em **Activate domain**.
5. *(Opcional)* Adicione também `www.prontoapto.com.br` seguindo o mesmo procedimento para redirecionamento.

Pronto! A partir desse momento:
- Qualquer `git commit` ou `git push` no repositório GitHub `prontoapto` irá disparar o deploy automaticamente.
- O site entrará no ar (Live) em cerca de 30 a 60 segundos com cache global e certificado SSL ativo.

---

## Método 2: Via GitHub Actions (Workflow Automatizado)

Se você preferir que o deploy seja orquestrado diretamente pelas Actions do GitHub:

O arquivo `.github/workflows/cloudflare-pages.yml` já está configurado no seu repositório. Para usá-lo:

1. No Cloudflare, obtenha:
   - **Account ID**: Disponível na barra lateral da sua conta Cloudflare ou na URL.
   - **API Token**: Em *Minha Conta > API Tokens > Create Token > Use o template "Cloudflare Pages"*.
2. No seu repositório GitHub (`prontoapto`):
   - Vá em **Settings** > **Secrets and variables** > **Actions**.
   - Crie as secrets:
     - `CLOUDFLARE_ACCOUNT_ID`
     - `CLOUDFLARE_API_TOKEN`
3. A cada commit na branch `main`, o GitHub Actions executará o build e enviará os arquivos para o Cloudflare Pages.

---

## O que já foi configurado no código para o Cloudflare:

1. **`public/_redirects`**:
   - Redireciona todas as rotas SPA (`/mapa`, `/empreendimentos`, `/mcmv`, `/simulador`, etc.) para `/index.html` com código 200, evitando erros 404 em recarregamento de página.
2. **`public/_headers`**:
   - Configurações de segurança (`nosniff`, `strict-origin`) e cache agressivo para assets estáticos.
3. **`functions/api/orulo/`**:
   - Funções serverless na Edge da Cloudflare para as rotas da API Órulo (`status`, `buildings`, `sync`), garantindo funcionamento sem necessidade de servidor Node.js dedicado.
4. **`.node-version` & `.nvmrc`**:
   - Força o Cloudflare a usar Node.js 20 para compilação do Vite e React 19.
