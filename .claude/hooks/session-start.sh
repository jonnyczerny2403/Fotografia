#!/usr/bin/env bash
# A atualização do skill registry exige JSON exclusivo em stdout.
set -Eeuo pipefail
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
if bash "$ROOT/scripts/bootstrap.sh" >&2; then
  printf '%s\n' '{"hookSpecificOutput":{"hookEventName":"SessionStart","reloadSkills":true,"additionalContext":"Taste Skill instalado e verificado. Confirme com chamada REAL de leitura os conectores Stripe e Netlify antes de anunciar prontidão; leia AGENTS.md e PROMPT_SITE_PREMIUM.md."}}'
else
  echo 'BLOQUEIO: bootstrap das skills falhou. Não prosseguir como se as skills estivessem prontas.' >&2
  exit 2
fi
