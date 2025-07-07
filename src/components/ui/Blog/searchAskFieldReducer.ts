import { BlogPost } from "@/lib/types/sanity";

export interface RefPost {
  _id: string;
  title?: string;
  slug?: string;
}

export interface State {
  query: string;
  loading: boolean;
  answer: string; // empty when none
  searchResults: BlogPost[] | null;
  referencedPosts: RefPost[] | null;
}

export type Action =
  | { type: "SET_QUERY"; payload: string }
  | { type: "START_LOADING" }
  | { type: "STOP_LOADING" }
  | { type: "RESET" }
  | { type: "APPEND_ANSWER"; payload: string }
  | { type: "SET_SEARCH_RESULTS"; payload: BlogPost[] }
  | { type: "SET_REFERENCED_POSTS"; payload: RefPost[] };

export const initialState: State = {
  query: "",
  loading: false,
  answer: "",
  searchResults: null,
  referencedPosts: null,
};

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_QUERY":
      return { ...state, query: action.payload };
    case "START_LOADING":
      return { ...state, loading: true };
    case "STOP_LOADING":
      return { ...state, loading: false };
    case "RESET":
      return {
        ...state,
        answer: "",
        searchResults: null,
        referencedPosts: null,
      };
    case "APPEND_ANSWER":
      return { ...state, answer: state.answer + action.payload };
    case "SET_SEARCH_RESULTS":
      return { ...state, searchResults: action.payload };
    case "SET_REFERENCED_POSTS":
      return { ...state, referencedPosts: action.payload };
    default:
      return state;
  }
}
