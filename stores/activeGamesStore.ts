import { firestore } from '../firebaseConfig';

import { collection, onSnapshot, updateDoc, arrayUnion, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { Band, BandStatus, GameData } from '../types';
import { create } from 'zustand';

interface ActiveGameStore {
    games: GameData[];
    setGames: (games: GameData[]) => void;
    removeGame: (gameId: string) => void;
    updateGame: (gameId: string, updatedGame: GameData) => void;
    addGame: (newGame: GameData) => void;
}

export const useActiveGameStore = create<ActiveGameStore>((set) => ({
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
    updateGame: async (gameId: string, updatedGame: Partial<GameData>) => {
        try {
            const gameRef = doc(firestore, 'games', gameId);
            await updateDoc(gameRef, updatedGame);
            console.log(`Game ${gameId} updated successfully`);
        } catch (error) {
            console.error("Error updating game: ", error);
        }
    },
    addGame: async (newGame: Omit<GameData, 'id'>) => {
        try {
            const docRef = await addDoc(collection(firestore, 'games'), newGame);
            await updateDoc(doc(firestore, 'games', docRef.id), { id: docRef.id });
            console.log(`Game ${docRef.id} added successfully`);
        } catch (error) {
            console.error('Error adding game: ', error);
        }
    },
}));

export const subscribeToGames = () => {
    const { setGames } = useActiveGameStore.getState();

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