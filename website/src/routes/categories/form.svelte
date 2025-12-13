<script>
  import { m } from "$lib/paraglide/messages";
  import AddLineIcon from "~icons/mingcute/add-line";
  import Save2LineIcon from "~icons/mingcute/save-2-line";
  import Upload2LineIcon from "~icons/mingcute/upload-2-line";
  import Form from "../../components/form/index.js";
  import Button from "../../components/interactions/button.svelte";
  import { coloursEnum } from "$lib/database/schema";

  // TODO(vxern): Prefill from the object.
  const { category } = $props();
</script>

<section class="flex gap-x-4">
  <Form.TextElement
    name="name"
    label={m["routes.categories.form.name"]()}
    description={m["routes.categories.form.name_description"]()}
    required={true}
    value={category?.name}
  />
  <Form.SelectElement
    name="colour"
    label={m["routes.categories.form.colour"]()}
    description={m["routes.categories.form.colour_description"]()}
    required={true}
    options={() =>
      coloursEnum.enumValues.map((colour) => ({
        search: m[`colours.${colour}`](),
        value: colour,
        object: colour,
      }))}
    component={Form.ColourSelectOption}
    value={category?.colour}
  />
</section>
<section class="flex gap-x-4">
  <Form.TextElement
    name="description"
    label={m["routes.categories.form.description"]()}
    description={m["routes.categories.form.description_description"]()}
    value={category?.description}
  />
</section>
<section class="flex gap-x-4">
  {#if !category}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.create"]()}
    </Button>
    <Button name="draft" type="submit" icon={AddLineIcon} colour="yellow">
      {m["components.form.create_as_draft"]()}
    </Button>
    <section class="flex items-center gap-x-2">
      <input name="make_more" type="checkbox" checked class="size-4" />
      <label for="make_more">{m["routes.categories.form.make_more"]()}</label>
    </section>
  {:else if category.status === "draft"}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.publish"]()}
    </Button>
    <Button name="draft" type="submit" icon={Save2LineIcon} colour="yellow">
      {m["components.form.save"]()}
    </Button>
  {/if}
</section>
