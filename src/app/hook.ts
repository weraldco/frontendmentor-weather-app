// app/hooks.ts
import {
	type TypedUseSelectorHook,
	useDispatch,
	useSelector,
} from 'react-redux';
import type { AppDispatch, RootState } from './store';

// Typed versions of hooks
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
