# Testes das Etapas 1 a 4 — Pet Routine

> **Disciplina:** Desenvolvimento Mobile (2026.2.DM) — CESAR School
> **Projeto:** App de Gestão e Rotina Pet (`pet-routine-expo`)
> **Escopo deste documento:** validar o que foi implementado nas **Etapas 1, 2, 3 e 4** do Mini-Projeto.

A **Etapa 5** (GlueStack UI + NativeWind, `@expo/ui`, OTA e EAS Build) ainda **não foi implementada** — os itens correspondentes aparecem apenas como pendência no final deste documento.

---

## 1. Pré-requisitos

| Item | Requisito |
|---|---|
| Node.js | **22.11+** (o backend usa `node:sqlite`) |
| App Expo | `npm install` na raiz do repositório |
| Backend | `npm install` dentro de `backend/` |
| Dispositivo | Expo Go no celular, Android Emulator ou iOS Simulator |
| Câmera e GPS | **Aparelho físico** ou emulador Android com câmera/GPS virtuais (o simulador iOS não tem câmera real, mas a galeria funciona) |
| Rede | Celular físico e computador na **mesma rede Wi-Fi** |

---

## 2. Preparação do ambiente

### 2.1 Instalar dependências e conferir a tipagem

Na raiz do repositório:

```bash
npm install
npm run typecheck
```

Resultado esperado: nenhuma mensagem de erro do TypeScript.

### 2.2 Configurar a URL da API

```bash
cp .env.example .env
```

Ajuste `EXPO_PUBLIC_API_URL` no `.env` conforme o ambiente:

| Ambiente | Valor |
|---|---|
| iOS Simulator / Web | `http://localhost:3000` |
| Android Emulator | `http://10.0.2.2:3000` |
| Celular físico (Expo Go) | `http://SEU_IP_NA_REDE:3000` (ex.: `http://192.168.1.15:3000`) |

> ⚠️ Depois de alterar o `.env`, reinicie o Metro com `npx expo start -c` para que a variável seja recarregada.

### 2.3 Subir o backend

Em um terminal exclusivo:

```bash
cd backend
npm install
npm run dev
```

Resultado esperado:
- servidor em `http://localhost:3000`;
- banco `backend/pet-routine.db` criado automaticamente;
- conta demo criada: **`tutor@cesar.school`** / **`123456`** com **20 pets**.

Confirme o health check e o login:

```bash
curl http://localhost:3000/health

curl -s -X POST http://localhost:3000/api/auth/login \
  -H 'Content-Type: application/json' \
  -d '{"email":"tutor@cesar.school","password":"123456"}'
```

O segundo comando deve devolver um JSON com `token` e `user`.

### 2.4 Iniciar o app

Em outro terminal, na raiz:

```bash
npx expo start
```

Abra no Expo Go / emulador.

---

## 3. Passo a passo de teste

### 3.1 Etapa 1 — Expo Router e foto do pet

1. Abra o app **sem sessão ativa**.
   - **Esperado:** a tela **Entrar** aparece automaticamente (Auth Guard da Etapa 4). O app não abre mais em uma lista mockada.
2. Entre com a conta demo (`tutor@cesar.school` / `123456`).
   - **Esperado:** abas **Meus Pets** e **Estatísticas**.
3. Toque em um pet → botão **Trocar foto** (ou **Adicionar foto** no card).
   - **Esperado:** abre a rota modal de foto com uma prévia quadrada vazia.
4. Toque em **Escolher da galeria** → permita o acesso → escolha uma imagem.
   - **Esperado:** prévia quadrada (`1:1`) com a imagem recortada.
5. Toque em **Concluir**.
   - **Esperado:** volta para a tela anterior e a foto aparece no card e no detalhe do pet.
6. Repita com **Tirar foto** (câmera).
   - **Esperado:** captura, recorte quadrado e a mesma atualização da foto.
7. **Permissão negada (câmera):** toque em **Tirar foto** e escolha **Não permitir**.
   - **Esperado:** mensagem orientando tocar de novo e permitir — a galeria continua disponível.
8. **Permissão bloqueada (câmera):** negue novamente (ou bloqueie em Ajustes do sistema) e toque em **Tirar foto**.
   - **Esperado:** mensagem diferente, orientando abrir **Ajustes > Permissões > Câmera**.
9. Abra o seletor de imagem e **cancele**.
   - **Esperado:** nada muda e nenhum erro é exibido.
10. No cabeçalho da aba, toque em **Sobre**.
    - **Esperado:** rota `/sobre` com nome do app, versão, integrantes e resumo da arquitetura.

### 3.2 Etapa 2 — Abas, detalhe e notificações locais

