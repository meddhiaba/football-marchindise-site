export class Comment {
  constructor(
    public author: string,
    public message: string,
    public date: Date = new Date()
  ) {}
}
