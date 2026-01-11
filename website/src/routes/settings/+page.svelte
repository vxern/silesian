<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";

  const { data } = $props();
</script>

<svelte:head>
  <meta name="description" content={m["routes.settings.description"]()} />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.settings.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection permissions={data.permissions} />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.settings.title"]()} />
  </Page.Header>
  <Page.Divider />
  <Page.Contents>
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell icon={PhotoAlbum2LineIcon}>
            {m["routes.account.attributes.base.avatar"]()}
          </Table.HeaderCell>
          <Table.HeaderCell icon={User1LineIcon}>
            {m["routes.account.attributes.base.username"]()}
          </Table.HeaderCell>
          <Table.HeaderCell icon={MailLineIcon}>
            {m["routes.account.attributes.base.email"]()}
          </Table.HeaderCell>
          <Table.HeaderCell icon={Calendar2LineIcon}>
            {m["routes.account.attributes.base.created_at"]()}
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <Image
              class="rounded-md size-20"
              src={page.data.session.user.image}
              alt={m["routes.account.attributes.base.avatar"]()}
            />
          </Table.Cell>
          <Table.Cell>
            {page.data.session.user.name}
          </Table.Cell>
          <Table.Cell>
            {page.data.session.user.email}
          </Table.Cell>
          <Table.Cell>
            {dayjs(data.user.created_at).calendar()}
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  </Page.Contents>
</Page.Root>
