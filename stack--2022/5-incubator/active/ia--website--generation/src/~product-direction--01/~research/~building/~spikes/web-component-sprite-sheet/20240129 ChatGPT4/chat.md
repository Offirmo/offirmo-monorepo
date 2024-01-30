Use seed 88669988.

Use a high temperature.

You're a key member of a high-performing team in a professional environment.

Our team is a pioneer in the era of internet-based entertainment:
We are using the power of the internet to create and share joy, happiness and fun!

If you help our team succeed, you'll get fame, social status and millions of $$$.

The product we're building is a viral web page,
a major web phenomenon that people will love and share for decades.

We are recreating a modern version of the viral old "hampsterdance" page.

It's a simple page featuring many cute, whimsical, friendly little hamsters dancing together.


You're a genius web developer.

You produce reliable, secure, compliant, maintainable and efficient code.

Use as few third party dependencies and tools as possible.
Only use stable/LTS versions of dependencies and tools.
Use only the most widely used libraries an tools, that are well tested, well documented, actively maintained, have a large community and don't have security issues.

Use all the best practices and patterns that are available for the language and framework you are using.


Write a simple, dependency-free webcomponent that display an animation from a sprite sheet.
The component should take as parameters:
- the sprite sheet url
- the width & height of the sprite sheet
- the number of rows in the sprite sheet
- the number of columns in the sprite sheet

ChatGPT
Creating a simple, dependency-free web component to display an animation from a sprite sheet is a great way to ensure a high-quality and efficient product. We'll focus on using vanilla JavaScript, HTML, and CSS for this task, adhering to best practices and patterns. Given your requirements, here's a basic implementation plan:

HTML Structure: Define a custom element (web component) for the sprite animation.
JavaScript Functionality: Implement the logic to handle the sprite sheet animation, including calculations for frame dimensions and the animation loop.
CSS Styling: Apply styles for the sprite animation, ensuring it's responsive and visually appealing.
Parameters: The component will accept parameters for the sprite sheet URL, dimensions, and the number of rows and columns.
Here's a basic implementation:

HTML
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hamster Dance</title>
    <script src="hamster-component.js"></script>
</head>
<body>
    <hamster-dance
        sprite-url="your-sprite-sheet-url.png"
        sheet-width="1024"
        sheet-height="1024"
        rows="4"
        columns="4">
    </hamster-dance>
</body>
</html>
JavaScript (hamster-component.js)
javascript
Copy code
class HamsterDance extends HTMLElement {
    connectedCallback() {
        const spriteUrl = this.getAttribute('sprite-url');
        const sheetWidth = parseInt(this.getAttribute('sheet-width'), 10);
        const sheetHeight = parseInt(this.getAttribute('sheet-height'), 10);
        const rows = parseInt(this.getAttribute('rows'), 10);
        const columns = parseInt(this.getAttribute('columns'), 10);

        const frameWidth = sheetWidth / columns;
        const frameHeight = sheetHeight / rows;

        this.style.width = `${frameWidth}px`;
        this.style.height = `${frameHeight}px`;
        this.style.backgroundImage = `url(${spriteUrl})`;
        this.style.backgroundSize = `${sheetWidth}px ${sheetHeight}px`;
        this.animateSprite(rows, columns, frameWidth, frameHeight);
    }

    animateSprite(rows, columns, frameWidth, frameHeight) {
        let currentRow = 0;
        let currentColumn = 0;

        setInterval(() => {
            currentColumn = (currentColumn + 1) % columns;
            if (currentColumn === 0) {
                currentRow = (currentRow + 1) % rows;
            }
            this.style.backgroundPosition = `-${currentColumn * frameWidth}px -${currentRow * frameHeight}px`;
        }, 100); // Adjust frame rate as needed
    }
}

window.customElements.define('hamster-dance', HamsterDance);
CSS
You can add CSS directly within hamster-component.js or in a separate stylesheet. It should handle the basic styling of the sprite animation.

This basic implementation provides a functional starting point. Remember, for a professional project, you would need to consider further aspects such as browser compatibility, accessibility, performance optimizations, and more extensive error handling.

User
The component is generic for any sprite sheet. Don't use "hamster" in the name.
ChatGPT
Understood. Let's create a more generic web component suitable for any sprite sheet. I'll rename the component to sprite-animation to reflect its generic usage. The implementation largely remains the same, with adjustments to the naming to generalize its purpose.

HTML
html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sprite Sheet Animation</title>
    <script src="sprite-animation-component.js"></script>
