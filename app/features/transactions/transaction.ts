export interface Transaction {
    type: string;
    id: string;
    attributes: {
        status: TransactionStatus;
        rawText: string | null;
        description: string;
        message: string | null;
        isCategorizable: boolean;
        holdInfo: {
            amount: {
                currencyCode: string;
                value: string;
                valueInBaseUnits: number;
            };
            foreignAmount?: {
                currencyCode: string;
                value: string;
                valueInBaseUnits: number;
            };
        } | null;
        roundUp: {
            amount: {
                currencyCode: string;
                value: string;
                valueInBaseUnits: number;
            };
            boostPortion?: {
                currencyCode: string;
                value: string;
                valueInBaseUnits: number;
            };
        } | null;
        cashback: {
            description: string;
            amount: {
                currencyCode: string;
                value: string;
                valueInBaseUnits: number;
            };
        } | null;
        amount: {
            currencyCode: string;
            value: string;
            valueInBaseUnits: number;
        };
        foreignAmount: {
            currencyCode: string;
            value: string;
            valueInBaseUnits: number;
        } | null;
        cardPurchaseMethod: {
            method: CardPurchaseMethodEnum;
            cardNumberSuffix?: string;
        } | null;
        settledAt: string | null;
        createdAt: string;
        transactionType: string | null;
        note: {
            text: string;
        } | null;
        performingCustomer: {
            displayName: string;
        } | null;
        deepLinkURL: string;
    };
    relationships: {
        account: {
            data: {
                type: string;
                id: string;
            };
            links: {
                self?: string;
                related: string;
            };
        };
        transferAccount: {
            data: {
                type: string;
                id: string;
            } | null;
            links?: {
                self?: string;
                related?: string;
            };
        };
        category: {
            data: {
                type: string;
                id: string;
            } | null;
            links: {
                self?: string;
                related: string;
            };
        };
        parentCategory: {
            data: {
                type: string;
                id: string;
            } | null;
            links?: {
                self?: string;
                related?: string;
            };
        };
        tags: {
            data: {
                type: string;
                id: string;
            }[];
            links: {
                self?: string;
                related: string;
            };
        };
        attachment: {
            data: {
                type: string;
                id: string;
            } | null;
            links?: {
                self?: string;
                related?: string;
            };
        };
    };
    links: {
        self: string;
    };
}

export enum TransactionStatus {
    HELD = "HELD",
    SETTLED = "SETTLED",
}

export enum CardPurchaseMethodEnum {
    BAR_CODE = "BAR_CODE",
    OCR = "OCR",
    CARD_PIN = "CARD_PIN",
    CARD_DETAILS = "CARD_DETAILS",
    CARD_ON_FILE = "CARD_ON_FILE",
    ECOMMERCE = "ECOMMERCE",
    MAGNETIC_STRIPE = "MAGNETIC_STRIPE",
    CONTACTLESS = "CONTACTLESS",
}