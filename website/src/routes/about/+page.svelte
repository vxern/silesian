<script>
  import { m } from "$lib/paraglide/messages";
  import Page from "../../components/page/index.js";
  import NavigationSection from "../../components/navigation/navigation-section.svelte";
  import constants from "$lib/constants/core";

  // TODO(vxern): Add proper authors.
  // TODO(vxern): Add proper contact.

  // TODO(vxern): Fetch contributors from the users table.
  const contributors = [
    {
      full_name: "Dorian Mateusz Oszczęda",
      username: "vxern",
      contribution: "author",
    },
  ];

  // TODO(vxern): Get rid of hardcoding.
  const sponsors = [
    {
      name: "Demokratyczna Unia Regionalistów Śląskich (DURŚ)",
      icon: "/logos/durś.png",
    },
    {
      name: "Wachtyrz.eu",
      icon: "/logos/wachtyrz.png",
    },
    {
      name: "REGIOS",
      icon: "/logos/regios.png",
    },
    {
      name: "Województwo Śląskie",
      icon: "/logos/slaskie.png",
    },
  ];
</script>

<svelte:head>
  <meta
    name="description"
    content={m["routes.about.description"]({
      project_name: constants.project.name,
    })}
  />
  <title>
    {m["title"]({
      project_name: constants.project.name,
      page_title: m["routes.about.title"](),
    })}
  </title>
</svelte:head>

<NavigationSection />

<Page.Root>
  <Page.Header>
    <Page.Title title={m["routes.about.title"]()} />
  </Page.Header>
  <Page.Divider />
  <article class="flex-1 flex flex-col">
    <span class="text-blue-500 font-bold text-2xl">
      {m["routes.about.sections.what.title"]()}
    </span>
    <span class="text-lg">
      {m["routes.about.sections.what.description"]({
        project_name: constants.project.name,
      })}
    </span>
  </article>
  <article class="flex-1 flex flex-col">
    <span class="text-blue-500 font-bold text-2xl">
      {m["routes.about.sections.when.title"]()}
    </span>
    <span class="text-lg">
      {m["routes.about.sections.when.description"]({
        project_name: constants.project.name,
      })}
    </span>
  </article>
  <article class="flex-1 flex flex-col">
    <span class="text-blue-500 font-bold text-2xl">
      {m["routes.about.sections.why.title"]()}
    </span>
    <span class="text-lg">
      {m["routes.about.sections.why.description"]({
        project_name: constants.project.name,
      })}
    </span>
  </article>
  <article class="flex-1 flex flex-col">
    <span class="text-blue-500 font-bold text-2xl">
      {m["routes.about.sections.authors.title"]()}
    </span>
    <span class="text-lg">
      {#each contributors as contributor}
        <span>
          {m["routes.about.sections.authors.contributor"]({
            full_name: contributor.full_name,
            username: contributor.username,
            contribution:
              m[
                `routes.about.sections.authors.contributions.${contributor.contribution}`
              ](),
          })}
        </span>
      {/each}
    </span>
  </article>
  <article class="flex-1 flex flex-col">
    <span class="text-blue-500 font-bold text-2xl">
      {m["routes.about.sections.contact.title"]()}
    </span>
    <span class="text-lg">
      {m["routes.about.sections.contact.email_address"]({
        email_address: constants.contact.emailAddress, 
      })}
    </span>
  </article>
  <Page.Divider />
  <section class="grid grid-cols-3 gap-2 text-sm">
    {#each sponsors as sponsor}
      <article
        class="p-4 outline-1 bg-white rounded-lg flex items-center justify-center"
      >
        <img src={sponsor.icon} class="h-fit max-h-36" alt={sponsor.name} />
      </article>
    {/each}
  </section>
</Page.Root>
