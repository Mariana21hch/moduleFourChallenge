
var answerKey = ["b", "d", "c", "a"];
var startMinutes = 0;
var startSeconds = 30;
var penalty = 10;
var totalQuestions = $("section").length;
var countRight = 0;
var countPercentage = 0;
var results = [];
$(document).ready(function() {
    $("#btn_start").click(function() {
        $(this).hide();
        $("#pre_test").hide();
        start();
    });
    $("#btn_next, #btn_end").click(function() {
        var curQuestion = $("section:visible").attr("data-q");
        var curAnswer = $("section:visible").find("input:checked").val();
        var correctAnswer = answerKey[$("section:visible").attr("data-i")];
        if (curAnswer != correctAnswer) {
            if (timeLeft > 15) {
                timeLeft = timeLeft - 15;
            } else {
                timeLeft = 0;
            }
            $("#penalty").show();
            $("#penalty").fadeOut(2000);
        } else {
            countRight++;
        }
        $("section[data-q="+ curQuestion +"]").hide();
        $("section[data-q="+ curQuestion +"]").next("section").fadeIn(500);
        if ($("section").length == Number(curQuestion) + 1) {
            $("#btn_next, #btn_end").toggle();
        }
    });
    $("#btn_end").click(function() {
        $(this).toggle();
        $("section, #btn_next, #btn_end").hide();
        $("#div_results, #btn_submit, #btn_restart").show();
        timeLeft = 0;
    });
    $("#btn_submit").click(function() {
        $("#txt_initials, #btn_submit").prop("disabled", true);
        saveResults();
        alert("Score Saved");
    });
    $("#btn_restart").click(function() {
        startMinutes = 0;
        startSeconds = 30;
        start();
    });
});
function saveResults() {
    results.push({attempt:results.length+1,initials:$("#txt_initials").val(),score:((countRight/totalQuestions) * 100).toFixed(0) + "%"});
    $("#tbl_results").find("tr").remove();
    $(results).each(function(r, result) {
        $("#tbl_results tbody").append('<tr><td>'+ result.attempt +': '+ result.initials +'</td><td>'+ result.score +'</td></tr>');
    });
}
function start() {
    timeLeft = startMinutes * 60 + startSeconds;
    $("#btn_submit, #btn_restart, #div_results").hide();
    $("#txt_initials").val("");
    $("#txt_initials, #btn_submit").prop("disabled", false);
    $("#countTotal, #countCorrect, #countPercentage").html("");
    $("#btn_next").toggle();
    $("section:first").fadeIn(500);
    $("section input[type='radio']").each(function() {
        $(this).prop("checked", false);
    });
    countRight = 0;
    countPercentage = 0;
    timer();
}
function timer() {
    var timer = setInterval(function() {
        if (timeLeft < 1) {
            $("section, #btn_next, #btn_end").hide();
            $("#div_results, #btn_submit, #btn_restart").show();
            clearInterval(timer);
            $(".timer").html("0:00");
            loadTotals();
        };
        var minsLeft = Math.floor(timeLeft / 60);
        var secsLeft = timeLeft - minsLeft * 60;
        if (secsLeft < 10) {
            secsLeft = "0" + secsLeft;
        }
        $(".timer").html(minsLeft + ":" + secsLeft);
        timeLeft--;
    }, 1000);
}
function loadTotals() {
    $("#countTotal").html(totalQuestions);
    $("#countCorrect").html( );
    $("#countPercentage").html(((countRight/totalQuestions) * 100).toFixed(0) + "%");
}