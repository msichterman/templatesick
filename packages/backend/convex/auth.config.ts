// NOTE: Update the domain to match your Convex deployment's site URL
// You can find this in packages/backend/.env.local as CONVEX_SITE_URL after running `pnpm setup`
export default {
  providers: [
    {
      domain: process.env.CONVEX_SITE_URL ?? "https://your-deployment.convex.site",
      applicationID: "convex",
    },
  ],
};
