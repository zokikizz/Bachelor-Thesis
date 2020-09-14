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
// TODO: add BLOGIMAGE and MINICONTENT (generated content from actual content for blogs (just first 265 chars taken))

export const BLOG_BLOCKS: IBlocks = BLOCKTYPES.reduce((acc, current) => {
    acc[current.toLocaleLowerCase()] = new Block(current);
    return acc;
    }, {});
