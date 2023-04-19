/// <reference types="react-scripts" />

declare module "*.png" {
    const value: string;
    export default value;
}

declare module "*.jpg" {
    const value: string;
    export default value;
}

declare module "*.jpeg" {
    const value: string;
    export default value;
}

declare module "*.gif" {
    const value: string;
    export default value;
}

declare module "*.svg" {
    const value: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default value;
}

declare module "*.css" {
    const value: { [key: string]: string };
    export default value;
}

declare module "*.scss" {
    const value: { [key: string]: string };
    export default value;
}

declare module "*.less" {
    const value: { [key: string]: string };
    export default value;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.woff" {
    const value: string;
    export default value;
}

declare module "*.woff2" {
    const value: string;
    export default value;
}

declare module "*.ttf" {
    const value: string;
    export default value;
}

declare module "*.otf" {
    const value: string;
    export default value;
}

declare module "*.wav" {
    const value: string;
    export default value;
}

declare module "*.mp3" {
    const value: string;
    export default value;
}

declare module "*.mp4" {
    const value: string;
    export default value;
}

declare module "*.avi" {
    const value: string;
    export default value;
}
