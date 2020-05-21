var cards = [];
var c0 = document.getElementById('c0');
var c1 = document.getElementById('c1');
var c2 = document.getElementById('c2');
var c3 = document.getElementById('c3');
var c4 = document.getElementById('c4');
var c5 = document.getElementById('c5');
var c6 = document.getElementById('c6');
var c7 = document.getElementById('c7');
var c8 = document.getElementById('c8');
var c9 = document.getElementById('c9');
var c10 = document.getElementById('c10');
var c11 = document.getElementById('c11');
var c12 = document.getElementById('c12');
var c13 = document.getElementById('c13');
var c14 = document.getElementById('c14');
var c15 = document.getElementById('c15');

let modal = document.getElementById('modal');


c0.addEventListener("click", function ()
{
    revealCard(0);
});
c1.addEventListener("click", function ()
{
    revealCard(1);
});
c2.addEventListener("click", function ()
{
    revealCard(2);
});
c3.addEventListener("click", function ()
{
    revealCard(3);
});
c4.addEventListener("click", function ()
{
    revealCard(4);
});
c5.addEventListener("click", function ()
{
    revealCard(5);
});
c6.addEventListener("click", function ()
{
    revealCard(6);
});
c7.addEventListener("click", function ()
{
    revealCard(7);
});
c8.addEventListener("click", function ()
{
    revealCard(8);
});
c9.addEventListener("click", function ()
{
    revealCard(9);
});
c10.addEventListener("click", function ()
{
    revealCard(10);
});
c11.addEventListener("click", function ()
{
    revealCard(11);
});
c12.addEventListener("click", function ()
{
    revealCard(12);
});
c13.addEventListener("click", function ()
{
    revealCard(13);
});
c14.addEventListener("click", function ()
{
    revealCard(14);
});
c15.addEventListener("click", function ()
{
    revealCard(15);
});

var victory = new Audio('sfx/victory.mp3');
var matched = new Audio('sfx/matched.mp3');
var oneVisible = false;
var turnCounter = 0;
var visibleNr;
var lock = false;
var pairsLeft = 8;

randomCards();

function revealCard(nr)
{
    var opacityValue = $('#c' + nr).css('opacity');

    if(opacityValue != 0 && lock == false && visibleNr != nr)
    {
        lock = true;
        var img = "url(img/" + cards[nr] + ")";

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
    var heroes = ["adria.png", "barbarian.png", "cain.png", "enchantress.png",
    "leah.png", "maghda.png", "necromancer.png", "monk.png",
    "adria.png", "barbarian.png", "cain.png", "enchantress.png",
    "leah.png", "maghda.png", "necromancer.png", "monk.png"];

    for(var i = heroes.length; i > 0; i--)
    {
        var rand_id = Math.floor(Math.random() * i);
        cards.push(heroes[rand_id]);
        heroes.splice(rand_id, 1);
    }
}

function switchColors()
{
    modal.classList.add('hidden');

}
