import { Query, Resolver } from '@nestjs/graphql';
import { PostModel } from './models/post.model';

@Resolver((of) => PostModel)
export class PostsResolver {
  @Query(() => [PostModel], { name: 'posts', nullable: true })
  async getPosts() {
    return [
      {
        id: '1',
        title: 'NestJS is so good.',
      },
      {
        id: '2',
        title: 'GraphQL is so good.',
      },
    ];
  }
}