1. Alterne entre as abas **Meus Pets** e **Estatísticas**.
   - **Esperado:** ícones corretos, contadores de pets/pendentes/concluídos/cancelados coerentes com a lista.
2. Na aba Meus Pets, digite parte do nome de um pet na busca.
   - **Esperado:** a lista filtra na hora e mantém o agrupamento.
3. Busque por um nome inexistente.
   - **Esperado:** mensagem de **busca sem resultado** (diferente da mensagem de conta sem pets).
4. Limpe a busca e confira os cabeçalhos de seção (**Pendentes**, **Concluídos**, **Cancelados**).
   - **Esperado:** seções agrupadas e fixas ao rolar (`stickySectionHeadersEnabled`).
5. Toque em **Cadastrar pet**.
   - **Esperado:** modal com nome, espécie, porte e idade.
6. Deixe o nome vazio e tente salvar.
   - **Esperado:** botão desabilitado.
7. Informe idade inválida (ex.: `abc` ou negativo).
   - **Esperado:** mensagem de validação e borda de erro.
8. Preencha dados válidos e salve.
   - **Esperado:** o pet aparece na lista e nas estatísticas; o registro persiste no backend.
9. Toque em um pet.
   - **Esperado:** abre `/pet/[id]` com foto, nome, espécie, porte, idade, status, coordenadas do último passeio (quando houver) e histórico local.
10. Toque em **Marcar passeio como concluído** / **Reabrir passeio**.
    - **Esperado:** status atualizado imediatamente no detalhe, na lista e nas estatísticas.
11. Toque em **Registrar passeio com GPS e foto** → **Obter localização** → **Tirar foto** → **Salvar**.
    - **Esperado:** coordenadas formatadas (lat, lng e ±precisão) e foto salvos no pet; status vira **Concluído**.
12. **GPS desligado / permissão negada / permissão bloqueada:** repita o passo 11 em cada cenário.
    - **Esperado:** três mensagens distintas orientando o tutor.
13. Toque em **Lembrar do passeio em 5s** e permita notificações.
    - **Esperado:** o app informa que o lembrete foi agendado; após ~5 s o banner aparece mesmo com o app aberto (foreground).
14. Toque no banner da notificação.
    - **Esperado:** o app navega automaticamente para os detalhes daquele pet.
15. Repita o passo 13 com o app em segundo plano e toque na notificação.
    - **Esperado:** o app abre no detalhe do pet correto.
16. Recuse a permissão de notificações (se possível em uma instalação limpa).
    - **Esperado:** mensagem orientando liberar em Ajustes > Permissões > Notificações.
17. Toque em **Excluir pet**.
    - **Esperado:** volta para a lista, o pet desaparece e o backend mantém a exclusão.

### 3.3 Etapa 3 — Tema, cronômetro e histórico local

**Tema claro/escuro**

1. Aba **Estatísticas** → card **Aparência** → ative **Tema escuro**.
   - **Esperado:** todas as telas, abas, cabeçalho, cards e barra de status mudam para o tema escuro, com contraste legível.
2. Desative e ative novamente.
   - **Esperado:** troca imediata, sem reiniciar o app.
3. Feche o app por completo e abra de novo.
   - **Esperado:** o tema escolhido é restaurado (persistido em `@petroutine:theme` no `AsyncStorage`).

**Cronômetro de passeio**

4. Abra o detalhe de um pet → **Cronômetro de passeio** → **Iniciar**.
   - **Esperado:** o tempo avança de segundo em segundo (`mm:ss`).
5. Toque em **Pausar**.
   - **Esperado:** o contador para imediatamente e não volta a subir sozinho.
6. Toque em **Iniciar** novamente e depois em **Zerar**.
   - **Esperado:** retoma do ponto pausado; **Zerar** volta para `00:00`.
7. Com o tempo em `00:00`, confira o botão **Salvar sessão no histórico**.
   - **Esperado:** desabilitado.
8. Inicie o cronômetro, aguarde alguns segundos e toque em **Salvar sessão no histórico**.
   - **Esperado:** sessão aparece no card **Histórico local de passeios** com duração `mm:ss` e data/hora.
9. Saia da tela no meio de uma contagem e volte.
   - **Esperado:** o cronômetro reinicia em `00:00` (componente desmontado) e o app não trava nem continua contando em segundo plano.
10. Feche o app por completo e abra de novo, mantendo a sessão.
    - **Esperado:** o histórico continua lá (SQLite local `petroutine.db`, tabela `passeio_logs`).
11. Abra o detalhe de **outro** pet.
    - **Esperado:** o histórico é específico daquele pet (não vaza entre pets).

### 3.4 Etapa 4 — Autenticação e integração com o backend

