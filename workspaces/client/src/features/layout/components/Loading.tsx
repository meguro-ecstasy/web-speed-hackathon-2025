export const Loading = () => {
  return (
			<div className="absolute left-0 top-0 flex h-full w-full animate-[fade-in_0.5s_ease-in_0.5s_both] items-center justify-center bg-[#000000CC]">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					width="48px"
					height="48px"
				>
					<g
						fill="none"
						stroke="currentColor"
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth="2"
					>
						<path
							strokeDasharray="16"
							strokeDashoffset="16"
							d="M12 3c4.97 0 9 4.03 9 9"
						>
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								dur="0.3s"
								values="16;0"
							/>
							<animateTransform
								attributeName="transform"
								dur="1.5s"
								repeatCount="indefinite"
								type="rotate"
								values="0 12 12;360 12 12"
							/>
						</path>
						<path
							strokeDasharray="64"
							strokeDashoffset="64"
							strokeOpacity=".3"
							d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
						>
							<animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								dur="1.2s"
								values="64;0"
							/>
						</path>
					</g>
				</svg>
			</div>
		);
};
