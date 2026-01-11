<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import { enhance } from "$app/forms";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Form from "../../../../components/form/index.js";
  import LocationForm from "../../form.svelte";
  import BackButton from "../../../../components/interactions/back-button.svelte";
  import Button from "../../../../components/interactions/button.svelte";
  import CheckLineIcon from "~icons/mingcute/check-line";
  import CloseLineIcon from "~icons/mingcute/close-line";
  import constants from "$lib/constants/core";

  // TODO(vxern): Kick the user out if they don't have permission to see the page.

  const { data } = $props();
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.locations.[location_id].review.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.locations.[location_id].review.title"]({
        location_name: data.location.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.session.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.locations.[location_id].review.title"]({
        location_name: data.location.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/locations/review")} />
    </Page.Actions>
    <section>
      <Form.Disabled>
        <LocationForm location={data.location} />
      </Form.Disabled>
      <Form.Root method="POST" action="?/review" class="flex flex-col gap-y-6">
        <input type="hidden" name="id" value={data.location.id} />
        <Page.Actions>
          <Button type="submit" icon={CheckLineIcon} colour="green">
            {m["components.form.accept"]()}
          </Button>
          <Button type="submit" name="reject" icon={CloseLineIcon} colour="red">
            {m["components.form.reject"]()}
          </Button>
        </Page.Actions>
      </Form.Root>
    </section>
  </Page.Contents>
</Page.Root>
