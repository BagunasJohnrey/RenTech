import { describe, it, expect, vi } from 'vitest';
import * as aiController from '../../controller/aiController.js';

function makeMockReqRes(overrides = {}) {
  const req = { body: overrides.body || {} };
  const res = {
    json: vi.fn().mockReturnThis(),
    status: vi.fn().mockReturnThis(),
  };
  return { req, res };
}

describe('AI Controller', () => {
  describe('getAiInsights', () => {
    it('responds with a success status and standard JSON', async () => {
      const { req, res } = makeMockReqRes();
      await aiController.getAiInsights(req, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'success',
          message: expect.stringMatching(/operational/),
          timestamp: expect.any(String),
        })
      );
    });

    it('calls res.json exactly once', async () => {
      const { req, res } = makeMockReqRes();
      await aiController.getAiInsights(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it('does not call res.status', async () => {
      const { req, res } = makeMockReqRes();
      await aiController.getAiInsights(req, res);
      expect(res.status).not.toHaveBeenCalled();
    });
  });

  describe('postAiAssistant', () => {
    it('responds with a placeholder answer when a question is provided', async () => {
      const { req, res } = makeMockReqRes({ body: { question: 'What is the revenue trend?' } });
      await aiController.postAiAssistant(req, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'success',
          answer: expect.stringContaining('What is the revenue trend?'),
          timestamp: expect.any(String),
        })
      );
    });

    it('calls res.json exactly once', async () => {
      const { req, res } = makeMockReqRes({ body: { question: 'test' } });
      await aiController.postAiAssistant(req, res);
      expect(res.json).toHaveBeenCalledTimes(1);
    });

    it('does not call res.status', async () => {
      const { req, res } = makeMockReqRes({ body: { question: 'test' } });
      await aiController.postAiAssistant(req, res);
      expect(res.status).not.toHaveBeenCalled();
    });

    it('handles missing question gracefully', async () => {
      const { req, res } = makeMockReqRes({ body: {} });
      await aiController.postAiAssistant(req, res);
      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          status: 'success',
          answer: expect.stringContaining('undefined'),
        })
      );
    });

    it('handles null question', async () => {
      const { req, res } = makeMockReqRes({ body: { question: null } });
      await aiController.postAiAssistant(req, res);
      expect(res.json).toHaveBeenCalled();
    });
  });
});
