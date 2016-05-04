var rosterTable;

function makeRosterTable()
{
    var headRow;

    rosterTable=document.getElementById("roster");
    headRow=rosterTable.insertRow(0);
    for (var i = 0; i < 9; i++)
        headRow.insertCell(i);

    rosterTable.rows[0].cells.item(0).innerHTML="Position";
    rosterTable.rows[0].cells.item(1).innerHTML="Name";
    rosterTable.rows[0].cells.item(2).innerHTML="Number";
    rosterTable.rows[0].cells.item(3).innerHTML="Age";
    rosterTable.rows[0].cells.item(4).innerHTML="Height";
    rosterTable.rows[0].cells.item(5).innerHTML="Weight";
    rosterTable.rows[0].cells.item(6).innerHTML="Birthdate";
    rosterTable.rows[0].cells.item(7).innerHTML="Birthplace";
    rosterTable.rows[0].cells.item(8).innerHTML="Image";

    $.getJSON('clubroster.json', function (data)
    {
        $.each(data.goalie,function(index,player)
        {
            populateRosterRow(player);
        });

        $.each(data.defensemen,function(index,player)
        {
            populateRosterRow(player);
        });

        $.each(data.forwards,function(index,player)
        {
            populateRosterRow(player);
        });
    });
}

function populateRosterRow(player)
{
    var playerInfo=[];

    playerInfo[0]=player.position;
    playerInfo[1]=player.name;
    playerInfo[2]=player.number;
    playerInfo[3]=player.age;
    playerInfo[4]=player.height;
    playerInfo[5]=player.weight;
    playerInfo[6]=player.birthdate;
    playerInfo[7]=player.birthplace;
    playerInfo[8]=player.imageUrl;

    var row=rosterTable.insertRow(-1);
    for (var i = 0; i < 9; i++)
    {
        row.insertCell(-1);
        if(i!=8)
            row.cells.item(i).innerHTML = playerInfo[i];
        else
            row.cells.item(i).innerHTML = "<img src=" + playerInfo[i] + ">";
    }
}