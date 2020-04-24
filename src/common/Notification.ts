/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */

import Noty from "noty";

enum NotificationTypes {
    SUCCESS = "success",
    ERROR = "error",
    INFO = "info"
}

var timeout: number = 5000;

export default class Notification {
    public static addSuccess(message: string): Noty {
        return new Noty({ text: message, type: NotificationTypes.SUCCESS, layout: "bottomLeft", timeout: timeout });
    }

    public static addError(message: string): Noty {
        return new Noty({ text: message, type: NotificationTypes.ERROR, layout: "bottomLeft", timeout: timeout });
    }

    public static addInfo(message: string): Noty {
        return new Noty({ text: message, type: NotificationTypes.INFO, layout: "bottomLeft", timeout: timeout });
    }
}
