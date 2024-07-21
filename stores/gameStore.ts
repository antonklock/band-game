import { create } from 'zustand'
import { GameData } from '../types'

export const useGameStore = create<GameData>()(
    (set) => ({
        players: {
            player: {
                id: 'playerID',
                name: 'player',
                score: 0,
                strikes: 0
            },
            opponent: {
                id: 'opponentID',
                name: 'opponent',
                score: 0,
                strikes: 0,
            },
        },
        bands: [],
        currentBandName: "",
        inputBandName: "",
        gameStarted: false,
    })
);