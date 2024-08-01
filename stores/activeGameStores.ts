import { firestore } from '../firebaseConfig';

import { getFirestore, collection, onSnapshot, updateDoc, arrayUnion, doc } from 'firebase/firestore';
import { Band, BandStatus, GameData } from '../types';
import { create } from 'zustand';

interface ActiveGameStore {
    games: GameData[];
    setGames: (games: GameData[]) => void;
}

export const useActiveGameStore = create<ActiveGameStore>((set) => ({
    games: [],
    setGames: (games) => set({ games }),
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