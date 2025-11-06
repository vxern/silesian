<script>
  import { m } from "$lib/paraglide/messages";
  import AddLineIcon from "~icons/mingcute/add-line";
  import sources from "$lib/constants/sources";
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
  />
  <Form.TextElement
    name="link"
    label={m["routes.sources.form.link"]()}
    description={m["routes.sources.form.link_description"]()}
    type="url"
  />
  <Form.TextElement
    name="authors"
    label={m["routes.sources.form.authors"]()}
    description={m["routes.sources.form.authors_description"]()}
    multiple={true}
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
  />
  <Form.SelectElement
    name="source_language"
    label={m["routes.sources.form.source_language"]()}
    description={m["routes.sources.form.source_language_description"]()}
    formatOption={(language) => m[`languages.${language}`]()}
    options={() => languagesEnum.enumValues}
    component={Form.SimpleSelectOption}
  />
  <Form.SelectElement
    name="target_language"
    label={m["routes.sources.form.target_language"]()}
    description={m["routes.sources.form.target_language_description"]()}
    formatOption={(language) => m[`languages.${language}`]()}
    options={() => languagesEnum.enumValues}
    component={Form.SimpleSelectOption}
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
  />
  <Form.SelectElement
    name="access"
    label={m["routes.sources.form.access"]()}
    description={m["routes.sources.form.access_description"]()}
    formatOption={(access) => m[`accesses.${access}`]()}
    options={() => accessesEnum.enumValues}
    component={Form.SimpleSelectOption}
  />
  <Form.BooleanElement
    name="redistributable"
    label={m["routes.sources.form.redistributable"]()}
    description={m["routes.sources.form.redistributable_description"]()}
  />
</section>
<section class="flex gap-x-4">
  <Form.TextElement
    name="total_count"
    label={m["routes.sources.form.total_count"]()}
    description={m["routes.sources.form.total_count_description"]()}
    type="number"
  />
  <section class="flex-1"></section>
  <section class="flex-1"></section>
</section>
<section class="flex gap-x-4 items-start">
  <Button type="submit" icon={AddLineIcon} colour="green">
    {m["routes.sources.new.add"]()}
  </Button>
</section>
