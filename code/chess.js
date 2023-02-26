function bw(a){
    if (a%2 == 0){
        return '#eeeeee';
    }
    return '#555555';
}

var ispromte = false;
var WR = false;
var WL = false;
var WK = false;
var BR = false;
var BL = false;
var BK = false;
var board
var turn = 1;
var selx = -1;
var sely = -1;
var x;
var y;

function setting(){
    make();
    ispromte = false;
    WR = false;
    WL = false;
    WK = false;
    BR = false;
    BL = false;
    BK = false;
    turn = 1;
    selx = -1;
    sely = -1;
    board =[['BR','BN','BB','BQ','BK','BB','BN','BR'],
    ['BP','BP','BP','BP','BP','BP','BP','BP'],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['','','','','','','',''],
    ['WP','WP','WP','WP','WP','WP','WP','WP'],
    ['WR','WN','WB','WQ','WK','WB','WN','WR']];
    show();
}

function make(){
    document.write('<div>')
    document.write('<div style="margin-left:560px;margin-top:80px;width:800px;display:inline-block;height:800px;border-width:3px;border-style:solid;border-color:black;">')
    for(var x = 0;x<8;x++){
        document.write('<div style="width:800px;height:100px;">')
        for(var y = 0;y<8;y++){
            document.write('<div onclick="cli(event,this)" style="width:100px;height:100px;display:inline-block;background:'+bw(x+y)+'" id='+x+''+y+' class="board"><img style="width:100px;height:100px;"></img></div>');
        }
        document.write('</div>')
    }
    document.write('</div>')
    document.write('<div id="pro_out" style="display:none; margin-left:50px;width:120px;height:500px;border-width:3px;border-style:solid;border-color:black;">')
    document.write('<div onclick="pro_cli(event,this)" style="display:none;margin-left:10px;margin-top:20px;width:100px;height:100px;" id=pro_B class="pro"><img style="width:100px;height:100px;"></img></div>');
    document.write('<div onclick="pro_cli(event,this)" style="display:none;margin-left:10px;margin-top:20px;width:100px;height:100px;" id=pro_R class="pro"><img style="width:100px;height:100px;"></img></div>');
    document.write('<div onclick="pro_cli(event,this)" style="display:none;margin-left:10px;margin-top:20px;width:100px;height:100px;" id=pro_N class="pro"><img style="width:100px;height:100px;"></img></div>');
    document.write('<div onclick="pro_cli(event,this)" style="display:none;margin-left:10px;margin-top:20px;width:100px;height:100px;" id=pro_Q class="pro"><img style="width:100px;height:100px;"></img></div>');
    document.write('</div>')
    document.write('</div>')
}

function show(){
    var x = 0;
    var y = 0;
    for(x = 0;x<8;x++){
        for(y = 0;y<8;y++){
            document.getElementById(x+''+y).style.background = bw(x+y);
            if(board[x][y]){
                document.getElementById(x+''+y).firstElementChild.src="./asset/pieces/"+board[x][y]+'.png';
            }
            else{
                document.getElementById(x+''+y).firstElementChild.src = "./asset/pieces/None.png" ;
            }
        }
    }
}
function pro_cli(event,obj){
    var what = obj.id[4];
    if(turn%2 == 1)
        what = 'W'+what;
    else
        what = 'B'+what;
    board[x][y] = what;
    ispromte = false;
    turn += 1;
    selx = -1;
    sely = -1;
    document.getElementById("pro_out").style.display = 'none';
    ["pro_B","pro_R","pro_N","pro_Q"].forEach(element => {
        document.getElementById(element).style.display = 'none';
    })
    show();
}

