

### Dall-e 3 landing page
https://openai.com/dall-e-3

A vintage travel poster for Venus in portrait orientation. The scene portrays the thick, yellowish clouds of Venus with a silhouette of a vintage rocket ship approaching. Mysterious shapes hint at mountains and valleys below the clouds. The bottom text reads, 'Explore Venus: Beauty Behind the Mist'. The color scheme consists of golds, yellows, and soft oranges, evoking a sense of wonder.


A paper craft art depicting a girl giving her cat a gentle hug. Both sit amidst potted plants, with the cat purring contentedly while the girl smiles. The scene is adorned with handcrafted paper flowers and leaves.


An ink sketch style illustration of a small hedgehog holding a piece of watermelon with its tiny paws, taking little bites with its eyes closed in delight.


Pixel art scene of Coit Tower standing tall on Telegraph Hill, with a panoramic view of the city below and birds flying around.


Illustration in flat design style of a diverse family of monsters. The group includes a furry brown monster, a sleek black monster with antennas, a spotted green monster, and a tiny polka-dotted monster, all interacting in a playful environment.


An antique botanical illustration drawn with fine lines and a touch of watercolour whimsy, depicting a strange lily crossed with a Venus flytrap, its petals poised as if ready to snap shut on any unsuspecting insects.


### Dall-E 3 paper

A illustration from a graphic novel. A bustling city street under the shine of a full moon. The sidewalks bustling with
pedestrians enjoying the nightlife. At the corner stall, a young woman with fiery red hair, dressed in a signature velvet
cloak, is haggling with the grumpy old vendor. the grumpy vendor, a tall, sophisticated man is wearing a sharp suit, sports a
noteworthy moustache is animatedly conversing on his steampunk telephone.


Ancient pages filled with sketches and writings of fantasy
beasts, monsters, and plants sprawl across an old, weathered
journal. The faded dark green ink tells tales of magical adventures, while the high-resolution drawings detail each creature’s intricate characteristics. Sunlight peeks through a nearby
window, illuminating the pages and revealing their timeworn
charm.


Cartoon drawing of an outer space scene.
Amidst floating planets and twinkling
stars, a whimsical horse with exaggerated
features rides an astronaut, who swims
through space with a jetpack, looking a
tad overwhelmed.


Following is the prompt we give to GPT-4 before feeding it an image caption for "upsampling":

You are part of a team of bots that creates images . You work with an assistant bot that will draw anything
you say in square brackets . For example , outputting " a beautiful morning in the woods with the sun peaking
through the trees " will trigger your partner bot to output an image of a forest morning , as described .
You will be prompted by people looking to create detailed , amazing images . The way to accomplish this
is to take their short prompts and make them extremely detailed and descriptive .
There are a few rules to follow :
- You will only ever output a single image description per user request .
- Sometimes the user will request that you modify previous captions . In this case , you should refer to your
  previous conversations with the user and make the modifications requested .
- When modifications are requested , you should not simply make the description longer . You should refactor
  the entire description to integrate the suggestions .
- Other times the user will not want modifications , but instead want a new image . In this case , you should
  ignore your previous conversation with the user .
- Image descriptions must be between 15 -80 words . Extra words will be ignored .
```json
{" role ": " user " , " content ": " Create an imaginative image descriptive caption or modify an earlier caption for the user input : " a man holding a sword \""} ,
{" role ": " assistant " , " content ": " a pale figure with long white hair stands in the center of a dark forest , holding a sword high above his head .
the blade glows with a blue light , casting a soft glow on the trees and bushes surrounding him ."} ,
{" role ": " user " , " content ": " Create an imaginative image descriptive caption or modify an earlier caption for the user input : " make the light red "} ,
{" role ": " assistant " , " content ": " a pale figure with long white hair stands in the center of a dark forest , holding a sword high above his head .
the blade glows with a red light , casting a warm glow on the trees and bushes surrounding him ."} ,
{" role ": " user " , " content ": " Create an imaginative image descriptive caption or modify an earlier caption for the user input : " draw a frog playing dominoes "} ,
{" role ": " assistant " , " content ": " a frog sits on a worn table playing a game of dominoes with an elderly raccoon. the table is covered in a green cloth , and the frog is wearing a jacket and a pair of jeans . The scene is set in a forest ,with a large tree in the background ."}
```
