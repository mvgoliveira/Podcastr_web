import { createContext, useState, ReactNode } from 'react';

type Episode = {
   title: string;
   members: string;
   thumbnail: string;
   duration: number;
   url: string;
}

type PlayerContextData = {
   episodeList: Array<Episode>;
   currentEpisodeIndex: number;
   isPlaying: boolean;
   hasPrevious: boolean;
   hasNext: boolean;
   isLooping: boolean;
   play: (episode: Episode) => void;
   togglePlay: () => void;
   toggleLoop: () => void;
   setPlayingState: (state: boolean) => void;
   playList: (list: Array<Episode>, index: number) => void;
   playNext: () => void;
   playPrevious: () => void;
}

export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
   children: ReactNode;
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
   const [episodeList, setEpisodeList] = useState([]);
   const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);
   const [isLooping, setIsLooping] = useState(false);

   function play(episode: Episode) {
      setEpisodeList([episode]);
      setCurrentEpisodeIndex(0);
      setIsPlaying(true);
   }

   function playList(list: Array<Episode>, index: number) {
      setEpisodeList(list);
      setCurrentEpisodeIndex(index);
      setIsPlaying(true);
   }

   function togglePlay() {
      setIsPlaying(!isPlaying);
   }

   function toggleLoop() {
      setIsLooping(!isLooping);
   }

   function setPlayingState(state: boolean ) {
      setIsPlaying(state);
   }

   const hasNext = currentEpisodeIndex > 0;
   const hasPrevious = (currentEpisodeIndex + 1) < episodeList.length;

   function playNext() {
      if (hasNext) {
         setCurrentEpisodeIndex(currentEpisodeIndex - 1);
      }
   }

   function playPrevious() {
      if (hasPrevious) {
         setCurrentEpisodeIndex(currentEpisodeIndex + 1);
      }
   }
   
   return (
      <PlayerContext.Provider value={{ 
         episodeList, 
         currentEpisodeIndex, 
         play, 
         playList,
         isPlaying, 
         isLooping,
         togglePlay, 
         toggleLoop,
         setPlayingState,
         playNext,
         playPrevious,
         hasNext,
         hasPrevious,
      }}>

      { children }

      </PlayerContext.Provider>
      
   );
}

