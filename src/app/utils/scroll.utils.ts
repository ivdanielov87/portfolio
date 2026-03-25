export type SectionLink<T extends string> = {
  target: T;
};

const bottomThreshold = 50;

export function getActiveSection<T extends string>(
  items: readonly SectionLink<T>[],
  offset: number,
  fallback: T,
): T {
  if (!items.length) {
    return fallback;
  }

  if (window.innerHeight + window.scrollY >= document.body.scrollHeight - bottomThreshold) {
    return items[items.length - 1].target;
  }

  const scrollPosition = window.scrollY + offset;
  for (let index = items.length - 1; index >= 0; index -= 1) {
    const section = document.getElementById(items[index].target);
    if (section && section.offsetTop <= scrollPosition) {
      return items[index].target;
    }
  }

  return fallback;
}

export function scrollToSection(
  event: Event,
  sectionId: string,
  options: ScrollIntoViewOptions = { behavior: 'smooth' },
): void {
  event.preventDefault();
  document.getElementById(sectionId)?.scrollIntoView(options);
}
