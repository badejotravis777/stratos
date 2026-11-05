// "What's your goal?" definitions shared by the Categories page and the
// Niche Toolkit filter. A tool matches a goal when its type is listed, or
// when its title, description or category mentions one of the keywords.

export const GOALS = [
  {
    id: 'post-daily',
    title: 'Want to post daily?',
    desc: 'Stay consistent with ready-to-use caption templates',
    types: ['caption', 'calendar'],
    keywords: ['caption', 'calendar', 'daily', 'consisten', 'schedule', 'plan'],
  },
  {
    id: 'video',
    title: 'Shooting videos?',
    desc: 'Scripts and hooks for Reels, TikToks and YouTube Shorts',
    types: ['script'],
    keywords: ['video', 'reel', 'tiktok', 'shorts', 'capcut', 'script'],
  },
  {
    id: 'grow',
    title: 'Growing fast?',
    desc: 'Hooks, CTAs and formats that drive follows and reach',
    types: [],
    keywords: ['hook', 'cta', 'grow', 'follow', 'reach', 'viral', 'carousel'],
  },
  {
    id: 'engagement',
    title: 'Low engagement?',
    desc: 'Captions and questions that start real conversations',
    types: ['prompt'],
    keywords: ['engag', 'question', 'comment', 'conversation', 'dm', 'community', 'poll'],
  },
  {
    id: 'launch',
    title: 'Launching a product?',
    desc: 'Pre-launch, launch-day and post-launch content',
    types: [],
    keywords: ['launch', 'product', 'campaign', 'promo', 'drop', 'collection', 'sale'],
  },
  {
    id: 'seo',
    title: 'SEO & searchability',
    desc: 'Hashtag strategy and keyword-led content approaches',
    types: [],
    keywords: ['seo', 'hashtag', 'keyword', 'search', 'discover', 'bio'],
  },
  {
    id: 'monetise',
    title: 'Monetise your audience',
    desc: 'Affiliate, product and service promotion templates',
    types: [],
    keywords: ['monet', 'affiliate', 'rate card', 'pitch', 'brand deal', 'sponsor', 'invoice', 'sell', 'price'],
  },
  {
    id: 'repurpose',
    title: 'Repurpose content',
    desc: 'Turn one post into five across Instagram, TikTok and LinkedIn',
    types: [],
    keywords: ['repurpose', 'linkedin', 'cross-post', 'recycle', 'thread', 'one post'],
  },
];

export const getGoal = (id) => GOALS.find((g) => g.id === id) || null;

export const toolMatchesGoal = (tool, goal) => {
  if (!goal || !tool) return false;
  if (goal.types.includes(tool.type)) return true;
  const haystack = `${tool.title || ''} ${tool.description || ''} ${tool.category || ''}`.toLowerCase();
  return goal.keywords.some((k) => haystack.includes(k));
};
