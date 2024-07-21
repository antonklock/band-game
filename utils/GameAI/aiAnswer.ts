// import { searchLastFM } from "../../api/lastFM/lastFM";
// import { useGameStore } from "../../stores/gameStore";


// const gameData = useGameStore.getState();

// const generateAiAnswer = () => {
//     const lastBand = gameData.bands[gameData.bands.length - 1];

//     if (lastBand.guesser === "player" && lastBand.status === "valid") {
//         const randomTimeoutTime = Math.floor(Math.random() * 6000) + 1000;

//         const fetchAndAddBand = async () => {
//             try {
//                 const lastLetter = gameData.currentBandName.slice(-1);
//                 const searchResults = await searchLastFM(lastLetter);

//                 let newBand = "";
//                 for (
//                     let i = Math.floor(Math.random() * searchResults.length);
//                     i < searchResults.length;
//                     i++
//                 ) {
//                     if (searchResults[i][0] === lastLetter) {
//                         newBand = searchResults[i];

//                         newBand = newBand
//                             .split(" ")
//                             .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                             .join(" ");

//                         console.log("New band: ", newBand);

//                         handleAddNewBand(newBand, "opponent", uuid.v4() as string);
//                         break;
//                     }
//                 }
//             } catch (error) {
//                 console.error("Failed to fetch new band", error);
//             }
//         };

//         const timeoutId = setTimeout(() => {
//             if (gameData.currentBandName) {
//                 return fetchAndAddBand();
//             } else {
//                 return getAiResponse();
//             }
//         }, randomTimeoutTime);

//         return () => clearTimeout(timeoutId);
//     }
// }