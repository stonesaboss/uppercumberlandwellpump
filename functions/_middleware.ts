/**
 * Pages middleware: prevents indexing of non-production hosts.
 * Any *.pages.dev or preview host gets X-Robots-Tag: noindex, nofollow.
 * Only the custom production domain is indexable.
 */

const PRODUCTION_HOSTS = new Set([
  "uppercumberlandwellpump.com",
  "www.uppercumberlandwellpump.com",
]);

export const onRequest: PagesFunction = async (context) => {
  const response = await context.next();
  const host = new URL(context.request.url).hostname.toLowerCase();

  if (!PRODUCTION_HOSTS.has(host)) {
    const headers = new Headers(response.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  }

  return response;
};
