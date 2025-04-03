import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { server } from "../../constants/config";

const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chats/my",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    searchUser: builder.query({
      query: (name) => ({
        url: `user/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    allUsers: builder.query({
      query: () => ({
        url: `user/allUsers`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),

    chatDetails: builder.query({
      query: ({ id, populate = false }) => {
        let url = `chats/${id}`;
        if (populate) url += "?populate=true";

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page = 1 }) => ({
        url: `chats/message/${chatId}?page=${page}`,
        credentials: "include"
      }),
      providesTags: ["Message"],
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useLazyAllUsersQuery,
  useChatDetailsQuery,
  useGetMessagesQuery
} = api;
