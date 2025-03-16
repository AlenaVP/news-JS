import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import Articles from '../interface/Articles';
import SourceData from '../interface/SourceData';

class App {
    private controller: AppController;
    private view: AppView;

    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        (<HTMLElement>document.querySelector('.sources')).addEventListener('click', (e) =>
            this.controller.getNews(e, (data: Articles) => this.view.drawNews(data))
        );
        this.controller.getSources((data: SourceData) => this.view.drawSources(data));
    }
}

export default App;
