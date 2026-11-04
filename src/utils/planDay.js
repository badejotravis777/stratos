export const getCurrentDay = (planStartDate) => {
    if (!planStartDate) return 1;
  
    const start = new Date(planStartDate);
    const now = new Date();
    const diffMs = now.setHours(0, 0, 0, 0) - start.setHours(0, 0, 0, 0);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;
  
    return Math.min(Math.max(diffDays, 1), 30); // clamp between Day 1 and Day 30
  };