declare module '@rails/actioncable' {
  export interface Subscription {
    unsubscribe(): void;
  }

  export interface Consumer {
    subscriptions: {
      create(
        params: { channel: string; [key: string]: any },
        callbacks: {
          connected?: () => void;
          disconnected?: () => void;
          rejected?: () => void;
          received?: (data: any) => void;
        }
      ): Subscription;
    };
  }

  export function createConsumer(url?: string): Consumer;
} 