1. Faça logout (aba **Estatísticas** → **Sair da conta**) e feche/reabra o app.
   - **Esperado:** a tela de **Login** aparece e não é possível acessar `(tabs)`.
2. Tente entrar com senha incorreta.
   - **Esperado:** mensagem **“E-mail ou senha inválidos.”** vinda do backend.
3. Tente entrar com campos vazios.
   - **Esperado:** validação local pedindo e-mail e senha, sem chamada à API.
4. Entre com `tutor@cesar.school` / `123456`.
   - **Esperado:** carrega os **20 pets** da conta demo vindos do backend; aparece um spinner na primeira carga.
5. Feche e reabra o app.
   - **Esperado:** continua logado, **sem piscar** a tela de login (hidratação da `useAuthStore`).
6. Aba **Estatísticas** → confira **Conta do tutor**.
   - **Esperado:** nome e e-mail do usuário autenticado.
7. Faça logout e vá para **Criar conta**.
   - **Esperado:** cadastro com nome, e-mail e senha.
8. Tente criar conta com senha de 1 caractere.
   - **Esperado:** mensagem local de senha mínima (4 caracteres).
9. Crie uma conta com um e-mail novo.
   - **Esperado:** entra autenticado e a lista aparece vazia com a mensagem de **conta ainda sem pets** (sem os 20 pets da demo).
10. Faça logout e tente cadastrar o **mesmo e-mail** novamente.
    - **Esperado:** erro **“Este e-mail já está cadastrado.”**
11. Logue novamente com a conta demo e teste o CRUD completo:
    - criar pet → aparece na lista;
    - alternar status → atualiza na hora;
    - registrar passeio com GPS/foto → atualiza;
    - excluir pet → some da lista e das estatísticas.
12. **Persistência no backend:** depois de criar/alterar um pet, pare o backend (`Ctrl+C`), suba novamente (`npm run dev`) e faça pull-to-refresh na lista.
    - **Esperado:** as mudanças continuam lá (banco SQLite do backend).
13. **Backend fora do ar:** pare o servidor e faça pull-to-refresh.
    - **Esperado:** banner de erro legível na lista; o app não quebra.
14. **Sessão inválida (401/403):** com o app logado, reinicie o backend alterando o segredo JWT:
    ```bash
    cd backend
    JWT_SECRET=outro-segredo npm run dev
    ```
    Depois faça pull-to-refresh no app.
    - **Esperado:** o token deixa de valer, o `apiFetch` limpa a sessão e o Auth Guard devolve o tutor para **Login**.
    - Ao terminar, reinicie o backend sem a variável para voltar ao segredo padrão.
15. **Logout limpa tudo:** faça logout e confirme que, ao voltar para `(tabs)`, a lista de pets não reaparece em memória.

---

## 4. Casos de erro e permissões (resumo)

| Cenário | Onde testar | Comportamento esperado |
|---|---|---|
| Login inválido | `(auth)/login` | Mensagem do backend, sem travar |
| E-mail duplicado | `(auth)/signup` | “Este e-mail já está cadastrado.” |
| Senha curta | `(auth)/signup` | Validação local (mínimo 4) |
| Backend fora do ar | lista / ações | Banner de erro legível |
| Token expirado/inválido | qualquer rota autenticada | Sessão limpa e volta ao login |
| Galeria negada/bloqueada | `foto-do-pet` | Mensagens distintas, galeria/câmera conforme o caso |
| Câmera negada/bloqueada | `foto-do-pet` | Mensagens distintas com orientação em Ajustes |
| GPS desligado | registro de passeio | “GPS desligado. Ative a localização…” |
| GPS negado/bloqueado | registro de passeio | Mensagens distintas |
| Notificações negadas | lembrete de passeio | Mensagem para liberar em Ajustes |
| Busca sem resultado | Meus Pets | Estado vazio específico de busca |
| Conta sem pets | Meus Pets (conta nova) | Estado vazio de primeiro acesso |

---

## 5. Checklist de validação

### 5.1 Etapa 1 — Expo Router e foto

- [ ] `App.tsx` e `index.ts` não existem mais na raiz.
- [ ] Rotas `sobre`, `foto-do-pet` e o layout raiz funcionam.
- [ ] Galeria abre com recorte `1:1` e `quality 0.8`.
- [ ] Câmera abre no aparelho físico/emulador com câmera.
- [ ] Cancelamento do picker não mostra erro.
- [ ] Permissão **negada** e **bloqueada** têm mensagens diferentes.
- [ ] Foto escolhida aparece no card e no detalhe do pet.

### 5.2 Etapa 2 — Abas, detalhe e notificações

