/**
 * Searches for the band name on lastFM and returns a list of trimmed artist names in lowercase that match the search query
 * @param bandName - The name of the band to be searched on lastFM
 * @returns A list of artist names that match the search query - Trimmed and in lowercase
 */
const searchLastFM = async (bandName: string): Promise<String[]> => {
    const endpoint = `https://ws.audioscrobbler.com/2.0/?method=artist.search&artist=${bandName}&api_key=${process.env.EXPO_PUBLIC_LASTFM_API_KEY}&format=json`;

    try {
        const response = await fetch(endpoint);
        console.log("Success!");
        const data = await response.json();
        const artistList = data.results.artistmatches.artist.map((artist: any) => artist.name.trim().toLowerCase());

        return artistList;

    } catch (error) {
        console.error(`Failed to fetch ${bandName} from lastFM`, error);
        return [];
    }
}

export { searchLastFM };