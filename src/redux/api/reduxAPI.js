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
      keepUnusedDataFor: 0,
      providesTags: ["Message"],
    }),

    sendAttachments: builder.mutation({
      query: (data) => ({
        url: "chats/message",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export default api;
export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useLazyAllUsersQuery,
  useChatDetailsQuery,
  useGetMessagesQuery,
  useSendAttachmentsMutation,
} = api;
