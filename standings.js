var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        makeStandingsTable();
    }
};
xhttp.open("GET", "standings.xml", true);
xhttp.send();

function makeStandingsTable()
{
    var standingsTable;
    var xmlStandings=xhttp.responseXML;
    var headRow;

    standingsTable=document.getElementById("standings");
    headRow=standingsTable.insertRow(0);
    for (var i = 0; i < 8; i++)
        headRow.insertCell(i);

    var headers=xmlStandings.getElementsByTagName("headers")[0];

    standingsTable.rows[0].cells.item(0).innerHTML=headers.getAttribute("col_1");
    standingsTable.rows[0].cells.item(1).innerHTML="Division";
    standingsTable.rows[0].cells.item(2).innerHTML=headers.getAttribute("col_2");
    standingsTable.rows[0].cells.item(3).innerHTML=headers.getAttribute("col_3");
    standingsTable.rows[0].cells.item(4).innerHTML=headers.getAttribute("col_4");
    standingsTable.rows[0].cells.item(5).innerHTML=headers.getAttribute("col_5");
    standingsTable.rows[0].cells.item(6).innerHTML=headers.getAttribute("col_6");
    standingsTable.rows[0].cells.item(7).innerHTML=headers.getAttribute("col_7");

    var atlanticLeaders=getCategoryStandings(xmlStandings,"seed",0);
    var metropolitanLeaders=getCategoryStandings(xmlStandings,"seed",1);
    var pacificLeaders=getCategoryStandings(xmlStandings,"seed",2);
    var centralLeaders=getCategoryStandings(xmlStandings,"seed",3);

    var eastWild=getCategoryStandings(xmlStandings,"wild",0);
    var westWild=getCategoryStandings(xmlStandings,"wild",1);

    var eastElimination=getCategoryStandings(xmlStandings,"elimination",0);
    var westElimination=getCategoryStandings(xmlStandings,"elimination",1);

    var row;
    row=standingsTable.insertRow(-1);
    row.insertCell(-1);
    row.cells.item(0).innerHTML="Western Conference";
    row.cells.item(0).style.backgroundColor="blue";
    populateStandingsTable(xmlStandings,standingsTable,centralLeaders,"Central Division Leaders");
    populateStandingsTable(xmlStandings,standingsTable,pacificLeaders,"Pacific Division Leaders");
    populateStandingsTable(xmlStandings,standingsTable,westWild,"Western Wild Card Teams");
    populateStandingsTable(xmlStandings,standingsTable,westElimination,"Western Unqualified Teams");

    row=standingsTable.insertRow(-1);
    row.insertCell(-1);
    row.cells.item(0).innerHTML="Eastern Conference";
    row.cells.item(0).style.backgroundColor="darkred";
    populateStandingsTable(xmlStandings,standingsTable,atlanticLeaders,"Atlantic Division Leaders");
    populateStandingsTable(xmlStandings,standingsTable,metropolitanLeaders,"Metropolitan Division Leaders");
    populateStandingsTable(xmlStandings,standingsTable,eastWild,"Eastern Wild Card Teams");
    populateStandingsTable(xmlStandings,standingsTable,eastElimination,"Eastern Unqualified Teams");
}

function getCategoryStandings(xml, category, index)
{
    var standingsString;
    var standings;

    standingsString=xml.getElementsByTagName(category)[index];
    standingsString=standingsString.childNodes[0];
    standingsString=standingsString.nodeValue;

    standings=standingsString.split(",");

    return standings;
}

function getTeam(xml, id)
{
    var allTeams;
    var selectedTeam;

    allTeams=xml.getElementsByTagName("team-standing");

    $.each(allTeams,function(index,team)
    {
        if(team.getAttribute("id")==id)
            selectedTeam=team;
    });

    return selectedTeam;
}

function populateStandingsTable(xml, table, teams, name)
{
    var teamInfo=[];
    var row;
    var team;

    row=table.insertRow(-1);
    row.insertCell(-1);
    row.cells.item(0).innerHTML=name;
    row.cells.item(0).style.backgroundColor="black";

    $.each(teams,function(index,teamNum)
    {
        team=getTeam(xml,teamNum);
        teamInfo[0] = team.getAttribute("name");
        teamInfo[1] = team.getAttribute("division-name");
        teamInfo[2] = team.getAttribute("wins");
        teamInfo[3] = team.getAttribute("losses");
        teamInfo[4] = team.getAttribute("overtime");
        teamInfo[5] = team.getAttribute("points");
        teamInfo[6] = team.getAttribute("goalsFor");
        teamInfo[7] = team.getAttribute("goalsAgainst");

        row = table.insertRow(-1);
        for (var j = 0; j < 8; j++)
        {
            row.insertCell(-1);
            row.cells.item(j).innerHTML = teamInfo[j];
        }
    });
}