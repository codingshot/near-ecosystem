export interface IconListType {
    [key: string]: {
        path: JSX.Element;
        e: any;
        color: string;
        viewBox?: string;
    };
}
declare const iconList: IconListType;
export default iconList;
