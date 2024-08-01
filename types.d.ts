type PlayerStrike = 0 | 1 | 2 | 3;
type GuesserType = "homePlayer" | "awayPlayer";
type BandStatus = "valid" | "invalid" | "validating";

interface Player {
    id: string;
    name: string;
    score: number;
    strikes: PlayerStrike;
}

interface Band {
    name: string;
    guesser: GuesserType;
    status: BandStatus;
    guessId: string;
    setStatus: (status: BandStatus) => void;
}

interface GameData {
    players: {
        homePlayer: Player;
        awayPlayer: Player;
    };
    bands: Band[];
    currentBandName: string;
    inputBandName: string;
    gameStarted: boolean;
    currentTurn: GuesserType;
    id: string;
}

export { GameData, Band, Player, PlayerStrike, GuesserType, BandStatus };