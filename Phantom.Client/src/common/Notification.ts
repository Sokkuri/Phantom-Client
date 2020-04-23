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
