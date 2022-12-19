export interface PaginatorConfig {
    current: number;
    max: number;
}

export interface PaginatorState extends PaginatorConfig {
    viewRange: { start: number, end: number };
}
