## Considerations

Given the little time that I currently have to complete the test correctly, I have left some details of design and implementation incomplete, or at least improvable.
Below I detail some:

* Design in general: Misaligned parts, inconsistent fonts, colors, etc.
* Backend error feedback lost: API errors are saved in Redux but are not displayed to the user. 
* Performance: Pages can be kept in memory and speed navigation between them.
* Loading feedback en rename form.

## Explanation

*Libraries used:* react-router-dom, redux, material-ui, prettier, lint, redux-saga.
*Design:* I have used Material UI to improve the user experience and facilitate the bootstrap of common components.
*Data:* Redux has been used.
*Side effects:* I decided to use Redux Saga in order to improve the structure of the project and correctly handle the API request.
*Tests:* Due to time constraints, no unit tests have been added.