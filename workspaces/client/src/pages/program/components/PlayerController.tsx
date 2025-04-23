import { Hoverable } from '@wsh-2025/client/src/features/layout/components/Hoverable';
import { useMuted } from '@wsh-2025/client/src/pages/program/hooks/useMuted';

export const PlayerController = () => {
  const [muted, toggleMuted] = useMuted();

  return (
			<div className="relative h-[120px]">
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#212121] to-transparent" />

				<div className="absolute inset-x-0 bottom-0 px-[12px]">
					<div className="flex w-full flex-row items-center justify-between">
						<div className="flex flex-row items-center">
							<div className="m-[14px] block size-[20px] shrink-0 grow-0 text-[#FFFFFF]">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									width="1em"
									height="1em"
								>
									<path
										fill="currentColor"
										d="M6.343 4.938a1 1 0 0 1 0 1.415a8.003 8.003 0 0 0 0 11.317a1 1 0 1 1-1.414 1.414c-3.907-3.906-3.907-10.24 0-14.146a1 1 0 0 1 1.414 0m12.732 0c3.906 3.907 3.906 10.24 0 14.146a1 1 0 0 1-1.415-1.414a8.003 8.003 0 0 0 0-11.317a1 1 0 0 1 1.415-1.415M9.31 7.812a1 1 0 0 1 0 1.414a3.92 3.92 0 0 0 0 5.544a1 1 0 1 1-1.415 1.414a5.92 5.92 0 0 1 0-8.372a1 1 0 0 1 1.415 0m6.958 0a5.92 5.92 0 0 1 0 8.372a1 1 0 0 1-1.414-1.414a3.92 3.92 0 0 0 0-5.544a1 1 0 0 1 1.414-1.414m-4.186 2.77a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3"
									/>
								</svg>
							</div>
							<span className="ml-[4px] block shrink-0 grow-0 text-[12px] font-bold text-[#FFFFFF]">
								ライブ配信
							</span>
						</div>

						<div className="flex flex-row items-center">
							<Hoverable
								classNames={{
									default: "bg-transparent",
									hovered: "bg-[#FFFFFF1F]",
								}}
							>
								<button
									aria-label={muted ? "ミュート解除する" : "ミュートする"}
									className="block rounded-[4px]"
									type="button"
									onClick={() => {
										toggleMuted();
									}}
								>
									<span className="m-[14px] block size-[20px] shrink-0 grow-0">
										{muted ? (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												height="20px"
												viewBox="0 -960 960 960"
												width="20px"
												fill="#FFFFFF"
											>
												<path d="M744-480.66q0-78.34-43-142.84t-112.84-96.84Q574-727 567-740.5t-1-27.5q6-15 21.5-21t30.51.58Q709-748 762.5-664.5 816-581 816-479.87t-53.5 184Q709-213 618.01-172.58 603-166 587.5-172q-15.5-6-21.5-21-6-14 1-27.5t21.16-20.16Q658-273 701-337.66q43-64.65 43-143ZM288-384H180q-15.3 0-25.65-10.35Q144-404.7 144-420v-120q0-15.3 10.35-25.65Q164.7-576 180-576h108l131-131q17-17 39-7.55t22 33.76v401.48q0 24.31-22 33.81-22 9.5-39-7.5L288-384Zm360-96q0 37-18 76t-51 59q-9 5-18 .5t-9-15.97v-239.06q0-11.47 9-15.97t18 .5q33 19 51 58.5t18 76.5Z" />
											</svg>
										) : (
											<svg
												xmlns="http://www.w3.org/2000/svg"
												height="20px"
												viewBox="0 -960 960 960"
												width="20px"
												fill="#FFFFFF"
											>
												<path d="M661-197q-11 7-23 13t-26 12q-14 6-28.5 0T564-192q-5-14 1.5-27.5T586-239l12-6q6-3 11-5L480-378v100q0 24-22 33.5t-39-7.5L288-383H180q-15 0-25.5-10.5T144-419v-120q0-15 10.5-25.5T180-575h102L115-743q-11-11-11-25.5t11-25.5q11-11 25.5-11t25.5 11l628 628q11 11 11 25t-11 25q-11 11-25.5 11T743-116l-82-81Zm83-282q0-79-43-143.5T588-719q-14-7-21-20.5t-1-27.5q6-15 21-21t30 1q90 40 144.5 122.5T816-480q0 32-6 63t-18 60q-8 20-22 25t-27 0q-13-5-20.5-17.5T722-376q11-24 16.5-50t5.5-53ZM579-614q32 20 50.5 59t18.5 76v12q0 6-1 11-2 11-13 14.5t-20-5.5l-51-51q-5-5-8-11.5t-3-14.5v-75q0-11 9-15.5t18 .5Zm-179-47q-5-5-5-13t5-13l19-19q17-17 39-7.5t22 33.5v56q0 12-11.5 16t-19.5-4l-49-49Z" />
											</svg>
										)}
									</span>
								</button>
							</Hoverable>
						</div>
					</div>
				</div>
			</div>
		);
};