function cli(event,obj){
    if(ispromte){
        return;
    }
    x = obj.id[0];
    y = obj.id[1];
    x *= 1;
    y *= 1;
    console.log(x+' '+y+' ??');
    if(selx == -1){
        if((turn%2 == 1 && board[x][y][0] == 'W') || (turn%2 == 0 && board[x][y][0] == 'B')){
            obj.style.background = "#aa9977";
            selx = x;
            sely = y;
            tomove(board,x,y,true,false);
        }
    }
    else{
        if(obj.style.background == "rgb(85, 153, 119)"){
            var castle = false;
            [[0,4,0,0],[0,4,0,7],[7,4,7,0],[7,4,7,7]].forEach(element => {
                if (selx == element[0] && sely == element[1] && x == element[2] && y == element[3]){
                    var cw
                    if(selx == 0)
                        cw = 'B'
                    else
                        cw = 'W'
                    if(y == 7){
                        board[x][5] = cw+'R';
                        board[x][6] = cw+'K';
                    }
                    else{
                        board[x][3] = cw+'R';
                        board[x][2] = cw+'K';
                    }
                    board[x][y] = '';
                    board[x][sely] = '';
                    castle = true;
                }
            });
            if (!castle){
                board[x][y] = board[selx][sely];
                board[selx][sely] = '';
            }
            if (selx == 7 && sely == 0 && !WL)
                WL = true
            if (selx == 7 && sely == 7 && !WR)
                WR = true
            if (selx == 7 && sely == 4 && !WK)
                WK = true
            if (selx == 0 && sely == 0 && !BL)
                BL = true
            if (selx == 0 && sely == 7 && !BR)
                BR = true
            if (selx == 0 && sely == 4 && !BK)
                BK = true
            if((x == 7 && board[x][y] == 'BP') || (x == 0 && board[x][y] == 'WP')){
                ispromte = true;
                show();
                document.getElementById(x+''+y).style.background = 'green';
                document.getElementById("pro_out").style.display = 'inline-block';
                ["pro_B","pro_R","pro_N","pro_Q"].forEach(element => {
                    document.getElementById(element).style.display = 'block';
                    document.getElementById(element).firstElementChild.src = "./asset/pieces/"+board[x][y][0] +element[4]+".png" ;
                })
                return;
            }
            turn += 1;
        }
        selx = -1;
        sely = -1;
        show();
        if (ismate()){
            if(ischeck(board)){
                if(turn%2 == 0){
                    alert('checkmate! \nwhite Win!');
                }
                else{
                    alert('checkmate! \nblack Win!');
                }
                ispromte = true;
            }
            else{
                alert('stalemate!');
                ispromte = true;
            }
        }
    }
}

function ismate(){
    for(var i = 0;i<8;i++){
        for(var j = 0;j<8;j++){
            if ((turn%2 == 0 && board[i][j][0] == 'B') || (turn%2 == 1 && board[i][j][0] == 'W'))
            var C = tomove(board,i,j,true,true);
            if(C){
                return false;
            }
        }
    }
    return true;
}

function checkmove(x,y,nx,ny,now_board,C,M){
    if(!(0<=nx && nx<8 && 0<=ny && ny<8)){
        return 1;
    }
    if(now_board[nx][ny] && now_board[nx][ny][0] == now_board[x][y][0]){
        return 1;
    }
    if (C){
        var next_board = JSON.parse(JSON.stringify(now_board)); 
        next_board[nx][ny] = next_board[x][y]
        next_board[x][y] = ''
        if (!ischeck(next_board)){
            if(M){
                return 2;
            }
            document.getElementById(nx+''+ny).style.background = "#559977";
        }
    }
    else{
        if(((now_board[x][y][0] == 'B' && now_board[nx][ny] == 'WK') || (now_board[x][y][0] == 'W' && now_board[nx][ny] == 'BK'))){
            return 2;
        }
    }
    if(!now_board[nx][ny]){
        return 0;
    }
        return 1;
}

