# hasura-utils





<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Synopsis](#synopsis)
- [Details](#details)
- [API](#api)
- [hasura-utils](#hasura-utils)
  - [Type aliases](#type-aliases)
    - [NameFunction](#namefunction)
    - [Operation](#operation)
    - [TableFilterFunction](#tablefilterfunction)
  - [Variables](#variables)
    - [`Const` OPERATIONS](#const-operations)
  - [Functions](#functions)
    - [_untrackTable](#_untracktable)
    - [createDeletePermission](#createdeletepermission)
    - [createInsertPermission](#createinsertpermission)
    - [createSelectPermission](#createselectpermission)
    - [createUpdatePermission](#createupdatepermission)
    - [dropPermission](#droppermission)
    - [formatAndWriteData](#formatandwritedata)
    - [getColumnNames](#getcolumnnames)
    - [getHasuraCacheRedirectMapSource](#gethasuracacheredirectmapsource)
    - [getMultipleObjectName](#getmultipleobjectname)
    - [getSingleObjectName](#getsingleobjectname)
    - [getTableName](#gettablename)
    - [trackTable](#tracktable)
    - [writeMigration](#writemigration)
  - [Object literals](#object-literals)
    - [`Const` PERMISSION_FUNCTION](#const-permission_function)
    - [▪ **PERMISSION_FUNCTION**: *object*](#%E2%96%AA-permission_function-object)
    - [delete](#delete)
    - [insert](#insert)
    - [select](#select)
    - [update](#update)
- [Classes](#classes)
- [Class: HasuraUtils](#class-hasurautils)
  - [Hierarchy](#hierarchy)
  - [Methods](#methods)
    - [getMetaData](#getmetadata)
    - [getTrackedTables](#gettrackedtables)
    - [writeHasureCacheRedirectMap](#writehasurecacheredirectmap)
    - [writeMigrationsCreatePermissions](#writemigrationscreatepermissions)
    - [writeMigrationsTrackTable](#writemigrationstracktable)
    - [`Static` create](#static-create)
- [Interfaces](#interfaces)
- [Interface: HasuraTableName](#interface-hasuratablename)
  - [Hierarchy](#hierarchy-1)
  - [Properties](#properties)
    - [name](#name)
    - [schema](#schema)
- [Interface: MetaData](#interface-metadata)
  - [Hierarchy](#hierarchy-2)
  - [Properties](#properties-1)
    - [tables](#tables)
    - [version](#version)
- [Interface: Options](#interface-options)
  - [Hierarchy](#hierarchy-3)
  - [Properties](#properties-2)
    - [`Optional` adminSecret](#optional-adminsecret)
    - [database](#database)
    - [`Optional` includeSchemas](#optional-includeschemas)
    - [`Optional` multipleObjectNameFunction](#optional-multipleobjectnamefunction)
    - [password](#password)
    - [`Optional` singleObjectNameFunction](#optional-singleobjectnamefunction)
    - [`Optional` tableNameFunction](#optional-tablenamefunction)
    - [`Optional` url](#optional-url)
    - [user](#user)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


# Installation
# Synopsis

```ts

```

# Details

# API


<a name="readmemd"></a>

[hasura-utils](#readmemd)

# hasura-utils

## Type aliases

###  NameFunction

Ƭ **NameFunction**: *function*

*Defined in [index.ts:48](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L48)*

#### Type declaration:

▸ (`table`: string, `schema?`: undefined | string): *string*

**Parameters:**

Name | Type |
------ | ------ |
`table` | string |
`schema?` | undefined &#124; string |

___

###  Operation

Ƭ **Operation**: *"insert" | "select" | "update" | "delete"*

*Defined in [index.ts:49](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L49)*

___

###  TableFilterFunction

Ƭ **TableFilterFunction**: *function*

*Defined in [index.ts:50](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L50)*

#### Type declaration:

▸ (`table`: Table): *boolean*

**Parameters:**

Name | Type |
------ | ------ |
`table` | Table |

## Variables

### `Const` OPERATIONS

• **OPERATIONS**: *[Operation](#operation)[]* = ["insert", "select", "update", "delete"]

*Defined in [index.ts:30](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L30)*

## Functions

###  _untrackTable

▸ **_untrackTable**(`table`: string, `schema`: string): *object*

*Defined in [migration-commands/untrack-table.ts:1](https://github.com/ozum/hasura-utils/blob/e7ef329/src/migration-commands/untrack-table.ts#L1)*

**Parameters:**

Name | Type | Default |
------ | ------ | ------ |
`table` | string | - |
`schema` | string | "public" |

**Returns:** *object*

* **type**: *string* = "untrack_table"

* ### **args**: *object*

  * **table**: *object*

    * **name**: *string* = table

    * **schema**: *string*

___

###  createDeletePermission

▸ **createDeletePermission**(`table`: string, `schema`: string, `__namedParameters`: object): *object*

*Defined in [migration-commands/create-delete-permission.ts:3](https://github.com/ozum/hasura-utils/blob/e7ef329/src/migration-commands/create-delete-permission.ts#L3)*

**Parameters:**

▪ **table**: *string*

▪`Default value`  **schema**: *string*= "public"

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`role` | string |
`filter` | object |

**Returns:** *object*

___

###  createInsertPermission

▸ **createInsertPermission**(`table`: string, `schema`: string, `__namedParameters`: object): *object*

*Defined in [migration-commands/create-insert-permission.ts:3](https://github.com/ozum/hasura-utils/blob/e7ef329/src/migration-commands/create-insert-permission.ts#L3)*

**Parameters:**

▪ **table**: *string*

▪`Default value`  **schema**: *string*= "public"

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`columns` | string[] | [] |
`filter` | object | - |
`role` | string | - |
`set` | object | - |

**Returns:** *object*

___

###  createSelectPermission

▸ **createSelectPermission**(`table`: string, `schema`: string, `__namedParameters`: object): *object*

*Defined in [migration-commands/create-select-permission.ts:3](https://github.com/ozum/hasura-utils/blob/e7ef329/src/migration-commands/create-select-permission.ts#L3)*

**Parameters:**

▪ **table**: *string*

▪`Default value`  **schema**: *string*= "public"

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`allowAggregations` | boolean | false |
`columns` | string[] | [] |
`computedFields` | undefined &#124; string[] | - |
`limit` | number | 10000 |
`role` | string | - |
`filter` | object | - |

**Returns:** *object*

___

###  createUpdatePermission

▸ **createUpdatePermission**(`table`: string, `schema`: string, `__namedParameters`: object): *object*

*Defined in [migration-commands/create-update-permission.ts:3](https://github.com/ozum/hasura-utils/blob/e7ef329/src/migration-commands/create-update-permission.ts#L3)*

**Parameters:**

▪ **table**: *string*

▪`Default value`  **schema**: *string*= "public"

▪ **__namedParameters**: *object*

Name | Type | Default |
------ | ------ | ------ |
`columns` | string[] | [] |
`role` | string | - |
`set` | undefined &#124; object | - |
`filter` | object | - |

**Returns:** *object*

___

###  dropPermission

▸ **dropPermission**(`table`: string, `schema`: string, `__namedParameters`: object): *object*

*Defined in [migration-commands/drop-permission.ts:3](https://github.com/ozum/hasura-utils/blob/e7ef329/src/migration-commands/drop-permission.ts#L3)*

**Parameters:**

▪ **table**: *string*

▪`Default value`  **schema**: *string*= "public"

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`operation` | "insert" &#124; "select" &#124; "update" &#124; "delete" |
`role` | string |

**Returns:** *object*

___

###  formatAndWriteData

▸ **formatAndWriteData**<**T**>(`data`: T, `format?`: "json" | "yaml", `file?`: undefined | string): *Promise‹string | T›*

*Defined in [helper.ts:8](https://github.com/ozum/hasura-utils/blob/e7ef329/src/helper.ts#L8)*

**Type parameters:**

▪ **T**

**Parameters:**

Name | Type |
------ | ------ |
`data` | T |
`format?` | "json" &#124; "yaml" |
`file?` | undefined &#124; string |

**Returns:** *Promise‹string | T›*

___

###  getColumnNames

▸ **getColumnNames**(`table`: Table, `exclude`: string[]): *string[]*

*Defined in [helper.ts:93](https://github.com/ozum/hasura-utils/blob/e7ef329/src/helper.ts#L93)*

**Parameters:**

Name | Type |
------ | ------ |
`table` | Table |
`exclude` | string[] |

**Returns:** *string[]*

___

###  getHasuraCacheRedirectMapSource

▸ **getHasuraCacheRedirectMapSource**(`map`: Record‹string, string›): *string*

*Defined in [helper.ts:49](https://github.com/ozum/hasura-utils/blob/e7ef329/src/helper.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`map` | Record‹string, string› |

**Returns:** *string*

___

###  getMultipleObjectName

▸ **getMultipleObjectName**(`table`: string, `schema?`: undefined | string): *string*

*Defined in [helper.ts:45](https://github.com/ozum/hasura-utils/blob/e7ef329/src/helper.ts#L45)*

Returns multiple object name used by Hasura for given PostgreSQL table.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`table` | string | is the table name to create single result name. |
`schema?` | undefined &#124; string | - |

**Returns:** *string*

single object name.

___

###  getSingleObjectName

▸ **getSingleObjectName**(`table`: string, `schema?`: undefined | string): *string*

*Defined in [helper.ts:35](https://github.com/ozum/hasura-utils/blob/e7ef329/src/helper.ts#L35)*

Returns single object name used by Hasura for given PostgreSQL table.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`table` | string | is the table name to create single result name. |
`schema?` | undefined &#124; string | - |

**Returns:** *string*

single object name.

___

###  getTableName

▸ **getTableName**(`table`: string, `schema?`: undefined | string): *string*

*Defined in [helper.ts:25](https://github.com/ozum/hasura-utils/blob/e7ef329/src/helper.ts#L25)*

**Parameters:**

Name | Type |
------ | ------ |
`table` | string |
`schema?` | undefined &#124; string |

**Returns:** *string*

___

###  trackTable

▸ **trackTable**(`table`: string, `schema`: string, `options`: object): *object*

*Defined in [migration-commands/track-table.ts:4](https://github.com/ozum/hasura-utils/blob/e7ef329/src/migration-commands/track-table.ts#L4)*

**Parameters:**

▪ **table**: *string*

▪ **schema**: *string*

▪ **options**: *object*

Name | Type |
------ | ------ |
`getMultipleObjectName` | [NameFunction](#namefunction) |
`getSingleObjectName` | [NameFunction](#namefunction) |
`getTableName` | [NameFunction](#namefunction) |

**Returns:** *object*

* **type**: *string* = "track_table"

* **version**: *number* = 2

* ### **args**: *object*

  * **configuration**: *object*

    * **custom_root_fields**: *object*

      * **delete**: *string* = `delete${camelize(options.getMultipleObjectName(table, schema))}`

      * **insert**: *string* = `add${camelize(options.getMultipleObjectName(table, schema))}`

      * **select**: *string* = options.getMultipleObjectName(table, schema)

      * **select_aggregate**: *string* = `${camelize(options.getTableName(table, schema), true)}Aggregate`

      * **select_by_pk**: *string* = options.getSingleObjectName(table, schema)

      * **update**: *string* = `update${camelize(options.getMultipleObjectName(table, schema))}`

  * **table**: *object*

    * **name**: *string* = table

    * **schema**: *string*

___

###  writeMigration

▸ **writeMigration**(`dir`: string, `up`: object, `down`: object): *Promise‹any›*

*Defined in [helper.ts:21](https://github.com/ozum/hasura-utils/blob/e7ef329/src/helper.ts#L21)*

**Parameters:**

Name | Type |
------ | ------ |
`dir` | string |
`up` | object |
`down` | object |

**Returns:** *Promise‹any›*

## Object literals

### `Const` PERMISSION_FUNCTION

### ▪ **PERMISSION_FUNCTION**: *object*

*Defined in [index.ts:31](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L31)*

###  delete

• **delete**: *[createDeletePermission](#createdeletepermission)* = createDeletePermission

*Defined in [index.ts:35](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L35)*

###  insert

• **insert**: *[createInsertPermission](#createinsertpermission)* = createInsertPermission

*Defined in [index.ts:32](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L32)*

###  select

• **select**: *[createSelectPermission](#createselectpermission)* = createSelectPermission

*Defined in [index.ts:33](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L33)*

###  update

• **update**: *[createUpdatePermission](#createupdatepermission)* = createUpdatePermission

*Defined in [index.ts:34](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L34)*

# Classes


<a name="classeshasurautilsmd"></a>

[hasura-utils](#readmemd) › [HasuraUtils](#classeshasurautilsmd)

# Class: HasuraUtils

## Hierarchy

* **HasuraUtils**

## Methods

###  getMetaData

▸ **getMetaData**(): *Promise‹[MetaData](#interfacesmetadatamd)›*

*Defined in [index.ts:128](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L128)*

**Returns:** *Promise‹[MetaData](#interfacesmetadatamd)›*

___

###  getTrackedTables

▸ **getTrackedTables**(): *Promise‹Table[]›*

*Defined in [index.ts:140](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L140)*

**Returns:** *Promise‹Table[]›*

___

###  writeHasureCacheRedirectMap

▸ **writeHasureCacheRedirectMap**(`file`: string, `__namedParameters`: object): *Promise‹string›*

*Defined in [index.ts:206](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L206)*

Creates typescript file for mapping (`single object name` -> `table name`) to be used with cache redirects.

#### Example
```typescript
import { InMemoryCache, CacheResolver } from "apollo-cache-inmemory";

function getHasuraCacheRedirects(redirectMap: Record<string, string>): Record<string, CacheResolver> {
  const result: Record<string, CacheResolver> = {};
  Object.entries(redirectMap).forEach(([singleRecordName, tableName]) => {
    result[singleRecordName] = (_, args, { getCacheKey }) => getCacheKey({ __typename: tableName, id: args.id });
  });
  return result;
}

const cache: InMemoryCache = new InMemoryCache({
  cacheRedirects: {
    Query: { ...getHasuraCacheRedirects(apolloCacheRedirectMap) }
  }
});
```

**`see`** https://www.apollographql.com/docs/react/caching/cache-interaction/#cache-redirects-with-cacheredirects

**`see`** https://www.apollographql.com/docs/react/performance/performance/

**Parameters:**

▪ **file**: *string*

is the file to wirte mapping.

▪`Default value`  **__namedParameters**: *object*= {}

Name | Type | Default |
------ | ------ | ------ |
`onlyTracked` | boolean | false |
`filter` |  | - |

**Returns:** *Promise‹string›*

___

###  writeMigrationsCreatePermissions

▸ **writeMigrationsCreatePermissions**(`__namedParameters`: object): *Promise‹string | object›*

*Defined in [index.ts:145](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L145)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`dir` | string |
`filter` | undefined &#124; function |
`role` | string |
`set` | undefined &#124; object |
`excludeColumns` | object |

**Returns:** *Promise‹string | object›*

___

###  writeMigrationsTrackTable

▸ **writeMigrationsTrackTable**(`__namedParameters`: object): *Promise‹any›*

*Defined in [index.ts:172](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L172)*

**Parameters:**

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`dir` | string |
`filter` | undefined &#124; function |

**Returns:** *Promise‹any›*

___

### `Static` create

▸ **create**(`__namedParameters`: object): *Promise‹[HasuraUtils](#classeshasurautilsmd)›*

*Defined in [index.ts:92](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L92)*

**Parameters:**

▪`Default value`  **__namedParameters**: *object*= {} as any

Name | Type | Default |
------ | ------ | ------ |
`adminSecret` | string | process.env["X-HASURA-ADMIN-SECRET"] || "" |
`database` | string | - |
`includeSchemas` | string[] | ["public"] |
`multipleObjectNameFunction` | function | getMultipleObjectName |
`password` | string | - |
`singleObjectNameFunction` | function | getSingleObjectName |
`tableNameFunction` | function | getTableName |
`url` | string | process.env["GRAPHQL-URL"] || "http://localhost:8080/v1/query" |
`user` | string | - |

**Returns:** *Promise‹[HasuraUtils](#classeshasurautilsmd)›*

# Interfaces


<a name="interfaceshasuratablenamemd"></a>

[hasura-utils](#readmemd) › [HasuraTableName](#interfaceshasuratablenamemd)

# Interface: HasuraTableName

## Hierarchy

* **HasuraTableName**

## Properties

###  name

• **name**: *string*

*Defined in [index.ts:40](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L40)*

___

###  schema

• **schema**: *string*

*Defined in [index.ts:39](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L39)*


<a name="interfacesmetadatamd"></a>

[hasura-utils](#readmemd) › [MetaData](#interfacesmetadatamd)

# Interface: MetaData

## Hierarchy

* **MetaData**

## Properties

###  tables

• **tables**: *Array‹object›*

*Defined in [index.ts:45](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L45)*

___

###  version

• **version**: *number*

*Defined in [index.ts:44](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L44)*


<a name="interfacesoptionsmd"></a>

[hasura-utils](#readmemd) › [Options](#interfacesoptionsmd)

# Interface: Options

## Hierarchy

* **Options**

## Properties

### `Optional` adminSecret

• **adminSecret**? : *undefined | string*

*Defined in [index.ts:54](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L54)*

___

###  database

• **database**: *string*

*Defined in [index.ts:55](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L55)*

___

### `Optional` includeSchemas

• **includeSchemas**? : *string[]*

*Defined in [index.ts:58](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L58)*

___

### `Optional` multipleObjectNameFunction

• **multipleObjectNameFunction**? : *[NameFunction](#namefunction)*

*Defined in [index.ts:60](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L60)*

___

###  password

• **password**: *string*

*Defined in [index.ts:57](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L57)*

___

### `Optional` singleObjectNameFunction

• **singleObjectNameFunction**? : *[NameFunction](#namefunction)*

*Defined in [index.ts:59](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L59)*

___

### `Optional` tableNameFunction

• **tableNameFunction**? : *[NameFunction](#namefunction)*

*Defined in [index.ts:61](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L61)*

___

### `Optional` url

• **url**? : *undefined | string*

*Defined in [index.ts:53](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L53)*

___

###  user

• **user**: *string*

*Defined in [index.ts:56](https://github.com/ozum/hasura-utils/blob/e7ef329/src/index.ts#L56)*

