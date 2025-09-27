import { useState } from 'react';

type HeaderPropsT = {
	temperature: string;
	setTemperature: (temp: string) => void;
	wind: string;
	setWind: (w: string) => void;
	precipitation: string;
	setPrecipitation: (prep: string) => void;
	handleClick: () => void;
};

const Header = ({
	temperature,
	setTemperature,
	wind,
	setWind,
	precipitation,
	setPrecipitation,
	handleClick,
}: HeaderPropsT) => {
	const [isMenu, setIsMenu] = useState(false);
	console.log(precipitation);
	return (
		<nav className=" flex justify-between items-center p-4">
			<a href="/">
				<img src="/images/logo.svg" alt="Weather Now Logo" />
			</a>
			<div className="relative text-sm group">
				<button
					type="button"
					className="flex flex-row items-center gap-2 rounded-lg bg-[var(--neutral-700)] py-2 px-4 cursor-pointer"
					onClick={() => setIsMenu((prev) => !prev)}
				>
					<div>
						<img src="/images/icon-units.svg" alt="Weather Now Logo" />
					</div>
					<p>Units</p>
					<div>
						<img src="/images/icon-dropdown.svg" alt="" />
					</div>
				</button>
				<div
					className={`bg-[var(--neutral-800)] p-2 rounded-xl absolute z-50 w-50 -left-23 top-12 group-hover:flex flex-col  border-1 border-[var(--neutral-600)] ${
						isMenu ? 'flex' : 'hidden'
					}`}
				>
					<button
						type="button"
						className="hover:bg-[var(--neutral-700)] p-2 text-left rounded-lg duration-200 cursor-pointer font-semibold"
						onClick={handleClick}
					>
						Switch to Imperial
					</button>
					<ul className="flex flex-col gap-1">
						<NavMenu title="Temperature">
							<NavMenuItem
								unit="Celsius (°C)"
								isActive={temperature == 'celsius' && true}
								setAction={() => setTemperature('celsius')}
							/>
							<NavMenuItem
								unit="Fahrenheit (°F)"
								isActive={temperature == 'fahrenheit' && true}
								setAction={() => setTemperature('fahrenheit')}
							/>
						</NavMenu>
						<NavMenu title="Wind Speed">
							<NavMenuItem
								unit="km/h"
								isActive={wind == 'kmh' && true}
								setAction={() => setWind('kmh')}
							/>
							<NavMenuItem
								unit="mph"
								isActive={wind == 'mph' && true}
								setAction={() => setWind('mph')}
							/>
						</NavMenu>
						<NavMenu title="Precipitation">
							<NavMenuItem
								unit="Millimeters (mm)"
								isActive={precipitation == 'mm' && true}
								setAction={() => setPrecipitation('mm')}
							/>
							<NavMenuItem
								unit="Inches (in)"
								isActive={precipitation == 'inch' && true}
								setAction={() => setPrecipitation('inch')}
							/>
						</NavMenu>
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default Header;

const NavMenu = ({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) => {
	return (
		<li className="flex flex-col border-t-1 border-[var(--neutral-600)] gap-1 pt-2">
			<h3 className="text-xs text-[var(--neutral-300)]">{title}</h3>
			{children}
		</li>
	);
};

const NavMenuItem = ({
	unit,
	isActive,
	setAction,
}: {
	unit: string;
	isActive?: boolean;
	setAction: () => void;
}) => {
	return (
		<div
			className={`hover:bg-[var(--neutral-700)] cursor-pointer duration-200 flex justify-between p-2 rounded-lg ${
				isActive && 'bg-[var(--neutral-700)]'
			}`}
			onClick={setAction}
		>
			<p className="font-semibold">{unit}</p>
			{isActive && (
				<img src="/images/icon-checkmark.svg" alt="Checkmark Icon" />
			)}
		</div>
	);
};
