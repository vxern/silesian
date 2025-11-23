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
  />
  <Form.SelectElement
    name="source_id"
    label={m["routes.entries.form.source_id"]()}
    description={m["routes.entries.form.source_id_description"]()}
    options={() =>
      fetch("/autocomplete/sources")
        .then((response) => response.json())
        .then((sources) => sources.map((source) => [source, source.id]))}
    component={Form.SourceSelectOption}
    value={entry?.source_id}
  />
</section>
<section class="flex gap-x-4">
  <Form.SelectElement
    name="categories[]"
    label={m["routes.entries.form.categories"]()}
    description={m["routes.entries.form.categories_description"]()}
    options={() =>
      fetch("/autocomplete/categories")
        .then((response) => response.json())
        .then((categories) =>
          categories.map((category) => [category.name, category])
        )}
    component={Form.SimpleSelectOption}
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
    value={entry?.contents ?? ""}
  />
</section>
<section class="flex gap-x-4">
  {#if !entry}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.create"]()}
    </Button>
    <Button name="draft" type="submit" icon={AddLineIcon} colour="yellow">
      {m["components.form.create_as_draft"]()}
    </Button>
  {:else if entry.status === "draft"}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.publish"]()}
    </Button>
    <Button name="draft" type="submit" icon={Save2LineIcon} colour="yellow">
      {m["components.form.save"]()}
    </Button>
  {/if}
</section>
