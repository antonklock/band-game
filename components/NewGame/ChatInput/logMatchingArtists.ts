const colors = {
    reset: "\x1b[0m",
    green: "\x1b[32m",
    darkGray: "\x1b[90m",
    red: "\x1b[31m",
};

export const logMatchingArtists = (artists: string[], matchedArtist: string) => {
    artists.forEach((artist) => {
        // TODO: Make sure the player can't just put "the" infront of any guess and it will just be ok
        const normalizedArtist = artist.toLowerCase().startsWith("the ")
            ? artist.slice(4)
            : artist;
        if (normalizedArtist.toLowerCase() === matchedArtist.toLowerCase()) {
            console.log(colors.green + "----->", artist, colors.reset);
        } else {
            console.log(colors.darkGray + artist, colors.reset);
        }
    });
};