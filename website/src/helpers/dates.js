import dayjs from "dayjs";
import { getLocale } from "$lib/paraglide/runtime";

await import(`./locales/${getLocale()}.js`);

export { dayjs };