const Header = () => {
	return (
		<nav className=" flex justify-between items-center p-4">
			<div>
				<img src="/images/logo.svg" alt="Weather Now Logo" />
			</div>
			<div>
				<button
					type="button"
					className="flex flex-row items-center gap-2 rounded-lg bg-[var(--neutral-700)] py-2 px-4 cursor-pointer"
				>
					<div>
						<img src="/images/icon-units.svg" alt="Weather Now Logo" />
					</div>
					<p>Units</p>
					<div>
						<img src="/images/icon-dropdown.svg" alt="" />
					</div>
				</button>
				<ul>
					<li></li>
					<li></li>
					<li></li>
				</ul>
			</div>
		</nav>
	);
};

export default Header;
