/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

export default {
    Home: "/",
    Login: "/login",
    Register: "/register",
    ConfirmEmail: "/confirmEmail",
    ForgotPassword: "/forgotPassword",
    ResetPassword: "/resetPassword",
    Settings: {
        AccountData: "accountData",
        ChangePassword: "changePassword"
    },
    Profile: {
        Profile: (userName: string) => `/profile/${userName}`,
        AnimeList: (userName: string) => `/profile/${userName}/animeList`
    },
    Anime: {
        Anime: (id: number) => `/anime/${id}`,
        Content: (id: number) => `/anime/${id}/content`
    },
    Search: {
        Anime: "/search/anime"
    },
    Season: "/season"
};
