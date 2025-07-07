import { BlogPost } from "@/lib/types/sanity.types";

export interface PostsFeedState {
  posts: BlogPost[];
  offset: number;
  loading: boolean;
  hasMore: boolean;
}

export type PostsFeedAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_POSTS'; payload: BlogPost[] }
  | { type: 'SET_HAS_MORE'; payload: boolean }
  | { type: 'RESET_STATE'; payload: { posts: BlogPost[]; offset: number } };

export const initialPostsFeedState = (
  initialPosts: BlogPost[],
  initialOffset: number
): PostsFeedState => ({
  posts: initialPosts,
  offset: initialOffset,
  loading: false,
  hasMore: true,
});

export const postsFeedReducer = (
  state: PostsFeedState,
  action: PostsFeedAction
): PostsFeedState => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload,
      };
    
    case 'ADD_POSTS':
      return {
        ...state,
        posts: [...state.posts, ...action.payload],
        offset: state.offset + action.payload.length,
      };
    
    case 'SET_HAS_MORE':
      return {
        ...state,
        hasMore: action.payload,
      };
    
    case 'RESET_STATE':
      return {
        ...state,
        posts: action.payload.posts,
        offset: action.payload.offset,
        hasMore: true,
        loading: false,
      };
    
    default:
      return state;
  }
}; 
