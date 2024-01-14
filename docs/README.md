@cdellacqua/debounce

# @cdellacqua/debounce

## Table of contents

### Type Aliases

- [DebounceState](README.md#debouncestate)
- [Debounced](README.md#debounced)
- [ReadonlyStore](README.md#readonlystore)
- [Subscriber](README.md#subscriber)
- [Unsubscribe](README.md#unsubscribe)

### Functions

- [debounce](README.md#debounce)

## Type Aliases

### DebounceState

Ƭ **DebounceState**: ``"idle"`` \| ``"debouncing"``

#### Defined in

[src/lib/index.ts:11](https://github.com/cdellacqua/debounce.js/blob/main/src/lib/index.ts#L11)

___

### Debounced

Ƭ **Debounced**<`TArgs`\>: (...`args`: `TArgs`) => `void` & { `state$`: [`ReadonlyStore`](README.md#readonlystore)<[`DebounceState`](README.md#debouncestate)\> ; `cancel`: () => `void` ; `flush`: () => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `unknown`[] |

#### Defined in

[src/lib/index.ts:12](https://github.com/cdellacqua/debounce.js/blob/main/src/lib/index.ts#L12)

___

### ReadonlyStore

Ƭ **ReadonlyStore**<`T`\>: `Object`

A store that can have subscribers and emit values to them. It also
provides the current value upon subscription. It's readonly in the
sense that it doesn't provide direct set/update methods, unlike {@link Store},
therefore its value can only be changed by a {@link StartHandler} (see also {@link makeReadonlyStore}).

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `content` | () => `T` |
| `nOfSubscriptions` | () => `number` |
| `subscribe` | (`subscriber`: [`Subscriber`](README.md#subscriber)<`T`\>) => [`Unsubscribe`](README.md#unsubscribe) |

#### Defined in

node_modules/universal-stores/dist/index.d.ts:33

___

### Subscriber

Ƭ **Subscriber**<`T`\>: (`current`: `T`) => `void`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Type declaration

▸ (`current`): `void`

A generic subscriber that takes a value emitted by a signal as its only parameter.

##### Parameters

| Name | Type |
| :------ | :------ |
| `current` | `T` |

##### Returns

`void`

#### Defined in

node_modules/@cdellacqua/signals/dist/index.d.ts:2

___

### Unsubscribe

Ƭ **Unsubscribe**: () => `void`

#### Type declaration

▸ (): `void`

A function that's used to unsubscribe a subscriber from a signal.

##### Returns

`void`

#### Defined in

node_modules/@cdellacqua/signals/dist/index.d.ts:4

## Functions

### debounce

▸ **debounce**<`TArgs`\>(`fn`, `ms?`, `leading?`): [`Debounced`](README.md#debounced)<`TArgs`\>

Debounce a function with using the given time interval

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `unknown`[] |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fn` | (...`args`: `TArgs`) => `void` | `undefined` | the original function that will get debounced |
| `ms` | `number` \| ``"animationFrame"`` | `'animationFrame'` | (default: 'animationFrame') debounce interval or a string indicating 'animationFrame' |
| `leading` | `boolean` | `false` | (default: false) if false the function call is postponed at the end of the interval, otherwise the function is called before debouncing |

#### Returns

[`Debounced`](README.md#debounced)<`TArgs`\>

a debounced function that takes the same parameters of the original

#### Defined in

[src/lib/index.ts:21](https://github.com/cdellacqua/debounce.js/blob/main/src/lib/index.ts#L21)
