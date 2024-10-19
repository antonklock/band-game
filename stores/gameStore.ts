import { create } from 'zustand';
import { GameData } from '../types';
import { doc, updateDoc, getDoc, addDoc, collection, deleteDoc, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../firebaseConfig';
import { flattenObject } from '../utils/GameAI/flattenObject';

interface GameStore {
    gameId: string | null;
    game: GameData | null;
    userGames: GameData[];
    isLoading: boolean;
    error: string | null;
    setGameId: (gameId: string) => void;
    createGame: (gameData: Omit<GameData, 'id'>) => Promise<string>;
    loadGame: (gameId: string) => Promise<void>;
    updateGame: (updateFn: (game: GameData) => GameData) => Promise<void>;
    removeGame: (gameId: string) => Promise<void>;
    getUserGames: (userId: string) => Promise<void>;
}

export const useGameStore = create<GameStore>((set, get) => ({
    gameId: null,
    game: null,
    userGames: [],
    isLoading: false,
    error: null,
    setGameId: (gameId) => set({ gameId }),
    createGame: async (gameData) => {
        set({ isLoading: true, error: null });
        try {
            const gamesCollection = collection(firestore, 'games');
            const docRef = await addDoc(gamesCollection, gameData);
            const newGameId = docRef.id;
            const newGame: GameData = { id: newGameId, ...gameData };
            set({ gameId: newGameId, game: newGame, isLoading: false });
            return newGameId;
        } catch (error) {
            console.error('Error creating game:', error);
            set({ error: 'Failed to create game', isLoading: false });
            throw error;
        }
    },
    loadGame: async (gameId: string) => {
        set({ isLoading: true, error: null });
        try {
            const gameRef = doc(firestore, 'games', gameId);
            const gameSnap = await getDoc(gameRef);
            if (gameSnap.exists()) {
                const loadedGame = { id: gameSnap.id, ...gameSnap.data() } as GameData;
                set({ gameId, game: loadedGame, isLoading: false });
            } else {
                set({ error: 'Game not found', isLoading: false });
            }
        } catch (error) {
            console.error('Error loading game:', error);
            set({ error: 'Failed to load game', isLoading: false });
        }
    },
    updateGame: async (updateFn) => {
        const { game: game, gameId } = get();
        if (!game || !gameId) throw new Error('Game not loaded');

        const updatedGame = updateFn(game);
        set({ game: updatedGame });

        const gameRef = doc(firestore, 'games', gameId);
        const flattenedGame = flattenObject(updatedGame);
        await updateDoc(gameRef, flattenedGame).catch((error) => {
            console.error('Error updating document: ', error);
            set({ error: 'Failed to update game' });
        });
    },
    removeGame: async (gameId: string) => {
        // Get the current state
        const currentUserGames = get().userGames;

        // Optimistically update local state
        set((state) => ({
            userGames: state.userGames.filter(game => game.id !== gameId),
            game: state.game && state.game.id === gameId ? null : state.game,
            gameId: state.gameId === gameId ? null : state.gameId
        }));

        // Then perform the Firestore operation
        try {
            const gameRef = doc(firestore, 'games', gameId);
            await deleteDoc(gameRef);
        } catch (error) {
            console.error('Error removing game:', error);
            set({ userGames: currentUserGames });
            console.log("Rolled back optimistic update");
        }
    },
    getUserGames: async (userId: string) => {
        set({ isLoading: true, error: null });
        try {
            const gamesCollection = collection(firestore, 'games');
            const userGamesQuery = query(
                gamesCollection,
                // where('players.homePlayer.id', '==', userId)
                where('players.homePlayer.id', '==', "homeID")
            );
            const querySnapshot = await getDocs(userGamesQuery);
            const games: GameData[] = [];
            querySnapshot.forEach((doc) => {
                games.push({ id: doc.id, ...doc.data() } as GameData);
            });
            set({ userGames: games, isLoading: false });
        } catch (error) {
            console.error('Error fetching user games:', error);
            set({ error: 'Failed to fetch user games', isLoading: false });
        }
    },
}));

export const gameStore = useGameStore
