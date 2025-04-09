import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const roleApi = createApi({
  reducerPath: 'roleApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Role'],
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => '/roles',
      providesTags: ['Role'],
    }),
    getRoleById: builder.query({
      query: (id) => `/roles/${id}`,
    }),
    createRole: builder.mutation({
      query: (newRole) => ({
        url: '/roles',
        method: 'POST',
        body: newRole,
      }),
      invalidatesTags: ['Role'],
    }),
    updateRole: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/roles/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Role'],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Role'],
    }),
  }),
})

export const {
  useGetRolesQuery,
  useGetRoleByIdQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi
