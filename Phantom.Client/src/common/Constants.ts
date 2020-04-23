//#region Languages

const applicationLanguagePrefix = "global.language.";

const german = applicationLanguagePrefix + "german";
const english = applicationLanguagePrefix + "english";
const japanese = applicationLanguagePrefix + "japanese";

//#endregion

//#region Adaptions

const adaptionPrefix = "global.adaption.";

const anime = adaptionPrefix + "anime";
const manga = adaptionPrefix + "manga";
const visualNovel = adaptionPrefix + "visualNovel";
const lightNovel = adaptionPrefix + "lightNovel";
const original = adaptionPrefix + "original";
const game = adaptionPrefix + "game";
const other = adaptionPrefix + "other";

//#endregion

//#region States

const entryStatePrefix = "global.state.";

const preAiring = entryStatePrefix + "preAiring";
const airing = entryStatePrefix + "airing";
const finished = entryStatePrefix + "finished";
const uncompleted = entryStatePrefix + "uncompleted";

//#endregion

//#region WatchingStates

const watchingStatePrefix = "global.userList.entryState.";

const planned = watchingStatePrefix + "planned";
const watching = watchingStatePrefix + "watching";
const completed = watchingStatePrefix + "completed";
const waiting = watchingStatePrefix + "waiting";
const canceled = watchingStatePrefix + "canceled";

//#endregion

//#region AnimeTypes

const animeTypePrefix = "global.userList.entryState.";

const series = animeTypePrefix + "series";
const movie = animeTypePrefix + "movie";
const special = animeTypePrefix + "special";
const ova = animeTypePrefix + "ova";

//#endregion

export default {
    Languages: {
        German: german,
        English: english,
        Japanese: japanese
    },
    WatchingStates: {
        Planned: planned,
        Watching: watching,
        Completed: completed,
        Waiting: waiting,
        Canceled: canceled,
        WatchingStates: [ planned, watching, completed, waiting, canceled ]
    },
    AnimeTypes: {
        Series: series,
        Movie: movie,
        Special: special,
        OVA: ova
    },
    Adaptions: {
        Anime: anime,
        Manga: manga,
        VisualNovel: visualNovel,
        LightNovel: lightNovel,
        Original: original,
        Game: game,
        Other: other
    },
    States: {
        PreAiring: preAiring,
        Airing: airing,
        Finished: finished,
        Uncompleted: uncompleted
    }
}
