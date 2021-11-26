@cdellacqua/debounce

# @cdellacqua/debounce

## Table of contents

### Type aliases

- [Debounced](README.md#debounced)

### Functions

- [debounce](README.md#debounce)

## Type aliases

### Debounced

Ƭ **Debounced**<`T`\>: `T` & { `cancel`: () => `void` ; `flush`: () => `void`  }

#### Type parameters

| Name |
| :------ |
| `T` |

#### Defined in

[index.ts:8](https://github.com/cdellacqua/debounce.js/blob/main/src/lib/index.ts#L8)

## Functions

### debounce

▸ **debounce**<`T`\>(`fn`, `ms?`, `leading?`): [`Debounced`](README.md#debounced)<`T`\>

Debounce a function with using the given time interval

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `fn` | `T` | `undefined` | the original function that will get debounced |
| `ms` | `number` \| ``"animationFrame"`` | `'animationFrame'` | (default: 'animationFrame') debounce interval or a string indicating 'animationFrame' |
| `leading` | `boolean` | `false` | (default: false) if false the function call is postponed at the end of the interval, otherwise the function is called before debouncing |

#### Returns

[`Debounced`](README.md#debounced)<`T`\>

a debounced function that takes the same parameters of the original

#### Defined in

[index.ts:17](https://github.com/cdellacqua/debounce.js/blob/main/src/lib/index.ts#L17)
