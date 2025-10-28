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
          return `<span class="font-bold text-xl text-yellow-400">${body}</span><br />`;
        }
        case 2: {
          let colour;
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

      return `<${type} ${startAttr} class="w-full decoration-2 underline-offset-2 pl-8 ${clsx([token.ordered ? "list-decimal" : "list-disc"])}">\n${body}\n</${type}>\n`;
    },
    blockquote(token) {
      return `<blockquote class="italic pl-4">\n<span class="text-zinc-500">„ </span><span class="text-zinc-400">${this.parser.parse(token.tokens)}</span><span class="text-zinc-500"> ”</span></blockquote>\n`;
    },
    paragraph(token) {
      return this.parser.parseInline(token.tokens);
    },
    strong(token) {
      return `<span class="font-bold underline">${this.parser.parseInline(token.tokens)}</span>`;
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

function renderMarkdown(string) {
  return `<span class="leading-8">${marked.parse(string)}</span>`;
}

export { renderMarkdown }