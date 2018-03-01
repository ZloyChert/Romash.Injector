import { FrameElement } from './frame.element';

export class Category {
    Id: number;
    Name: string;
    Description: string;
    UserId: number;
    Elements: Array<FrameElement>;
}