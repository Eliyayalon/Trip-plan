export interface Node {
    children: Node[];
    start: Date,
    end: Date,
    id: string,
    context: string,
    parent: Node
}