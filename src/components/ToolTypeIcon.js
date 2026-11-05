import React from 'react';
import {
  LuLayoutTemplate,
  LuMessageSquareText,
  LuFileText,
  LuPenLine,
  LuCalendarDays,
  LuCircleHelp,
  LuListChecks,
  LuClapperboard,
  LuTrendingUp,
  LuMessagesSquare,
  LuRocket,
  LuSearch,
  LuBanknote,
  LuRepeat,
} from 'react-icons/lu';

const BY_TYPE = {
  template: LuLayoutTemplate,
  caption: LuMessageSquareText,
  guide: LuFileText,
  script: LuPenLine,
  calendar: LuCalendarDays,
  prompt: LuCircleHelp,
};

const BY_GOAL = {
  'post-daily': LuListChecks,
  video: LuClapperboard,
  grow: LuTrendingUp,
  engagement: LuMessagesSquare,
  launch: LuRocket,
  seo: LuSearch,
  monetise: LuBanknote,
  repurpose: LuRepeat,
};

export const ToolTypeIcon = ({ type, ...props }) => {
  const Icon = BY_TYPE[type] || LuLayoutTemplate;
  return <Icon aria-hidden="true" {...props} />;
};

export const GoalIcon = ({ goalId, ...props }) => {
  const Icon = BY_GOAL[goalId] || LuListChecks;
  return <Icon aria-hidden="true" {...props} />;
};

// Short label + colour bucket for tool-type tags (matches Dashboard.css .tag variants).
export const toolTag = (type) => {
  switch (type) {
    case 'template':
      return { label: 'TEMPLATE', variant: 'template' };
    case 'caption':
      return { label: 'COPY', variant: 'copy' };
    case 'script':
      return { label: 'SCRIPT', variant: 'copy' };
    case 'prompt':
      return { label: 'PROMPT', variant: 'copy' };
    case 'calendar':
      return { label: 'PLAN', variant: 'guide' };
    case 'guide':
    default:
      return { label: (type || 'guide').toUpperCase(), variant: 'guide' };
  }
};
