<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Form from "../../../components/form/index.js";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import EntryForm from "../../form.svelte";
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
    content={m["routes.entries.[entry_id].review.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.entries.[entry_id].review.title"]({
        entry_lemma: data.entry.lemma,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.entries.[entry_id].review.title"]({
        entry_lemma: data.entry.lemma,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/entries/review")} />
    </Page.Actions>
    <section>
      <Form.Disabled>
        <EntryForm entry={data.entry} />
      </Form.Disabled>
      <Form.Root method="POST" action="?/review" class="flex flex-col gap-y-6">
        <input type="hidden" name="id" value={data.entry.id} />
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
