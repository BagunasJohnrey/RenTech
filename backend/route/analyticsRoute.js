import {
  getAnalyticsSummaries,
  getAnalyticsForecasts,
  getAnalyticsKpis,
  getAnalyticsRevenueProjections,
} from '../controller/analyticsController.js';

export function registerAnalyticsRoutes(router) {
  router.get('/analytics/summaries', getAnalyticsSummaries);
  router.get('/analytics/forecasts', getAnalyticsForecasts);
  router.get('/analytics/kpis', getAnalyticsKpis);
  router.get('/analytics/revenue-projections', getAnalyticsRevenueProjections);
}
