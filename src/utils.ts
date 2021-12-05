export function injectCallback<Args extends any[], Return>(
    existing: ((...args: Args) => Return) | undefined,
    callback: (...args: Args) => Return,
): (...args: Args) => Return {
  return (...args: Args) => {
    let result = callback(...args)
    if (existing)
      result = existing(...args)
    return result
  }
}

type StandardSearch = {
  /**
   * Tests if an element matches
   */
  test(element: Element): boolean,
  /**
   * Whether to recurse up through the element's parents.
   */
  recurse?: boolean,
  /**
   * Whether to test the starting element. When recursing this also controls whether to test the element's direct
   * parents.
   */
  selftest?: boolean
}

/**
 * @param start the element to start at. will not test the starting element or any of its parents
 * @param search the search parameters to use
 */
export function findElement(start: any, search: StandardSearch): Element | null {
  let found: Element | null = null
  let current = start
  do {
    found = findSibling(current, search.test, search.selftest ?? false)
    current = current.parentElement
  } while(search.recurse && current && !found)
  return found
}

export function findSibling(element: Element, test: (element: Element) => boolean, testSelf: boolean): Element | null {
  if(testSelf && test(element)) {
    return element
  }
  for(let sibling = element.previousElementSibling; sibling; sibling = sibling.previousElementSibling) {
    if (test(sibling))
      return sibling;
  }
  for(let sibling = element.nextElementSibling; sibling; sibling = sibling.nextElementSibling) {
    if (test(sibling))
      return sibling;
  }
  return null;
}
