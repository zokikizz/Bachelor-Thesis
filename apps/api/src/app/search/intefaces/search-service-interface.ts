export interface ISearchService<T> {
    search?: (data: T | string) => Promise<T[] | any[]>;
    index?: (data: T) => Promise<T | any>;
    bulk?: (data: T[]) => Promise<T | any>;
    list?: () => Promise<T[] | any[]>;
    delete?: (id: string) => boolean;
    update?: (data: T) => T;
}