import { Card } from './Card/Card';
import { Create } from './Create/Create';
import { Favourites } from './Favourites/Favourites';
import { Filter } from './Filter/Filter';
import { List } from './List/List';
import { Pagination } from './Pagination/Pagination';
import { Reaction } from './Reaction/Reaction';
import { RemovePost } from './RemovePost/RemovePost';
import { SharePost } from './SharePost/SharePost';
import { Sorting } from './Sorting/Sorting';

export const PostsComponents = {
    Filter,
    Card,
    List,
    Favourites,
    Sorting,
    Reaction,
    Pagination,
    SharePost,
    RemovePost,
    CreatePost: Create
};
