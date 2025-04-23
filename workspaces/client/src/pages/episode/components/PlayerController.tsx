import * as Slider from '@radix-ui/react-slider';
import { StandardSchemaV1 } from '@standard-schema/spec';
import * as schema from '@wsh-2025/schema/src/api/schema';
import { Duration } from 'luxon';
import invariant from 'tiny-invariant';

import { Hoverable } from '@wsh-2025/client/src/features/layout/components/Hoverable';
import { SeekThumbnail } from '@wsh-2025/client/src/pages/episode/components/SeekThumbnail';
import { useCurrentTime } from '@wsh-2025/client/src/pages/episode/hooks/useCurrentTime';
import { useDuration } from '@wsh-2025/client/src/pages/episode/hooks/useDuration';
import { useMuted } from '@wsh-2025/client/src/pages/episode/hooks/useMuted';
import { usePlaying } from '@wsh-2025/client/src/pages/episode/hooks/usePlaying';

interface Props {
  episode: StandardSchemaV1.InferOutput<typeof schema.getEpisodeByIdResponse>;
}

export const PlayerController = ({ episode }: Props) => {
  const duration = useDuration();
  const [currentTime, updateCurrentTime] = useCurrentTime();
  const [playing, togglePlaying] = usePlaying();
  const [muted, toggleMuted] = useMuted();

  return (
			<div className="relative h-[120px]">
				<div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#212121] to-transparent" />

				<div className="absolute inset-x-0 bottom-0 px-[12px]">
					<div className="group relative size-full">
						<div className="pointer-events-none relative size-full opacity-0 group-hover:opacity-100">
							<SeekThumbnail episode={episode} />
						</div>

						<Slider.Root
							className="group relative flex h-[20px] w-full cursor-pointer touch-none select-none flex-row items-center"
							max={duration}
							min={0}
							orientation="horizontal"
							value={[currentTime]}
							onValueChange={([t]) => {
								invariant(t);
								updateCurrentTime(t);
							}}
						>
							<Slider.Track className="grow-1 relative h-[2px] rounded-[4px] bg-[#999999] group-hover:h-[4px]">
								<Slider.Range className="absolute h-[2px] rounded-[4px] bg-[#1c43d1] group-hover:h-[4px]" />
							</Slider.Track>
							<Slider.Thumb className="block size-[20px] rounded-[10px] bg-[#1c43d1] opacity-0 focus:outline-none group-hover:opacity-100" />
						</Slider.Root>
					</div>

					<div className="flex w-full flex-row items-center justify-between">
						<div className="flex flex-row items-center">
							<div className="flex flex-row items-center">
								<Hoverable
									classNames={{
										default: "bg-transparent",
										hovered: "bg-[#FFFFFF1F]",
									}}
								>
									<button
										aria-label={playing ? "一時停止する" : "再生する"}
										className="block rounded-[4px]"
										type="button"
										onClick={() => {
											togglePlaying();
										}}
									>
										<span className="m-[14px] block size-[20px] shrink-0 grow-0 ">
											{playing ? (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													height="20px"
													viewBox="0 -960 960 960"
													width="20px"
													fill="#FFFFFF"
												>
													<path d="M636-228q-29.7 0-50.85-21.15Q564-270.3 564-300v-360q0-29.7 21.15-50.85Q606.3-732 636-732h24q29.7 0 50.85 21.15Q732-689.7 732-660v360q0 29.7-21.15 50.85Q689.7-228 660-228h-24Zm-336 0q-29.7 0-50.85-21.15Q228-270.3 228-300v-360q0-29.7 21.15-50.85Q270.3-732 300-732h24q29.7 0 50.85 21.15Q396-689.7 396-660v360q0 29.7-21.15 50.85Q353.7-228 324-228h-24Z" />
												</svg>
											) : (
												<svg
													xmlns="http://www.w3.org/2000/svg"
													height="20px"
													viewBox="0 -960 960 960"
													width="20px"
													fill="#FFFFFF"
												>
													<path d="M336-282.24v-395.52Q336-694 346.93-704t25.5-10q4.55 0 9.56 1.5 5.01 1.5 9.69 4.37L697-510q8 5.32 12.5 13.31 4.5 7.98 4.5 16.85 0 8.87-4.5 16.86Q705-455 697-450L391.67-251.75q-4.68 2.88-9.84 4.31Q376.68-246 372-246q-14.4 0-25.2-10-10.8-10-10.8-26.24Z" />
												</svg>
											)}
										</span>
									</button>
								</Hoverable>

								<span className="ml-[4px] block shrink-0 grow-0 text-[12px] font-bold text-[#FFFFFF]">
									{Duration.fromObject({ seconds: currentTime }).toFormat(
										"mm:ss",
									)}
									{" / "}
									{Duration.fromObject({ seconds: duration }).toFormat("mm:ss")}
								</span>
							</div>
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
