# Vellum Odonto

Site institucional da clínica odontológica Vellum Odonto — página única com rolagem contínua.

Feito com React, Vite, TypeScript e Tailwind CSS, sem bibliotecas de UI, ícones ou animação.

## Rodando localmente

```bash
npm install
npm run dev      # http://localhost:5310
npm run build    # gera dist/
npm run preview  # http://localhost:5311
```

## Estrutura

- `src/data.ts` — todo o conteúdo do site (textos, tratamentos, depoimentos, contato).
- `src/sections/` — uma seção por arquivo, na ordem em que aparecem em `App.tsx`.
- `src/components/` — splash, navbar, botões e peças de animação reutilizáveis.
- `src/lib/smoothScroll.ts` — rolagem suave com inércia (roda do mouse), sem dependências.
- `src/index.css` — paleta, troca de tema entre seções e a biblioteca de animações (`fx-*`, `data-reveal`).

## Antes de publicar

Os itens marcados como `PROVISÓRIO` em `src/data.ts` são exemplos e precisam ser trocados pelos dados reais: endereço, telefone, WhatsApp, e-mail, responsável técnico (nome e CRO), números da clínica e depoimentos. O formulário de newsletter do rodapé ainda não está ligado a nenhum serviço.

A fonte Open Sauce One é carregada de onlinewebfonts.com sob licença CC BY 4.0, que exige crédito ao autor.
