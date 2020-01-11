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
      `
}
