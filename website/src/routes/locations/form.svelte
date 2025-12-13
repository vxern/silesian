<script>
  import { m } from "$lib/paraglide/messages";
  import AddLineIcon from "~icons/mingcute/add-line";
  import Save2LineIcon from "~icons/mingcute/save-2-line";
  import Upload2LineIcon from "~icons/mingcute/upload-2-line";
  import Form from "../../components/form/index.js";
  import Button from "../../components/interactions/button.svelte";
  import { countriesEnum } from "$lib/database/schema";

  // TODO(vxern): Prefill from the object.
  const { location } = $props();
</script>

<section class="flex gap-x-4">
  <Form.TextElement
    name="name"
    label={m["routes.locations.form.name"]()}
    description={m["routes.locations.form.name_description"]()}
    value={location?.name}
    required={true}
  />
  <Form.SelectElement
    name="country"
    label={m["routes.locations.form.country"]()}
    description={m["routes.locations.form.country_description"]()}
    required={true}
    options={() =>
      countriesEnum.enumValues.map((country) => ({
        search: m[`countries.${country}`](),
        value: country,
        object: country,
      }))}
    component={Form.CountrySelectOption}
    value={location?.country}
  />
</section>
<section class="flex gap-x-4">
  <Form.TextElement
    name="description"
    label={m["routes.locations.form.description"]()}
    description={m["routes.locations.form.description_description"]()}
    value={location?.description}
  />
</section>
<section class="flex gap-x-4">
  {#if !location}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.create"]()}
    </Button>
    <Button name="draft" type="submit" icon={AddLineIcon} colour="yellow">
      {m["components.form.create_as_draft"]()}
    </Button>
    <section class="flex items-center gap-x-2">
      <input name="make_more" type="checkbox" checked class="size-4" />
      <label for="make_more">{m["routes.locations.form.make_more"]()}</label>
    </section>
  {:else if location.status === "draft"}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.publish"]()}
    </Button>
    <Button name="draft" type="submit" icon={Save2LineIcon} colour="yellow">
      {m["components.form.save"]()}
    </Button>
  {/if}
</section>
