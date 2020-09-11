import { Block, IBlocks } from './block';

const BLOCKTYPES = [
    'UIID',
    'FILENAME',
    'TITLE',
    'AUTHOR',
    'CATEGORY',
    'TAGS',
    'CONTENT',
    'CREATIONDATE',
    'MODIFIEDDATE',
];

export const BLOG_BLOCKS: IBlocks = BLOCKTYPES.reduce((acc, current) => {
    acc[current.toLocaleLowerCase()] = new Block(current);
    return acc;
    }, {});
