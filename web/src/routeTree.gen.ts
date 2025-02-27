/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AppRouteImport } from './routes/_app/route'
import { Route as AppIndexImport } from './routes/_app/index'
import { Route as AppItemsIndexImport } from './routes/_app/items/index'
import { Route as AppChatsItemidIndexImport } from './routes/_app/chats/$item_id/index'

// Create Virtual Routes

const errors503LazyImport = createFileRoute('/(errors)/503')()
const errors500LazyImport = createFileRoute('/(errors)/500')()
const errors404LazyImport = createFileRoute('/(errors)/404')()
const errors403LazyImport = createFileRoute('/(errors)/403')()
const errors401LazyImport = createFileRoute('/(errors)/401')()

// Create/Update Routes

const AppRouteRoute = AppRouteImport.update({
  id: '/_app',
  getParentRoute: () => rootRoute,
} as any)

const AppIndexRoute = AppIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AppRouteRoute,
} as any)

const errors503LazyRoute = errors503LazyImport
  .update({
    id: '/(errors)/503',
    path: '/503',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/503.lazy').then((d) => d.Route))

const errors500LazyRoute = errors500LazyImport
  .update({
    id: '/(errors)/500',
    path: '/500',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/500.lazy').then((d) => d.Route))

const errors404LazyRoute = errors404LazyImport
  .update({
    id: '/(errors)/404',
    path: '/404',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/404.lazy').then((d) => d.Route))

const errors403LazyRoute = errors403LazyImport
  .update({
    id: '/(errors)/403',
    path: '/403',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/403.lazy').then((d) => d.Route))

const errors401LazyRoute = errors401LazyImport
  .update({
    id: '/(errors)/401',
    path: '/401',
    getParentRoute: () => rootRoute,
  } as any)
  .lazy(() => import('./routes/(errors)/401.lazy').then((d) => d.Route))

const AppItemsIndexRoute = AppItemsIndexImport.update({
  id: '/items/',
  path: '/items/',
  getParentRoute: () => AppRouteRoute,
} as any)

const AppChatsItemidIndexRoute = AppChatsItemidIndexImport.update({
  id: '/chats/$item_id/',
  path: '/chats/$item_id/',
  getParentRoute: () => AppRouteRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_app': {
      id: '/_app'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AppRouteImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/401': {
      id: '/(errors)/401'
      path: '/401'
      fullPath: '/401'
      preLoaderRoute: typeof errors401LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/403': {
      id: '/(errors)/403'
      path: '/403'
      fullPath: '/403'
      preLoaderRoute: typeof errors403LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/404': {
      id: '/(errors)/404'
      path: '/404'
      fullPath: '/404'
      preLoaderRoute: typeof errors404LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/500': {
      id: '/(errors)/500'
      path: '/500'
      fullPath: '/500'
      preLoaderRoute: typeof errors500LazyImport
      parentRoute: typeof rootRoute
    }
    '/(errors)/503': {
      id: '/(errors)/503'
      path: '/503'
      fullPath: '/503'
      preLoaderRoute: typeof errors503LazyImport
      parentRoute: typeof rootRoute
    }
    '/_app/': {
      id: '/_app/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AppIndexImport
      parentRoute: typeof AppRouteImport
    }
    '/_app/items/': {
      id: '/_app/items/'
      path: '/items'
      fullPath: '/items'
      preLoaderRoute: typeof AppItemsIndexImport
      parentRoute: typeof AppRouteImport
    }
    '/_app/chats/$item_id/': {
      id: '/_app/chats/$item_id/'
      path: '/chats/$item_id'
      fullPath: '/chats/$item_id'
      preLoaderRoute: typeof AppChatsItemidIndexImport
      parentRoute: typeof AppRouteImport
    }
  }
}

// Create and export the route tree

interface AppRouteRouteChildren {
  AppIndexRoute: typeof AppIndexRoute
  AppItemsIndexRoute: typeof AppItemsIndexRoute
  AppChatsItemidIndexRoute: typeof AppChatsItemidIndexRoute
}

const AppRouteRouteChildren: AppRouteRouteChildren = {
  AppIndexRoute: AppIndexRoute,
  AppItemsIndexRoute: AppItemsIndexRoute,
  AppChatsItemidIndexRoute: AppChatsItemidIndexRoute,
}

const AppRouteRouteWithChildren = AppRouteRoute._addFileChildren(
  AppRouteRouteChildren,
)

export interface FileRoutesByFullPath {
  '': typeof AppRouteRouteWithChildren
  '/401': typeof errors401LazyRoute
  '/403': typeof errors403LazyRoute
  '/404': typeof errors404LazyRoute
  '/500': typeof errors500LazyRoute
  '/503': typeof errors503LazyRoute
  '/': typeof AppIndexRoute
  '/items': typeof AppItemsIndexRoute
  '/chats/$item_id': typeof AppChatsItemidIndexRoute
}

export interface FileRoutesByTo {
  '/401': typeof errors401LazyRoute
  '/403': typeof errors403LazyRoute
  '/404': typeof errors404LazyRoute
  '/500': typeof errors500LazyRoute
  '/503': typeof errors503LazyRoute
  '/': typeof AppIndexRoute
  '/items': typeof AppItemsIndexRoute
  '/chats/$item_id': typeof AppChatsItemidIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_app': typeof AppRouteRouteWithChildren
  '/(errors)/401': typeof errors401LazyRoute
  '/(errors)/403': typeof errors403LazyRoute
  '/(errors)/404': typeof errors404LazyRoute
  '/(errors)/500': typeof errors500LazyRoute
  '/(errors)/503': typeof errors503LazyRoute
  '/_app/': typeof AppIndexRoute
  '/_app/items/': typeof AppItemsIndexRoute
  '/_app/chats/$item_id/': typeof AppChatsItemidIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | ''
    | '/401'
    | '/403'
    | '/404'
    | '/500'
    | '/503'
    | '/'
    | '/items'
    | '/chats/$item_id'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/401'
    | '/403'
    | '/404'
    | '/500'
    | '/503'
    | '/'
    | '/items'
    | '/chats/$item_id'
  id:
    | '__root__'
    | '/_app'
    | '/(errors)/401'
    | '/(errors)/403'
    | '/(errors)/404'
    | '/(errors)/500'
    | '/(errors)/503'
    | '/_app/'
    | '/_app/items/'
    | '/_app/chats/$item_id/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AppRouteRoute: typeof AppRouteRouteWithChildren
  errors401LazyRoute: typeof errors401LazyRoute
  errors403LazyRoute: typeof errors403LazyRoute
  errors404LazyRoute: typeof errors404LazyRoute
  errors500LazyRoute: typeof errors500LazyRoute
  errors503LazyRoute: typeof errors503LazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  AppRouteRoute: AppRouteRouteWithChildren,
  errors401LazyRoute: errors401LazyRoute,
  errors403LazyRoute: errors403LazyRoute,
  errors404LazyRoute: errors404LazyRoute,
  errors500LazyRoute: errors500LazyRoute,
  errors503LazyRoute: errors503LazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_app",
        "/(errors)/401",
        "/(errors)/403",
        "/(errors)/404",
        "/(errors)/500",
        "/(errors)/503"
      ]
    },
    "/_app": {
      "filePath": "_app/route.tsx",
      "children": [
        "/_app/",
        "/_app/items/",
        "/_app/chats/$item_id/"
      ]
    },
    "/(errors)/401": {
      "filePath": "(errors)/401.lazy.tsx"
    },
    "/(errors)/403": {
      "filePath": "(errors)/403.lazy.tsx"
    },
    "/(errors)/404": {
      "filePath": "(errors)/404.lazy.tsx"
    },
    "/(errors)/500": {
      "filePath": "(errors)/500.lazy.tsx"
    },
    "/(errors)/503": {
      "filePath": "(errors)/503.lazy.tsx"
    },
    "/_app/": {
      "filePath": "_app/index.tsx",
      "parent": "/_app"
    },
    "/_app/items/": {
      "filePath": "_app/items/index.tsx",
      "parent": "/_app"
    },
    "/_app/chats/$item_id/": {
      "filePath": "_app/chats/$item_id/index.tsx",
      "parent": "/_app"
    }
  }
}
ROUTE_MANIFEST_END */
