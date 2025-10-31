<script>
  import constants from "$lib/constants/core";
  import { m } from "$lib/paraglide/messages";

  // TODO(vxern): Je ku tymu lepszy spusōb?
  const splashKeys = [
    m["routes.home.splashes.one"](),
    m["routes.home.splashes.two"](),
    m["routes.home.splashes.three"](),
    m["routes.home.splashes.four"](),
    m["routes.home.splashes.five"](),
    m["routes.home.splashes.six"](),
    m["routes.home.splashes.seven"](),
    m["routes.home.splashes.eight"](),
  ];
  const splash = splashKeys[Math.floor(Math.random() * splashKeys.length)];
</script>

<section class="flex-1 flex flex-col gap-y-8 items-center">
  <article>
    <h1>
      <span class="text-8xl text-yellow-400 font-bold">
        {constants.project.name}
      </span>
    </h1>
    <h2 class="text-2xl text-blue-500">{splash}</h2>
  </article>
</section>
