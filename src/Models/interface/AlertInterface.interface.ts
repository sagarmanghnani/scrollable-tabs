export interface AlertInterface {
    header:string;
    subheader:string;
    buttons?:AlertButton[];
}

export interface AlertButton {
    text:string;
    handler?:Function;
    color?:string
}