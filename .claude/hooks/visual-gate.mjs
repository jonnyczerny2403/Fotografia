#!/usr/bin/env node
/**
 * Hook Claude Code: gate de processo, não de estética.
 * Exige alteração real + captura recente + revisão vinculada à captura.
 * Sem quotas de imagens de conteúdo, cards, cenas ou bibliotecas de 3D.
 * Hook interface: `start` (UserPromptSubmit), `stop` (Stop).
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const action = process.argv[2];
let input = {};
try { input = JSON.parse(fs.readFileSync(0, 'utf8')); } catch { /* sem payload */ }
const sessionId = String(input.session_id || 'local');
const hash = crypto.createHash('sha256').update(projectRoot + '\0' + sessionId).digest('hex').slice(0, 24);
const statePath = path.join(os.tmpdir(), `claude-site-quality-${hash}.json`);
const normalize = s => String(s ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
const cleanState = () => { try { fs.unlinkSync(statePath); } catch { /* ok */ } };

function isSiteDesignRequest(raw) {
  const p = normalize(raw).trim();
  if (!p || /^(o que|qual|quais|como|por que|porque|explique|pesquise|me fale|me diga|liste|resuma|analise)\b/.test(p)) return false;
  const site = /\b(site|website|landing|pagina|page|homepage|home|frontend|interface|layout|hero|web|visual|design)\b/.test(p);
  const work = /\b(cri[aeor]|constr[uo]|desenvolv|faca|faz|mont|produz|quero|preciso|gere|gerar|refa[cz]|recri|redesenh|redesign|reestiliz|reformul|renov|moderniz|transform|melhor|sofistic|premium|awwwards|cinematograf|anim|3d)\w*/.test(p);
  return site && work;
}
function emitJson(obj) { process.stdout.write(JSON.stringify(obj) + '\n'); }

if (action === 'start') {
  cleanState(); // Evita estado obsoleto caso o usuário mude de assunto.
  if (isSiteDesignRequest(input.prompt)) {
    fs.writeFileSync(statePath, JSON.stringify({ sessionId, startedAt: Date.now(), attempts: 0 }));
    emitJson({ hookSpecificOutput: {
      hookEventName: 'UserPromptSubmit',
      additionalContext: 'PROJETO VISUAL: aplique PROMPT_SITE_PREMIUM.md e o Taste Skill como direção de arte. Construa uma experiência-chave completa antes das outras seções; avalie captura real e movimento no navegador. Não faça layout genérico, não invente representação do produto e não otimize para contagem de fotos/efeitos. Registre inspeção e referências às capturas em .site-quality/review.md antes de concluir.'
    } });
  }
  process.exit(0);
}
if (action !== 'stop') process.exit(0);
let state;
try { state = JSON.parse(fs.readFileSync(statePath, 'utf8')); }
catch { process.exit(0); }
if (state.sessionId !== sessionId) process.exit(0);

const problems = [];
const cutoff = state.startedAt - 5000;
const ignored = new Set(['.git', '.claude', '.taste-skill', '.site-quality', 'node_modules', '.next', '.nuxt', '.output', 'dist', 'build', 'coverage', 'vendor', '.cache', 'tmp', 'temp']);
const visualPaths = ['.taste-skill/inspect', '.taste-skill/scenes', '.site-quality/evidence'];
const evidence = [];
let changedSource = false;
const isNew = p => { try { return fs.statSync(p).mtimeMs >= cutoff; } catch { return false; } };

function scan(rootDir, onFile, skipDirs = new Set(), limit = 5000) {
  let n = 0;
  function walk(dir, depth) {
    if (depth > 10 || n > limit || !fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (++n > limit) break;
      const p = path.join(dir, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) {
        if (!skipDirs.has(entry.name)) walk(p, depth + 1);
      } else if (entry.isFile()) onFile(p);
    }
  }
  walk(rootDir, 0);
}
scan(projectRoot, p => {
  if (!changedSource && /\.(html|css|scss|js|jsx|ts|tsx|vue|svelte|astro|glb|gltf|frag|vert|wgsl|png|jpe?g|webp|avif|svg|webm|mp4)$/i.test(p) && isNew(p)) {
    changedSource = true;
  }
}, ignored);
if (!changedSource) problems.push('Não identifiquei alteração recente no site. Implemente a alteração solicitada no código ou nos recursos do projeto.');

function hasImageSignature(p) {
  try {
    const { size } = fs.statSync(p);
    if (size < 1024 || size > 40 * 1024 * 1024) return false;
    const fd = fs.openSync(p, 'r');
    const b = Buffer.alloc(16);
    try { fs.readSync(fd, b, 0, 16, 0); } finally { fs.closeSync(fd); }
    return (b.subarray(0, 8).equals(Buffer.from([137,80,78,71,13,10,26,10])) ||
      (b[0] === 255 && b[1] === 216 && b[2] === 255) ||
      (b.toString('ascii', 0, 4) === 'RIFF' && b.toString('ascii', 8, 12) === 'WEBP'));
  } catch { return false; }
}
for (const dir of visualPaths) {
  scan(path.join(projectRoot, dir), p => {
    if (/\.(png|jpe?g|webp)$/i.test(p) && isNew(p) && hasImageSignature(p)) evidence.push(path.relative(projectRoot, p).split(path.sep).join('/'));
  }, new Set(), 2500);
}
if (evidence.length === 0) problems.push('Não há captura de tela recente da página em um dos diretórios de evidência. Abra o site no navegador, execute o inspector/capture da skill e examine o resultado. Nenhuma imagem DE CONTEÚDO é obrigatória; a captura é apenas evidência do teste.');

const reviewPath = path.join(projectRoot, '.site-quality/review.md');
let review = '';
if (isNew(reviewPath)) {
  try { review = fs.readFileSync(reviewPath, 'utf8'); } catch { /* ignore */ }
}
if (!review.trim() || !evidence.some(p => review.includes(p) || review.includes(path.basename(p)))) {
  problems.push('A revisão .site-quality/review.md precisa ser recente, relatar o que foi realmente observado no navegador e referenciar ao menos uma captura REAL gerada nesta tarefa. Não atribua nota inventada nem declare qualidade por contagem.');
}

if (problems.length === 0) {
  cleanState();
  process.exit(0);
}

// Evite loops se o agente está impossibilitado de gerar evidências (sem browser,
// infraestrutura indisponível, permissão bloqueada). A sessão não é aprovada:
// a conclusão deve explicitar a limitação, sem alegar site validado.
state.attempts = Number(state.attempts || 0) + 1;
if (input.stop_hook_active && state.attempts >= 3) {
  cleanState();
  emitJson({ systemMessage: 'A verificação visual não foi comprovada. Se uma ferramenta estiver indisponível, informe a limitação claramente; não declare entrega visual validada.' });
  process.exit(0);
}
fs.writeFileSync(statePath, JSON.stringify(state));
emitJson({ decision: 'block', reason: 'Antes de encerrar a implementação visual:\n- ' + problems.join('\n- ') + '\nInspecione e corrija o resultado perceptível; não acrescente mídias ou cenas apenas para satisfazer uma contagem. Se realmente bloqueado, relate a limitação sem alegar aprovação.' });
