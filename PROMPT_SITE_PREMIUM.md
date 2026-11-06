# DIREÇÃO CRIATIVA E EXECUÇÃO — WEB PREMIUM CINEMATOGRÁFICA

> Este documento é o método de produção de sites e experiências web. O briefing específico do usuário tem prioridade sobre exemplos, escolhas de mídia e formas de apresentação daqui. **Não transforme os exemplos em um template.**

## Missão

Crie **o site real e funcional no repositório**, com presença visual de um estúdio de direção de arte digital de alto nível: identidade inconfundível, composição editorial sofisticada, material visual expressivo, tridimensionalidade quando solicitada e movimento cinematográfico significativo. O objetivo não é obter muitos efeitos; é fazer a experiência inteira parecer concebida, dirigida e executada com intenção.

**O maior erro a evitar:** produzir um layout convencional e depois acrescentar animações decorativas para poder afirmar que existe 3D, movimento ou design premium. Um hero de texto + bola colorida, poucos cartões, fades discretos e uma paleta elegante NÃO é o resultado pedido.

**Ordem de execução:** entender o universo do cliente → selecionar uma direção visual específica → garantir o conteúdo visual necessário → construir e observar a experiência-chave → expandir mantendo a mesma qualidade → testar, corrigir e publicar. Não pule a experiência-chave para adiantar seções ou deploy.

## 1. Entenda o que o visitante precisa VER e SENTIR

A partir da solicitação, descubra antes de implementar:

- **Assunto material ou conceitual:** o que o negócio oferece, como se reconhece e quais detalhes tornam essa oferta única. Para produtos físicos: formas, materiais, textura, embalagem, uso, escala e contexto. Para serviços e software: resultado, trabalho, interface, transformação, prova ou processo. Para experiências abstratas: qual fenômeno visual expressa sua identidade sem fingir representar um produto.
- **Promessa perceptível:** o que uma pessoa deve compreender e sentir no primeiro contato, antes de ler parágrafos.
- **Ação real do visitante:** explorar, comprar, reservar, conversar, descobrir ou entender algo.

Se o usuário forneceu fotos, identidade, produtos ou telas, **esses materiais são a referência de verdade**. Não altere seu significado. Não invente marca, produtos ou resultados. O exemplo de uma açaiteria não é instrução para fazer todos os sites sobre comida: é um teste de fidelidade — uma esfera roxa não é uma tigela de açaí reconhecível.

**A quantidade de imagens pode ser zero, uma ou muitas.** A quantidade de seções, cards e cenas também é consequência da ideia e do conteúdo, nunca uma meta. Um site tipográfico ou de software pode funcionar sem fotos; uma marca que vende produtos concretos normalmente precisa mostrá-los claramente, seja por foto, vídeo ou objeto 3D convincente. Nenhum preenchimento genérico é aceitável.

## 2. O Taste Skill deve gerar DECISÕES, não uma página vazia

Use as duas skills já instaladas, sem reinstalar ou alterar seus arquivos:

- `.claude/skills/design-taste-frontend/SKILL.md`: direção de arte principal; execute o fluxo aplicável de `scripts/draw.mjs`, consulte os exemplos e use as referências relevantes de composição, tipografia, imagens, movimento, cenas e crítica.
- `.claude/skills/high-end-visual-design/SKILL.md`: complemento, sem substituir a direção da principal.

**Não diga apenas “usei a skill”.** Transforme sua saída em escolhas verificáveis: uma ideia de composição, tratamento de mídia, sistema tipográfico, organização de espaços, contraste de escala e gramática de transições. Se a direção sorteada não valoriza o assunto, redesenhe-a antes de começar a programar. Não use o sorteio como desculpa para um resultado medíocre.

A skill possui regras e métricas de estilo próprias. Use-as como **referências e diagnósticos**, não como imposições cegas contrárias ao briefing. Se a composição pede nenhuma foto, não invente quatro imagens para satisfazer um contador; se pede uma experiência exuberante, não a esvazie para obedecer a uma estética minimalista. Registre a razão da exceção, preserve legibilidade e corrija os defeitos reais que o inspector revelar. Nunca adultere o inspector.

Antes de codar, examine referências pertinentes de experiências digitais premiadas, usando a biblioteca da skill e navegação disponível. **Extraia decisões, não copie uma página:** como as imagens dominam a tela, como a narrativa muda com a rolagem, como a tipografia se comporta, como a interação revela conteúdo. Faça uma interpretação própria ancorada no universo específico do cliente.

## 3. Resolva o material visual ANTES de desenhar o hero

Escolha o suporte necessário para a ideia: fotografia, vídeo, tipografia expressiva, composição gráfica, cena 3D, interface real, ilustração ou combinação deles. Não há cota por categoria. A escolha deve ser **apropriada ao assunto**, não o caminho mais fácil para a IA.

