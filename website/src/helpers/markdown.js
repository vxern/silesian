import { marked } from "marked";
import { clsx } from "clsx/lite";
import DOMPurify from "isomorphic-dompurify";
import { render } from 'svelte/server';
import Table from "../components/layout/table/index.js";

marked.use({
  renderer: {
    heading(token) {
      // TODO(vxern): Does every element need sanitising?
      const body = DOMPurify.sanitize(this.parser.parseInline(token.tokens));

      switch (token.depth) {
        case 1: {
          return `<span class="font-bold text-xl text-yellow-400">${body}</span><br />`;
        }
        case 2: {
          let colour;
          // TODO(vxern): This is temporary.
          switch (body) {
            case "Etymologijŏ":
            case "Etymologijo":
              colour = "text-green-500";
              break;
            default:
              colour = "text-blue-500";
              break;
          }

          return `<i class="font-bold text-lg ${colour}">${body}</i><br />`;
        }
        case 6: {
          return `<i class="text-zinc-500 pl-12">— ${body}</i><br />`;
        }
      }
    },
    list(token) {
      const body = token.items.map((item) => this.listitem(item)).join("");

      let type;
      let startAttr;
      if (token.ordered) {
        type = "ol";
        if (token.start !== 1) {
          startAttr = `start="${start}"`;
        } else {
          startAttr = "";
        }
      } else {
        type = "ul";
        startAttr = "";
      }

      return `
<${type} ${startAttr} class="w-full decoration-2 underline-offset-2 pl-8 ${clsx([token.ordered ? "list-decimal" : "list-disc"])}">\n
  ${body}\n
</${type}>\n`;
    },
    blockquote(token) {
      return `
<blockquote class="italic pl-4">
  <span class="text-zinc-500">„ </span>\n
  <span class="text-zinc-400">${this.parser.parse(token.tokens)}</span>
  <span class="text-zinc-500"> ”</span>
</blockquote>\n`;
    },
    table(token) {
      return `
<table class="border-separate border-spacing-1 text-left w-full">
  <thead class="text-blue-500">
    <tr>
      ${token.header.map((column) => this.tablecell(column)).join("\n")}
    </tr>
  </thead>
  <tbody>
    ${token.rows.map((column) => this.tablerow(column)).join("\n")}
  </tbody>
</table>
\n
`;
    },
    tablerow(token) {
      return `
<tr class=${true ? "bg-zinc-900" : "bg-zinc-910"}>
  ${token.map((column) => this.tablecell(column)).join("\n")}
</tr>
`;
    },
    tablecell(token) {
      // TODO(vxern): Add scope.
      if (token.header) {
        return `<th class="border-b p-2">${token.text}</th>`;
      } else {
        return `<td class="border-b p-2 border-b-zinc-800">${token.text}</td>`;
      }
    },
    em(token) {
      return `<em class="font-light">${this.parser.parseInline(token.tokens)}</em>`;
    },
    paragraph(token) {
      return `<p>${this.parser.parseInline(token.tokens)}</p>\n`;
    },
    strong(token) {
      return `<span class="font-extrabold">${this.parser.parseInline(token.tokens)}</span>`;
    },
    text(token) {
      if ("tokens" in token && token.tokens) {
        return this.parser.parseInline(token.tokens);
      } else if ("escaped" in token && token.escaped) {
        return token.text;
      } else {
        return DOMPurify.sanitize(token.text);
      }
    },
  }
});

function renderMarkdown(string) {
  return `<span class="leading-8 tracking-widest">${marked.parse(string)}</span>`;
}

export { renderMarkdown }