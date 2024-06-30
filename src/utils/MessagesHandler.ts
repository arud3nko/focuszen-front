export class MessagesHandler {
    messageApi: any

    constructor(messageApi: any) {
        this.messageApi = messageApi
    }

    success() {
        this.messageApi.open({
            type: 'success',
            content: 'Successfully!',
        });
    };

    error(message: string) {
        this.messageApi.open({
            type: 'error',
            content: message,
            duration: 10
        });
    };
}
