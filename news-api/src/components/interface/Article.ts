import SourceItem from './SourceItem';

export default interface Article {
    readonly source: SourceItem;

    readonly author: string;
    readonly title: string;
    readonly description: string;
    readonly url: string;
    readonly urlToImage: string;
    readonly publishedAt: string;
    readonly content: string;
}
