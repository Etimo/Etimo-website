export const QUERY_PAGE_BY_ID = `
  query PageById($id: String!, $locale: String) {
    page(id: $id, locale: $locale) {
      sys { id }
      title
       slug {        
        ... on NavigationLink {
          title
          slug
          isExternal
        }
      }
      sectionsCollection(limit: 50) {
        items {
          __typename
          ... on Entry {
            sys { id }
          }

          ... on Section {
            label
            title
            linkText
            link {
                ... on NavigationLink {  
                  title
                  slug
                  isExternal
                }
              }
            sideMenuTitle
            variant
            text { json }
            imagesCollection(limit: 10) {
              items { url title description }
            }
          }

          ... on GenericImageGridSection {
            label
            title
            variant
            text { json }
            imagesCollection(limit: 20) {
              items { url title description }
            }
            linkText
            link {
                ... on NavigationLink {  
                  title
                  slug
                  isExternal
                }
              }
            sideMenuTitle
          }

          ... on ConsultantSection {
            label
            title
            linkText
            link {
                ... on NavigationLink {  
                  title
                  slug
                  isExternal
                }
              }
            sideMenuTitle
            consultantsCollection(limit: 20) {
              items {
                __typename
                ... on ImageWithLinks {
                  name
                  role
                  github
                  linkedIn
                  image {
                    url
                    title
                    description
                    width
                    height
                    contentType
                  }
                }
              }
            }
          }

          ... on VideoSection {
            label
            title
            text { json }
            linkText
            linkSlug
            sideMenuTitle
            videoLink
            video {
              url
              title
              description
              contentType
              width
              height
              fileName
              size
            }
          }

          ... on Hero {
            label
            firstRowTitle
            secondRowTitle
            text { json }
            sideMenuTitle
          }
        }
      }
    }
  }
`;

export const QUERY_NAV_LINKS = `
  query NavLinks($locale: String) {
    navigationLinkCollection(locale: $locale, limit: 20) {
      items {
        sys { id }
        title
        slug
        isExternal
      }
    }
  }
`;

export const QUERY_PAGE_SLUG = `
  query PageSlug($id: String!, $locale: String) {
    page(id: $id, locale: $locale) {
      slug {
        ... on NavigationLink {
          slug
        }
      }
    }
  }
`;
