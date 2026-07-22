class StorageService {
  get<T>(key: string): T | null {
    if (typeof window === "undefined") {
      return null;
    }

    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value) as T;
    } catch {
      return null;
    }
  }

  set<T>(key: string, value: T): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.setItem(
      key,
      JSON.stringify(value)
    );
  }

  remove(key: string): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.removeItem(key);
  }

  clear(): void {
    if (typeof window === "undefined") {
      return;
    }

    localStorage.clear();
  }

  has(key: string): boolean {
    if (typeof window === "undefined") {
      return false;
    }

    return localStorage.getItem(key) !== null;
  }
}

export const storage = new StorageService();