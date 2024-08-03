import { create } from 'zustand'
import { GameData } from '../types'

export const useGameStore = create<GameData>()(
    (set) => ({
        players: {
            homePlayer: {
                id: 'playerID',
                name: 'player',
                score: 0,
                strikes: 0
            },
            awayPlayer: {
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
        currentTurn: "homePlayer",
        id: ""
    })
);