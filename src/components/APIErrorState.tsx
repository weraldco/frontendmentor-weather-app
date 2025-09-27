const APIErrorState = () => {
	return (
		<div className="h-full row-start-2 row-end-4 flex flex-col items-center justify-start gap-4">
			<img src="/images/icon-error.svg" alt="Error Logo" className="h-8" />
			<h1 className="font-bold font-bricolage text-4xl">
				Something went wrong
			</h1>
			<p className="text-center max-w-[400px] text-sm">
				We couldn't connect to the server (API error), Please try again in a few
				moments.
			</p>
			<button
				className="flex bg-[var(--neutral-800)] items-center justify-center gap-2 text-sm p-2 rounded-lg cursor-pointer"
				type="button"
			>
				<img src="/images/icon-retry.svg" alt="Retry Logo" />
				<p className="text-xs">Retry</p>
			</button>
		</div>
	);
};

export default APIErrorState;
