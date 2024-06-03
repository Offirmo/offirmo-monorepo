
import chalkTemplate from 'chalk-template'

console.log('hello world!')

console.log(chalkTemplate`{bold.rgb(10,100,200) Hello!}`);

/*
console.log(chalkTemplate`
CPU: {red ${cpu.totalPercent}%}
RAM: {green ${ram.used / ram.total * 100}%}
DISK: {rgb(255,131,0) ${disk.used / disk.total * 100}%}
`);*/
///////

console.log(chalkTemplate`
{bold ⌂ {red [you are here]} 🏡 Lin's family house}
  ↳ 🌾 Rice fields
  ↳ 🌳 Bamboo forest
    ↳ ◯ [Explore]
  {bold ࿊ ࿋ ࿌}
`.trim())

