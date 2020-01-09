module.exports={
  query: `query ListPosts(
    $filter: ModelPostFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        blog {
          id
          name
          text
        }
        comments {
          nextToken
        }
      }
      nextToken
    }
  }
  `} ;