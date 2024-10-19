// import { useEffect } from "react";
// import { collection, onSnapshot, query } from "firebase/firestore";
// import { firestore } from "../firebaseConfig";
// import { useGameStore } from "../stores/gameStore";
// import { GameData } from "../types";

// export function useGameList() {
//   const games = useGameStore((state) => state.games);
//   const setGames = useGameStore((state) => state.setGames);

//   useEffect(() => {
//     const gamesRef = collection(firestore, "games");
//     const qurey = query(gamesRef);

//     const unsubscribe = onSnapshot(qurey, (querySnapshot) => {
//       const gamesList: GameData[] = querySnapshot.docs.map(
//         (doc) =>
//           ({
//             id: doc.id,
//             ...doc.data(),
//           } as GameData)
//       );
//       setGames(gamesList);
//     });

//     return () => unsubscribe();
//   }, [setGames]);

//   return games;
// }
