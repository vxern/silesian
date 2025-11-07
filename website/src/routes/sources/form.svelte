<script>
  import { m } from "$lib/paraglide/messages";
  import AddLineIcon from "~icons/mingcute/add-line";
  import Save2LineIcon from "~icons/mingcute/save-2-line";
  import Form from "../../components/form/index.js";
  import Button from "../../components/interactions/button.svelte";
  import {
    licencesEnum,
    accessesEnum,
    orthographiesEnum,
    languagesEnum,
  } from "$lib/database/schema";

  // TODO(vxern): Prefill from the object.
  const { source } = $props();
</script>

<section class="flex gap-x-4">
  <Form.TextElement
    name="name"
    label={m["routes.sources.form.name"]()}
    description={m["routes.sources.form.name_description"]()}
    value={source?.name}
  />
  <Form.TextElement
    name="url"
    label={m["routes.sources.form.url"]()}
    description={m["routes.sources.form.url_description"]()}
    type="url"
    value={source?.url}
  />
  <Form.MultiTextElement
    name="authors"
    label={m["routes.sources.form.authors"]()}
    description={m["routes.sources.form.authors_description"]()}
    value={source?.authors}
  />
</section>
<section class="flex gap-x-4">
  <Form.SelectElement
    name="orthography"
    label={m["routes.sources.form.orthography"]()}
    description={m["routes.sources.form.orthography_description"]()}
    formatOption={(orthography) =>
      m[`orthographies.${orthography}`]() ?? orthography}
    options={() => orthographiesEnum.enumValues}
    component={Form.SimpleSelectOption}
    value={source?.orthography}
  />
  <Form.SelectElement
    name="source_language"
    label={m["routes.sources.form.source_language"]()}
    description={m["routes.sources.form.source_language_description"]()}
    formatOption={(language) => m[`languages.${language}`]()}
    options={() => languagesEnum.enumValues}
    component={Form.SimpleSelectOption}
    value={source?.source_language}
  />
  <Form.SelectElement
    name="target_language"
    label={m["routes.sources.form.target_language"]()}
    description={m["routes.sources.form.target_language_description"]()}
    formatOption={(language) => m[`languages.${language}`]()}
    options={() => languagesEnum.enumValues}
    component={Form.SimpleSelectOption}
    value={source?.target_language}
  />
</section>
<section class="flex gap-x-4">
  <Form.SelectElement
    name="licence"
    label={m["routes.sources.form.licence"]()}
    description={m["routes.sources.form.licence_description"]()}
    formatOption={(licence) => m[`licences.${licence}`]?.() ?? licence}
    options={() => licencesEnum.enumValues}
    component={Form.SimpleSelectOption}
    value={source?.licence}
  />
  <Form.SelectElement
    name="access"
    label={m["routes.sources.form.access"]()}
    description={m["routes.sources.form.access_description"]()}
    formatOption={(access) => m[`accesses.${access}`]()}
    options={() => accessesEnum.enumValues}
    component={Form.SimpleSelectOption}
    value={source?.access}
  />
  <Form.BooleanElement
    name="redistributable"
    label={m["routes.sources.form.redistributable"]()}
    description={m["routes.sources.form.redistributable_description"]()}
    value={source?.redistributable}
  />
</section>
<section class="flex gap-x-4">
  <Form.TextElement
    name="total_entry_count"
    label={m["routes.sources.form.total_entry_count"]()}
    description={m["routes.sources.form.total_entry_count_description"]()}
    type="number"
    value={source?.total_entry_count}
  />
  <section class="flex-1"></section>
  <section class="flex-1"></section>
</section>
<section class="flex gap-x-4 items-start">
  <Button type="submit" icon={AddLineIcon} colour="green">
    {m["routes.sources.form.save"]()}
  </Button>
  {#if !source}
    <Button name="draft" type="submit" icon={Save2LineIcon} colour="zinc">
      {m["routes.sources.form.save_as_draft"]()}
    </Button>
  {/if}
</section>
