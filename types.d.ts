interface GameData {
    players: {
        player1: {
            name: string;
            score: number;
        };
        player2: {
            name: string;
            score: number;
        };
    };
    bands: {
        name: string;
        guesser: "player1" | "player2";
    }[];
    currentBandName: string;
    inputBandName: string;
}

export { GameData };