# dev-portal-search-Icons

This repo currently contains a sample search result page for `dev-portal-search` with icons from two different providers.

## How to modify

### Color:
  * FontAwesome: Modify `color` in `i.{{FontAwesome Icon Name}}` for each icon in `styles.css` 
  * Ionicons: Modify `color` in `ion-icon#{{Ionicons Icon Name}}` for each icon in `styles.css`
  * Both of these sections can be found by looking for the comment `Styling for specific icons`
  
### Size:
  * FontAwesome: For each icon block (ex, `<i class="fas fa-file-alt fa-lg" artia-hidden="true"></i>`) change the last part of the class name (`fa-lg`) to any supported size (source: https://fontawesome.com/how-to-use/on-the-web/styling/sizing-icons) 
  * Ionicons: Modify `font-size` in `styles.css` for `ion-icon` (Note: Ionicons recommeds sizes that are a multiple of 8: https://ionicons.com/usage)
  
### Position:
  * The icons are placed in a 1x2 grid (1 row, 2 columns) with each search result
  * For both icon packs, you'll need to work in `styles.css` to modify `.results-container` for the relative grid size (how much space each column takes up) and `.results-grid` for how much space the results section of the page takes up
