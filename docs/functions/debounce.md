[**@cdellacqua/debounce**](../README.md)

***

[@cdellacqua/debounce](../README.md) / debounce

# Function: debounce()

> **debounce**\<`TArgs`\>(`fn`, `ms?`, `leading?`): [`Debounced`](../type-aliases/Debounced.md)\<`TArgs`\>

Defined in: [src/lib/index.ts:21](https://github.com/cdellacqua/debounce.js/blob/main/src/lib/index.ts#L21)

Debounce a function with using the given time interval

## Type Parameters

### TArgs

`TArgs` *extends* `unknown`[]

## Parameters

### fn

(...`args`) => `void`

the original function that will get debounced

### ms?

`number` \| `"animationFrame"`

(default: 'animationFrame') debounce interval or a string indicating 'animationFrame'

### leading?

`boolean` = `false`

(default: false) if false the function call is postponed at the end of the interval, otherwise the function is called before debouncing

## Returns

[`Debounced`](../type-aliases/Debounced.md)\<`TArgs`\>

a debounced function that takes the same parameters of the original
