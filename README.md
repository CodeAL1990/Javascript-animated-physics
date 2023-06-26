# Javascript-animated-physics

Create boilerplate for canvas
Remove all margin and padding in html, and change box-sizing to border-box
Center canvas in css
Create img tag and bring in overlay into html
Center overlay in css
Create load event listener for window and inside the function get canvas from html
Change canvas context to 2d and set its width and height to 1280 and 720 respectively(the size of the background)
Create Player and Game class, and a custom animate function
In Game class, pass in canvas reference and convert it to class property
Set width and height properties in Game to canvas' width and height
In Player, pass in game reference and convert it to class property
Set player to a new instance of Player passing itself
Since Player has game property, passing a new instance of itself in Game will automatically create Player object when Game object is created
After Player and Game classes, create game variable and assign a new instance of Game, passing it its required reference(due to canvas being a class property, it can extract the width and height which are also class properties)
