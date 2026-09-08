import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

// These informational pages need no server or client JavaScript on GitHub Pages.
const base = '/loopay-support';
process.env.GITHUB_PAGES = 'true';
await fs.mkdir('out/privacy', { recursive: true });
await fs.mkdir('.pages-build', { recursive: true });
const css = await postcss([tailwindcss()]).process(await fs.readFile('app/globals.css', 'utf8'), { from: path.resolve('app/globals.css') });
await fs.writeFile('out/styles.css', css.css);
await fs.copyFile('public/loopay-icon.png', 'out/loopay-icon.png');
await fs.writeFile('out/.nojekyll', '');
for (const [source, destination, title] of [
  ['app/page.tsx', 'out/index.html', 'Loopay — Support & Privacy'],
  ['app/privacy/page.tsx', 'out/privacy/index.html', 'Privacy policy — Loopay'],
]) {
  let text = await fs.readFile(source, 'utf8');
  text = text.replace("import Link from 'next/link';", `import React from 'react';\nfunction Link({href, ...props}) { return React.createElement('a', {...props, href: '${base}' + (href === '/' ? '/' : href + '/')}); }`);
  const compiled = ts.transpileModule(text, { compilerOptions: { jsx: ts.JsxEmit.ReactJSX, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
  const moduleFile = path.resolve('.pages-build', destination.includes('privacy') ? 'privacy.mjs' : 'home.mjs');
  await fs.writeFile(moduleFile, compiled);
  const { default: Page } = await import(pathToFileURL(moduleFile));
  const body = renderToStaticMarkup(React.createElement(Page));
  await fs.writeFile(destination, `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title}</title><meta name="description" content="Help with Loopay subscription tracking, reminders, your account, and privacy."><link rel="icon" href="${base}/loopay-icon.png"><link rel="stylesheet" href="${base}/styles.css"></head><body>${body}</body></html>`);
}
console.log('GitHub Pages export ready: out/index.html and out/privacy/index.html');