var move_rook=[[1,0],[0,1],[-1,0],[0,-1]];
var move_bishop=[[1,1],[-1,1],[-1,-1],[1,-1]];
var move_knight=[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]];
function tomove(now_board,x,y,C,M){
    if(now_board[x][y][1] == 'R' || now_board[x][y][1] == 'Q'){
        for(var e = 0;e<4;e++){
            var el = move_rook[e];
            for(var i = 1;i<8;i++){
                var d = checkmove(x,y,x+(i*el[0]),y+(i*el[1]),now_board,C,M);
                if(d == 2)
                    return true;
                if(d)
                    break;
            }
        }
    }
    if(now_board[x][y][1] == 'B'|| now_board[x][y][1] == 'Q'){
        for(var e = 0;e<4;e++){
            var el = move_bishop[e];
            for(var i = 1;i<8;i++){
                var d = checkmove(x,y,x+(i*el[0]),y+(i*el[1]),now_board,C,M);
                if(d == 2){
                    return true;
                }
                if(d){
                    break;
                }
            }
        }
    }
    if(now_board[x][y][1] == 'N'){
        for(var e = 0;e<8;e++){
            var el = move_knight[e];
            var d = checkmove(x,y,x+el[0],y+el[1],now_board,C,M);
            if(d == 2)
                return true;
        }
    }
    if(now_board[x][y] == 'WP' && x != 0){
        if (C && !now_board[x-1][y]){
            var d = checkmove(x,y,x-1,y,now_board,C,M);
            if(d == 2)
                return true;
            if (x == 6 && !d && !now_board[x-2][y]){
                var d = checkmove(x,y,x-2,y,now_board,C,M);
                if(d == 2)
                    return true;
            }
        }
        if (y != 7 && now_board[x-1][y+1] && now_board[x-1][y+1][0] != now_board[x][y][0]){
            var d = checkmove(x,y,x-1,y+1,now_board,C,M);
            if(d == 2)
                return true;
        }
        if (y != 0 && now_board[x-1][y-1] && now_board[x-1][y-1][0] != now_board[x][y][0]){
            var d = checkmove(x,y,x-1,y-1,now_board,C,M);
            if(d == 2)
                return true;
        }
    }
    if(now_board[x][y] == 'BP' && x != 7){
        if (C && !now_board[x+1][y]){
            var d = checkmove(x,y,x+1,y,now_board,C,M);
            if(d == 2)
                return true;
            if (x == 1 && !now_board[x+2][y]){
                var d = checkmove(x,y,x+2,y,now_board,C,M);
                if(d == 2)
                    return true;
            }
        }
        if (y != 7 &&now_board[x+1][y+1]&& now_board[x+1][y+1][0] != now_board[x][y][0]){
            var d = checkmove(x,y,x+1,y+1,now_board,C,M);
            if(d == 2)
                return true;
        }
        if (y != 0 && now_board[x+1][y-1] && now_board[x+1][y-1][0] != now_board[x][y][0]){
            var d = checkmove(x,y,x+1,y-1,now_board,C,M);
            if(d == 2)
                return true;
        }
    }
    if(now_board[x][y][1] == 'K'){
        for(var i = -1;i<2;i++){
            for(var j = -1;j<2;j++){
                if(i == 0 && j == 0){
                    continue;
                }
                var d = checkmove(x,y,x+i,y+j,now_board,C,M);
                if(d == 2)
                    return true;
            }
        }
        if(C && !M){
            if(now_board[x][y] == 'BK' && !BK && !BL && !now_board[x][3] && !now_board[x][2] && !now_board[x][1]){
                var next_board = JSON.parse(JSON.stringify(now_board));
                next_board[x][y] = '' 
                next_board[x][2] = 'BK'
                next_board[x][3] = 'BR'
                next_board[x][0] = ''
                if (!ischeck(next_board) && !ischeck(now_board)){
                    document.getElementById((x)+''+(0)).style.background = "#559977";
                }
            }
            if(now_board[x][y] == 'BK' && !BK && !BR && !now_board[x][5] && !now_board[x][6] && C && !M){
                var next_board = JSON.parse(JSON.stringify(now_board));
                next_board[x][y] = '' 
                next_board[x][6] = 'BK'
                next_board[x][5] = 'BR'
                next_board[x][7] = ''
                if (!ischeck(next_board) && !ischeck(now_board)){
                    document.getElementById((x)+''+(7)).style.background = "#559977";
                }
            }
            if(now_board[x][y] == 'WK' && !WK && !WL && !now_board[x][3] && !now_board[x][2] && !now_board[x][1]){
                var next_board = JSON.parse(JSON.stringify(now_board));
                next_board[x][y] = '' 
                next_board[x][2] = 'WK'
                next_board[x][3] = 'WR'
                next_board[x][0] = ''
                if (!ischeck(next_board) && !ischeck(now_board)){
                    document.getElementById((x)+''+(0)).style.background = "#559977";
                }
            }
            if(now_board[x][y] == 'WK' && !WK && !WR && !now_board[x][5] && !now_board[x][6]){
                var next_board = JSON.parse(JSON.stringify(now_board));
                next_board[x][y] = '' 
                next_board[x][6] = 'WK'
                next_board[x][5] = 'WR'
                next_board[x][7] = ''
                if (!ischeck(next_board) && !ischeck(now_board)){
                    document.getElementById((x)+''+(7)).style.background = "#559977";
                }
            }
        }
    }
    return false;
}

function ischeck(now_board){
    for(x = 0;x<8;x++){
        for(y = 0;y<8;y++){
            if((turn%2 == 1 && now_board[x][y][0] == 'B') || (turn%2 == 0 && now_board[x][y][0] == 'W')){
                if(tomove(now_board,x,y,false,false)){
                    return true;
                }
            }
        }
    }
    return false;
}