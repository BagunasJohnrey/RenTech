import { describe, it, expect, vi } from 'vitest';
import express from 'express';
import { registerAiRoutes } from '../../route/aiRoutes.js';

describe('AI Routes Registration', () => {
  it('registers GET /ai/insights route', () => {
    const router = express.Router();
    const spy = vi.spyOn(router, 'get');
    registerAiRoutes(router);
    expect(spy).toHaveBeenCalledWith('/ai/insights', expect.any(Function));
  });

  it('registers POST /ai/assistant route with validation middleware', () => {
    const router = express.Router();
    const spy = vi.spyOn(router, 'post');
    registerAiRoutes(router);
    const call = spy.mock.calls.find(c => c[0] === '/ai/assistant');
    expect(call).toBeDefined();
    expect(call[1]).toEqual(expect.any(Function));
    expect(call[2]).toEqual(expect.any(Function));
  });
});
