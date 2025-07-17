import { create } from 'zustand';
import { matches as initialMatches, type Match } from '@/lib/data';

type MatchState = {
  matches: Match[];
  addMatch: (match: Match) => void;
};

export const useMatchStore = create<MatchState>((set) => ({
  matches: initialMatches,
  addMatch: (newMatch) =>
    set((state) => {
      // Avoid adding duplicate matches
      if (state.matches.some((match) => match.id === newMatch.id)) {
        return state;
      }
      return { matches: [...state.matches, newMatch] };
    }),
}));
