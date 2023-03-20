const getDocumentHeight = (window) =>
  Math.max(
    window.document.body.scrollHeight,
    window.document.documentElement.scrollHeight,
    window.document.body.offsetHeight,
    window.document.documentElement.offsetHeight,
    window.document.body.clientHeight,
    window.document.documentElement.clientHeight
  );
const getDocumentScrollTop = (window) => window.pageYOffset;
const getDocumentInnerHeight = (window) =>
  window.document.documentElement.clientHeight;

export function getBottomOffset(window) {
  return (
    getDocumentHeight(window) -
    getDocumentInnerHeight(window) -
    getDocumentScrollTop(window)
  );
}
