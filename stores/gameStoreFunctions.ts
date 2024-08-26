// import { Band, BandStatus, GuesserType } from "../types";
// import { useGameStore } from "./gameStore";

// const setGameState = useGameStore.setState;

// const addNewBandToGameStore = (
//     bandProps: {
//         name: string,
//         guesser: GuesserType,
//         guessId: string
//     },
//     status: BandStatus = "validating",
// ) => {
//     const { name, guesser, guessId } = bandProps;
//     const band: Band = {
//         name,
//         guesser,
//         status,
//         guessId,
//         setStatus: (status: BandStatus) => {
//             setGameState((state) => ({
//                 bands: state.bands.map((band) =>
//                     band.guessId === guessId ? { ...band, status } : band
//                 ),
//             }));
//         },
//     };
//     setGameState((state) => ({
//         bands: [...state.bands, band],
//     }));
// };

// const updateBandStatus = (guessId: string, status: BandStatus) => {
//     setGameState((state) => ({
//         bands: state.bands.map((band) =>
//             band.guessId === guessId ? { ...band, status } : band
//         ),
//     }));
// }

// const setCurrentBandName = (guessId: string) => {
//     const currentBandName = useGameStore.getState().bands.find(
//         (band) => band.guessId === guessId
//     )?.name;
//     setGameState({ currentBandName });
// };

// export { addNewBandToGameStore, updateBandStatus, setCurrentBandName };