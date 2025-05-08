export interface Account {
    type: string;
    id: string;
    attributes: {
      displayName: string;
      accountType: string;
      ownershipType: string;
      balance: {
        currencyCode: string;
        value: string;
        valueInBaseUnits: number;
      };
      createdAt: Date;
    };
    relationships: {
      transactions: {
        links: {
          related: string;
        };
      };
    };
    links: {
      self: string;
    };
  }
  