@cdellacqua/debounce

# @cdellacqua/debounce

## Table of contents

### Type Aliases

- [DebounceState](README.md#debouncestate)
- [Debounced](README.md#debounced)

### Functions

- [debounce](README.md#debounce)

## Type Aliases

### DebounceState

Ƭ **DebounceState**: ``"idle"`` \| ``"debouncing"``

#### Defined in

[index.ts:9](https://github.com/cdellacqua/debounce.js/blob/main/src/lib/index.ts#L9)

___

### Debounced

Ƭ **Debounced**<`TArgs`\>: (...`args`: `TArgs`) => `void` & { `state$`: `ReadonlyStore`<[`DebounceState`](README.md#debouncestate)\> ; `cancel`: () => `void` ; `flush`: () => `void`  }

#### Type parameters

| Name | Type |
| :------ | :------ |
| `TArgs` | extends `unknown`[] |

#### Defined in

[index.ts:10](https://github.com/cdellacqua/debounce.js/blob/main/src/lib/index.ts#L10)

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

[index.ts:19](https://github.com/cdellacqua/debounce.js/blob/main/src/lib/index.ts#L19)
