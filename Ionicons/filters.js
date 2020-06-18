let currentFilters;

function getUrl() {
  return window.location.href;
}

// updateFilters hides & shows child elements that should be
// hidden/shown because of the currently selected filters
function updateFilters() {
  if (!document.getElementById('providers')) return

  // get all of the results
  let children = document.getElementById('results').children;
  let count = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    // find the provider
    let provider = child.dataset.provider;

    // if enabled
    if (currentFilters[provider]) {
      // display it
      child.style.display = '';
      count++;
    } else {
      // don't display it
      child.style.display = 'none';
    }
  }

  // update the "total" count to reflect "total displayed"
  document.getElementById('count').textContent = '' + count;
}

// updateCheckboxes updates the filters form so that the
// checkboxes reflect accurate filter state. It does this
// by simply updating the "checked" attribute
function updateCheckboxes() {
  let providerElements = document.getElementById('providers').children;
  for (let node of providerElements) {
    if (!currentFilters[node.dataset.provider]) {
      node.checked = false;
    }
  }
}

function init() {
  currentFilters = {};

  let providerElements = document.getElementById('providers').children;

  // gets the query params
  let url = getUrl().split('&');
  if (url.length > 1) {
    for (let node of providerElements) {
      if (node.dataset.provider) {
        currentFilters[node.dataset.provider] = false;
      }
    }

    // slice off the query
    url = url.slice(1);
    for (let segment of url) {
      // replace "+" with " " (form encoding)
      let seg = segment.replace(/\+/g, ' ').split('=');
      // with the split, seg is now a [<key>, <value>] array
      if (seg[1] === 'on') {
        currentFilters[seg[0]] = true;
      }
    }

    // update everything
    updateCheckboxes();
    updateFilters();
  } else {
    // default case -- everything is on, nobody wants to do a search
    // with no possible results.
    for (let node of providerElements) {
      if (node.dataset.provider) {
        currentFilters[node.dataset.provider] = true;
      }
    }
  }
}

window.onload = init;

// toggleFilter updates the displayed items & the URL
// when a filter is checked/unchecked
function toggleFilter(filter) {
  currentFilters[filter] = !currentFilters[filter];

  // reflect filter changes
  updateFilters();

  // update the url, starting with just the query
  let url = getUrl().split('&')[0];
  for (let f in currentFilters) {
    // add each enabled filter independently
    if (currentFilters[f]) {
      url += '&' + f.replace(/ /g, '+') + '=on'
    }
  }
  // push the new url
  window.history.pushState(currentFilters, 'New Filter', url);
}