import { computed, effect, ReadonlySignal, Signal } from '@preact/signals-core';
import { useSignal, useSignalEffect } from '@preact/signals-react';
import { DependencyList, useEffect, useMemo, useRef } from 'react';

export function useSignalEffectDeps(cb: () => void | (() => void), deps: DependencyList): void {
  const callback = useRef(cb);
  callback.current = cb;

  useEffect(() => {
    return effect(() => callback.current());
  }, deps);
}

export function useComputedDeps<T>(compute: () => T, des: DependencyList): ReadonlySignal<T> {
  const $compute = useRef(compute);
  $compute.current = compute;
  return useMemo(() => computed<T>(() => $compute.current()), des);
}
export function useDebouncedSignal<T>(sourceSignal: Signal<T>, debounceTimeInMs = 0): Signal<T> {
  const debounceSignal = useSignal<T>(sourceSignal.value);
  useSignalEffect(() => {
    const value = sourceSignal.value;
    const timeout = setTimeout(() => (debounceSignal.value = value), debounceTimeInMs);
    return () => clearTimeout(timeout);
  });
  return debounceSignal;
}