</head>
<body>
    <sprite-animation
        sprite-url="your-sprite-sheet-url.png"
        sheet-width="1024"
        sheet-height="1024"
        rows="4"
        columns="4">
    </sprite-animation>
</body>
</html>
JavaScript (sprite-animation-component.js)
javascript
Copy code
class SpriteAnimation extends HTMLElement {
    connectedCallback() {
        const spriteUrl = this.getAttribute('sprite-url');
        const sheetWidth = parseInt(this.getAttribute('sheet-width'), 10);
        const sheetHeight = parseInt(this.getAttribute('sheet-height'), 10);
        const rows = parseInt(this.getAttribute('rows'), 10);
        const columns = parseInt(this.getAttribute('columns'), 10);

        const frameWidth = sheetWidth / columns;
        const frameHeight = sheetHeight / rows;

        this.style.width = `${frameWidth}px`;
        this.style.height = `${frameHeight}px`;
        this.style.backgroundImage = `url(${spriteUrl})`;
        this.style.backgroundSize = `${sheetWidth}px ${sheetHeight}px`;
        this.animateSprite(rows, columns, frameWidth, frameHeight);
    }

    animateSprite(rows, columns, frameWidth, frameHeight) {
        let currentRow = 0;
        let currentColumn = 0;

        setInterval(() => {
            currentColumn = (currentColumn + 1) % columns;
            if (currentColumn === 0) {
                currentRow = (currentRow + 1) % rows;
            }
            this.style.backgroundPosition = `-${currentColumn * frameWidth}px -${currentRow * frameHeight}px`;
        }, 100); // Adjust frame rate as needed
    }
}

window.customElements.define('sprite-animation', SpriteAnimation);
CSS
As before, you can add CSS directly within sprite-animation-component.js or in a separate stylesheet. The CSS would be responsible for the initial styling of the sprite animation component.

This generic implementation allows for the component to be used with any sprite sheet by simply changing the attributes in the HTML. As always, consider additional aspects like browser compatibility and performance optimizations for a professional-grade project.

User
very good. add the fps as a parameter.
ChatGPT
Certainly! Adding the frames per second (FPS) as a parameter allows for greater flexibility in controlling the animation speed. I'll update the web component to include fps as an attribute. This attribute will dictate the speed of the sprite sheet animation.

HTML
The HTML structure remains the same, with the addition of an fps attribute.

html
Copy code
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Sprite Sheet Animation</title>
    <script src="sprite-animation-component.js"></script>
</head>
<body>
    <sprite-animation
        sprite-url="your-sprite-sheet-url.png"
        sheet-width="1024"
        sheet-height="1024"
        rows="4"
        columns="4"
        fps="10">
    </sprite-animation>
</body>
</html>
JavaScript (sprite-animation-component.js)
I've added the fps attribute and adjusted the setInterval timing based on this value.

javascript
Copy code
class SpriteAnimation extends HTMLElement {
connectedCallback() {
const spriteUrl = this.getAttribute('sprite-url');
const sheetWidth = parseInt(this.getAttribute('sheet-width'), 10);
const sheetHeight = parseInt(this.getAttribute('sheet-height'), 10);
const rows = parseInt(this.getAttribute('rows'), 10);
const columns = parseInt(this.getAttribute('columns'), 10);
const fps = parseInt(this.getAttribute('fps'), 10) || 10; // Default to 10 FPS if not provided

        const frameWidth = sheetWidth / columns;
        const frameHeight = sheetHeight / rows;

        this.style.width = `${frameWidth}px`;
        this.style.height = `${frameHeight}px`;
        this.style.backgroundImage = `url(${spriteUrl})`;
        this.style.backgroundSize = `${sheetWidth}px ${sheetHeight}px`;
        this.animateSprite(rows, columns, frameWidth, frameHeight, fps);
    }

    animateSprite(rows, columns, frameWidth, frameHeight, fps) {
        let currentRow = 0;
        let currentColumn = 0;
        const interval = 1000 / fps; // Calculate interval in ms based on FPS

        setInterval(() => {
            currentColumn = (currentColumn + 1) % columns;
            if (currentColumn === 0) {
                currentRow = (currentRow + 1) % rows;
            }
            this.style.backgroundPosition = `-${currentColumn * frameWidth}px -${currentRow * frameHeight}px`;
        }, interval);
    }
}

window.customElements.define('sprite-animation', SpriteAnimation);
CSS
The CSS remains unchanged, as it does not depend on the animation speed.

This modification makes the component more versatile, allowing users to easily adjust the animation speed to suit their needs. The default value ensures that the component will still function even if the fps attribute is not explicitly set.
