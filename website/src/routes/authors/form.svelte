<script>
  import { m } from "$lib/paraglide/messages";
  import AddLineIcon from "~icons/mingcute/add-line";
  import Save2LineIcon from "~icons/mingcute/save-2-line";
  import Upload2LineIcon from "~icons/mingcute/upload-2-line";
  import Form from "../../components/form/index.js";
  import Button from "../../components/interactions/button.svelte";

  // TODO(vxern): Prefill from the object.
  const { author } = $props();
</script>

<section class="flex gap-x-4">
  <Form.TextElement
    name="name"
    label={m["routes.authors.form.name"]()}
    description={m["routes.authors.form.name_description"]()}
    value={author?.name}
    required={true}
  />
  <Form.SelectElement
    name="location_ids[]"
    label={m["routes.authors.form.locations"]()}
    description={m["routes.authors.form.locations_description"]()}
    autocomplete={(query) =>
      fetch(
        `/locations/autocomplete?include_unpublished&query=${encodeURIComponent(query)}`
      )
        .then((response) => response.json())
        .then((locations) =>
          locations.map((location) => ({
            search: location.name,
            value: location.id,
            object: location,
          }))
        )}
    multiple={true}
    component={Form.LocationSelectOption}
    value={author?.locations?.map((location) => location.id)}
  />
</section>
<section class="flex gap-x-4">
  <Form.TextElement
    name="description"
    label={m["routes.authors.form.description"]()}
    description={m["routes.authors.form.description_description"]()}
    value={author?.description}
  />
</section>
<section class="flex gap-x-4">
  {#if !author}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.create"]()}
    </Button>
    <Button name="draft" type="submit" icon={AddLineIcon} colour="yellow">
      {m["components.form.create_as_draft"]()}
    </Button>
    <section class="flex items-center gap-x-2">
      <input name="make_more" type="checkbox" checked class="size-4" />
      <label for="make_more">{m["routes.authors.form.make_more"]()}</label>
    </section>
  {:else if author.status === "draft"}
    <Button type="submit" icon={Upload2LineIcon} colour="green">
      {m["components.form.publish"]()}
    </Button>
    <Button name="draft" type="submit" icon={Save2LineIcon} colour="yellow">
      {m["components.form.save"]()}
    </Button>
  {/if}
</section>
