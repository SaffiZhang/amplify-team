export const query = {
  mutation: `mutation CreateBlog(
        $input: CreateBlogInput!
        $condition: ModelBlogConditionInput
      ) {
        createBlog(input: $input, condition: $condition) {
          id
          name
          text
          posts {
            items {
              id
              title
            }
            nextToken
          }
        }
      }
      `,
  listBlogs: `query ListBlogs(
  $filter: ModelBlogFilterInput
  $limit: Int
  $nextToken: String
) {
  listBlogs(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      text
      posts {
        nextToken
      }
    }
    nextToken
  }
}
`
}
