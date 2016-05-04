var scheduleTable;

function makeScheduleTable()
{
    var headRow;

    scheduleTable=document.getElementById("schedule");
    headRow=scheduleTable.insertRow(0);
    for (var i = 0; i < 5; i++)
        headRow.insertCell(i);

    scheduleTable.rows[0].cells.item(0).innerHTML="Opponent";
    scheduleTable.rows[0].cells.item(1).innerHTML="Logo";
    scheduleTable.rows[0].cells.item(2).innerHTML="Home/Away";
    scheduleTable.rows[0].cells.item(3).innerHTML="Time and Date";
    scheduleTable.rows[0].cells.item(4).innerHTML="Score";

    $.getJSON('clubschedule.json', function (data)
    {
        $.each(data.games,function(index,game)
        {
            populateRosterRow(game);
        });
    });
}

function populateRosterRow(game)
{
    var gameInfo=[];

    gameInfo[0]=game.abb;
    gameInfo[1]=game.abb;
    gameInfo[2]=game.loc;
    gameInfo[3]=game.startTime;

    if(!$.isEmptyObject(game.score))
        gameInfo[4]=game.score;
    else
        gameInfo[4]="";

    var row=scheduleTable.insertRow(-1);
    for (var i = 0; i < 5; i++)
    {
        row.insertCell(-1);
        if(i!=1)
            row.cells.item(i).innerHTML = gameInfo[i];
        else
            row.cells.item(i).innerHTML = "<img src=images/" + gameInfo[i] + ".gif>";
    }
}