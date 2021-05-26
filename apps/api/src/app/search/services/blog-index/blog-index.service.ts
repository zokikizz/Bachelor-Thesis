import { BlogAdapter } from "./../../models/blog-adapter";
import { HttpStatus, Injectable } from "@nestjs/common";
import { Blog } from "@blog-workspace/api-interfaces";
import { ElasticsearchService } from "@nestjs/elasticsearch";
import { RequestParams } from "@elastic/elasticsearch";
import { IBlogIndex } from "../../intefaces/blog-index-interface";
import { SearchResponse } from "../../intefaces/elasticsearc-interface";

@Injectable()
export class BlogIndexService implements IBlogIndex {

    readonly esIndex = "blog"

    constructor(private ess: ElasticsearchService) { }

    async blogMapping() {
        const existsResponse = await this.ess.indices.exists({ index: 'blog' });
        if (existsResponse.statusCode !== HttpStatus.NOT_FOUND) {
            console.log('Blog mapping already exist');
        } else {
            await this.ess.indices.create({ index: 'blog' });
            return await this.ess.indices.putMapping({
                index: this.esIndex,
                body: {
                    properties: {
                        "name": { "type": "text" },
                        "content": {
                            "type": "text"
                        },
                        "miniContent": {
                            "type": "text"
                        },
                        "createdAt": {
                            "type": "date"
                        },
                        "title": {
                            "type": "text"
                        },
                        "imagePath": {
                            "type": "text"
                        },
                        "tags": {
                            "type": "keyword"
                        },
                        "category": {
                            "type": "keyword"
                        },
                        "blogFolder": {
                            "type": "text"
                        },
                        "views": { "type": "integer" }
                    }
                }
            });
        }
    }

    async search(searchString: string, startFrom: number = 0, size: number = 10): Promise<any> {
        const request: RequestParams.Search = {
            index: this.esIndex,
            from: startFrom,
            size: size,
            body: {
                query: {
                    multi_match: {
                        query: searchString,
                        fields: ['name', 'content']
                    }
                }

            }
        };

        const response = await this.ess.search(request);
        return BlogAdapter.request(response.body as SearchResponse<Blog>);
    }

    async searchByCategory(category: string, startFrom: number = 0, size: number = 10) {
        const request: RequestParams.Search = {
            index: this.esIndex,
            from: startFrom,
            size: size,
            body: {
                query: {
                    query: {
                        wildcard: {
                            category: {
                                value: '*' + category + '*',
                            },
                        }
                    }
                }
            }
        };

        const response = await this.ess.search(request);
        return BlogAdapter.request(response.body as SearchResponse<Blog>);
    }

    async searchByTag(tag: string, startFrom = 0, size = 10) {
        const request: RequestParams.Search = {
            index: this.esIndex,
            from: startFrom,
            size: size,
            body: {
                query: {
                    wildcard: {
                        tags: {
                            value: '*' + tag + '*',
                        },
                    }
                }
            }
        };

        const response = await this.ess.search(request);
        return BlogAdapter.request(response.body as SearchResponse<Blog>);
    }

    async getById(id) {
        const doc: RequestParams.Get = {
            index: this.esIndex,
            id: id
        }

        const r = await this.ess.get(doc);
        return { id, ...r.body._source };
    }

    async list(startFrom = 0, size = 10) {
        const request: RequestParams.Search = {
            index: this.esIndex,
            from: startFrom,
            size: size,
            body: {
                query: {
                    match_all: {}
                },
            }
        };

        const response = await this.ess.search(request);
        return BlogAdapter.request(response.body as SearchResponse<Blog>);
    }

    async bulk(data: Blog[]): Promise<any> {
        /* const docs: RequestParams.Bulk = {
            refresh: true,
            body: [
                { index: { _index: this.esIndex } },
                {
                    title: "Test blog Title 2",
                    content: "Test blog content 2"
                },
                { index: { _index: this.esIndex } },
                {
                    title: "Test blog Title 3",
                    content: "Test blog content 3"
                }
            ]
        }; */


        const body = data.map(d => {
            return [
                { index: { _index: this.esIndex } },
                d
            ];
        }).reduce((a, c) => {
            return a.concat(c);
        });

        const docs: RequestParams.Bulk = {
            refresh: true,
            body: body
        };

        const r = await this.ess.bulk(docs);
        return r;
    }

    async getTags() {
        const request: RequestParams.Search = {
            index: this.esIndex,
            size: 0,
            body: {
                aggs: {
                    tags: {
                        terms: { field: 'tags' }
                    }
                }
            }
        };

        const { body } = (await this.ess.search(request));
        let nonUniqueArraysOfTags = body.aggregations.tags.buckets.map(v => v.key);


        nonUniqueArraysOfTags = Array.prototype.concat.apply([], nonUniqueArraysOfTags)
        nonUniqueArraysOfTags = [...new Set(nonUniqueArraysOfTags).values()];
        return { tags: nonUniqueArraysOfTags };
    }

    async getCategories() {
        const request: RequestParams.Search = {
            index: this.esIndex,
            size: 0,
            body: {
                aggs: {
                    categories: {
                        terms: { field: 'category' }
                    }
                }
            }
        }
        const { body } = (await this.ess.search(request));

        return { categories: body.aggregations.categories.buckets.map(b => { return { name: b.key, numberOfBlogs: b.doc_count } }) };

    }

    async deleteIndex() {
        const request = {
            index: '_all',
        };

        return await this.ess.indices.delete(request);
    }
}
