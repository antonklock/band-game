// import { useCallback } from "react";
// import { useGameStore } from "../stores/gameStore";
// import { GameData } from "../types";

// export function useUpdateGame(gameId: string) {
//   const updateGameInStore = useGameStore((state) => state.updateGame);

//   const updateGame = useCallback(
//     async (updates: Partial<GameData>) => {
//       try {
//         await updateGameInStore(gameId, (game) => ({
//           ...game,
//           ...updates,
//         }));
//       } catch (error) {
//         console.error("Error updating game:", error);
//         throw error;
//       }
//     },
//     [gameId, updateGameInStore]
//   );

//   return updateGame;
// }
