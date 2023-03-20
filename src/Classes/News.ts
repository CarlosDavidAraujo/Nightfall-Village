export default class News {
    public news: string[];
    constructor() {
      this.news = [];
    }
  
    public getNews(): string[] {
      return this.news;
    }
  
    public setNews(message: string) {
      this.news = [message];
    }
  
    public addNews(message: string) {
      if (!this.news.includes(message)) {
        this.news.push(message);
      }
    }
  
    public clearNews() {
      this.news = [];
    }
  }
  