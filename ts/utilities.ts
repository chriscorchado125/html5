export const API_BASE = 'https://chriscorchado.com/drupal8'
export const MAX_ITEMS_PER_PAGE = 50
export const SITE_SEARCH_ID = 'search-site'

// https://gist.github.com/alirezas/c4f9f43e9fe1abba9a4824dd6fc60a55
/**
 * Pure JS fade in using opacity
 * @param {any} HTML element
 */
export const fadeOut = (el: any) => {
  el.style.opacity = 1;

  (function fade () {
    if ((el.style.opacity -= 0.2) < 0) {
      el.style.display = 'none'
    } else {
      requestAnimationFrame(fade)
    }
  })()
}

/**
 * Pure JS fade out using opacity
 * @param {any} HTML element
 */
export const fadeIn = (el: any) => {
  el.style.opacity = 0;

  (function fade () {
    let val = parseFloat(el.style.opacity)

    if (!((val += 0.2) > 1)) {
      el.style.opacity = val
      requestAnimationFrame(fade)
    }
  })()
}

/**
 * Get the current page name
 * @return {string} - page name
 */
export const getCurrentPage = () => {
  const thisPage = window.location.pathname
    .split('/')
    .filter(function (pathnamePieces) {
      return pathnamePieces.length
    })
    .pop()

  let pageName = ''
  if (thisPage) pageName = thisPage.split('.')[0]

  if (pageName === 'index' || pageName === 'html5' || !pageName) pageName = 'about'

  return pageName
}

/**
 * Create absolute link
 * @param {string} linkToFix - relative url
 * @param {string} page - page name
 * @return {string} - absolute url
 */
export const getFullUrlByPage = (linkToFix: string, page: string) => {
  let pathToResource = 'No Path Found'

  switch (page) {
    case 'companies':
      pathToResource = 'company-screenshot'
      break
    case 'courses':
      if (linkToFix.indexOf('.pdf') !== -1) {
        pathToResource = 'award-pdf'
      } else {
        pathToResource = 'award-images'
      }
      break
    case 'projects':
      pathToResource = 'project-screenshot'
      break
  }

  return `${API_BASE}/sites/default/files/${pathToResource}/${linkToFix}`
}

/**
 * Change date to name of the month plus the 4 digit year
 * @param {string} dateString - date value
 * @return {string} - month and year - example: January 2020
 */
export const getMonthYear = (dateString: string) => {
  const newDate = new Date(dateString)

  return (
    newDate.toLocaleString('default', { month: 'long' }) +
    ' ' +
    newDate.getFullYear().toString()
  )
}

/**
 * Remove newline characters and spaces from URLs created using multi-line template literals
 * @param {string} urlToClean - URL to fix
 * @return {string} - fixed URL
 */
export const cleanURL = (urlToClean: string) => {
  let fixedURL = ''
  const strings = urlToClean.split(' ')
  strings.forEach((element: string) => {
    if (element) fixedURL += element.replace(/$\n^\s*/gm, '')
  })
  return fixedURL
}

/**
 * Toggle content and preloader
 * @param {boolean} loadingStatus
 */
export const setLoading = (loadingStatus: boolean) => {
  if (loadingStatus) {
    const preloader = document.createElement('div')

    preloader.innerHTML = `
      <div class='preloadAnimation' id='preloadAnimation'>
        <div class='bounce1'></div>
        <div class='bounce2'></div>
        <div class='bounce3'></div>
        <br />Loading
      </div>`

    document.body.append(preloader)
  } else {
    document.getElementById('preloadAnimation')?.remove()
  }
}

/**
 * Animate logo as a way to show loading, paging or any other processing
 * @param {string} logoID - ID of the HTML image tag
 * @param {string} animationID - options [spin, spin-reverse, breath] or empty string '' to disable
 */
export const animateLogo = (logoID: string, animationID: string) => {
  const logoElement = document.getElementById(logoID) as HTMLElement

  const checkExist = setInterval (function() {
    if (logoElement) {
      if (animationID) {
        logoElement.setAttribute('src', `https://chriscorchado.com/images/chriscorchado-initials-logo-animated-${animationID}.gif`)
      } else {
        logoElement.setAttribute('src', 'https://chriscorchado.com/images/chriscorchado-initials-logo.png')
      }

      clearInterval(checkExist)
    }
  }, 100)
}
