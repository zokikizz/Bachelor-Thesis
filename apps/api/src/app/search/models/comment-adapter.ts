import { SearchResponse } from "../intefaces/elasticsearc-interface";
import { ListResponse } from "../intefaces/list-response";
import { Comment } from '@blog-workspace/api-interfaces';


export class CommentAdapter {
    static request(body: SearchResponse<Comment>): ListResponse<Comment> {
        const comments = body.hits.hits.map(c => {
            return {
                id: c._id,
                ...c._source,
                date: CommentAdapter.dateDiffCalc([new Date(), new Date(c._source.date)]),
            };
        });
        
        return {
            total: body.hits.total.value,
            list: comments
        }
    }

    private static dateDiffCalc(value) {
        var ms = Math.abs(value[0].getTime()-value[1].getTime());
        var secsdf = Math.floor(((ms/1000)%(60*60))%60);
        var mindf  = Math.floor((ms/(60*1000))%60);
        var hourdf = Math.floor(ms/(60*1000*60)%24);
        var daydf  = Math.round((ms/(60*1000*60))/24);
        return {
          days: daydf,
          hours: hourdf,
          minutes: mindf,
          seconds: secsdf
        };
    }
}