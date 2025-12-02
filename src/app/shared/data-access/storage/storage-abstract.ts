export abstract class StorageService<State extends object, Key extends keyof State = keyof State> {
  protected constructor(
    private readonly storage: Storage,
    private readonly prefix: string,
  ) {}

  public get length(): number {
    return this.storage.length;
  }

  public clear(): void {
    this.storage.clear();
  }

  public getItem<K extends Key>(key: K): State[K] | null;
  public getItem<K extends Key>(key: K, defaultValue: State[K]): State[K];
  public getItem<K extends Key>(key: K, defaultValue?: State[K]): State[K] | null {
    const savedValue = this.storage.getItem(this.generateKey(key));
    return savedValue === null ? (defaultValue ?? null) : (JSON.parse(savedValue) as State[K]);
  }

  public key(index: number): string | null {
    return this.storage.key(index);
  }

  public removeItem(key: Key): void {
    this.storage.removeItem(this.generateKey(key));
  }

  public setItem<K extends Key>(key: K, value: State[K]): void {
    this.storage.setItem(this.generateKey(key), JSON.stringify(value));
  }

  private generateKey(key: Key): string {
    return `${this.prefix}:${key.toString()}`;
  }
}
