export enum SegmentsEnum {
    LIST = "LIST",
    MAP = "MAP"
}

export const segmentsEnum2LabelMapping:  Record<SegmentsEnum, string> = {
    LIST: 'List view',
    MAP: 'Map view',
}
