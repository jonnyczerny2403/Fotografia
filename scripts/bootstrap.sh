#!/usr/bin/env bash
# Instala as duas skills completas dos repositórios oficiais do Taste Skill.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SKILLS="$ROOT/.claude/skills"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# Baixa os repositórios inteiros, sem selecionar arquivos.
git clone --depth 1 https://github.com/Leonxlnx/taste-skill.git "$TMP/taste"
git clone --depth 1 https://github.com/Leonxlnx/taste-skill-classics.git "$TMP/classics"

# Copia o conteúdo integral de cada skill para a pasta reconhecida pelo Claude.
mkdir -p "$TMP/install/design-taste-frontend" "$TMP/install/high-end-visual-design" "$SKILLS"
cp -a "$TMP/taste/skills/taste-skill/." "$TMP/install/design-taste-frontend/"
cp -a "$TMP/classics/skills/soft-skill/." "$TMP/install/high-end-visual-design/"

# Confere a cópia completa antes de substituir qualquer instalação existente.
diff -qr "$TMP/taste/skills/taste-skill" "$TMP/install/design-taste-frontend" >/dev/null
diff -qr "$TMP/classics/skills/soft-skill" "$TMP/install/high-end-visual-design" >/dev/null

rm -rf "$SKILLS/design-taste-frontend" "$SKILLS/high-end-visual-design"
mv "$TMP/install/design-taste-frontend" "$TMP/install/high-end-visual-design" "$SKILLS/"

echo 'Taste Skill instalado integralmente em .claude/skills/.'
