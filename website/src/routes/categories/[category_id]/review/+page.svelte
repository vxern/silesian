<script>
  import { m } from "$lib/paraglide/messages";
  import { onMount } from "svelte";
  import { page } from "$app/state";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Form from "../../../../components/form/index.js";
  import Loading from "../../../../components/meta/loading.svelte";
  import CategoryForm from "../../form.svelte";
  import BackButton from "../../../../components/interactions/back-button.svelte";
  import Button from "../../../../components/interactions/button.svelte";
  import CheckLineIcon from "~icons/mingcute/check-line";
  import CloseLineIcon from "~icons/mingcute/close-line";
  import constants from "$lib/constants/core";

  // TODO(vxern): Kick the user out if they don't have permission to see the page.
  // TODO(vxern): Use load functions.

  let category = $state();
  async function fetchCategory() {
    const response = await fetch(`/api/categories/${page.params.category_id}`);
    category = await response.json();
  }

  onMount(() => {
    fetchCategory();
  });
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.categories.[category_id].review.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.categories.[category_id].review.title"]({
        category_name: category?.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.categories.[category_id].review.title"]({
        category_name: category?.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => window.history.back()} />
    </Page.Actions>
    {#if category}
      <section>
        <Form.Disabled>
          <CategoryForm {category} />
        </Form.Disabled>
        <Page.Actions>
          <Button
            icon={CheckLineIcon}
            onclick={() => window.history.back()}
            colour="green"
          >
            {m["components.form.accept"]()}
          </Button>
          <Button
            icon={CloseLineIcon}
            onclick={() => window.history.back()}
            colour="red"
          >
            {m["components.form.reject"]()}
          </Button>
        </Page.Actions>
      </section>
    {:else}
      <Loading />
    {/if}
  </Page.Contents>
</Page.Root>
