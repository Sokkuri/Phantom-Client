/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

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

const animeTypePrefix = "global.anime.type.";

const series = animeTypePrefix + "series";
const movie = animeTypePrefix + "movie";
const special = animeTypePrefix + "special";
const ova = animeTypePrefix + "ova";

//#endregion

//#region ContentTypes

const contentTypePrefix = "global.content.type.";

const episode = contentTypePrefix + "episode";
const video = contentTypePrefix + "video";
const streamLinking = contentTypePrefix + "streamLinking";

//#endregion

//#region CompanyTypes

const companyTypePrefix = "global.company.type.";

const publisher = companyTypePrefix + "publisher";
const studio = companyTypePrefix + "studio";
const streamingService = companyTypePrefix + "streamingService";
const developerStudio = companyTypePrefix + "developerStudio";
const tvSender = companyTypePrefix + "tvSender";

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
        OVA: ova,
        AnimeTypes: [ series, movie, special, ova ]
    },
    ContentTypes: {
        Episode: episode,
        Video: video,
        Streamlinking: streamLinking
    },
    CompanyTypes: {
        Publisher: publisher,
        Studio: studio,
        StreamingService: streamingService,
        DeveloperStudio: developerStudio,
        TvSender: tvSender,
        CompanyTypes: [ publisher, studio, streamingService, developerStudio, tvSender ]
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
        Uncompleted: uncompleted,
        States: [ preAiring, airing, finished, uncompleted ]
    }
}
