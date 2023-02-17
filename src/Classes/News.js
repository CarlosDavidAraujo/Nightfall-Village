export default class News {
    constructor() {
      this.news = [];
    }
  
    getNews() {
      return this.news;
    }
  
    setNews(message) {
      this.news = [message];
    }
  
    addNews(message) {
      if (!this.news.includes(message)) {
        this.news.push(message);
      }
    }
  
    clearNews() {
      this.news = [];
    }
  }
  