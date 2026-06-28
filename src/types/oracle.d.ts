export {};

declare global {
  interface Window {
    oracle: {
      fetchData: (
        query: string,
      ) => Promise<{ success: boolean; rows?: any[]; error?: string }>;
      insertData: (
        table: string,
        data: object,
      ) => Promise<{ success: boolean; error?: string }>;
    };
  }
}