- Para produto físico, o produto precisa ser visualmente reconhecível, correto e desejável. Procure primeiro os materiais do cliente; se faltarem, busque recursos adequados e legalmente utilizáveis com as ferramentas existentes, inclusive `assets.mjs`. Se houver geração de imagem disponível, utilize-a quando apropriado. Verifique o arquivo realmente obtido e sua adequação antes de colocá-lo na página.
- Fotos genéricas, imagens sem relação, ícones e manchas coloridas **não substituem** produtos, ambientes ou trabalho concreto. Não apresente produto de terceiros como se fosse o produto original do cliente.
- Se só existir uma boa fotografia, ela pode sustentar uma direção extraordinária com composição, recorte, tipografia e movimento. Se nenhuma fotografia for necessária, crie uma linguagem visual deliberada e suficientemente rica usando outras mídias.
- Não reduza uma ideia difícil a esfera, cubo ou gradiente porque não achou o recurso. Troque o método de representação, procure melhor ou crie uma cena coerente. Não afirme que o recurso existe se não foi encontrado.

**Prova de fidelidade:** imagine o site sem título nem legendas. O assunto e o caráter do negócio ainda são percebidos? Se a proposta visual exige essa identificação e a resposta é não, **resolva o material**, não tente corrigir com um subtítulo.

## 4. Produza uma assinatura visual, não uma coleção de componentes

Formule uma ideia estética **singular para esse cliente** que conecte conteúdo, composição e comportamento: o que o visitante contempla inicialmente, o que a interação revela e como a experiência se transforma. Escolha as soluções que fazem sentido — não misture todos os efeitos disponíveis.

Desenhe a página como uma sucessão de **quadros compostos**. A abertura precisa ter um assunto dominante, relações fortes entre imagem e tipografia, hierarquia impecável e um enquadramento memorável. Use contraste entre momentos densos e tranquilos, escala editorial, ritmos espaciais intencionais e transições que continuem a mesma linguagem. O menu, o rodapé, os estados dos botões e a versão mobile também fazem parte da direção de arte.

Evite a gramática de template que IAs menores repetem: hero centralizado com frase genérica, fileira de cartões idênticos, muitos blocos de texto sem conteúdo, fundos repetidos, imagens minúsculas e seções que só mudam de cor. **Não substitua o template por um template alternativo de “site premiado”.** A arquitetura da página deve surgir da oferta real.

**Teste sem animação:** o quadro inicial, congelado, já transmite uma identidade sofisticada e revela algo específico do negócio? Se não, o problema é direção de arte; nenhum efeito vai salvá-lo.

## 5. Construa PRIMEIRO uma experiência-chave inteiramente funcional

Antes de montar todo o site, implemente seu momento visual principal (geralmente o hero ou a primeira revelação) **com conteúdo real, tipografia, interação e movimento juntos**. Abra a versão funcionando no navegador; não aceite uma prévia estática gerada por código. Corrija essa experiência até ela demonstrar o nível esperado. Só então expanda o resto do site.

**Tridimensionalidade real:** quando o briefing pede 3D — e, por padrão, neste projeto cinematográfico pede — implemente uma cena espacial efetiva, com geometria ou modelo, câmera, materiais/iluminação e relação perceptível com a narrativa. Three.js/R3F/WebGL ou tecnologia adequada. Um `transform: rotateY()`, sprite, vídeo ou uma esfera decorativa não cumprem esse papel. **O objeto não precisa ser o produto inteiro:** se não houver modelo de qualidade, mantenha o produto verdadeiro em fotografia ou vídeo e use o espaço 3D para apresentar, explorar, revelar ou contextualizá-lo. Não degrade o reconhecimento do produto para satisfazer a exigência técnica de WebGL.

**Movimento de alto impacto:** a experiência precisa ter uma transformação que o visitante realmente perceba: deslocamento espacial de câmera, mudança dramática de escala/enquadramento, abertura de mídia para tela cheia, revelação de camadas, transição de estados, composição que se reorganiza, narrativa tipográfica cinética ou outro recurso pertinente. O movimento deve ter propósito e resultado; “aparecer com opacity” não é uma cena cinematográfica.

**Interação real:** use scroll, ponteiro, toque e controles quando agregarem experiência. A rolagem deve, quando apropriado, comandar o progresso da transformação, não apenas acionar efeitos iguais. Para cenas de scroll, aplique `references/scenes.md`, infraestrutura e verificações da skill, ou uma implementação própria equivalente caso necessário. Prefira comportamento contínuo, fluido e reversível, sem sequestrar a rolagem nativa. Não esconda informação essencial atrás de animações longas.

**Não há número obrigatório de cenas.** Uma experiência curta pode concentrar sua excelência em uma sequência poderosa; uma narrativa longa pode exigir várias de tipos diferentes. O critério é a qualidade das mudanças de estado, não a contagem. Movimentos secundários, microinterações e mídia viva devem enriquecer a mesma linguagem, jamais substituí-la.

## 6. Diretriz específica para modelos de baixa capacidade

Não tente resolver tudo de uma vez. Trabalhe em **fatias pequenas, completas e observáveis**:

