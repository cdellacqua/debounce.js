import {expect} from 'chai';
import {debounce} from '../src/lib/index';

describe('debounce', () => {
	it('debounces', async () => {
		let callCount = 0;
		debounce(() => {
			callCount++;
		}, 10)();
		expect(callCount).to.equal(0);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
	});
	it('debounces with a function that takes some arguments', async () => {
		let debouncedA: number | undefined;
		let debouncedB: string | undefined;
		const debounced = debounce((a: number, b: string) => {
			debouncedA = a;
			debouncedB = b;
		}, 10);
		debounced(1, 'test');
		expect(debouncedA).to.be.undefined;
		expect(debouncedB).to.be.undefined;
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(debouncedA).to.equal(1);
		expect(debouncedB).to.equal('test');
	});
	it('debounces with a function that takes some arguments (leading set to true)', async () => {
		let debouncedA: number | undefined;
		let debouncedB: string | undefined;
		const debounced = debounce(
			(a: number, b: string) => {
				debouncedA = a;
				debouncedB = b;
			},
			10,
			true,
		);
		debounced(1, 'test');
		expect(debouncedA).to.equal(1);
		expect(debouncedB).to.equal('test');
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(debouncedA).to.equal(1);
		expect(debouncedB).to.equal('test');
	});
	it('flushes with a function that takes some arguments', async () => {
		let debouncedA: number | undefined;
		let debouncedB: string | undefined;
		const debounced = debounce((a: number, b: string) => {
			debouncedA = debouncedA ? 2 : a;
			debouncedB = debouncedB ? 'second test' : b;
		}, 10);
		debounced(1, 'test');
		debounced.flush();
		expect(debouncedA).to.equal(1);
		expect(debouncedB).to.equal('test');
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(debouncedA).to.equal(1);
		expect(debouncedB).to.equal('test');
	});
	it('flushes with a function that takes some arguments (leading set to true)', async () => {
		let debouncedA: number | undefined;
		let debouncedB: string | undefined;
		const debounced = debounce(
			(a: number, b: string) => {
				debouncedA = debouncedA ? 2 : a;
				debouncedB = debouncedB ? 'second test' : b;
			},
			10,
			true,
		);
		debounced(1, 'test');
		debounced.flush();
		expect(debouncedA).to.equal(1);
		expect(debouncedB).to.equal('test');
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(debouncedA).to.equal(1);
		expect(debouncedB).to.equal('test');
	});
	it('debounces (leading set to true)', async () => {
		let callCount = 0;
		debounce(
			() => {
				callCount++;
			},
			10,
			true,
		)();
		expect(callCount).to.equal(1);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
	});
	it('debounces twice', async () => {
		let callCount = 0;
		const debounced = debounce(() => {
			callCount++;
		}, 10);
		debounced();
		expect(callCount).to.equal(0);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
		debounced();
		expect(callCount).to.equal(1);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(2);
	});
	it('debounces twice (leading set to true)', async () => {
		let callCount = 0;
		const debounced = debounce(
			() => {
				callCount++;
			},
			10,
			true,
		);
		debounced();
		expect(callCount).to.equal(1);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
		debounced();
		expect(callCount).to.equal(2);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(2);
	});
	it('flushes the next debounce', async () => {
		let callCount = 0;
		const debounced = debounce(() => {
			callCount++;
		}, 10);
		debounced();
		expect(callCount).to.equal(0);
		debounced.flush();
		expect(callCount).to.equal(1);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
	});
	it('cancels the next debounce', async () => {
		let callCount = 0;
		const debounced = debounce(() => {
			callCount++;
		}, 10);
		debounced();
		expect(callCount).to.equal(0);
		debounced.cancel();
		expect(callCount).to.equal(0);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(0);
	});
	it('flushes the next debounce (leading set to true)', async () => {
		let callCount = 0;
		const debounced = debounce(
			() => {
				callCount++;
			},
			10,
			true,
		);
		debounced();
		expect(callCount).to.equal(1);
		debounced.flush();
		expect(callCount).to.equal(1);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
	});
	it('cancels the next debounce (leading set to true)', async () => {
		let callCount = 0;
		const debounced = debounce(
			() => {
				callCount++;
			},
			10,
			true,
		);
		debounced();
		expect(callCount).to.equal(1);
		debounced.cancel();
		expect(callCount).to.equal(1);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
	});
	it('flushes the second next debounce', async () => {
		let callCount = 0;
		const debounced = debounce(() => {
			callCount++;
		}, 10);
		debounced();
		expect(callCount).to.equal(0);
		debounced();
		expect(callCount).to.equal(0);
		debounced.flush();
		expect(callCount).to.equal(1);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
	});
	it('cancels the second next debounce', async () => {
		let callCount = 0;
		const debounced = debounce(() => {
			callCount++;
		}, 10);
		debounced();
		expect(callCount).to.equal(0);
		debounced();
		expect(callCount).to.equal(0);
		debounced.cancel();
		expect(callCount).to.equal(0);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(0);
	});
	it('flushes the second next debounce (leading set to true)', async () => {
		let callCount = 0;
		const debounced = debounce(
			() => {
				callCount++;
			},
			10,
			true,
		);
		debounced();
		expect(callCount).to.equal(1);
		debounced();
		expect(callCount).to.equal(1);
		debounced.flush();
		expect(callCount).to.equal(1);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
	});
	it('cancels the second next debounce (leading set to true)', async () => {
		let callCount = 0;
		const debounced = debounce(
			() => {
				callCount++;
			},
			10,
			true,
		);
		debounced();
		expect(callCount).to.equal(1);
		debounced();
		expect(callCount).to.equal(1);
		debounced.cancel();
		expect(callCount).to.equal(1);
		await new Promise<void>((res) => setTimeout(res, 11));
		expect(callCount).to.equal(1);
	});
});
