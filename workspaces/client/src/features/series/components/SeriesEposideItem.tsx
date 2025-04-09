import Ellipsis from 'react-ellipsis-component';
import { Flipped } from 'react-flip-toolkit';
import { NavLink } from 'react-router';

import { Hoverable } from '@wsh-2025/client/src/features/layout/components/Hoverable';

interface Props {
  episode: {
    description: string;
    id: string;
    premium: boolean;
    thumbnailUrl: string;
    title: string;
  };
  selected: boolean;
}

export const SeriesEpisodeItem = ({ episode, selected }: Props) => {
  return (
    <Hoverable classNames={{ hovered: 'opacity-75' }}>
      <NavLink
        viewTransition
        className="block flex w-full flex-row items-start justify-between gap-x-[16px]"
        to={`/episodes/${episode.id}`}
      >
        {({ isTransitioning }) => {
          return (
            <>
              <Flipped stagger flipId={!selected && isTransitioning ? `episode-${episode.id}` : 0}>
                <div className="relative shrink-0 grow-0 overflow-hidden rounded-[8px] border-[2px] border-solid border-[#FFFFFF1F] before:absolute before:inset-x-0 before:bottom-0 before:block before:h-[64px] before:bg-gradient-to-t before:from-[#212121] before:to-transparent before:content-['']">
                  <img alt="" className="h-auto w-[192px]" src={episode.thumbnailUrl} />
                  <span className="absolute bottom-[4px] left-[4px] m-[4px] block size-[20px] text-[#ffffff]">
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"><path d="M336-282.24v-395.52Q336-694 346.93-704t25.5-10q4.55 0 9.56 1.5 5.01 1.5 9.69 4.37L697-510q8 5.32 12.5 13.31 4.5 7.98 4.5 16.85 0 8.87-4.5 16.86Q705-455 697-450L391.67-251.75q-4.68 2.88-9.84 4.31Q376.68-246 372-246q-14.4 0-25.2-10-10.8-10-10.8-26.24Z"/></svg>
                  </span>
                  {episode.premium ? (
                    <span className="absolute bottom-[8px] right-[4px] inline-flex items-center justify-center rounded-[4px] bg-[#1c43d1] p-[4px] text-[10px] text-[#ffffff]">
                      プレミアム
                    </span>
                  ) : null}
                </div>
              </Flipped>

              <div className="grow-1 shrink-1">
                <div className="mb-[8px] text-[18px] font-bold text-[#ffffff]">
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.title} visibleLine={2} />
                </div>
                <div className="text-[12px] text-[#999999]">
                  <Ellipsis ellipsis reflowOnResize maxLine={2} text={episode.description} visibleLine={2} />
                </div>
              </div>
            </>
          );
        }}
      </NavLink>
    </Hoverable>
  );
};
