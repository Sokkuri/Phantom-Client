/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Noty from "noty";

enum NotificationTypes {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info"
}

const defaultTimeout: number = 5000;
const theme: Noty.Theme = "metroui";

export default class Notification {
    public static addSuccess(message: string, timeout: boolean = true): Noty {
        return new Noty({ text: message, type: NotificationTypes.SUCCESS, layout: "bottomLeft", timeout: timeout ? defaultTimeout : false, theme: theme });
    }

    public static addError(message: string, timeout: boolean = true): Noty {
        return new Noty({ text: message, type: NotificationTypes.ERROR, layout: "bottomLeft", timeout: timeout ? defaultTimeout : false, theme: theme });
    }

    public static addInfo(message: string, timeout: boolean = true): Noty {
        return new Noty({ text: message, type: NotificationTypes.INFO, layout: "bottomLeft", timeout: timeout ? defaultTimeout : false, theme: theme });
    }
}
