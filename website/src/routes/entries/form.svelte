<script>
  import { m } from "$lib/paraglide/messages";
  import AddLineIcon from "~icons/mingcute/add-line";
  import Save2LineIcon from "~icons/mingcute/save-2-line";
  import Upload2LineIcon from "~icons/mingcute/upload-2-line";
  import Form from "../../components/form/index.js";
  import Button from "../../components/interactions/button.svelte";

  // TODO(vxern): Prefill from the object.
  const { entry } = $props();
</script>

<section class="flex gap-x-4">
  <Form.TextElement
    name="lemma"
    label={m["routes.entries.form.lemma"]()}
    description={m["routes.entries.form.lemma_description"]()}
    value={entry?.lemma}
    required={true}
  />
  <Form.TextElement
    name="normalised_lemma"
    label={m["routes.entries.form.normalised_lemma"]()}
    description={m["routes.entries.form.normalised_lemma_description"]()}
    value={entry?.normalised_lemma}
    required={true}
  />
  <Form.SelectElement
    name="source_id"
    label={m["routes.entries.form.source_id"]()}
    description={m["routes.entries.form.source_id_description"]()}
    required={true}
    autocomplete={(query) =>
      fetch(
        `/sources/autocomplete?include_unpublished&query=${encodeURIComponent(query)}`
      )
        .then((response) => response.json())
        .then((sources) =>
          sources.map((source) => ({
            search: source.name,
            value: source.id,
            object: source,
          }))
        )}
    component={Form.SourceSelectOption}
    value={entry?.source_id}
  />
  <Form.SelectElement
    name="author_ids[]"
    label={m["routes.entries.form.authors"]()}
    description={m["routes.entries.form.authors_description"]()}
    autocomplete={(query) =>
      fetch(
        `/authors/autocomplete?include_unpublished&query=${encodeURIComponent(query)}`
      )
        .then((response) => response.json())
        .then((authors) =>
          authors.map((author) => ({
            search: author.name,
            value: author.id,
            object: author,
          }))
        )}
    component={Form.AuthorSelectOption}
    multiple={true}
    value={entry?.authors}
  />
</section>
<section class="flex gap-x-4">
  <Form.SelectElement
    name="category_ids[]"
    label={m["routes.entries.form.categories"]()}
    description={m["routes.entries.form.categories_description"]()}
    autocomplete={(query) =>
      fetch(
        `/categories/autocomplete?include_unpublished&query=${encodeURIComponent(query)}`
      )
        .then((response) => response.json())
        .then((categories) =>
          categories.map((category) => ({
            search: category.name,
            value: category.id,
            object: category,
          }))
        )}
    component={Form.CategorySelectOption}
    multiple={true}
    value={entry?.categories}
  />
</section>
<section class="flex gap-x-4">
  <Form.MarkdownElement
    name="contents"
    label={m["routes.entries.form.contents"]()}
    description={m["routes.entries.form.contents_description"]()}
    previewMessage={m["routes.entries.form.preview_message"]()}
    required={true}
    value={entry?.contents ?? ""}
  />
</section>
<section class="flex gap-x-4">
  {#if !entry?.status}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.create"]()}
    </Button>
    <Button name="draft" type="submit" icon={AddLineIcon} colour="yellow">
      {m["components.form.create_as_draft"]()}
    </Button>
    <section class="flex items-center gap-x-2">
      <input name="make_more" type="checkbox" checked class="size-4" />
      <label for="make_more">{m["routes.entries.form.make_more"]()}</label>
    </section>
  {:else if entry.status === "draft"}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.publish"]()}
    </Button>
    <Button name="draft" type="submit" icon={Save2LineIcon} colour="yellow">
      {m["components.form.save"]()}
    </Button>
  {/if}
</section>
