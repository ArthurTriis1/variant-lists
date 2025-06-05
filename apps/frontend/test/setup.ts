import "@testing-library/jest-dom";
import { vi } from "vitest";

class ResizeObserverMock {
	observe() {}
	unobserve() {}
	disconnect() {}
}

// Mock ResizeObserver globally
window.ResizeObserver = ResizeObserverMock;

// Mock scrollIntoView which is often used with these components
Element.prototype.scrollIntoView = vi.fn();
