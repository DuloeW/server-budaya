export enum summaryType {
    Sender = 'Sender',
    Receiver = 'Receiver'
}

export function convertSummaryType(type: number): summaryType {
    switch (type) {
        case 0:
            return summaryType.Sender
        case 1:
            return summaryType.Receiver
        default:
            return summaryType.Sender
    }
}