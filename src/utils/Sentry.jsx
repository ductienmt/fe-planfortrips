import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://4c2e072dcb62477994a4636bd71cd402@o4508461637238784.ingest.us.sentry.io/4508461652180992",
  enabled: process.env.NODE_ENV === 'production'
});