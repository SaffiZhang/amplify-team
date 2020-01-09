module.exports = {
    mutation:  `mutation CreateBlog(
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