<script>
  import { m } from "$lib/paraglide/messages";
  import AddLineIcon from "~icons/mingcute/add-line";
  import Save2LineIcon from "~icons/mingcute/save-2-line";
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
    formatOption={(source) => source.name}
    options={() => fetch("/api/sources").then((response) => response.json())}
    component={Form.SourceSelectOption}
    value={entry?.source_id}
  />
</section>
<section class="flex gap-x-4">
  <Form.SelectElement
    name="categories[]"
    label={m["routes.entries.form.categories"]()}
    description={m["routes.entries.form.categories_description"]()}
    options={() => fetch("/api/categories").then((response) => response.json())}
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
  <Button type="submit" icon={AddLineIcon} colour="green">
    {m["routes.entries.form.save"]()}
  </Button>
  {#if !entry}
    <Button name="draft" type="submit" icon={Save2LineIcon} colour="zinc">
      {m["routes.entries.form.save_as_draft"]()}
    </Button>
  {/if}
</section>
