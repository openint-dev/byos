import {mapper, zCast} from '@supaglue/vdk'
import {
  initApolloSDK,
  type ApolloSDK,
  type ApolloSDKTypes,
} from '@opensdks/sdk-apollo'
import type {SalesEngagementProvider} from '../router'
import {unified} from '../router'

type Apollo = ApolloSDKTypes['oas']['components']['schemas']

const mappers = {
  // @ts-expect-error TODO: Implement me
  contact: mapper(zCast<Apollo['contact']>(), unified.contact, {
    id: 'id',
    first_name: (c) => c.first_name ?? '',
    last_name: (c) => c.last_name ?? '',
  }),
}

export const apolloProvider = {
  __init__: ({proxyLinks}) =>
    initApolloSDK({
      api_key: '', // This will be populated by Nango, or you can populate your own
      links: (defaultLinks) => [
        ...defaultLinks.slice(0, -1),
        ...proxyLinks, // proxy links shoudl be in the middle...
        ...defaultLinks.slice(-1),
      ],
    }),
  listContacts: async ({instance}) => {
    const res = await instance.POST('/v1/contacts/search', {})
    return {
      has_next_page: true,
      items: res.data.contacts.map(mappers.contact),
    }
  },
  // eslint-disable-next-line @typescript-eslint/require-await, arrow-body-style
  listSequences: async () => {
    return {
      nextPageCursor: null,
      items: [],
    }
  },
} satisfies SalesEngagementProvider<ApolloSDK>
