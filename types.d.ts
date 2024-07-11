interface GameData {
    players: {
        player: {
            id: string;
            name: string;
            score: number;
            strikes: 0 | 1 | 2 | 3;
        };
        opponent: {
            id: string;
            name: string;
            score: number;
            strikes: 0 | 1 | 2 | 3;
        };
    };
    bands: {
        name: string;
        guesser: "player" | "opponent";
    }[];
    currentBandName: string;
    inputBandName: string;
    gameStarted: boolean;
}

export { GameData };