1. **Ler / escolher:** leia apenas a parte pertinente das skills, examine o briefing e selecione uma direção concreta. Evite despejar toda a documentação no contexto.
2. **Obter / verificar:** encontre ou construa o material visual de que a fatia precisa. Confira o recurso e sua identidade.
3. **Construir / executar:** implemente a composição com seu comportamento real; use as receitas e utilitários existentes, em vez de reinventar uma versão inferior.
4. **Olhar / corrigir:** abra o site real, capture o resultado e identifique o **maior problema perceptível**. Corrija-o antes de avançar. Não complete várias seções defeituosas para só depois “polir”.

Se o hero for genérico, se o produto não aparecer, se a cena 3D não existir, se o movimento não funcionar ou se houver apenas uma animação imperceptível, **a fatia não está pronta**. A solução é refazer a composição/experiência, não acrescentar efeitos cosméticos ou escrever que ela ficou premium.

Aproveite as ferramentas de browser, geração ou busca de mídia e implementação realmente disponíveis. Não presuma que instalar uma skill gera automaticamente imagens, modelos 3D ou uma direção artística pronta. Em caso de erro real de ferramenta, tente um método equivalente; nunca invente provas ou finja que renderizou.

## 7. Amplie o site sem perder o nível

Agora construa as demais seções com a mesma direção: conteúdo útil, ritmos diferentes, imagens e modelos apenas quando necessários, transições intencionais e controles funcionais. Preserve identidade, funcionalidade, URLs e dados existentes quando for um redesign. Evite texto inventado e elementos demonstrativos; conteúdo crítico ausente deve ser tratado com honestidade.

A versão mobile deve ser **composta especificamente**, não apenas espremida. Garanta toque, contraste, navegação por teclado, `prefers-reduced-motion`, fallback se WebGL ou CDN falharem, mídia otimizada e carregamento razoável. Efeitos devem continuar expressivos sem comprometer o uso.

Conserve os comportamentos operacionais de `AGENTS.md`: implementação no repositório, integração e deploy conforme disponibilidade/autorização e botão flutuante de WhatsApp configurável em `config/site.json`. Não invente número de WhatsApp nem realize operações financeiras sem autorização.

## 8. Inspeção crítica: julgue O QUE O VISITANTE VÊ

Na versão final de produção, execute o build e faça inspeção em navegador real. Use `scripts/lint.mjs`, `scripts/inspect.mjs` e, **quando houver cenas desse tipo**, `scripts/scenes.mjs` da skill. Leia suas saídas como diagnóstico, inclusive seus critérios eventualmente inadequados ao briefing. Examine as capturas finais e os diferentes estados de movimento; não confunda “script importado” com “efeito visível”.

Compare a execução à **ideia daquele projeto**, não a um checklist de elementos:

- **Identidade:** reconheço o negócio ou entendo o fenômeno que a página representa? Produtos físicos são apresentados de forma fiel?
- **Composição:** congelada, a página tem hierarquia, ritmo, tipografia, materialidade e intenção próprios ou parece um template?
- **Cinematografia:** a experiência se transforma de maneira substantiva e elegante ao interagir/rolar, ou apenas movimenta pequenos elementos sem impacto?
- **3D, quando exigido:** existe uma cena espacial convincente, realmente renderizada e integrada à ideia, ou um objeto geométrico irrelevante?
- **Funcionamento:** carregamento, responsividade, acessibilidade, links, ações e estados finais estão corretos?

Registre brevemente o que observou em `.site-quality/review.md`, com referência às capturas **reais** da sessão. As capturas produzidas diretamente pela skill ficam em `.taste-skill/inspect/` ou `.taste-skill/scenes/`; se usar outra ferramenta de navegador, salve suas capturas legítimas em `.site-quality/evidence/`. Para cada problema relevante, corrija a causa visual/funcional, abra novamente e compare. **Não altere o site para satisfazer contadores do inspector se isso destruir a direção de arte.** Não altere/desative o hook, não crie capturas falsas e não escreva revisão fictícia.

O hook de encerramento deste projeto verifica somente se houve mudanças reais, capturas recentes e revisão vinculada a elas; **ele não atribui nota estética nem impõe quantidade de imagens, cards, cenas ou imports**. A responsabilidade de criticar a aparência real e corrigir o resultado permanece com a execução visual. Não confunda o gate processual com um selo de qualidade artística.

## Entrega

Somente publique quando a versão estiver funcional e honestamente avaliada; valide o link de Netlify quando aplicável. Ao responder, seja conciso e descreva a entrega real, sem afirmar “Awwwards”, “3D” ou “cinematográfico” se o navegador não confirmou isso. Se houver bloqueio real, indique-o claramente, sem substituir o site por justificativas.

**Norte final:** o cliente não quer um site que contenha nomes de tecnologias ou cumpra contagens arbitrárias. Ele quer uma experiência visual autoral, reconhecível, tecnicamente competente, rica e memorável.
