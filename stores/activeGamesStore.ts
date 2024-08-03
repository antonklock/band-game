import { firestore } from '../firebaseConfig';

import { collection, onSnapshot, updateDoc, arrayUnion, deleteDoc, doc, addDoc, setDoc } from 'firebase/firestore';
import { Band, BandStatus, GameData } from '../types';
import { create } from 'zustand';

interface ActiveGameStore {
    games: GameData[];
    setGames: (games: GameData[]) => void;
    removeGame: (gameId: string) => void;
    updateGame: (gameId: string, updateFn: (game: GameData) => GameData) => void;
    addGame: (newGame: GameData) => Promise<string | null>;
}

export const useActiveGamesStore = create<ActiveGameStore>((set) => ({
    games: [],
    setGames: (games) => set({ games }),
    removeGame: async (gameId: string) => {
        try {
            await deleteDoc(doc(firestore, 'games', gameId));
            console.log(`Game ${gameId} removed successfully`);
        } catch (error) {
            console.error('Error removing game:', error);
        }
    },
    updateGame: async (gameId: string, updateFn: (game: GameData) => GameData) =>
        set(
            (state) => {
                const gameIndex = state.games.findIndex((game) => game.id === gameId);
                if (gameIndex === -1) return state;
                const newGames = [...state.games];
                newGames[gameIndex] = updateFn(newGames[gameIndex]);
                return { games: newGames };
            },
            false,
        ),
    addGame: async (newGame: GameData) => {
        try {
            const docRef = doc(firestore, 'games', newGame.id);
            await setDoc(docRef, newGame);
            console.log(`Game ${docRef.id} added successfully`);
            return docRef.id;
        } catch (error) {
            console.error('Error adding game: ', error);
            return null;
        }
    }
}));

export const subscribeToGames = () => {
    const { setGames } = useActiveGamesStore.getState();

    const unsubscribe = onSnapshot(collection(firestore, 'games'), (snapshot) => {
        const games = snapshot.docs.map((doc) => {
            const data = doc.data();
            const bands = data.bands.map((band: Omit<Band, 'setStatus'>) => ({
                ...band,
                setStatus: (status: BandStatus) => {
                    updateDoc(doc.ref, {
                        bands: arrayUnion({
                            ...band,
                            status
                        })
                    });
                }
            }));

            return {
                id: doc.id,
                players: {
                    homePlayer: data.players?.homePlayer || { id: '', name: '', score: 0, strikes: 0 },
                    awayPlayer: data.players?.awayPlayer || { id: '', name: '', score: 0, strikes: 0 },
                },
                bands,
                currentBandName: data.currentBandName || '',
                inputBandName: data.inputBandName || '',
                gameStarted: data.gameStarted || false,
                currentTurn: data.currentTurn || 'homePlayer',
            } as GameData;
        });
        setGames(games);
    });

    return unsubscribe;
};

// Function to initialize the subscription
export const initializeGameSubscription = () => {
    const unsubscribe = subscribeToGames();
    return unsubscribe;
};