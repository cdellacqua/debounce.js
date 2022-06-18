import {makeDerivedStore, makeStore, ReadonlyStore, Store} from 'universal-stores';

/* eslint @typescript-eslint/no-explicit-any: ["off"] */
const unifiedSetTimeout = (fn: () => void, ms: number) => setTimeout(fn, ms) as unknown;
const unifiedClearTimeout = (id: unknown) => clearTimeout(id as ReturnType<typeof setTimeout>);

const raf = typeof requestAnimationFrame === 'undefined' ? (fn: () => unknown) => unifiedSetTimeout(fn, 1000 / 60) : (fn: () => unknown) => requestAnimationFrame(fn) as unknown;
const cancelRaf = typeof cancelAnimationFrame === 'undefined' ? unifiedClearTimeout : (id: unknown) => cancelAnimationFrame(id as ReturnType<typeof requestAnimationFrame>);

export type DebounceState = 'idle' | 'debouncing';
export type Debounced<T> = T & {cancel(): void; flush(): void; get state(): DebounceState; state$: ReadonlyStore<DebounceState>};

/**
 * Debounce a function with using the given time interval
 * @param fn the original function that will get debounced
 * @param ms (default: 'animationFrame') debounce interval or a string indicating 'animationFrame'
 * @param leading (default: false) if false the function call is postponed at the end of the interval, otherwise the function is called before debouncing
 * @returns a debounced function that takes the same parameters of the original
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, ms: number | 'animationFrame' = 'animationFrame', leading = false): Debounced<T> {
	const defer = ms === 'animationFrame' ? (fn: () => unknown) => raf(fn) : (fn: () => unknown) => setTimeout(fn, ms) as unknown;
	const cancelDeferred = ms === 'animationFrame' ? cancelRaf : unifiedClearTimeout;

	type PendingItem = {
		id: ReturnType<typeof defer>;
		wrappedCall: () => void;
	};
	const pending$: Store<PendingItem | null> = makeStore(null);
	const state$ = makeDerivedStore<PendingItem | null, DebounceState>(pending$, (pending) => (pending === null ? 'idle' : 'debouncing'));

	const scheduleNext = <TFn extends (...args: any[]) => any>(scheduledFn: TFn, ...args: Parameters<TFn>) => {
		const wrappedCall = () => {
			scheduledFn(...args);
			pending$.set(null);
		};
		pending$.set({wrappedCall, id: defer(wrappedCall)});
	};
	const cancelScheduled = () => {
		const pending = pending$.value;
		if (pending) {
			cancelDeferred(pending.id);
			pending$.set(null);
		}
	};

	const debounced = !leading
		? function (...args: Parameters<T>) {
				cancelScheduled();
				scheduleNext(fn, ...args);
		  }
		: function (...args: Parameters<T>) {
				if (pending$.value === null) {
					fn(...args);
				} else {
					cancelScheduled();
				}
				scheduleNext(() => {
					pending$.set(null);
				});
		  };
	(debounced as Debounced<T>).cancel = () => {
		cancelScheduled();
	};
	(debounced as Debounced<T>).flush = () => {
		if (pending$.value !== null) {
			const pendingCall = pending$.value.wrappedCall;
			cancelScheduled();
			if (!leading) {
				pendingCall();
			}
		}
	};
	(debounced as Debounced<T>).state$ = state$;
	Object.defineProperty(debounced, 'state', {
		get() {
			return state$.value;
		},
	});
	return debounced as Debounced<T>;
}
