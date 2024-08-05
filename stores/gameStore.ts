import { create } from 'zustand';
import { GameData } from '../types';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { flattenObject } from '../utils/GameAI/flattenObject';

interface GameStore {
    games: GameData[];
    setGame: (game: GameData) => void;
    setGames: (games: GameData[]) => void;
    updateGame: (gameId: string, updateFn: (game: GameData) => GameData) => Promise<void>;
    removeGame: (gameId: string) => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
    games: [],
    setGame: (game) => set((state) => ({
        games: [...state.games.filter(g => g.id !== game.id), game]
    })),
    setGames: (games) => set({ games }),
    updateGame: async (gameId, updateFn) => {
        const { games } = get();
        const gameIndex = games.findIndex(game => game.id === gameId);
        if (gameIndex === -1) throw new Error('Game not found');

        const updatedGame = updateFn(games[gameIndex]);
        const newGames = [...games];
        newGames[gameIndex] = updatedGame;

        set({ games: newGames });

        const gameRef = doc(firestore, 'games', gameId);
        const flattenedGame = flattenObject(updatedGame);
        await updateDoc(gameRef, flattenedGame).catch((error) => {
            // TODO: Handle rollback if update fails
            console.error('Error updating document: ', error);
            console.warn('UI rollback not implemented!');
        });
    },
    removeGame: async (gameId) => {
        const { games } = get();
        const gameToDelete = games.find(game => game.id === gameId);
        if (!gameToDelete) throw new Error('Game not found');
        const filteredGames = games.filter(game => game.id !== gameId);
        set({ games: filteredGames });

        const gameRef = doc(firestore, 'games', gameId);
        await deleteDoc(gameRef).catch((error) => {
            // TODO: Handle rollback if update fails
            console.error('Error removing document: ', error);
            console.warn('UI rollback not implemented!');
        });
    }
}));