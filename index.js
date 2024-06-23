const prompt = require('prompt-sync')();
const rng = require('random-number');
const { topics } = require("./data.json");

const ITEMS_PER_ROUND = 5

clear()

game()

function game(){
    clear()
    console.table([...topics].map(value => {return {topic: value.topic}}));
    let topic = topics[limit(Number(prompt(`Choose a topic or leave empty (0-${topics.length-1}): `)), 0, topics.length-1) || rng({min: 0, max: topics.length-1, integer:true})];
    console.log(`Your Chosen Topic Is... ${topic.topic}!`);

    sleep(1000)

    choices = [undefined]

    for (let i = 0; i < ITEMS_PER_ROUND; i++) {
        clear()
        console.table(choices)

        let done = false
        
        while(!done){
            const chosen = topic.items[rng({min:0, max:topic.items.length-1, integer:true})]

            if(!choices.includes(chosen)){
                choices = getInput(chosen, choices)
                done = true
            }
        }
    }

    console.table(choices)


}

function limit(num, min, max){
    const MIN = min;
    const MAX = max;
    const parsed = parseInt(num);
    return Math.min(Math.max(parsed, MIN), MAX);
}

function clear(){
    console.clear()

    console.log(`
####   #      ###    #  #   ###           ###      #    #  #   #  #  
#   #  #       #     ## #   #  #          #  #    # #   ## #   # #   
####   #       #     # ##   #  #          #  #   #   #  # ##   ##    
#   #  #       #     #  #   #  #          ###    #####  #  #   # #   
#   #  #       #     #  #   #  #          #  #   #   #  #  #   #  #  
####   ####   ###    #  #   ###           #  #   #   #  #  #   #  #                              
    `)
}

function getInput(item, choices){
    let done = false

    while(!done){
        const input = Number(prompt(`Where Does ${item} belong to? (1-${ITEMS_PER_ROUND})`))

        if(isNaN(input)) continue
        if(limit(input, 1, ITEMS_PER_ROUND) != input) continue
        if(choices[input]){
            console.log("That Place Is Occupied By " + choices[input])
            continue
        }

        done = true
        choices[input] = item
    }

    return choices
}

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
}