import { debug, warn } from '../debugger';
import createErrorPage from '../../../packages/error-page';

const PAGES = {};

/**
 * Register a page.
 * @param pageDescriptor
 * @param factory
 */
export function register(pageDescriptor, factory) {
  const { page: pageName } = pageDescriptor;
  debug(`[Reg Page] ${pageName}`);
  setPage(pageName, {
    ...pageDescriptor,
    factory
  });
}

/**
 * Store a page.
 */
export function setPage(pageName, page) {
  if (PAGES[pageName]) {
    warn('reset page', pageName);
  }
  PAGES[pageName] = page;
}

/**
 * Get a stored page.
 */
export function getPage(pageName) {
  return PAGES[pageName];
}

/**
 * Get error page factory.
 */
export function getUnknownPageFactory(rax, message) {
  const { createElement } = rax;
  return function(module, exports, require) {
    const args = {
      createElement,
      require
    };
    if (message) {
      args.message = message;
    }
    module.exports = () => createErrorPage(args);
  };
}
