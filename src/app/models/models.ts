export interface Node {
    children: Node[];
    start: Date,
    end: Date,
    id: string,
    content: string,
    parent: Node
}