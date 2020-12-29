/**
 * Get the current page name
 * @return {string} - page name
 */
const getCurrentPage = (): string => {
  const thisPage = window.location.pathname
    .split('/')
    .filter((pathnamePieces) => {
      return pathnamePieces.length
    })
    .pop()

  let pageName = ''
  if (thisPage) pageName = thisPage.split('.')[0]

  if (pageName === 'index' || pageName === 'html5' || !pageName) pageName = 'about'

  return pageName
}

module.exports = getCurrentPage;
