# Início rápido — Sites Premium Cinematográficos

Este ZIP é a **estrutura inicial de um repositório**, sem site e sem código de aplicação. Ele orienta um agente a criar sites premium com animações intensas, 3D, publicação automática e botão flutuante de WhatsApp.

## O que fazer (sem conhecimento técnico)

1. Entregue este ZIP ao Claude Code e peça: **"Crie um repositório vazio e coloque dentro dele todos os arquivos deste ZIP, inclusive a pasta `.claude` e os arquivos ocultos. Inicialize o projeto conforme `CLAUDE.md`. Depois crie [descreva o site]."**
2. Na primeira utilização, o agente baixa e instala automaticamente as duas skills oficiais do Taste Skill a partir do GitHub e verifica as integrações. Precisa de acesso à internet. Quando aparecer uma solicitação para conectar **Netlify** ou **Stripe**, autorize a conta correta.
3. Descreva suas modificações normalmente: "troque as cores", "adicione um produto", "coloque meu WhatsApp no número ...", "desative o WhatsApp". O agente altera e publica.

## Avisos importantes

- **Skills:** neste pacote as skills **não estão vendorizadas** por completo; o script de inicialização faz download e instala todos os arquivos oficiais na pasta `.claude/skills/`. A primeira inicialização depende de GitHub acessível. Isso evita incluir versões incompletas ou antigas.
- **Conectores:** `.mcp.json` já registra os servidores remotos oficiais de Netlify e Stripe, mas **nenhuma conta fica autenticada por meio do ZIP**. A autorização OAuth exige ação do titular. Depois, o agente confere com uma consulta de leitura.
- **Permissões:** `.claude/settings.json` contém a lista pedida, com um hook de inicialização e padrões corretos de permissão MCP; a segurança e as autorizações reais do ambiente continuam valendo. Em certos modos de sessão na nuvem, o Claude ignora hooks/permissões de projeto; por isso `AGENTS.md` também exige a inicialização expressamente.
- **WhatsApp:** vem habilitado por padrão, mas sem número inventado. Quando você fornecer seu número (com DDD), o agente o associa ao botão e publica.
- **Pagamentos:** só são ativados se o site precisar deles; o Stripe não é utilizado para criar cobranças sem pedido.

## Arquivos

- `AGENTS.md`: regras permanentes, inicialização, testes e publicação.
- `CLAUDE.md`: importa `AGENTS.md` com `@AGENTS.md` e orienta Claude.
- `PROMPT_SITE_PREMIUM.md`: prompt completo, com campo inicial para substituir.
- `.mcp.json`: Netlify e Stripe (oficiais, remotos).
- `.claude/settings.json`: permissões e hook SessionStart.
- `scripts/bootstrap.sh`: instala, repara e confere skills.
- `config/site.json`: configurações do site e WhatsApp, sem código do site.

Fontes originais: https://github.com/Leonxlnx/taste-skill e https://github.com/Leonxlnx/taste-skill-classics. Licenças das skills serão copiadas dos repositórios oficiais na instalação.
