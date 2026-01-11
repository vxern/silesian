<script>
  import { m } from "$lib/paraglide/messages";
  import { goto } from "$app/navigation";
  import Page from "../../../../components/page/index.js";
  import NavigationSection from "../../../../components/navigation/navigation-section.svelte";
  import Form from "../../../../components/form/index.js";
  import AuthorForm from "../../form.svelte";
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
    content={m["routes.authors.[author_id].review.description"]()}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.authors.[author_id].review.title"]({
        author_name: data.author.name,
      }),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title
      title={m["routes.authors.[author_id].review.title"]({
        author_name: data.author.name,
      })}
    />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Page.Actions>
      <BackButton onclick={() => goto("/authors/review")} />
    </Page.Actions>
    <section>
      <Form.Disabled>
        <AuthorForm author={data.author} />
      </Form.Disabled>
      <Form.Root method="POST" action="?/review" class="flex flex-col gap-y-6">
        <input type="hidden" name="id" value={data.author.id} />
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
