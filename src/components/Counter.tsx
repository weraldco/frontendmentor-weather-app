import { useAppDispatch, useAppSelector } from '../app/hook';
import {
	decrement,
	increment,
	incrementByAmount,
} from '../features/counter/counterSlicer';

const Counter = () => {
	const count = useAppSelector((state) => state.counter.value);
	const dispatch = useAppDispatch();
	return (
		<div className="flex gap-10 items-center justify-center">
			<h1>Count: {count}</h1>
			<button
				className=" bg-blue-500 w-10 rounded p-4"
				onClick={() => dispatch(increment())}
			>
				+1
			</button>
			<button
				className=" bg-blue-500 w-10 rounded p-4"
				onClick={() => dispatch(decrement())}
			>
				-1
			</button>
			<button
				className=" bg-blue-500 w-10 rounded p-4"
				onClick={() => dispatch(incrementByAmount(5))}
			>
				+5
			</button>
		</div>
	);
};

export default Counter;
