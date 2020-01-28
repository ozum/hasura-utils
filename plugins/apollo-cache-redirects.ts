import { CacheResolver } from "apollo-cache-inmemory";

/**
 * Returns Apollo InMemoryCache redirect configuration for Hasura `xyz_by_pk` types.
 *
 * @param trackedTables are list of tracked tables.
 * @returns cache redirection configuration for hasura tracked tables.
 *
 * @see https://www.apollographql.com/docs/react/caching/cache-interaction/#cache-redirects-with-cacheredirects
 * @see https://www.apollographql.com/docs/react/performance/performance/
 *
 * @example
 * import apolloCacheRedirects from "./apollo-cache-redirects";
 *
 * const cache: InMemoryCache = new InMemoryCache({
 *   // `cache_redirects` improves performance by mapping queries to previous results of different queries. See:
 *   cacheRedirects: {
 *   Query: { ...apolloCacheRedirects }
 * }
 * });
 */
function getHasuraCacheRedirects(redirectMap: Record<string, string>): Record<string, CacheResolver> {
  const result: Record<string, CacheResolver> = {};
  Object.entries(redirectMap).forEach(([singleRecordName, tableName]) => {
    result[singleRecordName] = (_, args, { getCacheKey }) => getCacheKey({ __typename: tableName, id: args.id });
  });
  return result;
}

/**
 * Object to be used with `InMemoryCache.cacheRedirects` to avoid same object with different name from Hasura.
 *
 * @example
 * {
 *   product: (_, args, { getCacheKey }) => getCacheKey({ __typename: "Product", id: args.id }),
 *   member: (_, args, { getCacheKey }) => getCacheKey({ __typename: "Member", id: args.id }),
 * }
 */
export default getHasuraCacheRedirects({
  account: "Account",
  asset: "Asset",
  contact: "Contact",
  country: "Country",
  currency: "Currency",
  exchangeRateSource: "ExchangeRateSource",
  item: "Item",
  jobStatus: "JobStatus",
  language: "Language",
  location: "Location",
  officialLanguage: "OfficialLanguage",
  organization: "Organization",
  priceModifier: "PriceModifier",
  priceModifierName: "PriceModifierName",
  product: "Product",
  productFamily: "ProductFamily",
  region: "Region",
  serviceAppointment: "ServiceAppointment",
  serviceResource: "ServiceResource",
  user: "User",
  workOrder: "WorkOrder",
  workOrderLineItem: "WorkOrderLineItem",
});
