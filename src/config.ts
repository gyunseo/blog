export const SITE = {
  website: "https://gyunseo.com/",
  author: "Gyunseo Lee",
  profile: "https://gyunseo.com/about",
  desc: "Gyunseo's Blog. Write my logs on the web.",
  title: "Gyunseo's Blog",
  ogImage: "doggo-og.png",
  lightAndDarkMode: true,
  postPerIndex: 5,
  postPerPage: 5,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: true,
    text: "Suggest Changes",
    url: "https://github.com/gyunseo/blog/edit/cloudflare-pages/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "ko", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Seoul", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
} as const;
