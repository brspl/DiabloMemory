let cards = [];

window.onload = function assignCards()
{
    for(let i = 0; i < 16; i++)
    {
        let card = document.getElementById('c' + i);
        card.addEventListener("click", function ()
        {
            revealCard(i);
        });
    }
}

let victory = new Audio('sfx/victory.mp3');
let matched = new Audio('sfx/matched.mp3');
let oneVisible = false;
let turnCounter = 0;
let visibleNr;
let lock = false;
let pairsLeft = 8;

randomCards();

function revealCard(nr)
{
    let opacityValue = $('#c' + nr).css('opacity');

    if(opacityValue != 0 && lock == false && visibleNr != nr)
    {
        lock = true;
        let img = "url(img/" + cards[nr] + ")";

        $('#c' + nr).css('background-image', img);
        $('#c' + nr).addClass('cardActive');

        if(oneVisible == false)
        {
            //First card
            oneVisible = true;
            visibleNr = nr;
            lock = false;
        }
        else
        {
            //Secend card
            if(cards[visibleNr] == cards[nr])
                setTimeout(function ()
                {
                    hideCards(nr, visibleNr);
                    matched.volume = 0.2;
                    matched.play();
                }, 750);
            else
                setTimeout(function ()
                {
                    restoreCards(nr, visibleNr);
                }, 1000);

            turnCounter++;
            $('.score').html('Turn counter: ' + turnCounter + ' Pair left: ' + pairsLeft);
            oneVisible = false;
        }
    }
}

function hideCards(nr1, nr2)
{
    $('#c' + nr1).css('opacity', '0');
    $('#c' + nr2).css('opacity', '0');

    pairsLeft--;
    $('.score').html('Turn counter: ' + turnCounter + ' Pair left: ' + pairsLeft);

    if(pairsLeft == 0)
    {
        // Play victory music
        victory.volume = 0.2;
        victory.play();

        $('.board').hide();
        $('.score').html('<h2>You won!<br>Done in ' + turnCounter + ' turns</h2>');
        window.setTimeout(function ()
        {
            location.reload()
        }, 5000);
    }

    lock = false;
}

function restoreCards(nr1, nr2)
{
    $('#c' + nr1).css('background-image', 'url(img/diablo.png)');
    $('#c' + nr1).removeClass('cardActive');
    $('#c' + nr2).css('background-image', 'url(img/diablo.png)');
    $('#c' + nr2).removeClass('cardActive');

    lock = false;
}

function randomCards()
{
    let heroes = ["adria.png", "barbarian.png", "cain.png", "enchantress.png",
    "leah.png", "maghda.png", "necromancer.png", "monk.png",
    "adria.png", "barbarian.png", "cain.png", "enchantress.png",
    "leah.png", "maghda.png", "necromancer.png", "monk.png"];

    for(let i = heroes.length; i > 0; i--)
    {
        let rand_id = Math.floor(Math.random() * i);
        cards.push(heroes[rand_id]);
        heroes.splice(rand_id, 1);
    }
}

function switchColors()
{
    modal.classList.add('hidden');

}
