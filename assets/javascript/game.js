class Player {
    constructor(a, b, c) {
        this.hp = a
        this.power = b
        this.attack = b
        this.counter = c
    }

    doAttack(rival) {
        rival.hp -= this.attack
        this.attack += this.power
        if (rival.hp > 0) {
            this.hp -= rival.counter
        }

    }

    control() {
        if (this.hp > 0) {
            return true
        } else {
            return false
        }
    }
}

function create_players() {
    fighters = {
        "obi": new Player(120, 8, 22),
        "luke": new Player(100, 25, 5),
        "sidious": new Player(150, 10, 20),
        "maul": new Player(180, 5, 25)
    }

    rivals = 1
}


create_players()

$(document).ready(function() {
    $(".pics").on("click", function () {
    if ($(".player-place").is(':empty')) {
        $(".player-place").append($(this))
        let name = $(this).attr("data-name")
        player = fighters[name]
        player_hp = "#" + name
        $("#left").css("display", "inline")
        $("#command").text("Choose Your Enemy!")

    } else if ($(".rival-place").is(':empty')) {
        $(".rival-place").append($(this))
        let name = $(this).attr("data-name")
        rival = fighters[name]
        rival_hp = "#" + name

        $("#command").text("")
        $("#right").css("display", "inline")
        $(".atak-btn").css("display", "inline")
        $(".pBack").css("display", "inline-block")
        $("#damage1").text("")
    }
})


$(".atak-btn").on("click", function () {
    if ($(".rival-place").is(':empty')) {
        $("#damage1").text("You should choose new enemy.")
    } else {
        $("#damage1").text("You attacked for " + player.attack + " damage.")
        let name = $(".rival-place .pics").attr("data-name")
        $("#damage2").text(name.toUpperCase() + " attacked for " + rival.counter + " damage.")
        player.doAttack(rival)
        $(player_hp).text(player.hp)
        $(rival_hp).text(rival.hp)
        if (!rival.control()) {
            if (rivals < 3) {
                var div = $(".rival-place .pics")
                div.css("display", "none")
                $(".fighters").append(div)
                $("#damage1").text("You have defeated " + name.toUpperCase())
                $("#damage2").text("")
                $("#command").text("Choose New Enemy!")
                rivals++
            } else {
                var div = $(".rival-place .pics")
                div.css("display", "none")
                $(".fighters").append(div)

                var won_div = $(".player-place .pics")
                $(".fighters").append(won_div)

                $("#left").css("display", "none")
                $("#right").css("display", "none")
                $(".abs2").css("display", "inline-block")
                $("#command").text("You Won!")
                $("#damage1").text("")
                $("#damage2").text("")
                $(".atak-btn").css("display", "none")
                $(".reset-btn").css("display", "inline-block")
            }
        } else if (!player.control()) {
            var div = $(".rival-place .pics")
            div.css("display", "none")
            $(".fighters").append(div)
            var won_div = $(".player-place .pics")
            won_div.css("display", "none")
            $(".fighters").append(won_div)

            $("#left").css("display", "none")
            $("#right").css("display", "none")
            $(".abs2").css("display", "inline-block")
            $("#command").text("You Lose!")
            $("#damage1").text("")
            $("#damage2").text("")
            $(".atak-btn").css("display", "none")
            $(".reset-btn").css("display", "inline-block")
        }
    }
})

$(".reset-btn").on("click", function () {
    create_players()
    $(".pics").css("display", "inline-block")
    $("#obi").text(120)
    $("#luke").text(100)
    $("#sidious").text(150)
    $("#maul").text(180)
    $(".reset-btn").css("display", "none")
    $("#command").text("Choose Your Character!")
    $(".abs2").css("display", "none")
})
})