- [ ] Abas Meus Pets e Estatísticas com ícones.
- [ ] Busca por nome filtra corretamente.
- [ ] Estado vazio diferencia “conta sem pets” de “busca sem resultado”.
- [ ] Cadastro em modal valida nome e idade.
- [ ] Rota `/pet/[id]` abre o pet correto.
- [ ] Alternar status atualiza detalhe, lista e estatísticas.
- [ ] Registro de passeio com GPS e foto funciona (ou degrada com mensagem).
- [ ] Lembrete agendado para ~5 s.
- [ ] Tocar na notificação (foreground e background) abre `/pet/[id]`.
- [ ] Excluir pet atualiza a lista e o backend.

### 5.3 Etapa 3 — Tema, cronômetro e SQLite

- [ ] Tema claro/escuro aplicado em todas as telas.
- [ ] Tema persiste após fechar e reabrir o app.
- [ ] Cronômetro inicia, pausa, retoma e zera.
- [ ] Salvar com `00:00` está desabilitado.
- [ ] Sessão salva aparece no histórico com duração e data.
- [ ] Histórico persiste após fechar/reabrir o app.
- [ ] Histórico é separado por pet.
- [ ] Nenhum contador continua rodando ao sair da tela.

### 5.4 Etapa 4 — Autenticação e backend

- [ ] Abrir sem sessão redireciona para `/(auth)/login`.
- [ ] Login demo carrega os 20 pets.
- [ ] Sessão persiste após reabrir o app (sem piscar login).
- [ ] Cadastro cria conta e mostra lista vazia da nova conta.
- [ ] E-mail duplicado e senha curta exibem erros claros.
- [ ] Logout limpa sessão e pets em memória.
- [ ] CRUD completo de pets funciona e persiste no backend.
- [ ] Backend offline mostra erro legível, sem crash.
- [ ] Resposta `401/403` limpa a sessão e volta ao login.
- [ ] `npm run typecheck` passa sem erros.

### 5.5 Qualidade de código (regras da disciplina)

- [ ] Nenhum `any` nos arquivos das etapas.
- [ ] Nenhum `as` sem comentário justificando.
- [ ] Nenhum `JSX.Element` como tipo de retorno.
- [ ] Espaçamento entre irmãos com `gap` (sem `margin` nos filhos).
- [ ] Sombras com `boxShadow`.
- [ ] Toda lista tem `ListEmptyComponent`.
- [ ] Todo `addListener`/`setInterval` tem cleanup no `useEffect`.
- [ ] `contentFit` explícito em toda `Image` do `expo-image`.
- [ ] Arquivos de `src/app/` contêm apenas rotas e layouts.
- [ ] Nenhum `// TODO MPx` restante nos arquivos entregues.
- [ ] `USO_IA.md` atualizado a cada atividade com IA.

---

## 6. Pendências da Etapa 5 (ainda não implementadas)

Estes itens **não** entram no checklist acima porque pertencem à próxima etapa:

- [ ] Reformulação de UI/UX com **GlueStack UI + NativeWind**.
- [ ] Componente `native-pet-reminder-settings.tsx` com `<Host>` + `<Switch>` + `<Picker variant="segmented">`.
- [ ] Card de verificação **OTA** (`expo-updates`), bloqueado em `__DEV__`.
- [ ] `app.json` com `runtimeVersion`, `bundleIdentifier` e `package`.
- [ ] `eas.json` com perfis `development`, `preview` (APK) e `production`.
- [ ] Seção **“Reformulação de UI/UX”** no README com capturas antes/depois.
- [ ] Preenchimento completo de `docs/relatorio-uso-ia.md`.

---

## 7. Problemas comuns

| Sintoma | Causa provável | Solução |
|---|---|---|
| Login retorna erro de rede | URL da API incorreta para o ambiente | Conferir `.env` e reiniciar com `npx expo start -c` |
| Android Emulator não conecta | `localhost` no emulador é o próprio celular virtual | Usar `http://10.0.2.2:3000` |
| Celular físico não conecta | IP errado ou redes diferentes | Usar o IP da máquina na mesma Wi-Fi e liberar a porta 3000 |
| Backend não sobe | Node abaixo de 22.11 | Atualizar o Node |
| Dados “sumiram” | Conta diferente / conta nova sem pets | Conferir o e-mail logado em Estatísticas |
| Foto não aparece após reiniciar | URI local do cache do aparelho | Escolher a foto novamente (limitação atual: não há upload para o backend) |
| Histórico local vazio após reinstalar | `petroutine.db` fica no sandbox do app | É esperado: desinstalar apaga o banco local |
| Notificação não aparece no iOS Simulator | Permissões/simulador | Testar em aparelho físico ou Android Emulator |
| Tema não muda | App antigo em cache | Recarregar o bundle (`r` no Metro) e conferir o toggle em Estatísticas |
