import { Block, IBlocks } from './block';

const BLOCKTYPES = [
    'UIID',
    'AUTHOR',
    'TAGS',
    'CONTENT',
    'CREATIONDATE',
    'MODIFIEDDATE',
];

export const COMMENT_BLOCKS: IBlocks = BLOCKTYPES.reduce((acc, current) => {
    acc[current.toLocaleLowerCase()] = new Block(current);
    return acc;
    }, {});
