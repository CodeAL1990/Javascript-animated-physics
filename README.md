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
console log game to see all its properties inside
Add custom draw method inside Player and pass in context
Inside draw method, draw a circle(beginPath(), arc(x,y,radius,start angle, end angle) on context)
end angle will be Math.PI multiply by 2 which represents a circle
Call fill on context to draw the circle out
Inside Game, create custom render method, passing in context
Inside render method, call draw on player property(which creates new instance of Player)
draw method requires a context reference, so pass it in the draw call
After game variable, call render on game, and pass in ctx(which will link ctx and context reference together since render method has a context reference)
You should see the circle at xy coordinate you have passed in arc
Now, add collisionX and collisionY as properties to Player to represent their collision coordinates
We will place the Player in the middle of the game, so set collisionX and Y to half the game's width and height respectively
Inside arc, you can now pass in collisionX and Y to place the circle in the middle area
With this change, you can now change the values inside collisionX and Y to move the circle, which represents the player, around
Create collisionRadius property and set it to a number
Inside arc, the 3rd parameter is radius, which you can now pass collisionRadius
Changing values of collisionRadius will affect the size of the circle
In javascript, animations run 60 times per second, which means changing styles, transforms, etc will hamper performance when placed inside functions
Use fillStyle, lineWidth and strokeStyle on ctx as global scope, setting them to white and a lineWidth of 3(setting them as global will make them run only once)
Call stroke on context in draw to create a border around the circle
globalAlpha controls the opacity and it affects the whole canvas
To make sure certain lines of code only affect the intended area, you have to wrap those lines of code within a save and restore method
For the fill call on context, wrap it with the save and restore method on context
Within this save and restore, set globalAlpha on context to 0.5 to change opacity of the fill call to 50%
If you remove the save and restore, you will notice that the whole canvas becomes opaque by 50%
