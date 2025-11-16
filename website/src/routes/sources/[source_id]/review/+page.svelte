<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Form from "../../../../components/form/index.js";
  import SourceForm from "../../form.svelte";
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
    content={m["routes.sources.[source_id].review.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.sources.[source_id].review.title"]({
        source_name: data.source.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.sources.[source_id].review.title"]({
        source_name: data.source.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => window.history.back()} />
    </Page.Actions>
    <section>
      <Form.Disabled>
        <SourceForm source={data.source} />
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
  </Page.Contents>
</Page.Root>
