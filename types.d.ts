type PlayerStrike = 0 | 1 | 2 | 3;
type GuesserType = "player" | "opponent";
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
        player: Player;
        opponent: Player;
    };
    bands: Band[];
    currentBandName: string;
    inputBandName: string;
    gameStarted: boolean;
}

export { GameData, Band, Player, PlayerStrike, GuesserType, BandStatus };