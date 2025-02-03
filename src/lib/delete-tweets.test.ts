import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { deleteNextTweet } from "./delete-tweets.ts";

describe("deleteNextTweet", () => {
  beforeEach(() => {
    globalThis.document = {
      querySelectorAll: vi.fn(),
      querySelector: vi.fn(),
      body: {
        scrollHeight: 1000,
      },
    } as unknown as Document;

    globalThis.window = {
      scrollTo: vi.fn(),
    } as unknown as Window & typeof globalThis;

    // Mock setTimeout
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
    vi.clearAllTimers();
  });

  it("should handle no menu buttons found", async () => {
    // Mock querySelectorAll to return empty array
    document.querySelectorAll = vi.fn().mockReturnValue([]);

    const consoleSpy = vi.spyOn(console, "log");

    deleteNextTweet();

    expect(consoleSpy).toHaveBeenCalledWith(
      "No se encontraron más botones. Esperando 2 segundos para reintentar...",
    );
  });

  it("should stop after maximum retries", () => {
    document.querySelectorAll = vi.fn().mockReturnValue([]);

    const consoleSpy = vi.spyOn(console, "log");

    deleteNextTweet(0, 0, 10); // Max retries

    expect(consoleSpy).toHaveBeenCalledWith(
      "Cantidad de reintentos suficientes. No debe haber más tweets. Fin del proceso.",
    );
  });

  it("should trigger rest mechanism after specified number of deletions", () => {
    const consoleSpy = vi.spyOn(console, "warn");

    deleteNextTweet(0, 100); // 100 is divisible by restAfterDeletedTweetsCount

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringMatching(/Descansando \d+ segundos antes de continuar.../),
    );
  });

  it("should handle tweet deletion", () => {
    const closest = vi.fn().mockReturnValue({
      scrollIntoView: vi.fn(),
      click: vi.fn(),
    });

    // Mock menu options
    document.querySelectorAll = vi
      .fn()
      .mockReturnValueOnce([{ closest }]) // First call for menu button
      .mockReturnValueOnce([
        {
          // Second call for menu options
          innerText: "Eliminar",
          closest,
        },
      ])
      .mockReturnValueOnce([
        {
          // Second call for menu options
          innerText: "Eliminar",
          scrollIntoView: vi.fn(),
          click: vi.fn(),
        },
      ])
      .mockRejectedValue([]);

    document.querySelector = vi.fn().mockReturnValue({
      scrollIntoView: vi.fn(),
    });

    const consoleSpy = vi.spyOn(console, "warn");

    deleteNextTweet(0, 0, 0); // Max retries

    // Fast-forward timers to trigger the deletion flow
    vi.runAllTimers();

    expect(consoleSpy).toHaveBeenCalledWith("Tweet eliminado.");
  });
});
