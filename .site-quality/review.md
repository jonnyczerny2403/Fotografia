# Revisão visual — Ondra Fotografia

Capturas reais (Chromium headless, WebGL por SwiftShader) em `.site-quality/evidence/`, 1440x900 e 390x844.

## Observado
- (Atualização: animações reduzidas — sem cursor, grão, paralaxes, brilho de palavras; túnel mais suave.)
- **Hero / túnel 3D** (`desk-00-hero0.png`, `desk-01-hero0.4.png`, `desk-02-hero0.85.png`, `phone-00-hero0.png`): 12 fotos em planos WebGL; o scroll leva a câmera pelo corredor, fotos dobram com a velocidade, ficam P&B ao longe e coloridas de perto. Título entra por máscara. Corrigido: título não aparecia (conflito GSAP x CSS) e primeira foto ficava atrás do título — movida para a direita; no celular, acima do texto.
- **Manifesto** (`desk-03-hero1.2.png`): palavras acendem com a rolagem; contadores animam.
- **Portfólio horizontal** (`desk-07-port0.05.png`, `desk-08-port0.5.png`, `desk-09-port0.95.png`): trilho preso, fotos abrem por clip-path e têm paralaxe interna; termina no cartão "Agendar ensaio".
- **Foto que expande** (`desk-10-expand0.png` → `desk-12-expand1.4.png`): de quadro pequeno à tela cheia, com frase.
- **Serviços** (`desk-13-services.png`): lista com preços; foto segue o cursor no hover.
- **Mosaico 3D** (`desk-14-mosaic.png`), **Processo** (`desk-15-process.png`), **Sobre** (`desk-16-about.png`), **Contato** (`desk-17-contact.png`), **Rodapé** (`desk-18-footer.png`).
- Celular (`phone-*.png`): uma coluna, sem rolagem lateral, menu em tela cheia.
- Sem erros de console. Sem overflow horizontal.

## Exceções à skill (deliberadas)
- Pedido do usuário: "bem premium e com bastante animação" + exigência de 3D do projeto. A skill reserva efeitos para sites de tecnologia; aqui o 3D mostra as próprias fotos (o produto do fotógrafo), então foi mantido.

## Pendências
- Fotos são exemplos (Unsplash via picsum.photos) — trocar pelas do cliente.
- Nome "Ondra" e preços são provisórios.
- WhatsApp sem número: botões levam ao formulário até o número ser informado.
- Formulário usa mailto provisório (contato@ondra.example).
