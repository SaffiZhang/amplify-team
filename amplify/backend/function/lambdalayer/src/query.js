"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy1zcmMvcXVlcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLEtBQUssR0FBRztJQUNuQixRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJMO0lBQ0wsU0FBUyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7OztDQWlCWjtDQUNBLENBQUEifQ==