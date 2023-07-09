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
Now, we want to move player around the game using mouse clicks
The code inside Game class will be executed when we create a new instance of Game class object
This feature is being used when we create a new instance of Player class inside Game class, allowing us to create Player class object whenever Game class is created
As such, we can run javascript codes inside Game class such as event listeners, and they will be available whenever Game class is created
To test this, add a section for event listeners within Game, and create a mousedown event listener and console log mousedown text
Inside your console, you should see the text whenever you trigger the mousedown event in the browser(clicking on mouse)
As usual, with clicking or keyboard events, you want to gain access to the event(e) objects inside the browser
Pass in event or e in the callback for mousedown, and console log it
You should see all properties available to the mousedown event
What we want here is the coordinates of the click and save them as properties and save them on the main game object and from there we could access from our player object as well
Create mouse property in Game, and assign it an object with x property set to the middle(half of width) and half of height for y
We also want to know when mouse click happens so add another property called pressed inside mouse object, and set it to false
Back to the mousedown event listener, you can console log the coordinates(e.x and e.y) and click around the browser to see the mouse click coordinates in your console
However, the coordinates are calculated starting from the top left edge of your browser window and not your canvas which makes the clicks inaccurate
Thus, we will use offsetX and Y properties that are available inside mousedown event
offsetX and Y represents the coordinate for the target node, which in this case is the canvas
Replace e.x with e.offsetX and do the same for e.y in the console log and you should notice that the coordinates of your mouse clicks should start at the top left edge of your canvas
Set pointer-event of overlay to none in css so it does not interfere with the clicks on canvas
With the above done and working, we want to save the click coordinates inside the mouse property in game so they can be used in other objects such as player
In mousedown event listener, set the x property of mouse object to its offset counterpart
Do the same for y
Add another set of console log for mouse x property and mouse y property
Notice that you have an error because the callback function you are using is a standalone function and it cannot reference anything outside of its scope(unable to reference this keyword)
We will instead use an arrow function(introduced in ES6), which will allow the code within it to reference from its parent using this keyword
Your clicks should now register in the console
Remove the console logs and set mouse pressed property in mousedown event listener to true
Add a mouseup event listener that mirrors mousedown event listener, with the exception that the pressed property be set to false
Add a mousemove event listener with the same code inside but without the pressed property
With the event listeners in place, we will now code to make Player object move
In Player, create custom update method, and set collisionX property to the game's mouse x property
Do the same for collisionY with y
To run update method, we will need to call it
Call it in render method in Game
To see movement/animation, you will need to keep calling the code that draws or renders over and over
To do this, move the render call on game inside custom animate method and request for animation, passing it animate method, then call animate
Now, when you move your mouse in your canvas, you should be drawing the circles
To remove previous draws, you will need to clear the old paint using clearRect method on the context from coordinates 0,0 to the full width and height of canvas(these are the arguments passed in clearRect) inside animate method
Now, only 1 circle should be drawn on your cursor, and the previous circles are erased, giving an illusion that the circle is 'following' your cursor
We will now create a new shape in Player class
In Player draw method, add a escond set of beginPath method on context, and use moveTo method on context, which defines the starting x and y coordinates of the line
Set the starting x and y coordinates to be collisionX and Y
lineto method will define the ending x and y coordinates, so use the method on context and set the ending x and y coordinates to be the game's mouse x property and mouse y proeprty respectively
Call stroke on context after the above to draw the line
Currently, since the line which represents the player has the same speed as the cursor, the line just catches up to the circle
We will now set a speed variable for the player
Inside Player, set speedX property to 0, likewise for speedY
In Player update, set speedX to 1 and increment collisionX instead by speedX
Do the same for collisionY with speedY
\*\* Technique 1 --> To make the player(line) follow the cursor, we can take the difference between the mouse and player position on horizontal axis for speedX and do the same between mouse and player position on vertical axis for speedY
You can slow the Player's movement to the cursor by dividing(or multiplying) the above differences by a value(you will need place parenthesis for the calculation of the difference first)
In Player, set distanceX(represents distance between mouse and player) property to 0, and do likewise for distanceY for vertical distance
You can now place the calculation of the difference inside distanceX and distanceY respectively in update method, so the code gets simpler to read(and no need to agonize over parenthesis)
We only want to move player in that direction when we click on the canvas
To do that, set a condition in mousemove event listener where only when mouse pressed property is true, then run the code inside mousemove event listener
Technique 1 moves the player according to the value you divided(or multiplied) by on the difference, which means whenever player moves a frame towards its destination, the value of speedX and Y gets smaller and smaller, making the player move slower and slower towards its destination
\*\* Technique 2 --> We will calculate hypotenuse between distanceX and distanceY and achieve a constant speed from player to destination
Inside Player update, add distance variable and assign built-in Math.hypot javascript method which will help us calculate the hypotenuse of distanceX and distanceY when we pass the latter as arguments inside the method
For speedX and speedY, instead of dividing(or multiplying) by a constant value, divide it by the new distance variable instead
Add an OR operator after the assignment for speedX and Y with a value of 0(to mitigate an edge case)
To allow player to move faster, we will add a speedModifier property in Player and give it a positive value
In Player update, multiply the increment in collisionX and Y by the speedModifier
Notice that when player reaches its destination, it goes back and forth because the speedModifier pushes it too far in both directions
To fix this, in Player update, only when distance is more than speedModifier, then you move the player(speedX and speedY assignments in update)
Else, set speedX and Y to 0
Now, your circle should stop 'vibrating' when it reaches its destination
Now, create a new class called Obstacle
Pass in game reference and convert it to class property
Inside Obstacle, add collisionX property and give it a random number between 0 and game's width
Do the same for collisionY but with game's height
Set collisionRadius to 60
Add draw method inside Obstacle, passing in context reference
In the draw method for Player, copy from the first beginPath method till stroke and paste it in Obstacle draw
The code will work because we have already added the necessary collisionX, Y, and radius properties in Obstacle class
Obstacle class will be a blueprint for whenever we create an obstacle in the game
Inside Game, add an obstacles array and a numberOfObstacles property set to 5 for now
Create init(short for initialize) custom method in Game, and create a for loop
The for loop will start at 0 index, with the limit being the numberOfObstacles property and incrementing
Whenever the for loop runs, push a new instance of Obstacle into obstacles array
Obstacle class requires a game reference, and since init method is inside Game class, just pass this keyword to the new instance of Obstacle
Now, call init method on game and console log game
Check your game properties and there are any undefined values, fix it in your code because there shouldn't be any
To draw all the obstacles object on canvas, in render method for Game, use forEach method on obstacles array(because all new instances of Obstacle is placed inside the array)
For each obstacle, call the draw method on it with the relevant reference required
You should now have 5 circle obstacles inside your canvas as defined by your Obstacle collisionX and Y
Each refresh will place the 5 obstacles randomly on the canvas
Currently, the code inside your init method randomly generates 5 obstacles, and will overlap
Remove the code and we will try a brute force method to try to place the obstacles(circles) in a non-overlapping fashion
Create variable attempts and set it to 0 in init
Create a while loop and increment attempts whenever the length of obstacles array is less than the numberOfObstacles AND attempts is less than 500
Inside the while loop, add a testObstacle variable and assign it a new instance of OBstacle with the reference and console log it
You should see 500 testObstacle objects in your console
Remove the console log and replace it with a forEach method on obstacles array and for each obstacle, set distanceX as the difference between testObstacle's collisionX and obstacle's collisionX, and do the same for distanceY with collisionY
This will compare the center points of the two objects testObstacle and obstacle, connecting the line between them, forming a hypotenuse using distanceX and distanceY
Next, set distance to built in hypot method for Math(or if you are big brained, calculate using pythagoras theorem manually), passing distanceY and distanceX
After that, set sumOfRadii to be the collisionRadius of testObstacle plus collisionRadius of obstacle
Create a variable called overlap and set it to false outside the forEach method
Back to the forEach method, set a condition for whenever distance is less than sumOfRadii, set overlap to true
After the forEach method but still inside the while loop, set another condition where if overlap is false, then you push testObstacle into obstacles array
This should ensure that your obstacles will never overlap/collide because those that are overlapping will be discarded by the code
Now, instead of circles, we will replacing the randomised circles with image sprites for obstacles
In html, bring in obstacles.png in as an img tag, and set its id
Inside css, set display to none for obstalces(we will draw it using canvas and javascript)
In Obstacle, add image property, assigning it by linking to the obstacles id
Set numberOfObstacles to 1 for now
Inside Obstacle draw, call drawImage on its reference with 3 parameters/arguments for now(image, collisionX, collisionY)
We will now add the dimensions of the individual sprites as properties
Set spriteWidth to 250(1000 / 4)
Set spriteHeight to 250(750 / 3)
Set width to spriteWidth and height to spriteHeight(these will be used for scaling the images if needed later)
Adding the 4th and 5th arguments to drawImage, using width and height properties for now, will squeeze the entire spritesheet into the dimensions defined by those arguments(which is 250px each)
To crop a single sprite image from the spritesheet, you will need to employ all 9 arguments in drawImage method
The remaining arguments are the source coordinates(sx, sy) and dimensions(sw, sh)which are placed after the image argument, and will decide where in the spritesheet you are cropping and the size you are cropping
To crop the first sprite, it will be at coordinate 0,0 at the top left
The dimensions will be the spriteWidth and spriteHeight which you have defined in the constructor
In your game, the circle attached to your sprite is the collision area for your sprite and we want it to be around the centerpoint of your sprite
To do this we can add a couple of helper properties in Obstacle, spriteX and spriteY
Set spriteX to be the difference between collisionX and half of width
For dx in Obstacle draw, replace it with spriteX
Visually, you should see the collision circle pushed horizontally to the middle of the sprite
Do the same for spriteY and dy
Looking at the sprite, we want the collision area to be somewhere on the ground near the base of the sprite because there will be where our player sprite is moving and colliding
To move the circle downwards, we want to tweak the values with regards to its y axis, which in this case is spriteY
Positive values move the y axis upwards, and negative values down
So, add negative values to spriteY till you are satisfied to where the collision area covers the base of the sprite
Now, increase numberOfObstacles to 10
To space your obstacles even more we can add a distanceBuffer variable to Game init method and give it a value
In sumOfRadii, you can add distanceBuffer to its original assignment and the obstacles spawned in your game will always have this increased distanceBuffer you have added
To make sure that the obstacles/sprites always appear fully on the canvas and not clipped at the edges of the canvas, you can add an AND operator in your condition after the init while loop, and check if testObstacle's spriteX is more than 0(left edge of canvas), AND if testOBstacle's spriteX is less than the total width minus testObstacle width(right edge of canvas)
You should see that your obstacles are always visible horizontally after the above
The conditions for spriteY will differ because there is the background to consider
You do not want the obstacles to appear on the background which the player will not be able to walk pass anyway
Set topMargin to 260 in Game(which is the approximate height of the background forest at the top side)
Add the conditions for spriteY(vertically) with AND, taking the new topMargin property in consideration
Between the while loop and the condition, add a margin variable, assigning two times testObstacle's collisionRadius
Add this margin to the conditions for collisionY
This will give ample space around the obstacles when they are generated so enemy NPCs and player can move about(which will be useful when we add them in)
\*\* My topMargin's value is much smaller than author's (he uses 260 i use 20) because if i use his value my sprites are generated near the bottom side and never further upwards
Currently, we are only cropping the first sprite from the spritesheet(0,0)
For sx and sy, if we multiply 0 with spriteWidth and spriteHeight respectively, changing the 0 from 0 to 3 for sx will move the cropped position from position 0(first sprite) to position 3(4th sprite) horizontally in the spritesheet
The same applies to sy but vertically
As such, we can add helper properties instead of using hardcoded 0 and what not in place of these hardcoded position values
Add frameX property and give it a random value between 0 and 4(using Math.floor on Math.random)
Do the same for frameY, giving it a random value between 0 and 3
In your drawImage method, you can now replace your hardcoded values in sx and sy, with frameX and frameY, multiplied by their appropriate x or y dimension
Now, you should get obstacles that are randomly generated defined by your spritesheet
Inside your Game class, create checkCollision custom method, passing in a and b references
The idea here is to check for collision between a and b objects and can be applied to every object that has collision
In checkCollision, set distanceX to be the difference between collisionX of a and collisionX of b(this code will only work when all class objects have the referenced property)
Set distanceY to be the difference between collisionY of a and of b
Set distance to be Math.hypot of dy and dx
Set sumOfRadii to be the addition between collisionRadius of a and b
Then, return true if distance is less than sumOfRadii
In Player update, add a collision check with obstacles section
Within the section, call forEach method on game's obstacles array
For each obstacle, console log game's checkCollision method with the required references(a will be this keyword since we want a to point to the player, b will be obstacle)
The above method will only work when the objects you are comparing have collisionX, collisionY and collisionRadius properties
Once you see true and false being logged out in the console, remove the console log and replace it with an if condition wrapping the checkCollision call, and console log a collision text message inside the condition
Now, whenever your player moves and collides with the collision area(circles) of your obstacles, the collision text should be logged
Instead of just logging a collision text message, we want the player object to be pushed back in the direction opposite of the collision area of the obstacles, creating a physics push back of sorts
Currently, checkCollision method only checks if distance between circle collisions is true or false
In javascript, a return statement can only return 1 value(in this case if distance is less than sumOfRadii is true or false)
But, if you wrap the statement(not the return keyword) as an array, you can return multiple values, not just 1
We want more values such as distanceX, distanceY etc ,so, turn the statement into an array, and add distance, sumOfRadii, distanceX, and distanceY
Since this is an array, the index order is important(index 0 will return true or false, index 1 distance value and so on)
Take that array in your return statement you just made, copy them, and paste them in your forEach method in Player update, and COMMENT them(they will be used as visual reference here since we want to know the index order)
They will be needed when you calculate the collision between player and obstacle
\*\*Destructuring assignment employed here
Still in your forEach method, to destructure the array to be read, we will assign the array you commented out to the checkCollision call on game
What this does is for each array item, javascript will assign the checkCollision call on game separately under the hood. This is called destructuring
For index 0 item(distance < sumOfRadii), you should change it to collision(collision will reference checkCollision's return statement)
Remove the if condition for checkCollision call
Add an if condition where if collision is true, set unit_x to be the division between distanceX and distance(this will always return a value smaller than 1 because distance is the hypotenuse of distanceX and distanceY)
Also, set unit_Y to be the division of distanceY and distance
Console logging unit_x and unit_y will show the collision coordinates between player and obstacle everytime they collide
Remove the console log
To 'bounce' the player out of the obstacle's circle collision, we will set the centerpoint of player's collision(collisionX) to be the obstacle's collisionX plus the sumOfRadii plus 1(these in parenthesis because you want these to be calcualted first), multiplied by unit_x
Do the same for collisionY using collisionY and unit_y
Try moving your player pass the obstacles(it should not be passable and your player object can actually circle around the collision area smoothly since they are both circles)
We will now add an 8-directional sprite sheet, attached to the player object
In html, add the img tag and link the sprite sheet with an id of bull to it
Hide the display of bull id in css
In Player, set image property to bull's id
In Player draw, call drawImage on context with the initial 3 parameters to see the entire spritesheet drawn on canvas
We will need the width and height of each individual sprite as a property
In that sprite sheet, each sprite should be 255 in width and 256 in height, and you can assign them as spriteWidth and spriteHeight respectively inside Player(remember to place them above image property because image requires them for calculation)
After the above, create width and height properties and set them to spriteWidth and spriteHeight respectively(just like Obstacle class, this will allow us to scale them if needed later)
Now, you can add the next 2 parameters to the drawImage to squeeze the spritesheet within the values defined by those 2 parameters(dw, dh) using the width and height
Obviously, we will need all 9 arguments/parameters to draw out a single sprite from the spritesheet
Add sx, sy, sw, sh to drawImage, drawing only the top left most sprite
We mentioned previously the use of spriteX and spriteY, which will represent the top left most edge of the sprite's collision area, using collisionX and Y as the base of the calculation, which is the centerpoint of the bottom area circle collision
Add spriteX and Y property to Player
Currently, the collision circle for player is located at the top left edge(as defined by 0,0 in drawImage)
To move it to the center horizontally, we will set spriteX inside Player update to be the difference between the collisionX and half of width for spriteX
Do the same for spriteY with collisionY
Then, replace dx and dy to spriteX and Y
The circle collision will appear at the top of the player's head and we want it to be near its base(probably also want it to be bigger than 30)
We can add/minus spriteY's calculation with a hardcoded value to move collision area up/down since the player's size is static(if player is scaled, then we will need a value that will match that scaling)
The same can be appllied to spriteX to move the circle left/right
Just like the drawImage in Obstacle draw, you want to be able to navigate through the large spritesheet of player sprite, which features 8 directional sprites
We will do so with the frameX property for horizontal navigation, and frameY for vertical(just like Obstacle's)
The above properties will be multiplied by the relevant spriteWidth or spriteHeight in sx and sy in drawImage for Player draw respectively
Set the aforementioned frameX and frameY property to 0 in Player
In Player update, we will now attempt to make our player sprite face the direction our mouse cursor is placed on the canvas
Add a sprite animation section in Player update, and in it set angle variable to Math.atan2()
\*\* Math.atan2 returns an angle in radians between the positive x axis and a line, projected from 0, 0 coordinates towards a specific point(in this case the mouse cursor).
The specific point mentioned will need the calculations of distanceX and distanceY in Player update, so move them above sprite animation section
Pass in distanceY and distanceX to atan2 and console log angle
You should see the values of from -3.14 to 3.14 when moving your mouse cursor around the canvas(remember/or know that a full circle is approx Math.PI multiplied by 2)
Each sprite direction in the spritesheet will take up a specific area of a full circle (-3.14 to 3.14), and since we have 8 directional sprites, the full circle will be split to 8 slices base on their angle in Math.atan2
\*\* The angle areas are calculated specifically as shown in the author's video(1:16:17)
After angle variable, add an if condition to check if angle is less than each value(more than would not work here because there will be one with infinite value), followed by several else if, till all 8 directions are covered in the code, setting frameY(the direction the sprite is facing) to the appropriate angle value
\*\*The above will be better understood watching the (1:16:17) part
For frameY 6, and 7, you will need to be more specific with the conditions due to how the Math.atan2 line is drawn (which again is better if you watch 1:16:17 to understand)
After the above, move your player around with your cursor and your sprite should be able to face all 8 directions when moving around the canvas
For frameY 6 and 7, placing them last in the else if statement makes the transition abit too fast(in javascript the order in which the if statements are placed dictates it), so place them at the front(6,7,0 to 5 ordering)
With the change, your transition from frameY 0 to 7, 6 and frameY 5 to 6, 7 should be smoother(Change your speedModifier value in Player to slow down the sprite movements so you can see the transitions better)
The circle collisions are there visually for us to adjust where the collisions should be placed, and not to be shown to players playing the game
As such, we will need a debug mode where it can hide/show the collision circles
We will do this using a keydown event listener on window in Game
In Game, set debug property to true and create the previously mentioned keydown event listener in the event listeners section
Use e for the arrow callback function and using the available key property in keydown, set a condition where if e.key of letter d is true, set debug to false(you can use !this.debug to denote false as well), then console log debug property and press d multiple times, and console should switch between true and false for each d press
Comment/Remove the console log, and in Obstacle draw, wrap the collision circle drawings(beginPath till stroke) in a condition to check if game's debug property is true, then invoke the drawings
Now, pressing d should witch the collision circles of obstacles off or on
Do the same for Player
Currently, your player can move out of the canvas, and 'float' across the forest background layer, which is not ideal and we want to create boundaries that player should not be able to cross
Add horizontal boundaries section right above collisions with obstacles section
Inside horizontal boundaries section, set a condition where if collisionX is less than collisionRadius, set collisionX to collisionRadius(left side)
Else if collisionX is more than the game's width minus the collisionRadius, set it to game's width minus collisionRadius(right side)
Add vertical boundaries section
Set a condition where if collisionY is less than game's topMargin plus collisionRadius, set collisionY to game's topMargin plus collisionRadius(top side)
Else if collisionY is more than the game's height minus collisionRadius, set collisionY to game's height minus collisionRadius
You can tweak values in collisionRadius, or margin variable in init to make sure player obstacles spawn points never obstruct the area between topMargin and obstacle for player(if you want)
We will now allow our game to normalise itself to the user's screen refresh rate, attempting to achieve similar game speeds across different computers
requestAnimationFrame will refresh itself automatically approx every 60 frames per second, and will generate a timestamp
We will make use of that timestamp to achieve a normalised game speed for all
Create variable lastTime before animate method(i used previousTimeStamp for more clarity) and set it to 0
Pass a timeStamp reference in animate method
console logging timeStamp inside animate and you should see numbers rapidly increasing, due to requestAnimationFrame, in milliseconds
Remove the console log and create deltaTime variable inside animate, which will calculate the difference between timeStamp(which is the timeStamp reference) of CURRENT animation loop and timeStamp(previousTimeStamp) of the PREVIOUS animation loop
After the calculation above, set previousTimeStamp to the current timeStamp(so the function will continuously take the current timeStamp to replace previousTimeStamp and update it when the next requestAnimationFrame runs)
If you console log deltaTime inside animate, you should see 1000 divided by 60(16) per second but if you have a slower computer, the value 60 might be lower
Notice that your first two numbers are NaN, because the initial loops do not have a number to them as the code is triggered by animate call which has no references in it
To prevent your deltaTime related codes from not running(because we will use them to normalise game speed) due to NaN, pass the number 0 in animate call so it has an initial number attached to it, allowing javascript to calculate in the console
To make use of deltaTime calculation to determine frame rate of the game, we will need helper properties in Game
In Game, set fps property to 20, timer to 0, and interval to 1000 divided by fps
Inside Game render method, set a condition where if timer is greater than interval, invoke the render on player and Obstacle(the code you had inside render)
Then, within the condition, set timer back to 0
After the condition, set timer to increments of deltaTime
What the above does is render runs, the condition will not be true until the deltaTime increments in timer property exceeds interval, then it will turn true, running the code inside and setting timer back to 0, and the increments begins again
You will need to pass deltaTime as a reference in render method
Also pass it inside the render call inside animate
You will now have flashing sprites in your canvas because we are deleting old paint(clearRect in animate) but only drawing new sprites when reaching interval
You will need to remove clearRect method in animate, and add it to the interval condition(you will need to pass the Game properties inside clearRect since you are inside Game class now)
Now, your game should run base on the fps property value in Game class(not entirely because 60 fps value is not actually 60 fps since there are some left numbers after every interval since there are decimal places --> to account for this if you wanna achieve lets say 60 fps, your value in Game's fps property should be higher, like 70)
Now, create an Egg class, passing it game reference, convert it, and set collisionX and Y to a randomised number between 0 to the game's full width or height respectively
Set collisionRadius to 40 for now
Set image to the image's id(link the egg image to a html img tag and set it to a display of none in css)
Set spriteWidth and spriteHeight to their appropriate values(check it in developer's mode, and it should be displayed on the tab if you are on linux)
Then, set width and height to spriteWidth and spriteHeight respectively for scaling purposes if needed
As usual, we will center the collision area on the image using spriteX and spriteY(for spriteY closer to the base so some adjustments need to be made later)
Create custom draw method in Egg class, pass in context reference, and use drawImage on context
We will only need 3 parameters here for drawImage because it's a single sprite image(if the image is scaled later we will need 5)
Pass in the image, and the destination X and Y(dx,dy) of the image which are spriteX and spriteY
Since we are standardizing our codes in all our classes, we can reuse certain parts, such as the debug mode condition in other classes' draw method, to new classes that require them
Bring in the debug condition into Egg draw so the collision circle will appear for Egg object as well(Since we are reusing the same code for each class, we can refactor it into a custom method on its own so each of those classes can reference said custom method instead)
Inside Game, add a new addEgg custom method which will periodically add eggs into the game
Add eggs property in game and assign it an empty array
Add maxEggs property in game and set it to 10 to prevent endlessly spawning eggs
Inside Game render, create a section called add eggs periodically
Similar to the condition with timer and interval above, we will be applying that to the spawning of eggs
We will need a helper property for egg spawns, so add an eggTimer property and set it to 0
Add eggInterval and set it to 500(0.5 seconds) or any number you want
Now inside the add eggs periodically section, set a condition where if eggTimer is more than eggInterval, we will add the egg with the addEgg custom method which is currently empty
Inside addEgg method, we will use push an instance of Egg class inside eggs array, passing in the required game reference(this)
Back in add eggs peridically section, we will set eggTimer back to 0 in the condition, and just like the timer and interval for player, we will increment eggTimer by deltaTime to activate the condition(\*\* you can add an else keyword to it but if it's only 1 additional statement, you can remove else and it would still work the same as an else statement)
Also, you will need to add an AND condition where eggs length is less than maxEggs(so you will not spawn eggs endlessly)
Console log the eggs array in the condition to check if the array has all the properties you want in it
Once the above is satisfactory, you will now draw it in your render method
Similar to obstacles, you will now apply a forEach method for eggs after it to draw new instances of Egg inside the canvas
So, in the forEach method for eggs, for each egg, you will call draw on egg, passing in the context
You should have eggs spawning on your canvas now with the collision circles centered on the egg(if they are out of position, check your calculations for spriteX and spriteY in Egg)
\*\* I had the lines connecting from each egg to the player so check if you had the moveTo and lineTo methods(which were from player) pasted in the debug code for your eggs
Just like for player and obstacles, we will adjust add/offset values in spriteY so that the collision area will be adjusted to near the base of the egg
Currently, the eggs spawn everywhere on the canvas, and you want to limit the spawn area within the areas where player can 'push' these eggs towards the 'forest'(the author wants this game to spawn monsters which will eat eggs and the hatchlings and player needs to push the hatchlings and eggs towards the 'forest' to save them)
To limit them, we will create a margin property in Egg, assigning it twice the value of collisionRadius for now
In collisionX for Egg, we will add this margin, and instead of a random number between 0 to game's width, you will offset game's width by twice the margin(the margin addition represents the left margin, while the offset on game's width with twice the margin represents the right margin)
Check that horizontally, the eggs will not spawn on the left and right edges now
Now vertically, we will do something similar to collisionY in Egg
Since we have a topMargin defining the 'forest' area in game, we will add that into collisionY calculation, and instead of 0 to game's height, offset game's height by game's topMargin(top edge) and margin(bottom edge), the latter preventing eggs from spawning too close to the bottom of the canvas
Hatchlings will hatch from the eggs, and eggs will be 'indestructible', meaning both player and enemies will just 'push' the eggs, while hatchlings can be pushed by player, but will be consumed by enemies/monsters
Create custom update method in Egg to apply physics to Egg object when interacting with certain canvas elements
Inside update, create a collisionObjects variable and assign an array to it
Inside the array, pass in game's player, and a spread of game's obstacles(you need a spread operator because obstacles is an array itself, and javascript needs a flattened array to be able to read the array)
The two items in the array are objects the eggs will interact with
Call forEach method on collisionObjects, and for each object, just like you did for collisions with obstacles in player, you will have a destructed array with collision, distance, sumOfRadii, distanceX, and distanceY passed into the array, and assign the checkCollision call on game on the destructed array
checkCollision call requires two references a,b(a will be the egg so pass in this keyword, and b will be each individual object in collisionObjects, so pass in object for b)
And just like how we detect for collision in Player update, we will do it for egg, with the exception that instead of colliding in place and player is not allowed to push obstacles, eggs will be pushed by player(and monsters that we will create later)
\*\* The forEach method on collisionObjects, similar to game's obstacles forEach method in player Update, acts as the 'anchor' and will not be moved by the object it is colliding with
Set a condition after the call on game's checkCollision, if collision is true, set unit_x to distanceX divided distance(hypotenuse between distanceX and Y)
Set unit_y to distanceY divided by distance
Set collisionX to object's collisionX, plus the sumOfRadii plus 1(parenthesis), multiply by unit_x
Do the same for collisionY(these calculations are the same as the collision condiiton in player update)
In game's render method, in addition to draw call on each egg, call the update method on each egg to activate Egg update method
Test it in your browser and notice that player will push the collision circle but not the egg itself
To 'stick' the collision area to the egg images, move the spriteX and Y properties with their calculations into Egg update, and set spriteX and Y as properties with no assignments
Now, the collision circles should be 'pushed' along with their assigned eggs
Currently, if you mess with the game a little, you will notice that the depth perception is off because when you push the eggs, depending on the order inside render method, your eggs will be at the front or behind the obstacles regardless of position, same with your player
What you want is when you are at a certain vertical level, player and eggs should visually be in front of obstacles when below them and behind them visually when they are behind the obstacles
To do this you will need an array of player, eggs, obstacles, and draw them in order of verticality
Add new Game property called gameObjects and assign it an empty array
In game render, set gameObjects to an array with a spread of eggs, a spread of obstacles, and player
Then, create a new forEach method for gameObjects, and for each object, call the object's draw and update methods(it is important for the array items to have their associated draw and update methods or the code will break)
You can now remove the forEach methods for eggs array, obstacles array, and the draw and update call on player because we will now do all that using gameObjects
You should get an error now because Obstacle do not have an update method
Create an update method for Obstacle and leave it empty for now
It should work now because there is an Obstacle update method(albeit empty)
In Game render, add a section called sort by vertical position, place it before the forEach method on gameObjects(the forEach method is when you draw them)
We will use built-in javascript sort method on gameObjects, passing in a custom arrow function, with a and b references, and in that function, return the difference between a's collisionY, and b's collisionY
Inside the canvas, when the eggs are below the vertical position of the obstacle, your eggs should appear in front of them, and when the eggs are above the vertical position of the obstacle, they will appear behind them
We will now create an Enemy class object
Pass in game reference in and convert it because we want access to game class' properties
Due to how our code is set up, we want identical properties inside Enemy such as collisionX, Y, collisionRadius
collisionX will be set to game's width, Y will be randomised between 0 to game's height, collisionRadius value of your choice
Set speedX(represents speed of enemy) to a randomised number between 0.5 to 3.5
Bring in toad in html, display none in css, and bring the image in Enemy property
Set spriteWidth and height to the appropriate values for toad/enemy
Set width and height to spriteWidth and spriteHeight respectively for scaling purposes as always
Set spriteX and Y assigned to nothing(we will calculate it inside the update method)
Create Enemy draw method, passing in context reference
Use drawImage on context and pass in the initial 3 parameters to draw enemy image
Duplicate the debug code into Enemy draw(just like the other draw methods)
Create Enemy update and set collisionX to a decrement of speedX(a new property unique to Enemy) which will move enemy to the left
Below it, set a condition where if spriteX plus width is less than 0(when sprite moves out of canvas to the left), set collisionX to game's width, and collisionY to a randomised number between 0 and game's height(this will make enemy appear again from the right and move in a random vertical fashion)
Similar to eggs, you will have a custom addEnemy function in main game class
Set enemies property in Game to an empty array
Use push method on enemies array a new instance of Enemy class, passing in the required reference(game which is this keyword since the method is inside game class)
Inside init method, create a for loop, starting at index 0, with a limit of 3 and incrementing
Inside that for loop, call addEnemy and console log it to check the Enemy class objects properties inside enemies array and make sure nothing is undefined
Remove/comment the console log
Remember that gameObjects variable we refactored for player, eggs and obstacles? You can now spread enemies array inside gameObjects array and the sort and forEach method on gameObjects will now handle the draw and update on Enemy without bloating the codebase
As we decided to do the calculations inside Enemy update for spriteX and Y, do it now by centering spriteX via offsetting collisionX with half of width
Do the same for spriteY
Now, just like for obstacles, player, and eggs, we want to adjust the collision circle of enemies closer to the base of its model, which we will do so via offsetting spriteY with a value
Currently, collisionX is resetted in the condition in Enemy update by assigning it to game's width
We want to add width(spriteWidth) of the sprite so when enemies appear from the right of the canvas again it should not appear full-sized immediately, but slowly appearing from the right edge of canvas
Add a randomised number between 0 and half of game's width so they appear randomly from the right
For collisionY, we do not want enemies to appear 'floating' above or anywhere too close to the forest, which is defined by topMargin
Add topMargin into collisionY calculations so enemies only appear below the forest and not on, or above it
We will also need to offset the topMargin when calculating a random number between 0 and game height(apparently for bottom margin it counts the browser too? not sure about this)
For the changes in collisionX and Y, you will need to change it in Enemy properties and in Enemy update(Enemy properties is the initial creation and update is how the enemies are re-created on canvas)
You will also need to move collisionX and Y properties below width property so collisionX, which now includes width, can have access to width property value
You can reuse the code in Egg update regarding collisionObjects and its forEach method
Just like how eggs can be pushed away from player and obstacles, this will allow enemies to be pushed away by player and obstacles as well, creating a nice sliding effect when enemies have to collide and move pass player/obstacles
Using this logic, you can add a spread of eggs array inside collisionObjects in Enemy update if you want the eggs to be immovable when colliding with enemy or you can add a spread of enemies array inside collisionObjects in Egg update so enemies can push eggs away when colliding
We will go with the latter in this case
Now, we want a Larva class which will be the hatchlings mention above, which the player would want to push away from incoming monsters, into the forest to gain points
Create Larva class, passing it game, x and y references, and convert game to class property, collisionX and Y to x and y
Add collisionRadius as usual, and bring in the larva image to html, set its display to none, and bring it into Larva class
Set its spriteWidth and spriteHeight, and set width and height for scaling purposes(no elaboration here because we did it before)
Just like your other class objects, you will also need spriteX and Y properties, and their calculations will be done in its update method
Create draw method and pass in context, and use drawImage on context
Pass in the 3 initial parameters for drawImage using the image, spriteX, and spriteY(just like your other draw methods)
Your larva/hatchlings will be moving vertically upwards towards the forest to safety so we will need them to move vertically
Add speedY property and it will be moving at a speed of 1 to 2 (1 + Math.random() because Math.random gives a value from 0 to 1)
Create update method, and set collisionY to a decrement of speedY
\*\* Class objects that are constantly moving needs to be called again and again to give the illusion of 'moving/animating',and as such, the update method will need to constantly track their collision circle positions, so we will need to do the calculations for spriteX and Y inside Larva update method
After setting collisionY, set spriteX to collisionX offset by half of width(just like the previous update methods)
Do the same for spriteY
We will now write egg hatching logic
Just like enemies, and eggs, we will introduce timers for eggs to 'hatch' these larvas
In Egg, add hatchTimer and set it to 0, and add hatchInterval and set it to 5000(5 seconds)
Inside Egg update method, add a hatching section, and set a condition where if hatchTimer is more than hatchInterval, hatch the egg(remove egg and larva appears) and set hatchTimer back to 0(sounds familiar?)
Else, increment hatchTimer by deltaTime
Since we are using deltaTime, we will need to pass it as reference to update
We will also need to pass in deltaTime to update in render method for object
To hatch the egg, we will need a property in Egg called markedForDeletion, setting it false
In the hatching condition, when hatchTimer is more than hatchInterval, set markedForDeletion to true
Then, call removeGameObjects(not yet made) on game
Inside Game, create new custom method removeGameObjects, and inside it, call filter on eggs array, and for each object, if it has markedForDeletion property set to true, filter them out
Back in hatching condition, console log eggs array to see that your eggs are being removed and added
Once the above is working, we will now add a visible hatch timer above each egg when in debug mode
In Egg draw's debug condition, call fillText method on context, passing it in hatchTimer(what you want to draw), and collisionX and Y(where you want to draw it)
Now, you want to set font size and style in the global scope, right at the start of your codebase, alongside your fillStyle, lineWidth and other css styling for canvas
\*\* Placing them in global scope will run them only once as oppose to running them at 60 times a second inside custom methods which are continually running due to requestAnimationFrame
Set ctx.font to 40px Helvetica(or whatever you want) in global scope
Back in Egg draw's debug condition, create displayTimer variable and call toFixed on hatchTimer, passing 0 to it
You can now replace hatchTimer parameter in fillText to displayTimer variable you just created
You can adjust positions of the text by offsetting or adding values to collisionX for horizontal and collisionY for vertical(you can use collisionRadius so you do not use a hardcoded value)
For horizontal positioning, instead of making adjustments to collisionX, you can use built-in css method, and call textAlign to center on ctx globally
You should see a number above the egg(or wherever you adjust the fillText)continuously increasing from 0 to 5000(or whatever your hatchInterval is) milliseconds before it disappears
Instead of milliseconds, you can convert it to seconds by multiplying hatchTimer inside displayTimer by 0.001
In Game, add hatchlings property and assign it an empty array
In hatching condition, use push method on game's hatchlings array, pushing in a new instance of Larva, passing the required references game, x, y
In render method, add a spread of hatchlings inside gameObjects array
Ignore the double hatchlings for now, and inside Larva update, add a section called move to safety where we check if larva has reached 'safe zone'
In the above section, set a condition where if collisionY is less than game's topMargin, set markedForDeletion to true, and call removeGameObjects on game
Inside removeGameObjects custom method, just like eggs array, filter hatchlings array for markedForDeletion on each hatchling(or you can keep it as object) that is true
Add the debug mode condition into Larva draw as well
Since the larva spritesheet has two larva sprites in it, we want to crop only 1 of it on canvas at any given time
We will need to so in the drawImage method in Larva draw, using all 9 parameters
For sx, sx, sw, and sh, we will pass in 0,0(starting crop position), and spriteWidth, spriteHeight(ending crop position)
For dw, dh, we will pass in width and height(it does not matter here if you use spriteWidth or spriteHeight since we are assigning them to width and height and have not scaled(yet))
As always, adjust collision circle of larva to match the base of its model inside spriteY
To animate the larva we will again use helper variables such as frameX or/and frameY, and since the larva spriteSheet only has two sprites, one on top and one at the bottom, we will need only frameY property
