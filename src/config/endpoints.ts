// API Endpoints Configuration
// Centralized endpoint definitions to avoid magic strings

export const endpoints = {
  // Auth endpoints
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    logout: '/auth/logout',
    me: '/auth/me',
  },

  // Discussion endpoints
  discussions: {
    list: '/discussions',
    create: '/discussions',
    get: (id: string) => `/discussions/${id}`,
    update: (id: string) => `/discussions/${id}`,
    delete: (id: string) => `/discussions/${id}`,
    like: (id: string) => `/discussions/${id}/like`,
    unlike: (id: string) => `/discussions/${id}/unlike`,
  },

  // Comment endpoints
  comments: {
    list: (discussionId: string) => `/discussions/${discussionId}/comments`,
    create: (discussionId: string) => `/discussions/${discussionId}/comments`,
    delete: (discussionId: string, commentId: string) =>
      `/discussions/${discussionId}/comments/${commentId}`,
  },

  // User endpoints
  users: {
    list: '/users',
    get: (id: string) => `/users/${id}`,
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`,
    profile: '/users/profile',
  },

  // Team endpoints
  teams: {
    list: '/teams',
    get: (id: string) => `/teams/${id}`,
  },

  // Health check
  health: {
    check: '/healthcheck',
  },
} as const;

// Type-safe endpoint builder
export type EndpointKey = keyof typeof endpoints;
export type DiscussionEndpointKey = keyof typeof endpoints.discussions;
export type CommentEndpointKey = keyof typeof endpoints.comments;
export type UserEndpointKey = keyof typeof endpoints.users;
export type TeamEndpointKey = keyof typeof endpoints.teams;
