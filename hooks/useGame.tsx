// import { useCallback, useEffect, useState } from "react";
// import { doc, onSnapshot, getDoc, setDoc } from "firebase/firestore";
// import { firestore } from "../firebaseConfig";
// import { useGameStore } from "../stores/gameStore";
// import { GameData } from "../types";

// export function useGame(gameId: string) {
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   // const setGame = useGameStore((state) => state.setGame);
//   // const game = useGameStore(
//   //   useCallback((state) => state.games.find((g) => g.id === gameId), [gameId])
//   // );
//   const useSpecificGameStore = useGameStore(gameId);
//   const game = useSpecificGameStore((state) => state.game);
//   const updateGame = useSpecificGameStore((state) => state.updateGame);

//   useEffect(() => {
//     const gameRef = doc(firestore, "games", gameId);

//     // TODO: Tighten this fetchOrCreateGame function up a bit
//     const fetchOrCreateGame = async () => {
//       try {
//         const docSnap = await getDoc(gameRef);

//         if (!docSnap.exists()) {
//           console.log("Game not found, creating new game");
//           const newGame: GameData = {
//             id: gameId,
//             previousGuesses: [],
//             currentBandName: "",
//             currentTurn: "homePlayer",
//             gameStarted: false,
//             inputBandName: "",
//             players: {
//               homePlayer: {
//                 id: "homeID",
//                 name: "Home Player",
//                 score: 0,
//                 strikes: 0,
//               },
//               awayPlayer: {
//                 id: "awayID",
//                 name: "Away Player",
//                 score: 0,
//                 strikes: 0,
//               },
//             },
//           };
//           await setDoc(gameRef, newGame);
//           setGame(newGame);
//           console.log("New game created:", newGame);
//         } else {
//           const gameData = docSnap.data() as GameData;
//           setGame(gameData);
//         }
//       } catch (err) {
//         console.error("Error fetching or creating game:", err);
//         setError("Failed to fetch or create game");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchOrCreateGame();

//     const unsubscribe = onSnapshot(gameRef, (doc) => {
//       if (doc.exists()) {
//         const data = doc.data() as GameData;
//         setGame(data);
//         setError(null);
//         setLoading(false);
//       } else {
//         setError("Game document does not exist");
//       }
//     });

//     return () => unsubscribe();
//   }, [gameId, setGame]);

//   return { game, loading, error };
// }
