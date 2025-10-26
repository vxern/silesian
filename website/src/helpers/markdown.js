import { marked } from "marked";
import { clsx } from "clsx";
import DOMPurify from "isomorphic-dompurify";

marked.use({
  renderer: {
    heading(token) {
      // TODO(vxern): Does every element need sanitising?
      const body = DOMPurify.sanitize(this.parser.parseInline(token.tokens));

      switch (token.depth) {
        case 1: {
          return `<b>${body}</b>`;
        }
        case 2: {
          return `<i class="text-blue-500">${body}</i>`;
        }
        case 6: {
          return `<i class="text-zinc-500 pl-12">— ${body}</i>`;
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

      return `<${type} ${startAttr} class="w-full decoration-2 underline-offset-2 pl-8 ${clsx([token.ordered ? "list-decimal" : "list-disc"])}">\n${body}\n</${type}>\n`;
    },
    blockquote(token) {
      return `<blockquote class="italic pl-4">\n<span class="text-zinc-500">„ </span><span class="text-zinc-400">${this.parser.parse(token.tokens)}</span><span class="text-zinc-500"> ”</span></blockquote>\n`;
    },
    paragraph(token) {
      return `${this.parser.parseInline(token.tokens)}\n`;
    },
    strong(token) {
      return `<u><b>${this.parser.parseInline(token.tokens)}</b></u>\n`;
    },
    text(token) {
      let contents; 
      if ("tokens" in token && token.tokens) {
        contents = this.parser.parseInline(token.tokens);
      } else if ("escaped" in token && token.escaped) {
        contents = token.text;
      } else {
        contents = DOMPurify.sanitize(token.text)
      }

      return contents;
    },
  }
});

function formatMarkdown(string) {
  return marked.parse(string);
}

export { formatMarkdown }